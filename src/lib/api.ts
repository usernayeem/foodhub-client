export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${url}`, options);

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}
