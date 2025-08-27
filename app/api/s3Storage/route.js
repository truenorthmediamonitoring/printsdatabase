import { s3Client } from "@/app/lib/awsS3/s3Client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET(request) {

    const params = { Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME };

    try {

        const command = new ListObjectsV2Command(params);
        let data = await s3Client.send(command);

        if (!data.Contents) {
            // return res.status(200).json({ totalSize: 0 }); 
            return Response.json({ totalSize: 0 }, { status: 200 }); // No files in bucket
        }

        const totalSize = data.Contents.reduce((sum, file) => sum + file.Size, 0);
        
        return Response.json({ totalSize }, { status: 200 });

    } catch (error) {
        console.error("S3 Storage Error:", error);
        return Response.json({ error: "Failed to fetch S3 storage size" }, { status: 500 });
    }
}