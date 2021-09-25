import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_MILESTONES_TABLE_NAME = process.env
  .AIRTABLE_MILESTONES_TABLE_NAME as string

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID as string
)
const table = base(AIRTABLE_MILESTONES_TABLE_NAME)

export default async function getMilestones() {
  const records = await table.select({}).firstPage()
  //console.log(`records`, records)
  const milestones = records.map((record) => ({
    id: record.id,
    name: record.fields.name,
    date: record.fields.date,
    project: {
      id: record.fields.project?.[0],
      name: record.fields['name (from project)']?.[0],
      description: record.fields?.['description (from project)']?.[0],
      url: record.fields['url (from project)']?.[0],
      startDate: record.fields['start date (from project)']?.[0],
      endDate: record.fields['end date (from project)']?.[0],
    },
  }))
  console.log(`milestones`, milestones)
  return milestones
}
