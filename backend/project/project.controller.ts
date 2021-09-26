import Airtable from 'airtable'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_PROJECTS_TABLE_NAME = process.env
  .AIRTABLE_PROJECTS_TABLE_NAME as string

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID as string
)
const table = base(AIRTABLE_PROJECTS_TABLE_NAME)

export default async function getProjects() {
  const records = await table.select({}).firstPage()
  console.log(`records`, records)
  const projects = records.map((record) => ({
    id: record.id,
    name: record.fields.name,
    description: record.fields.description,
    url: record.fields.url,
    startDate: record.fields['start date'],
    endDate: record.fields['end date'],
    milestones: record.fields.Milestones,
  }))
  console.log(`projects`, projects)
  return records
}
