import { IncomingMessage, OutgoingMessage } from "http";

function convertDate(date: Date): string {
  const timeWithOffset = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(timeWithOffset).toISOString().split("T")[0];
}

function generateSiteMap(hostname: string, currentDate: Date) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${hostname}</loc>
        <lastmod>${convertDate(currentDate)}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${hostname}/result</loc>
        <lastmod>${convertDate(currentDate)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: IncomingMessage;
  res: OutgoingMessage;
}) {
  const sitemap = generateSiteMap(req.headers.host ?? "", new Date());

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
