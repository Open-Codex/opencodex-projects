import type { Metadata } from "next";
import { getCategories, getSkills } from "@/lib/firestore";
import SubmitForm from "./SubmitForm";

export const metadata: Metadata = {
    title: "Submit a Prompt | OpenCodex Prompts",
    description: "Submit your AI prompt for community review.",
    robots: {
        index: false,
        follow: false,
    },
};

export const revalidate = 3600;

export default async function SubmitPage() {
    const [categories, skills] = await Promise.all([
        getCategories(),
        getSkills(),
    ]);

    return (
        <SubmitForm
            categories={categories}
            skills={skills}
        />
    );
}