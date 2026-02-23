"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Project, Category, Skill } from "@/types/projects";

interface ProjectCardProps {
    project: Project;
    categories: Category[];
    skills: Skill[];
}

export default function ProjectCard({ project, categories, skills }: ProjectCardProps) {
    const [copied, setCopied] = useState(false);
    const [copying, setCopying] = useState(false);

    const categoryMeta = categories.find((c) => c.slug === project.category);
    const skillMeta = skills.find((m) => m.slug === project.skill);

    return (
        <article
            className="glass-card fade-in-up"
            style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                height: "100%",
            }}
        >
            {/* Badges */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categoryMeta && (
                    <span className="badge badge-category">
                        {categoryMeta.icon} {categoryMeta.label}
                    </span>
                )}
                {skillMeta && (
                    <span className="badge badge-skill">{skillMeta.label}</span>
                )}
            </div>

            {/* Title */}
            <h2
                style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#e0e7ff",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.4,
                }}
            >
                {project.title}
            </h2>

            {/* Description */}
            <p
                style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    lineHeight: 1.6,
                    flexGrow: 1,
                }}
            >
                {project.description}
            </p>

            {/* Project preview */}
            <div
                style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    maxHeight: "90px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <p
                    style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        fontFamily: "monospace",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {project.readme.slice(0, 160)}
                    {project.readme.length > 160 && "…"}
                </p>
                {/* Fade overlay */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "32px",
                        background:
                            "linear-gradient(transparent, rgba(22, 22, 42, 0.95))",
                        borderRadius: "0 0 10px 10px",
                    }}
                />
            </div>

            {/* Footer */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                }}
            >

                <div style={{ marginLeft: "auto" }}>
                    <a
                        className="btn-primary"
                        style={{
                            minWidth: "140px",
                            justifyContent: "center",
                        }}
                        href={project.url}
                        target="_blank"
                    >
                            <>
                                <svg
                                    width="14"
                                    height="14"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                View Repository
                            </>
                    </a>
                </div>
            </div>
        </article>
    );
}
