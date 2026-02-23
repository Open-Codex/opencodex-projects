"use client"

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    return (
        <div
            style={{
                borderBottom: "1px solid var(--border)",
                paddingBottom: "16px",
            }}
        >
            <h3
                style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#e5e7eb",
                    marginBottom: "8px",
                }}
            >
                {question}
            </h3>

            <p
                style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#9ca3af",
                }}
            >
                {answer}
            </p>
        </div>
    );
}