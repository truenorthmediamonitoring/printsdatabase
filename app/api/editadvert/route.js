import connectDB from "@/app/lib/utils";
import AdvertEntry from "@/app/lib/models/advert";
import { s3Client } from "@/app/lib/awsS3/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        const req = await request.json();
        // console.log(req);
        const {
            ID, company, industry, category, multiplepublications, selectedpages, date, adsize, rate, identifier, colorformat, url, country
        } = req;

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");


        if (!url) {
            console.log("Updating document...");
            const editadvert = await AdvertEntry.findByIdAndUpdate(
                ID,
                {
                    company,
                    industry,
                    category,
                    publications: multiplepublications,
                    pages: selectedpages,
                    date: new Date(date),
                    adsize,
                    rate,
                    identifier,
                    colorformat,
                    country
                },
                { new: true, runValidators: true } // Return updated document & validate fields
            )
            return Response.json({ okay: "Advert Edited" }, { status: 200 });
            
        } else {
            console.log("Finding document URL...");
            const advert = await AdvertEntry.findById({ _id: ID })
            // console.log(advert);
            const fileUrl = advert.imageurl;

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
            const editadvert = await AdvertEntry.findByIdAndUpdate(
                ID,
                {
                    company,
                    industry,
                    category,
                    publications: multiplepublications,
                    pages: selectedpages,
                    date: new Date(date),
                    adsize,
                    rate,
                    identifier,
                    colorformat,
                    imageurl: url,
                    country
                },
                { new: true, runValidators: true } // Return updated document & validate fields
            )

            return Response.json({ okay: "Advert Edited" }, { status: 200 }); ``
        }


    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}
