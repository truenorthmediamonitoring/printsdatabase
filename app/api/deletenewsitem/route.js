import connectDB from "@/app/lib/utils";
import NewsItem from "@/app/lib/models/newsitem";
import { s3Client } from "@/app/lib/awsS3/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Findind document URL...");
        const newsitem = await NewsItem.findById({ _id: req.id })
        // console.log(newsitem.url);
        const fileUrl = newsitem.url;

        if (!fileUrl) {
            console.log(`No found Url: ${fileUrl}`);

            console.log("Deleting  document...");
            const delnewsitem = await NewsItem.findByIdAndDelete({ _id: req.id })
            console.log(delnewsitem);

            return Response.json({ okay: "Deletion successfully" }, { status: 200 });

        } else {
            // Extract the file key from the S3 URL
            const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
            const fileKey = decodeURIComponent(fileUrl.split(`https://${bucketName}.s3.ca-central-1.amazonaws.com/`)[1]);

            const params = {
                Bucket: bucketName,
                Key: fileKey,
            };

            console.log(params);
            
            // Delete the object from S3
            await s3Client.send(new DeleteObjectCommand(params));
            console.log(`Successfully deleted: ${fileKey}`);

            console.log("Deleting  document...");
            const delnewsitem = await NewsItem.findByIdAndDelete({ _id: req.id })
            console.log(delnewsitem);

            return Response.json({ okay: "Deletion successfully" }, { status: 200 });
        }


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}