#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path
from typing import Any, Dict, List

import yaml
import sys


def _strip(v: Any) -> str:
    if v is None:
        return ""
    return str(v).strip()


def _load_yaml(path: Path) -> Dict[str, Any]:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _norm_name(s: str) -> str:
    s = _strip(s).lower()
    # normalize common punctuation/spaces for matching
    for ch in [".", ",", "’", "'", "\""]:
        s = s.replace(ch, "")
    s = " ".join(s.split())
    return s


def _build_people_sheet_rows(people_yaml: Dict[str, Any]) -> List[Dict[str, Any]]:
    people = people_yaml.get("people") or []
    rows: List[Dict[str, Any]] = []
    for p in people:
        name = p.get("name") or {}
        title = p.get("title") or {}
        bio = p.get("bio") or {}
        rows.append(
            {
                "id": _strip(p.get("id")),
                "role": _strip(p.get("role")),
                "name_en": _strip(name.get("en")),
                "name_zh": _strip(name.get("zh")),
                "title_en": _strip(title.get("en")),
                "title_zh": _strip(title.get("zh")),
                "join_year": p.get("join_year") or "",
                "photo": _strip(p.get("photo")),
                "bio_en": _strip(bio.get("en")),
                "bio_zh": _strip(bio.get("zh")),
                "is_outstanding": "TRUE" if p.get("is_outstanding") else "",
                "outstanding_order": p.get("outstanding_order") or "",
            }
        )
    rows.sort(key=lambda r: r["id"])
    return rows


def _build_people_name_index(people_rows: List[Dict[str, Any]]) -> Dict[str, str]:
    # normalized name_en -> person id
    idx: Dict[str, str] = {}
    for r in people_rows:
        n = _norm_name(r.get("name_en") or "")
        if n:
            idx[n] = r["id"]
    return idx


def _build_publications_sheet_rows(
    pubs_yaml: Dict[str, Any], *, people_name_index: Dict[str, str]
) -> List[Dict[str, Any]]:
    pubs = pubs_yaml.get("publications") or []
    rows: List[Dict[str, Any]] = []
    for p in pubs:
        authors = p.get("authors") or []
        author_tokens: List[str] = []
        for a in authors:
            aid = people_name_index.get(_norm_name(a))
            author_tokens.append(aid or _strip(a))
        rows.append(
            {
                "id": _strip(p.get("id")),
                "title": _strip(p.get("title")),
                "venue": _strip(p.get("venue")),
                "year": p.get("year") or "",
                "area": _strip(p.get("area")),
                "authors": ";".join([t for t in author_tokens if t]),
                "link": _strip(p.get("link")) or "#",
                "type": _strip(p.get("type")),
                "note": _strip(p.get("note")),
            }
        )
    # keep as-is ordering (already sorted in file), but stable fallback
    rows.sort(key=lambda r: (-(int(r["year"]) if str(r["year"]).isdigit() else 0), r["id"]))
    return rows


def _build_projects_sheet_rows(projects_yaml: Dict[str, Any]) -> List[Dict[str, Any]]:
    projs = projects_yaml.get("projects") or []
    rows: List[Dict[str, Any]] = []
    for p in projs:
        lead = p.get("lead") or {}
        title = p.get("title") or {}
        summary = p.get("summary") or {}
        rows.append(
            {
                "id": _strip(p.get("id")),
                "area": _strip(p.get("area")),
                "status": _strip(p.get("status")),
                "github": _strip(p.get("github")),
                "lead_en": _strip(lead.get("en")),
                "lead_zh": _strip(lead.get("zh")),
                "title_en": _strip(title.get("en")),
                "title_zh": _strip(title.get("zh")),
                "summary_en": _strip(summary.get("en")),
                "summary_zh": _strip(summary.get("zh")),
                "start_year": p.get("start_year") or "",
            }
        )
    rows.sort(key=lambda r: r["id"])
    return rows


def _write_sheet(ws, *, headers: List[str], rows: List[Dict[str, Any]]) -> None:
    ws.append(headers)
    for r in rows:
        ws.append([r.get(h, "") for h in headers])
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:{chr(ord('A') + len(headers) - 1)}{len(rows) + 1}"


def main(argv: List[str]) -> int:
    ap = argparse.ArgumentParser(description="Export repo YAML data to a single XLSX template.")
    ap.add_argument("--root", default=".", help="Repo root (default: current directory)")
    ap.add_argument("--out", default="data/site.xlsx", help="Output XLSX path (default: data/site.xlsx)")
    args = ap.parse_args(argv)

    root = Path(args.root).resolve()
    out_path = (root / args.out).resolve()

    people_yaml = _load_yaml(root / "data" / "people.yaml")
    pubs_yaml = _load_yaml(root / "data" / "publications.yaml")
    projects_yaml = _load_yaml(root / "data" / "projects.yaml")

    people_rows = _build_people_sheet_rows(people_yaml)
    people_name_index = _build_people_name_index(people_rows)

    pub_rows = _build_publications_sheet_rows(pubs_yaml, people_name_index=people_name_index)
    proj_rows = _build_projects_sheet_rows(projects_yaml)

    try:
        import openpyxl  # type: ignore
    except Exception as e:
        raise SystemExit(
            "openpyxl is required to write XLSX. Install with: python -m pip install openpyxl"
        ) from e

    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)

    ws_people = wb.create_sheet("people")
    people_headers = [
        "id",
        "role",
        "name_en",
        "name_zh",
        "title_en",
        "title_zh",
        "join_year",
        "photo",
        "bio_en",
        "bio_zh",
        "is_outstanding",
        "outstanding_order",
    ]
    _write_sheet(ws_people, headers=people_headers, rows=people_rows)

    ws_pubs = wb.create_sheet("publications")
    pub_headers = ["id", "title", "venue", "year", "area", "authors", "link", "type", "note"]
    _write_sheet(ws_pubs, headers=pub_headers, rows=pub_rows)

    ws_projects = wb.create_sheet("projects")
    proj_headers = [
        "id",
        "area",
        "status",
        "github",
        "lead_en",
        "lead_zh",
        "title_en",
        "title_zh",
        "summary_en",
        "summary_zh",
        "start_year",
    ]
    _write_sheet(ws_projects, headers=proj_headers, rows=proj_rows)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(out_path)
    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
