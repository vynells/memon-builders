import fs from "fs";
import path from "path";
import os from "os";

const desktop = path.join(os.homedir(), "Desktop");
const outRoot = path.join(process.cwd(), "public", "projects");
const manifestPath = path.join(process.cwd(), "data", "projects-manifest.json");

const categories = [
  { folder: "DELIVERED", key: "delivered", status: "delivered" },
  { folder: "UNDER CONSTRUCTION", key: "under-construction", status: "in-build" },
  { folder: "FOR SALE", key: "for-sale", status: "for-sale" },
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function syncCategory({ folder, key, status }) {
  const base = path.join(desktop, folder);
  if (!fs.existsSync(base)) return [];

  const projects = [];

  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const projName = entry.name;
    const projDir = path.join(base, projName);
    const slug = slugify(projName);
    const destDir = path.join(outRoot, key, slug);

    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    fs.mkdirSync(destDir, { recursive: true });

    const coverDir = path.join(projDir, "Cover");
    let coverFile = null;
    let coverSourceDir = projDir;

    if (fs.existsSync(coverDir)) {
      const coverImages = fs
        .readdirSync(coverDir)
        .filter((f) => /\.(jpe?g|jfif|png|webp)$/i.test(f));
      if (coverImages.length) {
        coverFile = coverImages[0];
        coverSourceDir = coverDir;
      }
    }

    const rootImages = fs
      .readdirSync(projDir, { withFileTypes: true })
      .filter((e) => e.isFile() && /\.(jpe?g|jfif|png|webp)$/i.test(e.name))
      .map((e) => e.name);

    if (!coverFile && rootImages.length >= 1) {
      coverFile = rootImages[0];
      coverSourceDir = projDir;
    }

    const gallery = [];
    if (coverFile) {
      const ext = path.extname(coverFile) || ".jpg";
      const coverDest = `cover${ext}`;
      copyFile(path.join(coverSourceDir, coverFile), path.join(destDir, coverDest));
      gallery.push(`/projects/${key}/${slug}/${coverDest}`);
    }

    for (const img of rootImages) {
      if (coverSourceDir === projDir && img === coverFile) continue;
      const destName = img.replace(/[^a-zA-Z0-9._-]/g, "_");
      copyFile(path.join(projDir, img), path.join(destDir, destName));
      const url = `/projects/${key}/${slug}/${destName}`;
      if (!gallery.includes(url)) gallery.push(url);
    }

    projects.push({
      id: `${key}-${slug}`,
      folderName: projName,
      slug,
      category: key,
      status,
      cover: gallery[0] || null,
      images: gallery,
    });
  }

  return projects;
}

const all = categories.flatMap(syncCategory);
fs.writeFileSync(manifestPath, JSON.stringify(all, null, 2));
console.log(`Synced ${all.length} projects to public/projects/`);
