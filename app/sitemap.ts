import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/firestore";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categories = await getCategories();

    const staticPages = [
        "",
        "/faq",
        "/about",
        "/terms",
        "/privacy",
        "/contact",
        "/submit",
    ];

    const staticUrls = staticPages.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.5,
    }));

    const categoryUrls = categories.map((cat) => ({
        url: `${SITE_URL}/?category=${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticUrls, ...categoryUrls];
}