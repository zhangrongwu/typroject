var superagent = require('superagent');


module.exports = async (req, res) => {

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
            var list = res.text.split("&")[0].split("=");
            var access_token = list[1];
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
                        // 获取github的用户信息
                        return res.json({
                            status: 1,
                            userInfo: res.body
                        })
                    });
            } else {
                return res.json({
                    status: 0,
                    message: "access_token获取失败"
                })
            }
        });


}
