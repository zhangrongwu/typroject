const jwt = require('jsonwebtoken'); //用来生成token

const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

module.exports = async (req, res) => {
    let info = req.body;
    conn.query(`SELECT userName FROM userInfo WHERE userName='${info.userName}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 0,
                message: "数据库错误!"
            });
        } else {
            console.log("--data--", data)

            if (data.length > 0) {
                return res.json({
                    status: 0,
                    message: "用户名已存在！"
                });
            } else {
                const sqlStr = `INSERT INTO userInfo (userName, mobile, password) VALUES ('${info.userName}', '${info.mobile}', '${info.password}');`
                conn.query(sqlStr, (err, results) => {
                    if (err) {
                        console.log("err", err);
                        return res.json({
                            status: 0,
                            message: "数据库错误"
                        });
                    } else {
                        let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）

                        let token = jwt.sign(info.userName, secretOrPrivateKey);
                        return res.json({
                            status: 1,
                            message: "用户创建成功，快去登录吧！",
                            userInfo: {
                                token: token,
                                userName: info.userName
                            }
                        });
                    }
                })
            }
        }
    })
}
