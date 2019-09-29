const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
//     extended: false
// }))

module.exports = async (req, res) => {
    let info = req.body;
    try {
        console.log("请求数据", info)
        res.json({
            errorcode: 200,
            msg: info
        });
        return
    } catch (error) {
        res.json({
            errorcode: 500,
            msg: '服务器错误'
        });
        return
    }

    const sqlStr = 'select * from userInfo where isdel=0'
    conn.query(sqlStr, (err, results) => {
        console.log(results)
        if (err) return res.json({
            err_code: 1,
            message: '获取失败',
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: results,
            affectedRows: 0
        })
    })
}
