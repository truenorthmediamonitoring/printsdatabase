import connectDB from "@/app/lib/utils";
import NewsItem from "@/app/lib/models/newsitem";
import { s3Client } from "@/app/lib/awsS3/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        const req = await request.json();
        console.log(req);

        const { ID, company, industry, category, multiplesources, headline, newssegment, date, url, tone, ave, country, summary } = req

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        if (!url) {
            console.log("Updating document...");
            const updatednewsitem = await NewsItem.findByIdAndUpdate(
                ID, {
                company: company,
                industry: industry,
                category: category,
                sources: multiplesources,
                headline: headline,
                newssegment: newssegment,
                date: new Date(date),
                tone: tone,
                ave: ave,
                country: country,
                summary: summary,
            },
                // { new: true, runValidators: true } // Return updated document & validate fields
            )
            return Response.json({ okay: "News Item Edited" }, { status: 200 });
        } else {
            // Delete previous url
            console.log("Finding document URL...");
            const newsitem = await NewsItem.findById({ _id: ID })
            // console.log(newsitem.url);
            const fileUrl = newsitem.url;

            // Extract the file key from the S3 URL
            console.log("Extracting file key from the S3 URL...");

            const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
            const fileKey = decodeURIComponent(fileUrl.split(`https://${bucketName}.s3.ca-central-1.amazonaws.com/`)[1]);

            const params = {
                Bucket: bucketName,
                Key: fileKey,
            };

            console.log(params);
            console.log(url);

            // Delete the object from S3
            console.log("Deleting the object from S3...");

            await s3Client.send(new DeleteObjectCommand(params));
            console.log(`Successfully deleted: ${fileKey}`);

            console.log("Updating document...");
            const updatednewsitem = await NewsItem.findByIdAndUpdate(
                ID, {
                company: company,
                industry: industry,
                category: category,
                sources: multiplesources,
                headline: headline,
                newssegment: newssegment,
                date: new Date(date),
                tone: tone,
                ave: ave,
                url: url,
                country: country,
                summary: summary,
            },
                // { new: true, runValidators: true } // Return updated document & validate fields
            )

            // Add upadates 
            return Response.json({ okay: "News Item Edited" }, { status: 200 });
        }

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}