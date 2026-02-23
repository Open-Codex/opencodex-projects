export default function ChangelogPage() {
    return (
        <main
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "72px 24px",
            }}
            className="fade-in-up"
        >
            {/* Header */}
            <header style={{ marginBottom: "56px" }}>
                <h1
                    className="gradient-text"
                    style={{
                        fontSize: "42px",
                        fontWeight: 800,
                        marginBottom: "16px",
                        letterSpacing: "-0.03em",
                    }}
                >
                    Changelog
                </h1>

                <p style={{ color: "#9ca3af", fontSize: "16px", maxWidth: "720px" }}>
                    Track updates, improvements, and fixes as OpenCodex evolves. This page
                    reflects our journey toward building the best open-source discovery hub.
                </p>
            </header>

            {/* Entries */}
            <div style={{ display: "grid", gap: "24px" }}>

                {/* Upcoming */}
                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
                        Upcoming
                    </h2>

                    <ul style={{ paddingLeft: "18px", color: "#9ca3af" }}>
                        <li>GitHub API Integration to show stars</li>
                        <li>User profiles for contributors</li>
                        <li>Advanced search by "Good First Issue" tags</li>
                    </ul>
                </section>

                {/* Version 0.2.0 */}
                <section className="glass-card" style={{ padding: "28px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >
                        <h2 style={{ fontSize: "20px", fontWeight: 700 }}>
                            v0.2.0 — Open Source Hub
                        </h2>

                        <div className="badge badge-model">Major Update</div>
                    </div>

                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>New categorization system (Web Dev, AI, Low Level, etc.)</li>
                        <li>Technical skill filtering (Python, Rust, JavaScript, etc.)</li>
                        <li>Updated Legal and Community Guidelines for developers</li>
                        <li>Optimized SEO for open-source contribution keywords</li>
                    </ul>
                </section>

                {/* Version 0.1.1 */}
                <section className="glass-card" style={{ padding: "28px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >
                        <h2 style={{ fontSize: "20px", fontWeight: 700 }}>
                            v0.1.1 — UI & Navigation
                        </h2>

                        <div className="badge badge-improvement">Improvement</div>
                    </div>

                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>Improved footer and site-wide navigation</li>
                        <li>Added About and FAQ pages</li>
                        <li>Refined dark theme and glassmorphism components</li>
                        <li>Minor accessibility and spacing improvements</li>
                    </ul>
                </section>

                {/* Version 0.1.0 */}
                <section className="glass-card" style={{ padding: "28px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >
                        <h2 style={{ fontSize: "20px", fontWeight: 700 }}>
                            v0.1.0 — Initial Alpha
                        </h2>

                        <div className="badge badge-category">Launch</div>
                    </div>

                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>Public directory browsing</li>
                        <li>Submission and moderation workflow via Firebase</li>
                        <li>Basic filtering system</li>
                        <li>Mobile-responsive layout</li>
                    </ul>
                </section>
            </div>
        </main>
    );
}