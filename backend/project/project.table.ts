import BaseTable from '../utils/base.table'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID as string
const AIRTABLE_PROJECTS_TABLE_NAME = process.env
  .AIRTABLE_PROJECTS_TABLE_NAME as string

class ProjectTable extends BaseTable {
  constructor() {
    super(AIRTABLE_BASE_ID, AIRTABLE_PROJECTS_TABLE_NAME)
  }
}

export default ProjectTable
