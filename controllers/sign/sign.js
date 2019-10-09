const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

module.exports = async (req, res) => {
    let info = req.body;
    conn.query(`SELECT userName FROM userInfo WHERE userName='${info.username}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 0,
                msg: "数据库错误!"
            });
        } else {
            if (data.length > 0) {
                return res.json({
                    status: 0,
                    msg: "用户名已存在！"
                });
            } else {
                const sqlStr = `INSERT INTO userInfo (userName, mobile, password) VALUES ('${info.username}', '${info.mobile}', '${info.password}');`
                conn.query(sqlStr, (err, results) => {
                    if (err) {
                        console.log("err", err);
                        return res.json({
                            status: 0,
                            msg: "数据库错误"
                        });
                    } else {
                        return res.json({
                            status: 1,
                            msg: "用户创建成功，快去登录吧！"
                        });
                    }
                })
            }
        }
    })
}
