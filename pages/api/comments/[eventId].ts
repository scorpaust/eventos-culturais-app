import { NextApiRequest, NextApiResponse } from 'next'
import {
    connectDatabase,
    getAllDocuments,
    insertDocument,
} from '@/helpers/db-utils'
import { Document, MongoClient, ObjectId } from 'mongodb'

type Data = {
    message: string
    comments: Document[] | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const eventId = req.query.eventId as string

    let client: MongoClient

    try {
        client = await connectDatabase('events')
    } catch (error) {
        res.status(500).json({
            message: 'Falha na conexão à base de dados.',
            comments: null,
        })
        return
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({
                message: 'Dados inválidos.',
                comments: null,
            })
            client.close()
            return
        }

        const newComment = {
            _id: new ObjectId(),
            email,
            name,
            text,
            eventId,
        }

        try {
            await insertDocument(client, 'comments', newComment).then(
                (result) => {
                    newComment._id = result.insertedId
                }
            )

            res.status(201).json({
                message: 'Comentário adicionado com sucesso.',
                comments: null,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Falha na inserção do comentário.',
                comments: null,
            })
        }
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(
                client,
                'comments',
                {
                    _id: -1,
                },
                { eventId }
            )

            res.status(200).json({
                message: 'Comentários carregados com sucesso',
                comments: documents,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Falha na obtenção da lista de comentários.',
                comments: null,
            })
            client.close()
            return
        }

        client.close()
    }
}
