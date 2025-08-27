import { MongoClient } from "mongodb";

export async function GET(request) {
    // await new Promise((resolve) => setTimeout(resolve, 500));

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {

        await client.connect();
        const db = client.db(); // Default database from connection string
        const stats = await db.command({ dbStats: 1, scale: 1 });

        console.log(stats);
        

        if (!stats) {
            throw new Error("Failed to retrieve DB stats");
        }

        return Response.json({
            dataSize: stats.dataSize || 0,
            storageSize: stats.storageSize || 0,
        }, { status: 200 });

    } catch (error) {
        console.error('DB Stats Error:', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    } finally {
        await client.close();
    }
}