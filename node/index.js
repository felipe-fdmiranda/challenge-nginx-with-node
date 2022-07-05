const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')

const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    connection.query('SELECT * FROM people', function(err, result){
        console.log(err, result)
        let resultado = '';
        result.forEach(people => {
            resultado += '- ' + people.name + '<br>'
        });
        res.send('<h1>Full Cycle</h1>' + '<br>' + resultado)
    }).on('error', function(err) {
        console.log("[mysql error]",err);
    });
    connection.end();
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})