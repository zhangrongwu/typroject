const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
//     extended: false
// }))

module.exports = async (req, res) => {
    let info = req.body;
    const sqlStr = `select * from customInfo where userName='${info.name}'`
    conn.query(sqlStr, (err, results) => {
        return res.json({
            code: 200,
            message: results,
            affectedRows: 0
        })
    })
}
