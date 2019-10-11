const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})
const jwt = require('jsonwebtoken'); //用来生成token

const bodyParser = require('body-parser')
module.exports = async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    conn.query(`SELECT * FROM userInfo WHERE userName='${userName}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 2,
                message: "数据库错误"
            });
        } else {
            if (data.length > 0) {
                // token生成
                let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
                // let token = jwt.sign(userName, secretOrPrivateKey, {
                //     expiresIn: 60 * 60 * 1 // 1小时过期
                // });
                let token = jwt.sign(userName, secretOrPrivateKey);
                let userInfo = data[0];
                if (password != userInfo.password) {
                    return res.json({
                        status: 2,
                        message: '密码错误',
                    });
                }

                res.cookie('userInfo', {
                    token: token,
                    userName: userInfo.userName,
                    isAdmin: userInfo.isAdmin == 0 ? false : true
                })
                res.cookie('isAdmin', userInfo.isAdmin == 0 ? false : true, {
                    maxAge: 1000 * 60 * 60
                })
                res.json({
                    status: 1,
                    userInfo: {
                        token: token,
                        userName: userName,
                        isAdmin: true
                    }
                })
                return
            } else {
                return res.json({
                    status: 2,
                    message: "用户不存在"
                });
            }
        }
    })
}
