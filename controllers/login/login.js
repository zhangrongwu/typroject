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
    let name = req.body.name;
    let pass = req.body.pass;

    conn.query(`SELECT userName FROM userInfo WHERE userName='${name}'`, (err, data) => {
        if (err) {
            return res.json({
                status: 1,
                userInfo: "数据库错误"
            });
        } else {
            if (data.length > 0) {
                // token生成
                let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
                let token = jwt.sign(name, secretOrPrivateKey, {
                    expiresIn: 60 * 60 * 1 // 1小时过期
                });

                if (pass != data[0].pass) {
                    return res.json({
                        status: 2,
                        mess: '密码错误'
                    });
                }
                return res.json({
                    status: 1,
                    token: token,
                    user_name: req.body.name
                })
            } else {
                return res.json({
                    status: 1,
                    userInfo: "用户不存在"
                });
            }
        }
    })

}
