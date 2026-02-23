"use client"

interface LegalSectionProps {
    title: string;
    children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
    return (
        <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2
                style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#c4b5fd",
                }}
            >
                {title}
            </h2>

            <div
                style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#d1d5db",
                }}
            >
                {children}
            </div>
        </section>
    );
}