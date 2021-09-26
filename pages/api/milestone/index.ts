// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getMilestones from '../../../backend/milestone/milestone.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getMilestones()

  res.status(200).json(response)
}
