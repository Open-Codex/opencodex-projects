import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
    title: "Terms of Service – OpenCodex",
    description:
        "Terms and conditions governing the use of the OpenCodex platform.",
};

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms of Service"
            subtitle="Please read these terms carefully before using OpenCodex."
        >
            <LegalSection title="1. Acceptance of Terms">
                <p>
                    By accessing or using this website, you agree to be bound by these Terms
                    of Service. If you do not agree with any part of these terms, you may
                    not use the platform.
                </p>
            </LegalSection>

            <LegalSection title="2. Use of the Platform">
                <p>
                    You may browse, search, and discover open-source projects published on 
                    this platform for collaboration, learning, or development purposes.
                </p>
                <p>
                    You agree not to misuse the platform, attempt to gain unauthorized
                    access, overload the service, or interfere with its normal operation.
                </p>
            </LegalSection>

            <LegalSection title="3. Project Submissions">
                <p>
                    By submitting project links or repositories to the platform, you confirm 
                    that you have the legal right to share them and that the content 
                    complies with open-source standards.
                </p>
                <p>
                    We reserve the right to review, approve, reject, edit, or remove any
                    submitted project at our discretion.
                </p>
            </LegalSection>

            <LegalSection title="4. Intellectual Property">
                <p>
                    Projects listed on this platform are governed by their respective 
                    open-source licenses (e.g., MIT, GPL, Apache). OpenCodex does not 
                    claim ownership of the projects indexed.
                </p>
                <p>
                    The website design, branding, layout, and original source code of OpenCodex 
                    are protected by intellectual property laws and may not be copied or 
                    redistributed without permission.
                </p>
            </LegalSection>

            <LegalSection title="5. Disclaimer">
                <p>
                    All project information is provided on an &quot;as is&quot; basis without
                    warranties of any kind.
                </p>
                <p>
                    We do not guarantee the safety, security, functionality, or accuracy of 
                    external repositories linked through our platform. Use third-party 
                    code at your own risk.
                </p>
            </LegalSection>

            <LegalSection title="6. Limitation of Liability">
                <p>
                    To the maximum extent permitted by law, we shall not be liable for any
                    damages resulting from the use or inability to use the platform or 
                    any external code found through it.
                </p>
            </LegalSection>

            <LegalSection title="7. Changes to These Terms">
                <p>
                    We reserve the right to update or modify these Terms of Service at any
                    time without prior notice.
                </p>
                <p>
                    Continued use of the platform after changes constitutes acceptance of
                    the updated terms.
                </p>
            </LegalSection>
        </LegalPage>
    );
}