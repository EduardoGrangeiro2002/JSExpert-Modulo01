import knex from "knex"
export default class PostgresStrategy {
    #instace
    constructor(connectionString) {
        this.connectionString = connectionString
        this.table = "warriors"
    }

    async connect() {
        this.#instace = knex({
            client: 'pg',
            connection: this.connectionString
        })

        return await this.#instace.raw('select 1+1 as result')
    }

    async create(item) {
        return this.#instace
            .insert(item)
            .into(this.table)
    }

    async read(item) {
        return this.#instace
            .select()
            .from(this.table)
    }
}
