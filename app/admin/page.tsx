"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Project, Category, Skill } from "@/types/projects";
import {
    addCategory,
    deleteCategory,
    addSkill,
    deleteSkill,
} from "@/lib/firestore";
import {
    getPendingProjects,
    approveProject,
    deleteProject,
    updateProject,
    getCategories,
    getSkills,
} from "@/lib/firestore.client";
import { clearProjectsCache, clearTaxonomyCache } from "@/app/actions";

// ─── Admin Edit Modal ──────────────────────────────────────────────────────────
function EditModal({
    project,
    categories,
    skills,
    onClose,
    onSaved,
}: {
    project: Project;
    categories: Category[];
    skills: Skill[];
    onClose: () => void;
    onSaved: () => void;
}) {
    const [form, setForm] = useState({
        title: project.title,
        description: project.description,
        url: project.url,
        readme: project.readme,
        category: project.category as string,
        skill: project.skill as string,
    });
    const [saving, setSaving] = useState(false);

    const inputStyle = {
        width: "100%",
        background: "var(--surface-3)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "10px 14px",
        color: "#e0e7ff",
        fontSize: "14px",
        fontFamily: "inherit",
        outline: "none",
    } as React.CSSProperties;

    async function handleSave() {
        setSaving(true);
        try {
            await updateProject(project.id, {
                title: form.title,
                description: form.description,
                readme: form.readme,
                category: form.category,
                skill: form.skill,
            });
            toast.success("Project updated!");
            await clearProjectsCache();
            onSaved();
            onClose();
        } catch {
            toast.error("Failed to update project.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(6px)",
                padding: "24px",
            }}
        >
            <div
                className="glass-card"
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{ fontSize: "20px", fontWeight: 700, color: "#e0e7ff" }}
                    >
                        Edit Project
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#6b7280",
                            fontSize: "22px",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {(
                    [
                        { key: "title", label: "Title", type: "input" },
                        { key: "description", label: "Description", type: "input" },
                    ] as const
                ).map(({ key, label }) => (
                    <div key={key}>
                        <label
                            style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#6b7280",
                                marginBottom: "6px",
                                display: "block",
                            }}
                        >
                            {label}
                        </label>
                        <input
                            value={form[key]}
                            onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>
                ))}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                    }}
                >
                    <div>
                        <label
                            style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#6b7280",
                                marginBottom: "6px",
                                display: "block",
                            }}
                        >
                            Category
                        </label>
                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, category: e.target.value }))
                            }
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            {categories.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#6b7280",
                                marginBottom: "6px",
                                display: "block",
                            }}
                        >
                            Skill
                        </label>
                        <select
                            value={form.skill}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, skill: e.target.value }))
                            }
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            {skills.map((m) => (
                                <option key={m.slug} value={m.slug}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label
                        style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#6b7280",
                            marginBottom: "6px",
                            display: "block",
                        }}
                    >
                        Project Text
                    </label>
                    <textarea
                        value={form.readme}
                        onChange={(e) =>
                            setForm((p) => ({ ...p, readme: e.target.value }))
                        }
                        rows={6}
                        style={{ ...inputStyle, resize: "vertical" }}
                    />
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                    <button onClick={onClose} className="btn-outline">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-primary"
                        style={{ opacity: saving ? 0.7 : 1 }}
                    >
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Admin Page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [checking, setChecking] = useState(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const [activeTab, setActiveTab] = useState<"projects" | "categories" | "skills">("projects");

    const [newCat, setNewCat] = useState({ slug: "", label: "", icon: "" });
    const [newMod, setNewMod] = useState({ slug: "", label: "" });
    const [savingTax, setSavingTax] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [data, cats, mods] = await Promise.all([
                getPendingProjects(),
                getCategories(),
                getSkills(),
            ]);
            setProjects(data);
            setCategories(cats);
            setSkills(mods);
        } catch {
            toast.error("Failed to load data. Check Firebase config.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authenticated) loadData();
    }, [authenticated, loadData]);

    const handleLogin = async () => {
        setChecking(true);
        setAuthError("");
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                setAuthenticated(true);
            } else {
                setAuthError("Invalid password. Please try again.");
            }
        } catch {
            setAuthError("Authentication failed. Try again.");
        } finally {
            setChecking(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await approveProject(id);
            toast.success("Project approved!");
            await clearProjectsCache();
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Approve Error:", err);
            toast.error("Failed to approve project.");
        }
    };

    const handleDelete = async (id: string) => {
        // Removed the native window.confirm dialogue to ensure it doesn't block execution
        try {
            console.log("Attempting to delete project ID:", id);
            await deleteProject(id);
            toast.success("Project deleted.");
            await clearProjectsCache();
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Delete Error:", err);
            toast.error("Failed to delete project.");
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingTax(true);
        try {
            await addCategory(newCat);
            toast.success("Category added!");
            setNewCat({ slug: "", label: "", icon: "" });
            await clearTaxonomyCache();
            loadData();
        } catch {
            toast.error("Failed to add category.");
        } finally {
            setSavingTax(false);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
            toast.success("Category deleted.");
            await clearTaxonomyCache();
            loadData();
        } catch {
            toast.error("Failed to delete category.");
        }
    };

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingTax(true);
        try {
            await addSkill(newMod);
            toast.success("Skill added!");
            setNewMod({ slug: "", label: "" });
            await clearTaxonomyCache();
            loadData();
        } catch {
            toast.error("Failed to add skill.");
        } finally {
            setSavingTax(false);
        }
    };

    const handleDeleteSkill = async (id: string) => {
        try {
            await deleteSkill(id);
            toast.success("Skill deleted.");
            await clearTaxonomyCache();
            loadData();
        } catch {
            toast.error("Failed to delete skill.");
        }
    };

    // ── Password Gate ──────────────────────────────────────────────────────────
    if (!authenticated) {
        return (
            <div
                style={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                }}
            >
                <div
                    className="glass-card"
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        padding: "40px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔐</div>
                    <h1
                        style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#e0e7ff",
                            marginBottom: "8px",
                        }}
                    >
                        Admin Panel
                    </h1>
                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "28px" }}>
                        Enter your admin password to continue.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="Admin password"
                            className="input-field"
                            style={{
                                textAlign: "center",
                                letterSpacing: "0.1em",
                            }}
                        />
                        {authError && (
                            <p style={{ fontSize: "13px", color: "#f87171" }}>{authError}</p>
                        )}
                        <button
                            onClick={handleLogin}
                            disabled={checking || !password}
                            className="btn-primary"
                            style={{
                                justifyContent: "center",
                                padding: "13px",
                                opacity: checking || !password ? 0.6 : 1,
                            }}
                        >
                            {checking ? "Verifying…" : "Enter Admin Panel →"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Admin Dashboard ────────────────────────────────────────────────────────
    return (
        <>
            {editingProject && (
                <EditModal
                    project={editingProject}
                    categories={categories}
                    skills={skills}
                    onClose={() => setEditingProject(null)}
                    onSaved={loadData}
                />
            )}

            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "48px 24px 80px",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "40px",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: 800,
                                color: "#e0e7ff",
                                letterSpacing: "-0.03em",
                                marginBottom: "6px",
                            }}
                        >
                            Admin Panel
                        </h1>
                        <p style={{ fontSize: "14px", color: "#6b7280" }}>
                            {loading
                                ? "Loading…"
                                : `${projects.length} pending project${projects.length !== 1 ? "s" : ""} awaiting review`}
                        </p>
                    </div>
                    <button onClick={loadData} className="btn-outline">
                        ↻ Refresh
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "32px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                    {(["projects", "categories", "skills"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                background: activeTab === tab ? "rgba(255,255,255,0.1)" : "transparent",
                                color: activeTab === tab ? "#fff" : "#9ca3af",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: activeTab === tab ? 600 : 400,
                                textTransform: "capitalize",
                                transition: "all 0.2s",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab: Projects */}
                {activeTab === "projects" && (
                    <>
                        {loading ? (
                            <div style={{ textAlign: "center", padding: "60px", color: "#374151" }}>
                                Loading projects…
                            </div>
                        ) : projects.length === 0 ? (
                            <div
                                className="glass-card"
                                style={{ padding: "60px", textAlign: "center", color: "#6b7280" }}
                            >
                                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
                                <p>No pending projects. You&apos;re all caught up!</p>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {projects.map((project) => {
                                    const catMeta = categories.find((c) => c.slug === project.category);
                                    const skillMeta = skills.find((m) => m.slug === project.skill);
                                    return (
                                        <div
                                            key={project.id}
                                            className="glass-card"
                                            style={{
                                                padding: "20px 24px",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "20px",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {/* Info */}
                                            <div style={{ flex: 1, minWidth: "240px" }}>
                                                <h3
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: 700,
                                                        color: "#e0e7ff",
                                                        marginBottom: "6px",
                                                    }}
                                                >
                                                    {project.title} | {project.url}
                                                </h3>
                                                <p
                                                    style={{
                                                        fontSize: "13px",
                                                        color: "#6b7280",
                                                        marginBottom: "10px",
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {project.description}
                                                </p>
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {catMeta && (
                                                        <span className="badge badge-category">
                                                            {catMeta.icon} {catMeta.label}
                                                        </span>
                                                    )}
                                                    {skillMeta && (
                                                        <span className="badge badge-skill">
                                                            {skillMeta.label}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Project preview */}
                                            <div
                                                style={{
                                                    flex: 2,
                                                    minWidth: "200px",
                                                    background: "rgba(0,0,0,0.3)",
                                                    borderRadius: "8px",
                                                    padding: "10px 14px",
                                                    maxHeight: "80px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#6b7280",
                                                        fontFamily: "monospace",
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {project.readme.slice(0, 200)}
                                                    {project.readme.length > 200 && "…"}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px",
                                                    alignItems: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <button
                                                    onClick={() => handleApprove(project.id)}
                                                    className="btn-success"
                                                >
                                                    ✓ Approve
                                                </button>
                                                <button
                                                    onClick={() => setEditingProject(project)}
                                                    className="btn-outline"
                                                    style={{ padding: "8px 14px", fontSize: "12px" }}
                                                >
                                                    ✎ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn-danger"
                                                >
                                                    ✕ Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* Tab: Categories */}
                {activeTab === "categories" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div className="glass-card" style={{ padding: "24px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Add New Category</h3>
                            <form onSubmit={handleAddCategory} style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: "12px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>Slug (e.g. web-development)</label>
                                    <input required value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} className="input-field" style={{ width: "100%", padding: "10px", background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: "12px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>Label (e.g. Web Development)</label>
                                    <input required value={newCat.label} onChange={(e) => setNewCat({ ...newCat, label: e.target.value })} className="input-field" style={{ width: "100%", padding: "10px", background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff" }} />
                                </div>
                                <div style={{ width: "100px" }}>
                                    <label style={{ fontSize: "12px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>Icon (Emoji)</label>
                                    <input required value={newCat.icon} onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })} className="input-field" style={{ width: "100%", padding: "10px", background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff" }} />
                                </div>
                                <button type="submit" disabled={savingTax} className="btn-primary" style={{ padding: "12px 20px" }}>Add</button>
                            </form>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {categories.map((cat) => (
                                <div key={cat.id} className="glass-card" style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{ fontSize: "20px" }}>{cat.icon}</span>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#fff" }}>{cat.label}</p>
                                            <p style={{ fontSize: "12px", color: "#6b7280" }}>{cat.slug}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => cat.id && handleDeleteCategory(cat.id)} className="btn-danger" style={{ padding: "8px 12px", fontSize: "12px" }}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab: Skills */}
                {activeTab === "skills" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div className="glass-card" style={{ padding: "24px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Add New Skill</h3>
                            <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: "12px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>Slug (e.g. typescript)</label>
                                    <input required value={newMod.slug} onChange={(e) => setNewMod({ ...newMod, slug: e.target.value })} className="input-field" style={{ width: "100%", padding: "10px", background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: "12px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>Label (e.g. TypeScript)</label>
                                    <input required value={newMod.label} onChange={(e) => setNewMod({ ...newMod, label: e.target.value })} className="input-field" style={{ width: "100%", padding: "10px", background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff" }} />
                                </div>
                                <button type="submit" disabled={savingTax} className="btn-primary" style={{ padding: "12px 20px" }}>Add</button>
                            </form>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {skills.map((mod) => (
                                <div key={mod.id} className="glass-card" style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: "#fff" }}>{mod.label}</p>
                                        <p style={{ fontSize: "12px", color: "#6b7280" }}>{mod.slug}</p>
                                    </div>
                                    <button onClick={() => mod.id && handleDeleteSkill(mod.id)} className="btn-danger" style={{ padding: "8px 12px", fontSize: "12px" }}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
