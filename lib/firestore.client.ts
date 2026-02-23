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
} from "firebase/firestore";
import { db } from "./firebase";
import { Project, ProjectFormData, Category, Skill } from "@/types/projects";

const COLLECTION = "projects";
const CATEGORIES_COLLECTION = "categories";
const SKILLS_COLLECTION = "skills";

/* ───────── ADMIN / CLIENT ONLY ───────── */

export async function getPendingProjects(): Promise<Project[]> {
    const q = query(
        collection(db, COLLECTION),
        where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs
        .map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                createdAt:
                    data.createdAt?.toDate?.().toISOString() ??
                    new Date().toISOString(),
            } as Project;
        })
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
}

export async function approveProject(id: string) {
    await updateDoc(doc(db, COLLECTION, id), { status: "approved" });
}

export async function deleteProject(id: string) {
    await deleteDoc(doc(db, COLLECTION, id));
}

export async function updateProject(
    id: string,
    data: Partial<ProjectFormData>
) {
    await updateDoc(doc(db, COLLECTION, id), data);
}

/* Taxonomies (admin) */

export async function getCategories(): Promise<Category[]> {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    })) as Category[];
}

export async function getSkills(): Promise<Skill[]> {
    const snapshot = await getDocs(collection(db, SKILLS_COLLECTION));
    return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    })) as Skill[];
}