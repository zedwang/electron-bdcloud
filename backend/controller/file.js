const path = require('path');
const { signType, isNotEmpty } = require('../utils');

module.exports = {
  upload: async (req, res) => {
    const fileModel = require('../nedbPromise')('files.db');
    const { dir = '/' } = req.query;
    const file = req.body;
    const docs = await fileModel.insert(
      {
        category: signType(file.type),
        dir: dir,
        ext: path.extname(file.name).substr(1),
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        type: file.type
      }
    );
    res.json({
      code: 0,
      data: docs
    });
  },
  search: async (req, res) => {
    const fileModel = require('../nedbPromise')('files.db');

    const param = {};
    if (isNotEmpty(req.query.dir)) param.dir = req.query.dir;
    if (isNotEmpty(req.query.category)) {
      if (Number(req.query.category) === 0) {
        param.dir = '/';
      } else {
        param.category = req.query.category;
      }
    }
        
    const docs = await fileModel.find(param);
    res.charset = 'utf-8';
    res.json({
      code: 0,
      data: docs
    });
  },
  createFolder: async (req, res) => {
    const fileModel = require('../nedbPromise')('files.db');
        
    const { dir = '/', name } = req.body;
    console.log(req.body);
    if (isNotEmpty(name)) {
      const docs = await fileModel.insert(
        {
          dir: dir,
          name: name,
          lastModified: new Date().getTime(),
          type: 'folder'
        }
      );
        
      return res.json({
        code: 0,
        data: docs
      });
    }
        
    return res.json({
      code: 1,
      errMsg: '文件名无效'
    });
        
  }
};