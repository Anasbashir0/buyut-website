import { useEffect } from "react";
import { company } from "../data/company.js";

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

// Sets the title and meta tags per page. Note: social-media crawlers do not run
// JavaScript, so the defaults in index.html are what shared links will show.
export default function SEO({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${company.name}` : `${company.name} | Construction, Civil Works and Consultancy in Abuja`;
    const url = `${company.siteUrl}${path}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${company.siteUrl}/logo.png`);
    setMeta("name", "twitter:card", "summary");

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [title, description, path]);

  return null;
}
