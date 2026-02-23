import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
    title: "Privacy Policy – OpenCodex",
    description:
        "Learn how OpenCodex collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            subtitle="Your privacy matters. This policy explains what data we collect and how it is used at OpenCodex."
        >
            <LegalSection title="1. Information We Collect">
                <p>
                    We collect only the minimum information necessary to operate and
                    improve the platform for the developer community.
                </p>
                <p>
                    This may include anonymous usage data and project information you 
                    voluntarily submit, such as repository URLs and descriptions.
                </p>
            </LegalSection>

            <LegalSection title="2. Personal Data">
                <p>
                    We do not require users to create an account to browse or explore 
                    open-source projects.
                </p>
                <p>
                    If you contact us or submit a project, we may receive information such as
                    your email address or GitHub username to process your submission.
                </p>
            </LegalSection>

            <LegalSection title="3. Cookies and Analytics">
                <p>
                    We may use essential cookies or privacy-friendly analytics tools to
                    understand how developers interact with the platform.
                </p>
                <p>
                    These tools focus on site performance and popular categories, and do not 
                    collect personally identifiable information.
                </p>
            </LegalSection>

            <LegalSection title="4. Third-Party Services">
                <p>
                    OpenCodex relies on third-party services for hosting (e.g., Vercel), 
                    database management (e.g., Firebase), and performance monitoring.
                </p>
                <p>
                    These services operate under their own privacy policies regarding the data 
                    they process.
                </p>
            </LegalSection>

            <LegalSection title="5. Data Sharing">
                <p>
                    We do not sell, rent, or trade personal data to third parties.
                </p>
                <p>
                    Project information you submit (like repository links) is intended to be 
                    publicly visible to help other developers find projects to collaborate on.
                </p>
            </LegalSection>

            <LegalSection title="6. Data Security">
                <p>
                    We implement reasonable technical and organizational measures to protect 
                    collected information and the integrity of our project directory.
                </p>
                <p>
                    However, no method of transmission over the internet or electronic storage 
                    is 100% secure.
                </p>
            </LegalSection>

            <LegalSection title="7. Changes to This Policy">
                <p>
                    This Privacy Policy may be updated from time to time to reflect changes 
                    in our platform or legal requirements.
                </p>
                <p>
                    Continued use of OpenCodex after updates indicates your acceptance of 
                    the new policy.
                </p>
            </LegalSection>

            <LegalSection title="8. Contact">
                <p>
                    If you have questions or concerns about this Privacy Policy, please
                    contact us through our official channels.
                </p>
            </LegalSection>
        </LegalPage>
    );
}