const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})
const jwt = require('jsonwebtoken'); //用来生成token
var superagent = require('superagent');

module.exports = async (req, Response) => {

    var github_access_token_url = "https://github.com/login/oauth/access_token"
    superagent.post(github_access_token_url)
        .type("form")
        .set('Content-Type', 'application/json')
        .send({
            client_id: "09ac6a02b10dd69a0e7e",
            client_secret: "468e97d83fc5daa7eef05db82ee1493ea57c3a6d",
            code: req.body.code
        })
        .end(function (err, res) {
            console.log("--res.body", res.body)
            var access_token = res.body.access_token == null ? res.body.error : res.body.access_token;
            if (access_token != "bad_verification_code") {
                var infoUrl = "https://api.github.com/user?access_token=" + access_token
                superagent.get(infoUrl)
                    .set('Content-Type', 'application/json')
                    .accept('application/json')
                    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36')
                    .end(function (err, res) {
                        if (err) {
                            return console.error(err);
                        }

                        this.autoLogin(Response, res.body);

                       
                    });
            } else {
                return Response.json({
                    status: 0,
                    message: "access_token获取失败"
                })
            }
        });
}

function autoLogin(Response, obj) {
    var userName = obj.login;
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
                let token = jwt.sign(userName, secretOrPrivateKey);
                console.log("data", data)
                if (data[0].type == "github") {
                    return res.json({
                        status: 1,
                        userInfo: {
                            token: token,
                            userName: userName
                        }
                    })
                }

            } else {
                const sqlStr = `INSERT INTO userInfo (userName, email, type) VALUES ('${username}', '${obj.email}', 'github');`
                conn.query(sqlStr, (err, results) => {
                    if (err) {
                        console.log("err", err);
                        return res.json({
                            status: 0,
                            msg: "数据库错误"
                        });
                    } else {
                        let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
                        let token = jwt.sign(userName, secretOrPrivateKey);
                        return res.json({
                            status: 1,
                            userInfo: {
                                token: token,
                                userName: userName
                            }
                        })
                    }
                })
            }
        }
    })
}
