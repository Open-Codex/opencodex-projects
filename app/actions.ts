"use server";

import { revalidatePath } from "next/cache";

import { getApprovedProjects } from "@/lib/firestore";

export async function loadMoreProjects(
    category: string | null,
    skill: string | null,
    lastCursorObj: { id: string }
) {
    return getApprovedProjects(category, skill, 12, lastCursorObj);
}

export async function clearTaxonomyCache() {
    revalidatePath("/", "layout");
}

export async function clearProjectsCache() {
    revalidatePath("/", "layout");
}
