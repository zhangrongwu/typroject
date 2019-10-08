const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '39.96.72.162',
    user: 'zhangrongwu',
    password: '!Ms12345678',
    database: 'typroject'
})

const bodyParser = require('body-parser')
module.exports = async (req, res) => {
    let token = req.headers['x-access-token'];
    console.log("创建用户,", token);
    let info = req.body;
    conn.query(`SELECT userName FROM customInfo WHERE userName='${info.name}'`, (err, data) => {
        if (err) {
            return res.json({
                code: 1,
                msg: "数据库错误"
            });
        } else {
            if (data.length > 0) {
                return res.json({
                    code: 1,
                    msg: "用户名已存在！"
                });
            } else {
                const sqlStr = `INSERT INTO customInfo (userName, mobile, address) VALUES ('${info.name}', '${info.mobile}', '${info.address}');`
                conn.query(sqlStr, (err, results) => {
                    if (err) {
                        return res.json({
                            code: 1,
                            msg: "数据库错误"
                        });
                    } else {
                        return res.json({
                            code: 200,
                            msg: results
                        });
                    }
                })
            }
        }
    })

}
