const _path = require('path')
const { signType } = require('../utils')
const fileModel = require('../nedbPromise')('files.db')

module.exports = async function searchController(req, res) {
    const { path = '/' } = req.query
    const file = req.body
    console.log(file)
    let docs = await fileModel.insert(
        {
            category: signType(file.type),
            path: path,
            ext: _path.extname(file.name).substr(1),
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
            type: file.type
        }
    );

    res.json({
        code: 0,
        data: docs
    })
}