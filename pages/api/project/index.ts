// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getProjects from '../../../backend/project/project.controller'

type Data = {
  id?: string
  name?: string
  description?: string
  url?: string
  startDate?: string
  endDate?: string
  milestones?: [
    {
      id?: string
      name?: string
      date?: string
    }
  ]
}

const data: Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getProjects()

  res.status(200).json(response)
}
