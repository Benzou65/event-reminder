// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getMilestones from '../../../backend/milestone/milestone.controller'

// type Data = {
//   id: string
//   name?: string
//   startDate?: string
//   endDate?: string
//   project?: {
//     id: string
//     name?: string
//     description?: string
//     startDate?: string
//     endDate?: string
//     url?: string
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getMilestones()
  console.log(response)

  res.status(200).json(response)
}
