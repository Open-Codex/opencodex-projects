import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
    title: "About – OpenCodex",
    description:
        "Learn about the mission, vision, and the team behind OpenCodex, the open-source discovery hub.",
};

export default function AboutPage() {
    return (
        <LegalPage
            title="About OpenCodex"
            subtitle="Bridging the gap between developers and open-source projects."
        >
            <LegalSection title="Our Mission">
                <p>
                    OpenCodex was created to make high-quality open-source projects easy
                    to discover, contribute to, and trust. 
                </p>
                <p>
                    Instead of navigating through millions of repositories without direction, we 
                    provide a curated space where developers can find projects that match their 
                    exact tech stack and skill level.
                </p>
            </LegalSection>

            <LegalSection title="Why Open Source?">
                <p>
                    Open source is the backbone of modern technology. It fosters innovation, 
                    transparency, and collective growth.
                </p>
                <p>
                    However, for many developers, finding the "right" project to start 
                    contributing can be overwhelming. OpenCodex simplifies this journey, 
                    promoting a culture of collaboration and shared knowledge.
                </p>
            </LegalSection>

            <LegalSection title="Project Curation">
                <p>
                    Every project listed on OpenCodex is manually reviewed to ensure it provides 
                    value to the community.
                </p>
                <p>
                    We prioritize:
                </p>
                <ul
                    style={{
                        marginLeft: "16px",
                        marginTop: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                    }}
                >
                    <li>• Clear documentation and READMEs</li>
                    <li>• Active maintenance and responsiveness</li>
                    <li>• Proper Open Source licensing</li>
                    <li>• Welcoming environments for new contributors</li>
                </ul>
            </LegalSection>

            <LegalSection title="Maintainers">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ background: "rgba(124, 58, 237, 0.05)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(124, 58, 237, 0.2)" }}>
                        <h4 style={{ color: "#a78bfa", marginBottom: "4px" }}>Felipe Castillo</h4>
                        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Creator & Lead Maintainer</p>
                    </div>
                    
                    <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "16px", borderRadius: "12px", border: "1px dashed rgba(255, 255, 255, 0.1)" }}>
                        <h4 style={{ color: "#6b7280", marginBottom: "4px" }}>Looking for maintainer...?</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563" }}>This spot is waiting for a future collaborator.</p>
                    </div>
                </div>
            </LegalSection>

            <LegalSection title="Transparency">
                <p>
                    OpenCodex is a non-profit community effort. We do not host the code; 
                    we connect people to it. Our goal is strictly educational and to 
                    strengthen the global developer ecosystem.
                </p>
            </LegalSection>
        </LegalPage>
    );
}