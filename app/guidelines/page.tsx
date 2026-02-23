export default function GuidelinesPage() {
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
                    Community Guidelines
                </h1>

                <p style={{ color: "#9ca3af", fontSize: "16px", maxWidth: "720px" }}>
                    OpenCodex is a community-driven platform for developers. These guidelines help us keep
                    project listings impactful, accessible, and high-quality for all contributors.
                </p>
            </header>

            {/* Sections */}
            <div style={{ display: "grid", gap: "24px" }}>
                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>1. Project Quality</h2>
                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>Valid repository links (GitHub, GitLab, Bitbucket)</li>
                        <li>A clear README explaining the project's purpose</li>
                        <li>At least one open "issue" or a way for others to contribute</li>
                    </ul>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>2. Open Source Licensing</h2>
                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>Projects must have an Open Source license (MIT, Apache, GPL, etc.)</li>
                        <li>Do not submit private or commercial repositories without permission</li>
                        <li>Respect the original authors and their contribution rules</li>
                    </ul>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>3. Prohibited Content</h2>
                    <ul style={{ paddingLeft: "18px", color: "#c7d2fe" }}>
                        <li>Malware, viruses, or harmful scripts</li>
                        <li>Hate speech, harassment, or discriminatory projects</li>
                        <li>Spam, empty repositories, or purely promotional content</li>
                        <li>Misleading descriptions of the project's functionality</li>
                    </ul>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>4. Accurate Tech Stack</h2>
                    <p style={{ color: "#c7d2fe" }}>
                        Select the correct Primary Skill (e.g., Python, Rust, JavaScript) and categories. 
                        This ensures developers find projects that match their expertise.
                    </p>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>5. Moderation</h2>
                    <p style={{ color: "#c7d2fe" }}>
                        Our team reviews every submission. Projects may be rejected if they lack basic 
                        documentation or if the repository is archived/inactive.
                    </p>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>6. Collaborative Conduct</h2>
                    <p style={{ color: "#c7d2fe" }}>
                        Be respectful and constructive when engaging with other developers. 
                        OpenCodex is built on the spirit of mutual growth and sharing code.
                    </p>
                </section>

                <section className="glass-card" style={{ padding: "28px" }}>
                    <h2 style={{ marginBottom: "12px" }}>7. Guideline Updates</h2>
                    <p style={{ color: "#c7d2fe" }}>
                        As the open-source landscape evolves, these guidelines may change. 
                        We recommend checking them periodically before submitting new projects.
                    </p>
                </section>
            </div>
        </main>
    );
}