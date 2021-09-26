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

  const milestones = records.map((record) => ({
    id: record.id,
    name: record.fields.name || null,
    date: record.fields.date || null,
    project:
      {
        id: record.fields.project,
        name: record.fields['name (from project)'] || null,
        description: record.fields?.['description (from project)'] || null,
        url: record.fields['url (from project)'] || null,
        startDate: record.fields['start date (from project)'] || null,
        endDate: record.fields['end date (from project)'] || null,
      } || null,
  }))

  return milestones
}
