module.exports = async (req, res) => {
    console.log("-----")
    let token = req.headers.token;
    console.log("根据用户信息进行清除登录状态！")
    return res.json({
        status: 1,
        message: "退出登录成功!",
        userInfo: {
            token: "",
            userName: ""
        }
    })
}
