export default interface TMilestone {
  id: string
  name?: string
  date?: Date
  project?: {
    id: string
    name?: string
    description?: string
    url?: string
    startDate?: Date
    endDate?: Date
  }
}
