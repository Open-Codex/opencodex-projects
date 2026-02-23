"use client";

import { useState } from "react";
import { Project, Category, Skill } from "@/types/projects";
import ProjectCard from "./ProjectCard";
import { loadMoreProjects } from "@/app/actions";

interface Props {
    initialProjects: Project[];
    initialHasMore: boolean;
    category: string | null;
    skill: string | null;
    categories: Category[];
    skills: Skill[];
}

export default function ProjectGrid({
    initialProjects,
    initialHasMore,
    category,
    skill,
    categories,
    skills,
}: Props) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = async () => {
        if (loading || !hasMore || projects.length === 0) return;
        setLoading(true);
        try {
            const last = projects[projects.length - 1];
            const data = await loadMoreProjects(category, skill, {
                id: last.id,
            });
            setProjects((prev) => [...prev, ...data.projects]);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error("Failed to load more projects", error);
        } finally {
            setLoading(false);
        }
    };

    if (projects.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "80px 24px", color: "#374151" }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>🤖</div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#6b7280" }}>No projects found</h2>
                <p style={{ fontSize: "14px", marginTop: "8px", maxWidth: "400px", margin: "8px auto 0" }}>
                    There are no approved projects matching your criteria. Try adjusting your filters or submitting a new one.
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "20px",
                    width: "100%",
                }}
            >
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} categories={categories} skills={skills} />
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="btn-outline"
                    style={{
                        padding: "12px 32px",
                        fontSize: "15px",
                        width: "auto",
                        minWidth: "200px",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                >
                    {loading ? "Loading…" : "Load More ↓"}
                </button>
            )}
        </div>
    );
}
