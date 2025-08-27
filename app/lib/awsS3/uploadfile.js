export async function uploadFile(file) {
    const fileName = encodeURIComponent(file.name);

    // 1️⃣ Request a signed URL from the server
    const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: JSON.stringify({ fileName, fileType: file.type }),
        headers: { "Content-Type": "application/json" },
    });

    const { uploadUrl } = await res.json();
    if (!uploadUrl) {
        return { error: "Failed to get upload URL" }
    };

    try {
        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok) {
            return { error: `Upload failed: ${uploadResponse.statusText}` };
        }

        console.log("Upload successful:", uploadUrl.split("?")[0]); // File URL
        return uploadUrl.split("?")[0]; // Return the public URL

    } catch (error) {
        console.error("S3 Upload Error:", error);
        return { error: "File upload failed. Please try again." };
    }

    // 2️⃣ Upload the file to S3

}
