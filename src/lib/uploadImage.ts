const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export async function uploadImage(file: File): Promise<string> {
    if (!IMGBB_API_KEY) {
        throw new Error("ImgBB API key is not configured");
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error("Image upload error:", error);
        throw new Error("Failed to upload image to ImgBB");
    }
}
