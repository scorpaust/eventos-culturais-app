// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDatabase, insertDocument } from '@/helpers/db-utils'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(402).json({ message: 'Endereço eletrónico inválido.' })
            return
        }

        let client

        try {
            client = await connectDatabase('newsletter')
        } catch (error) {
            res.status(500).json({
                message: 'Falha na conexão à base de dados.',
            })
            return
        }

        try {
            await insertDocument(client, 'newsletter', { email: userEmail })
            client.close()
        } catch (error) {
            res.status(500).json({ message: 'Falha na inserção de dados.' })
            return
        }

        res.status(201).json({
            message:
                'Endereço eletrónico registado com sucesso na nossa lista de distribuição.',
        })
    }
}
