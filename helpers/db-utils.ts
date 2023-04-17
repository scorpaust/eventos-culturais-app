import * as mongoDB from 'mongodb'
import { Comment } from '@/types/comments'

export async function connectDatabase(dbName: string) {
    const client = await mongoDB.MongoClient.connect(
        `${process.env.DB_URL}/${dbName}`
    )

    return client
}

export async function insertDocument(
    client: mongoDB.MongoClient,
    collection: string,
    document: mongoDB.Document
) {
    const db = client.db()

    const result = db.collection(collection).insertOne(document)

    return result
}

export async function getAllDocuments(
    client: mongoDB.MongoClient,
    collection: string,
    sort: mongoDB.Sort,
    filter: mongoDB.Filter<mongoDB.Document> = {}
) {
    const db = client.db()

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray()

    return documents
}
