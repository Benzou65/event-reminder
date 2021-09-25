/**
 * Client class
 */
class ProjectModel {
  _id: string
  _sigfoxId: any
  _client: any
  _hazard: any
  _mode: any
  _batteryLvl: any
  _lastPostDate: any
  /**
   * @constructor
   * @param id {string}
   * @param name {string}
   * @param description {string}
   * @param url {string}
   * @param startDate {string}
   * @param endDate {number}
   * @param milestones {array}
   */

  constructor(
    id: string,
    name: string,
    description: string,
    url: string,
    startDate: string,
    endDate: string,
    milestones: string[]
  ) {
    this._id = id
    this._sigfoxId = name
    this._client = description
    this._hazard = url
    this._mode = startDate
    this._batteryLvl = endDate
    this._lastPostDate = milestones
  }

  get id() {
    return this._id
  }

  get sigfoxId() {
    return this._sigfoxId
  }

  get client() {
    return this._client
  }

  get hazard() {
    return this._hazard
  }

  get mode() {
    return this._mode
  }

  get batteryLvl() {
    return this._batteryLvl
  }

  get lastPostDate() {
    return this._lastPostDate
  }

  /**
   * Create an order DTO from an Airtable Payload
   * @param payload {{id: string, fields: { SigfoxId: string,Clients: string, Aléas: string, Configuration: string, Batterie: number 'Dernier Message': string}}}
   */
  static fromAirtable(payload) {
    const {
      id,
      fields: {
        name: name,
        project: project,
        date: date,
        Configuration: mode,
        Batterie: batteryLvl,
        'Dernier Message': lastPostDate,
      },
    } = payload

    return new ButtonModel(
      id,
      sigfoxId,
      client,
      hazard,
      mode,
      batteryLvl,
      lastPostDate
    )
  }

  /**
   * Create an order model from the backend
   * @param payload {{id: string,
      sigfoxId: string,
      client: string,
      hazard: string,
      mode: string,
      batteryLvl: number,
      lastPostDate: string}}
   */
  static fromBackend(payload) {
    const { id, sigfoxId, client, hazard, mode, batteryLvl, lastPostDate } =
      payload

    return new ButtonModel(
      id,
      sigfoxId,
      client,
      hazard,
      mode,
      batteryLvl,
      lastPostDate
    )
  }

  toJSON() {
    return {
      id: this._id,
      sigfoxId: this._sigfoxId,
      client: this._client,
      hazard: this._hazard,
      mode: this._mode,
      batteryLvl: this._batteryLvl,
      lastPostDate: this._lastPostDate,
    }
  }
}

export default ButtonModel
