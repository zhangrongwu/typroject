const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})
module.exports = async (req, res) => {
    let info = req.body;
    const sqlStr = 'select * from customInfo'
    conn.query(sqlStr, (err, results) => {
        if (err) {
            return res.json({
                code: 1,
                msg: "数据库错误"
            });
        } else {
            return res.json({
                code: 200,
                message: results,
                affectedRows: 0
            })
        }
    })
}
