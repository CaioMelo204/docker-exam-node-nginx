const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql2/promise');

(
    async () => {
        try {
            const con = await mysql.createConnection({
                host: "db",
                user: "root",
                password: "root",
                port: 3306,
                database: "db",
            });

            await con.execute(`CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255) not null, Primary key(id))`)
        } catch (err) {
            console.log(err)
        }
    }
)()

app.get(`/`, async (req, res) => {
    let response = '<h1>Full Cycle Rocks!</h1> <h1>Lista de nomes cadastrada no banco de dados.</h1>'
    try {
        const con = await mysql.createConnection({
            host: "db",
            user: "root",
            password: "root",
            port: 3306,
            database: "db",
        });

        let r = (Math.random() + 1).toString(36).substring(7)
        const sql = `INSERT INTO people (name) VALUES ('${r}')`
        await con.execute(sql)
        let [ rows ] = await con.execute('SELECT * FROM people')
        console.log(rows)
        for (const item of rows) {
            response += `<h1>${item.name}</h1>`
        }
        await con.end()
        res.send(response)
    } catch (err) {
        console.log(err)
        res.send(response)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})