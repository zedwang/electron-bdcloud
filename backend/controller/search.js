const fileModel = require('../nedbPromise')('files.db')

module.exports = async function searchController(req, res) {
    const { category, path } = req.query
    let docs = await fileModel.find({category, path})
    res.charset = 'utf-8'
    res.json({
        code: 0,
        data: docs
    })
}