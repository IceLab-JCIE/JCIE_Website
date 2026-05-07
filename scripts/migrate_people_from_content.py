#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


class MigrationError(RuntimeError):
    pass


def _strip(v: Any) -> str:
    if v is None:
        return ""
    return str(v).strip()


def _yaml_quote(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def _yaml_scalar(v: Any) -> str:
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    return _yaml_quote(str(v))


def _yaml_write(obj: Any, *, indent: int = 0) -> str:
    pad = " " * indent
    if isinstance(obj, dict):
        lines: List[str] = []
        for k, v in obj.items():
            if isinstance(v, (dict, list)):
                lines.append(f"{pad}{k}:")
                lines.append(_yaml_write(v, indent=indent + 2).rstrip("\n"))
            else:
                if isinstance(v, str) and "\n" in v:
                    lines.append(f"{pad}{k}: |")
                    for ln in v.splitlines():
                        lines.append(" " * (indent + 2) + ln)
                else:
                    lines.append(f"{pad}{k}: {_yaml_scalar(v)}")
        return "\n".join(lines) + "\n"
    if isinstance(obj, list):
        lines: List[str] = []
        for item in obj:
            if isinstance(item, dict):
                lines.append(f"{pad}-")
                lines.append(_yaml_write(item, indent=indent + 2).rstrip("\n"))
            else:
                lines.append(f"{pad}- {_yaml_scalar(item)}")
        return "\n".join(lines) + "\n"
    return f"{pad}{_yaml_scalar(obj)}\n"


FRONT_MATTER_RE = re.compile(r"^---\s*$", re.M)


def _split_front_matter(md: str) -> Tuple[Dict[str, str], str]:
    # Minimal Hugo-style YAML front matter: --- ... ---
    parts = FRONT_MATTER_RE.split(md, maxsplit=2)
    if len(parts) < 3:
        return {}, md
    # parts: [before, fm, after]
    fm = parts[1]
    body = parts[2].lstrip("\n")
    meta: Dict[str, str] = {}
    for line in fm.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip().strip('"').strip("'")
    return meta, body


def main(argv: List[str]) -> int:
    ap = argparse.ArgumentParser(description="Migrate content/people/*.md into data/people.yaml")
    ap.add_argument("--root", default=".", help="Repo root (default: current directory)")
    args = ap.parse_args(argv)

    root = Path(args.root).resolve()
    content_people = root / "content" / "people"
    if not content_people.exists():
        raise MigrationError(f"Missing: {content_people}")

    people: Dict[str, Dict[str, Any]] = {}

    for path in sorted(content_people.glob("*.md")):
        if path.name.startswith("_index."):
            continue
        m = re.match(r"^(?P<id>.+)\.(?P<lang>en|zh)\.md$", path.name)
        if not m:
            continue
        pid = m.group("id")
        lang = m.group("lang")

        md = path.read_text(encoding="utf-8", errors="replace")
        meta, body = _split_front_matter(md)

        role = meta.get("role", "")
        if role == "wei":
            role = "mentor"
        name = meta.get("name", "")
        title = meta.get("title", "")
        year = meta.get("year", "")
        photo = meta.get("photo", "")

        p = people.setdefault(
            pid,
            {
                "id": pid,
                "role": role or "member",
                "name": {"en": "", "zh": ""},
                "title": {"en": "", "zh": ""},
                "bio": {"en": "", "zh": ""},
            },
        )

        if role and p.get("role") != role:
            p["role"] = role
        if name:
            p["name"][lang] = name
        if title:
            p["title"][lang] = title
        if body.strip():
            p["bio"][lang] = body.rstrip() + "\n"
        if photo and not p.get("photo"):
            p["photo"] = photo
        if year and not p.get("join_year"):
            try:
                p["join_year"] = int(year)
            except Exception:
                pass

    rows: List[Dict[str, Any]] = []
    for pid in sorted(people.keys()):
        p = people[pid]
        # Prune empty nested objects to keep YAML clean
        if not p["title"]["en"] and not p["title"]["zh"]:
            p.pop("title", None)
        if not p["bio"]["en"] and not p["bio"]["zh"]:
            p.pop("bio", None)
        rows.append(p)

    out = {"people": rows}
    target = root / "data" / "people.yaml"
    target.write_text(_yaml_write(out), encoding="utf-8", newline="\n")
    print(f"Wrote: {target}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except MigrationError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        raise SystemExit(2)
