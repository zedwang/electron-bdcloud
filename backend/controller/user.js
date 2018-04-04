const userModel = require('../nedbPromise')('user.db')
const os = require('os')
const iconv = require('iconv-lite')

module.exports = async function searchController(req, res) {
    /**
     * 模拟用户信息
     * 保证每次都有且只有一个用户
     */
    let users = await userModel.find({})
    if (!users.length) {
        users = await userModel.insert({
            // niceName: 'Hi,爱笑的茄子',
            niceName: 'Hi,' + os.hostname(),
            mail: 'wzd*****@sina.com',
            totalSize: '109951162777',
            isVip: true,
            used: '53687091200'
        })
    }

    res.json({
        code: 0,
        data: users[0]
    })
   
}