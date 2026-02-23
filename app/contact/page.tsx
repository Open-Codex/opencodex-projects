import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
    title: "Contact – OpenCodex",
    description:
        "Get in touch with the OpenCodex team for questions, feedback, or collaboration regarding open-source projects.",
};

export default function ContactPage() {
    return (
        <LegalPage
            title="Contact"
            subtitle="Have a question, suggestion, or want to get in touch with the team?"
        >
            <LegalSection title="Get in Touch">
                <p>
                    Whether you are a maintainer looking to feature your project or a 
                    contributor with feedback on how to improve our discovery tools, 
                    we are here to help.
                </p>
            </LegalSection>

            <LegalSection title="Email">
                <p>
                    📧{" "}
                    <a
                        href="mailto:contact@opencodex.app"
                        style={{
                            color: "#a78bfa",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        contact@opencodex.app
                    </a>
                </p>
                <p style={{ marginTop: "8px" }}>
                    We usually respond within a few business days.
                </p>
            </LegalSection>

            <LegalSection title="What You Can Contact Us About">
                <ul
                    style={{
                        marginLeft: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                    }}
                >
                    <li>• Project submission inquiries or updates</li>
                    <li>• Bug reports or platform issues</li>
                    <li>• New category or tech stack suggestions</li>
                    <li>• Partnerships and open-source collaborations</li>
                </ul>
            </LegalSection>
        </LegalPage>
    );
}