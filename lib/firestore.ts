import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    increment,
    orderBy,
    limit,
    startAfter,
    QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import { Project, ProjectFormData, Category, Skill } from "@/types/projects";
import { unstable_cache } from "next/cache";

const COLLECTION = "projects";
const CATEGORIES_COLLECTION = "categories";
const SKILLS_COLLECTION = "skills";

// ─── Taxonomies ────────────────────────────────────────────────────────────────

export const getCategories = unstable_cache(
    async (): Promise<Category[]> => {
        try {
            const q = query(collection(db, CATEGORIES_COLLECTION));
            const snapshot = await getDocs(q);
            if (snapshot.empty) return [];
            const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
            return items.sort((a, b) => a.label.localeCompare(b.label));
        } catch (error) {
            console.warn("Failed to fetch categories. Make sure your Firestore Rules allow reading the 'categories' collection.");
            return [];
        }
    },
    ["categories-cache"],
    { revalidate: 3600, tags: ["categories"] }
);

export const getSkills = unstable_cache(
    async (): Promise<Skill[]> => {
        try {
            const q = query(collection(db, SKILLS_COLLECTION));
            const snapshot = await getDocs(q);
            if (snapshot.empty) return [];
            const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Skill));
            return items.sort((a, b) => a.label.localeCompare(b.label));
        } catch (error) {
            console.warn("Failed to fetch skills. Make sure your Firestore Rules allow reading the 'skills' collection.");
            return [];
        }
    },
    ["skills-cache"],
    { revalidate: 3600, tags: ["skills"] }
);

export async function addCategory(category: Omit<Category, "id">): Promise<string> {
    const ref = await addDoc(collection(db, CATEGORIES_COLLECTION), category);
    return ref.id;
}

export async function deleteCategory(id: string): Promise<void> {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
}

export async function addSkill(skill: Omit<Skill, "id">): Promise<string> {
    const ref = await addDoc(collection(db, SKILLS_COLLECTION), skill);
    return ref.id;
}

export async function deleteSkill(id: string): Promise<void> {
    await deleteDoc(doc(db, SKILLS_COLLECTION, id));
}

// ─── Public reads ──────────────────────────────────────────────────────────────

export const getApprovedProjects = unstable_cache(
    async (
        category?: string | null,
        skill?: string | null,
        limitCount: number = 12,
        lastCursorObj?: { id: string } | null
    ): Promise<{ projects: Project[]; hasMore: boolean }> => {
        try {
            // Attempt strict Firestore query (requires composite indexes)
            const constraints: QueryConstraint[] = [
                where("status", "==", "approved"),
                orderBy("__name__", "desc"), // Tie-breaker for startAfter
                limit(limitCount + 1), // Fetch 1 extra to determine hasMore
            ];

            if (category) constraints.push(where("category", "==", category));
            if (skill) constraints.push(where("skill", "==", skill));

            if (lastCursorObj) {
                constraints.push(startAfter(lastCursorObj.id));
            }

            const q = query(collection(db, COLLECTION), ...constraints);
            const snapshot = await getDocs(q);

            const hasMore = snapshot.docs.length > limitCount;
            const docsToReturn = hasMore ? snapshot.docs.slice(0, limitCount) : snapshot.docs;

            const projects = docsToReturn.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                } as Project;
            });

            return { projects, hasMore };
        } catch (err: any) {
            //  fallback to memory sort/slice logic
            console.warn("Index missing, falling back to memory sort for getApprovedProjects:", err.message);

            const q = query(collection(db, COLLECTION), where("status", "==", "approved"));
            const snapshot = await getDocs(q);

            let projects = snapshot.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                } as Project;
            });

            // Filter
            if (category) projects = projects.filter((p) => p.category === category);
            if (skill) projects = projects.filter((p) => p.skill === skill);


            // Paginate manually
            let startIndex = 0;
            if (lastCursorObj) {
                const cursorIndex = projects.findIndex(
                    (p) => p.id === lastCursorObj.id
                );
                if (cursorIndex !== -1) startIndex = cursorIndex + 1;
            }

            const sliced = projects.slice(startIndex, startIndex + limitCount);
            const hasMore = startIndex + limitCount < projects.length;

            return { projects: sliced, hasMore };
        }
    },
    ["approved-projects"],
    { revalidate: 3600, tags: ["projects"] }
);

// ─── Admin reads ───────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
    const q = query(collection(db, COLLECTION));
    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map((d) => {
        const data = d.data();
        return {
            id: d.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        } as Project;
    });

    projects.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
    });

    return projects;
}

export async function getPendingProjects(): Promise<Project[]> {
    const q = query(
        collection(db, COLLECTION),
        where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    const projects = snapshot.docs.map((d) => {
        const data = d.data();
        return {
            id: d.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        } as Project;
    });

    projects.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
    });

    return projects;
}

// ─── Writes ────────────────────────────────────────────────────────────────────

export async function addProject(data: ProjectFormData): Promise<string> {
    const ref = await addDoc(collection(db, COLLECTION), {
        ...data,
        status: "pending",
        createdAt: serverTimestamp(),
    });
    return ref.id;
}

export async function approveProject(id: string): Promise<void> {
    await updateDoc(doc(db, COLLECTION, id), { status: "approved" });
}

export async function rejectProject(id: string): Promise<void> {
    await updateDoc(doc(db, COLLECTION, id), { status: "rejected" });
}

export async function updateProject(
    id: string,
    data: Partial<ProjectFormData>
): Promise<void> {
    await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, id));
}
