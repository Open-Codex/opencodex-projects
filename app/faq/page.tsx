import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import FAQItem from "@/components/FAQItem";

export const metadata: Metadata = {
    title: "FAQ – OpenCodex",
    description:
        "Frequently asked questions about OpenCodex, how to find open source projects, and how to submit your own.",
};

export default function FAQPage() {
    return (
        <LegalPage
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about discovering and contributing to open source projects on OpenCodex."
        >
            <FAQItem
                question="What is OpenCodex?"
                answer="OpenCodex is a curated directory designed to help developers find meaningful open-source projects to contribute to, filtered by tech stack and category."
            />

            <FAQItem
                question="Is it free to use?"
                answer="Yes. OpenCodex is a free community resource. Our goal is to bridge the gap between open-source maintainers and contributors."
            />

            <FAQItem
                question="Do I need an account to browse projects?"
                answer="No account is required to search, filter, or explore the projects listed on the platform."
            />

            <FAQItem
                question="What kind of projects can I find here?"
                answer="You can find projects ranging from Web Development and AI to Game Dev and Low-Level systems. We support various languages like Python, Rust, JavaScript, Go, and more."
            />

            <FAQItem
                question="How do I start contributing?"
                answer="Once you find a project you like, click 'View Repository'. We recommend looking for issues labeled 'good first issue' or reading the project's CONTRIBUTING.md file."
            />

            <FAQItem
                question="Can I submit my own open-source project?"
                answer="Absolutely. We encourage maintainers to submit their repositories. All submissions are reviewed to ensure they have a clear README and are open for collaboration."
            />

            <FAQItem
                question="Does OpenCodex host the code?"
                answer="No. OpenCodex is a discovery platform. All code is hosted on external platforms like GitHub, GitLab, or Bitbucket."
            />
        </LegalPage>
    );
}