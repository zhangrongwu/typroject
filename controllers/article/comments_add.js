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
    conn.query(`INSERT INTO comments (articleId, comment, time, userId, userName) VALUES ('${info.articleId}', '${info.comment}', '${info.time}', '${info.userId}','${info.userName}');`, (err, data) => {
        if (err) {
            console.log("错误---", JSON.stringify(err))

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
