"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";


export async function uploadToS3(fileName, file) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, // The name of the bucket.
    Key: fileName, // The name of the object. For example, 'sample_upload.txt'.
    Body: file, // The content of the object. For example, 'Hello world!".
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    // console.log(results);

    console.log(
      "Successfully created " +
      params.Key +
      " and uploaded it to " +
      params.Bucket +
      "/" +
      params.Key
    );

    const objectUrl = `https://${params.Bucket
      }.s3.amazonaws.com/${encodeURIComponent(params.Key)}`;

    return objectUrl;
  } catch (error) {
    console.log("Error", error);
    return { error: "An error occured. Try again." }
  }
}