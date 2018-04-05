
const { isEmpty } = require('../utils')

module.exports = async function searchController(req, res) {
    const fileModel = require('../nedbPromise')('files.db')

    let param = {}
    if (!isEmpty(req.query)) {
        param = req.query
        param.category = Number(param.category)
        if (param.category === 0) 
            delete param.category
    }
    console.log(param)
    let docs = await fileModel.find(param)
    res.charset = 'utf-8'
    res.json({
        code: 0,
        data: docs
    })
}