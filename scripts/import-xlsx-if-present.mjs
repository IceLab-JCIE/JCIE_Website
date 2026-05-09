import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const xlsxPath = "xlsx/site.xlsx";
if (!existsSync(xlsxPath)) {
  console.log("xlsx/site.xlsx not found; skipping XLSX import.");
  process.exit(0);
}

const result = spawnSync(
  "python",
  ["scripts/import_xlsx.py", xlsxPath, "--root", "."],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);

