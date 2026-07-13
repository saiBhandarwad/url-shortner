import { Helmet } from "react-helmet";
export default function Seo({
  title = "Linklane — Shorten links with clarity",
  description = "Branded links, QR codes, and analytics for modern teams.",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
