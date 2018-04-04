const _path = require('path')
const fileModel = require('../nedbPromise')('files.db')

module.exports = async function searchController(req, res) {
    const { category, path } = req.query
    const file = req.body
    
    let docs = await fileModel.insert(
        {
            category: category,
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