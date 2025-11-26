import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as contentful from "contentful";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

const CONTENT_TYPE_MAP = {
  protein: "proteinTozlar",
  creatine: "kreatinler",
  vitamins: "vitaminlerMineraller",
  equipment: "sporEkipmanlar",
};

const STATIC_ROUTES = ["/", "/products"];
const BASE_URL = (process.env.SITE_BASE_URL || "https://fitwaysamsun.com").replace(/\/$/, "");

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const slugify = (value = "") =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const buildUrlEntry = (relativePath) => {
  const loc = `${BASE_URL}${relativePath}`;
  const lastmod = new Date().toISOString();
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${relativePath === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
};

const fetchProductSlugs = async () => {
  const slugs = new Set();

  for (const contentTypeId of Object.values(CONTENT_TYPE_MAP)) {
    const entries = await client.getEntries({
      content_type: contentTypeId,
      limit: 1000,
      order: "-sys.updatedAt",
    });

    entries.items.forEach((entry) => {
      const name = entry.fields?.name;
      if (!name) return;
      slugs.add(slugify(name));
    });
  }

  return Array.from(slugs);
};

const generateSitemap = async () => {
  const productSlugs = await fetchProductSlugs();
  const urls = [
    ...STATIC_ROUTES.map((route) => buildUrlEntry(route)),
    ...productSlugs.map((slug) => buildUrlEntry(`/product/${slug}`)),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log(`✅ Sitemap generated with ${urls.length} URLs at ${outputPath}`);
};

generateSitemap().catch((err) => {
  console.error("❌ Failed to generate sitemap:", err);
  process.exitCode = 1;
});

