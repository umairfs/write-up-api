const mysql = require("mysql2/promise");
const sharedConstants = require("shared/constants");
const sharedServices = require('shared/services');

class mysqlServices {
    constructor() {
        this.query = "";
        this.isTransactionStarted = false;
        this.pool = mysql.createPool({
            host: sharedConstants.appConfig.database.host,
            port: sharedConstants.appConfig.database.port,
            user: sharedConstants.appConfig.database.user,
            password: sharedConstants.appConfig.database.password,
            database: sharedConstants.appConfig.database.name,
            debug: sharedConstants.appConfig.database.debug,
            timezone: sharedConstants.appConfig.database.timezone,
            multipleStatements: false,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    async execute() {
        const connection = await this.pool.getConnection();

        try {
            const [rows] = await connection.query(this.query);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    select(columns) {
        this.query += `SELECT ${columns} `;
        return this;
    }

    from(table) {
        this.query += `FROM ${table} `;
        return this;
    }

    where(condition) {
        this.query += `WHERE ${condition} `;
        return this;
    }

    orderBy(column) {
        this.query += `ORDER BY ${column} `;
        return this;
    }

    join(table, condition) {
        this.query += `JOIN ${table} ON ${condition} `;
        return this;
    }

    insert(table, values) {
        this.query += `INSERT INTO ${table} (${Object.keys(values).join(
            ", "
        )}) VALUES (${Object.values(values)
            .map((value) => `'${value}'`)
            .join(", ")}) `;
        return this;
    }

    insertMany(table, values) {
        const bulkValues = values.map((v) => {
            return `(${Object.values(v)
                .map((value) => `'${value}'`)
                .join(", ")})`;
        });
        this.query += `INSERT INTO ${table} (${Object.keys(values[0]).join(
            ", "
        )}) VALUES ${bulkValues} `;
        return this;
    }

    update(table, values) {
        this.query += `UPDATE ${table} SET ${Object.entries(values)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(", ")} `;
        return this;
    }

    delete(table) {
        this.query += `DELETE FROM ${table} `;
        return this;
    }

    subquery(builder) {
        this.query += `(${builder.build()}) `;
        return this;
    }

    count(column = "*") {
        this.query += `COUNT(${column}) `;
        return this;
    }

    sum(column = "*") {
        this.query += `SUM(${column}) `;
        return this;
    }

    avg(column = "*") {
        this.query += `AVG(${column}) `;
        return this;
    }

    max(column = "*") {
        this.query += `MAX(${column}) `;
        return this;
    }

    min(column = "*") {
        this.query += `MIN(${column}) `;
        return this;
    }

    groupBy(column) {
        this.query += `GROUP BY ${column} `;
        return this;
    }

    having(condition) {
        this.query += `HAVING ${condition} `;
        return this;
    }

    limit(count) {
        this.query += `LIMIT ${count} `;
        return this;
    }

    offset(count) {
        this.query += `OFFSET ${count} `;
        return this;
    }

    transaction() {
        if (!this.isTransactionStarted) {
            this.query += `START TRANSACTION `;
            this.isTransactionStarted = true;
        }
        return this;
    }

    commit() {
        if (this.isTransactionStarted) {
            this.query += `COMMIT `;
            this.isTransactionStarted = false;
        }
        return this;
    }

    rollback() {
        if (this.isTransactionStarted) {
            this.query += `ROLLBACK `;
            this.isTransactionStarted = false;
        }
        return this;
    }

    log() {
        sharedServices.log('mysql.services -> this.query -> ', this.query);
        return this;
    }

    async build() {
        try {
            const result = await this.execute();
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = mysqlServices;
