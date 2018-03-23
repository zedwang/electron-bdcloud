const fileModel = require('../nedbPromise')('files.db')

module.exports = async function searchController(req, res) {
    let docs = await fileModel.find({})
    res.json({
        code: 0,
        data: docs
    })
}