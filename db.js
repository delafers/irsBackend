import { Sequelize, DataTypes } from 'sequelize'
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/node_postgres')

const db = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "root",
    port: 5432,
    database: "node_postgres",
    timezone: "+00:00",
    define: {
        timestamps: false
    }
})
export default db

export function openConnection(){
    return db.authenticate()
}
export function closeConnection(){
    return db.close()
}


