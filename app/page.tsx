import { Suspense } from "react";
import type { Metadata } from "next";
import { getApprovedProjects, getCategories, getSkills } from "@/lib/firestore";
import { Category, Skill, Project, CATEGORY_SEO } from "@/types/projects";
import ProjectGrid from "@/components/ProjectGrid";
import FilterBar from "@/components/FilterBar";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ category?: string; skill?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const seo =
    CATEGORY_SEO[category ?? "home"] ?? CATEGORY_SEO["home"];

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: `${SITE_URL}/`,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}/`,
    },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const { category, skill } = await searchParams;

  let projects: Project[] = [];
  let hasMore = false;
  let categories: Category[] = [];
  let skills: Skill[] = [];
  try {
    const [projectsRes, cats, mods] = await Promise.all([
      getApprovedProjects(category || null, skill || null),
      getCategories(),
      getSkills(),
    ]);
    projects = projectsRes.projects;
    hasMore = projectsRes.hasMore;
    categories = cats;
    skills = mods;
  } catch {
    // Firebase not configured
  }

  return (
    <>
      {/* Filter bar needs client navigation */}
      <Suspense fallback={<div style={{ height: "80px" }} />}>
        <FilterBar categories={categories} skills={skills} />
      </Suspense>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(124, 58, 237, 0.12)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600 }}>
              ✦ Find your next Open Source contribution
            </span>
          </div>

          <h1 className="section-title" style={{ marginBottom: "16px" }}>
            <span className="gradient-text">Empower</span> the Open Source community
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Discover projects that match your stack. From "good first issues" to complex architectures, find where you can make an impact.
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: projects.length.toString() + "+", label: "Approved Projects" },
              { value: categories.length.toString(), label: "Categories" },
              { value: skills.length.toString(), label: "Skills" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#c4b5fd",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <ProjectGrid
          key={(category || "all") + "-" + (skill || "all")}
          initialProjects={projects}
          initialHasMore={hasMore}
          category={category || null}
          skill={skill || null}
          categories={categories}
          skills={skills}
        />
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 24px",
        color: "#374151",
      }}
    >
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🤖</div>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#6b7280" }}>
        No projects yet
      </h2>
      <p style={{ fontSize: "14px", marginTop: "8px", maxWidth: "400px", margin: "8px auto 0" }}>
        Make sure your Firebase credentials are configured in{" "}
        <code
          style={{
            background: "rgba(124, 58, 237, 0.15)",
            padding: "2px 6px",
            borderRadius: "4px",
            color: "#a78bfa",
          }}
        >
          .env.local
        </code>{" "}
        and you have approved projects in Firestore.
      </p>
    </div>
  );
}
