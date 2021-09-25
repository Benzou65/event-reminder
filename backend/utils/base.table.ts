import Airtable, { FieldSet, Table } from 'airtable'
import { waitAsync } from '../airtable/async'

export default class BaseTable {
  table: Table<FieldSet>

  constructor(aBase: string, aTable: string) {
    Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY })
    const base = Airtable.base(aBase)
    this.table = base(aTable)
  }

  get t() {
    return this.table
  }

  /**
   * Return a list of records
   */
  async fetchRecords() {
    return this.table.select().all()
  }

  /**
   * Return a single record
   * @param {string} recordId
   */
  async fetchRecord(recordId: string) {
    return this.table.find(recordId)
  }

  async filterByClient(client: string) {
    return this.t
      .select({
        filterByFormula: `IF({Nom} = '${client}', TRUE(), FALSE())`,
      })
      .all()
  }

  /**
   * Split an array by ten items
   * @private
   * @param {[any]} records
   * @returns {[[any]]}
   */
  static _chunkItUpByTen(records: any[]) {
    const payloads = []
    for (const idx = 0; idx < records.length; idx + 10) {
      payloads.push(
        records.splice(
          idx,
          idx + 10 > records.length ? records.length : idx + 10
        )
      )
    }

    return payloads
  }

  static async _scheduleFunctions(records: any[], fn: any) {
    const payloads = BaseTable._chunkItUpByTen(records)

    return payloads.reduce((promise, payload, idx) => {
      if (idx % 4 === 0) {
        return promise.then((prev) =>
          waitAsync(500)
            .then(() => fn(payload))
            .then((res: any[]) => res.concat(prev))
        )
      }

      return promise.then((prev) =>
        fn(payload).then((res: any[]) => res.concat(prev))
      )
    }, Promise.resolve([]))
  }

  /**
   * Create records by chunk of 10
   * @param {[any]} records
   * @returns {Promise<[any]>}
   */
  async create(records: any) {
    return BaseTable._scheduleFunctions(records, this.table.create)
  }

  /**
   * Update records by chunk of 10
   * @param {[any]} records
   * @returns {Promise<[any]>}
   */
  async update(records: any) {
    return BaseTable._scheduleFunctions(records, this.table.update)
  }

  /**
   * Delete records by chunk of 10
   * @param {[string]} ids
   * @return {Promise<[any]>}
   */
  async delete(ids: any) {
    return BaseTable._scheduleFunctions(ids, this.table.destroy)
  }
}
