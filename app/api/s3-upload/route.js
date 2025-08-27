import { s3Client } from "@/app/lib/awsS3/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request) {
    try {

        const req = await request.json();
        console.log(req);
        const { fileName, fileType } = req;

        const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            Key: fileName,
            ContentType: fileType,
        };

        // Generate a pre-signed URL valid for 10 minutes
        const uploadUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
            expiresIn: 600, // 10 minutes
        });

        return Response.json({ uploadUrl });

    } catch (error) {
        console.error("Error generating S3 signed URL:", error);
        return Response.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}