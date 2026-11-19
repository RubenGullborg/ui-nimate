// Copies the brand kit (single source of truth: /brand) into public/brand for the site.
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const brand = join(here, "../../../brand");
const out = join(here, "../public/brand");

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "film"), { recursive: true });
for (const dir of ["icon", "patterns", "logo", "tokens"]) cpSync(join(brand, dir), join(out, dir), { recursive: true });
cpSync(join(brand, "brand-guide.html"), join(out, "brand-guide.html"));
for (const f of ["uinimate-film-loop.mp4", "poster.jpg"]) cpSync(join(brand, "film", f), join(out, "film", f));
console.log("brand → public/brand synced");
