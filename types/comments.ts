import { ObjectId, WithId } from 'mongodb'

export interface Comment extends WithId<Document> {
    _id: ObjectId
    email: string
    name: string
    text: string
    eventId: string
}
