const jwt = require('jsonwebtoken'); //用来生成token
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

module.exports = async (req, res) => {
    let id = req.body.id;
    conn.query(`DELETE  FROM category where id='${id}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 0,
                message: "数据库错误!"
            });
        } else {
            console.log(JSON.stringify(data))
            return res.json({
                status: 1,
                message: "删除成功！！！",
            });
        }
    })
}
