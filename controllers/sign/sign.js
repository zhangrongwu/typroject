module.exports = async (req, res) => {
    let info = req.body;
    try {
        console.log("请求数据", info)
        res.json({
            code: 200,
            msg: info
        });
        return
    } catch (error) {
        res.json({
            code: 500,
            msg: '服务器错误'
        });
        return
    }
}
