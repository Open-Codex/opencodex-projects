"use client"

interface LegalPageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function LegalPage({
    title,
    subtitle,
    children,
}: LegalPageProps) {
    return (
        <div
            style={{
                maxWidth: "960px",
                margin: "0 auto",
                padding: "64px 24px 96px",
            }}
        >
            {/* Header */}
            <header style={{ marginBottom: "48px", textAlign: "center" }}>
                <h1 className="section-title" style={{ marginBottom: "16px" }}>
                    <span className="gradient-text">{title}</span>
                </h1>

                {subtitle && (
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#9ca3af",
                            maxWidth: "640px",
                            margin: "0 auto",
                            lineHeight: 1.7,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </header>

            {/* Content */}
            <div
                className="glass-card"
                style={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                }}
            >
                {children}
            </div>
        </div>
    );
}