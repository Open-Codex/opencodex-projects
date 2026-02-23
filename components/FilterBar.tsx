"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Category, Skill } from "@/types/projects";

export default function FilterBar({ categories, skills }: { categories: Category[], skills: Skill[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category");
    const activeSkill = searchParams.get("skill");

    function buildUrl(key: string, value: string | null) {
        const params = new URLSearchParams(searchParams.toString());
        if (value === null || params.get(key) === value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div
            style={{
                background: "var(--surface-2)",
                borderBottom: "1px solid var(--border)",
                padding: "0 24px",
                position: "sticky",
                top: "64px",
                zIndex: 40,
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "12px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {/* Category row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        overflowX: "auto",
                        paddingBottom: "4px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#374151",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            minWidth: "72px",
                        }}
                    >
                        Category
                    </span>
                    <button
                        onClick={() => router.push(buildUrl("category", null))}
                        className={`filter-pill ${!activeCategory ? "active" : ""}`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => router.push(buildUrl("category", cat.slug))}
                            className={`filter-pill ${activeCategory === cat.slug ? "active" : ""}`}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Skill row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        overflowX: "auto",
                        paddingBottom: "4px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#374151",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            minWidth: "72px",
                        }}
                    >
                        Skill
                    </span>
                    <button
                        onClick={() => router.push(buildUrl("skill", null))}
                        className={`filter-pill ${!activeSkill ? "active" : ""}`}
                    >
                        All
                    </button>
                    {skills.map((m) => (
                        <button
                            key={m.slug}
                            onClick={() => router.push(buildUrl("skill", m.slug))}
                            className={`filter-pill ${activeSkill === m.slug ? "active" : ""}`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
