"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addProject } from "@/lib/firestore";
import { Category, Skill } from "@/types/projects";

interface Props {
    categories: Category[];
    skills: Skill[];
}

export default function SubmitForm({ categories, skills }: Props) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        url: "",
        category: "",
        skill: "",
        readme: "",
    });
    const [confirmed, setConfirmed] = useState(false);
    const [startedAt] = useState(Date.now());

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!confirmed) {
            toast.error("Please confirm you are human.");
            return;
        }

        if (Date.now() - startedAt < 2500) {
            toast.error("Please take a moment before submitting.");
            return;
        }

        if (!form.category || !form.skill) {
            toast.error("Please select a category and skill.");
            return;
        }

        setSubmitting(true);
        try {
            await addProject(form);
            toast.success("Project submitted! It will be reviewed shortly.");
            setTimeout(() => router.push("/"), 1200);
        } catch {
            toast.error("Submission failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "640px",
                margin: "0 auto",
                padding: "56px 24px 80px",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: "40px" }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        background: "rgba(124, 58, 237, 0.12)",
                        border: "1px solid rgba(124, 58, 237, 0.3)",
                        marginBottom: "20px",
                    }}
                >
                    <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600 }}>
                        ✦ Community Contribution
                    </span>
                </div>

                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        marginBottom: "12px",
                    }}
                >
                    Submit a Project
                </h1>

                <p style={{ fontSize: "15px", color: "#6b7280" }}>
                    Share your best project with the community. It will be reviewed before publishing.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
                <div>
                    <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Project Title *
                    </label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Expert Python Debugger"
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Short Description *
                    </label>
                    <input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        placeholder="What does this project do?"
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        URL *
                    </label>
                    <input
                        name="url"
                        value={form.url}
                        onChange={handleChange}
                        required
                        placeholder="What does this project do?"
                        className="input-field"
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                            Skill *
                        </label>
                        <select
                            name="skill"
                            value={form.skill}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select skill</option>
                            {skills.map((m) => (
                                <option key={m.slug} value={m.slug}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Project Readme *
                    </label>
                    <textarea
                        name="readme"
                        value={form.readme}
                        onChange={handleChange}
                        required
                        rows={8}
                        placeholder="Paste the full project here..."
                        className="input-field"
                        style={{ resize: "vertical" }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {form.readme.length} characters
                    </p>
                </div>

                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        color: "#9ca3af",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                    />
                    I confirm I am human and this submission is genuine
                </label>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting || !confirmed}
                    style={{ justifyContent: "center", padding: "14px 28px" }}
                >
                    {submitting ? "Submitting…" : "Submit for Review →"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    Your project will be reviewed before appearing publicly.
                </p>
            </form>
        </div>
    );
}