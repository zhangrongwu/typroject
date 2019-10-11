const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})


module.exports = async (req, res) => {
    let info = req.body;
    conn.query(`SELECT * FROM comments where articleId='${req.query.id}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 0,
                message: "数据库错误!"
            });
        } else {
            console.log("--data--", data)
            if (data.length > 0) {
                return res.json({
                    status: 1,
                    message: "",
                    data: data
                });
            } else {
                return res.json({
                    status: 0,
                    message: "暂无数据！！",
                    data: []
                });
            }
        }
    })
}
