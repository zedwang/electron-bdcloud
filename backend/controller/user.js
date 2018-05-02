const userModel = require('../nedbPromise')('user.db');
const os = require('os');

module.exports = async function searchController(req, res) {
  /**
     * 模拟用户信息
     * 保证每次都有且只有一个用户
     */
  let users = await userModel.count({});
  if (!users.length) {
    users = await userModel.insert({
      niceName: 'Hi,' + os.hostname(),
      mail: 'wzd*****@sina.com',
      totalSize: '109951162777',
      isVip: true,
      used: '53687091200'
    });
  }
  users = await userModel.find({});
  res.json({
    code: 0,
    data: users[0]
  });
   
};