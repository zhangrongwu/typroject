const jwt = require('jsonwebtoken'); //用来生成token
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

module.exports = async (req, res) => {
    console.log(req.body)
    let info = req.body;
    conn.query(`INSERT INTO category (title) VALUES ('${info.title}');`, (err, data) => {
        if (err) {
            return res.json({
                status: 0,
                message: "数据库错误!"
            });
        } else {
            return res.json({
                status: 1,
                message: "添加完成！！",
            });
        }
    })
}
