const path = require('path');
const { signType, isNotEmpty } = require('../utils');
const fileModel = require('../nedbPromise')('files.db');
fileModel.ensureIndex({fieldName: 'dir'});

module.exports = {
  upload: async (req, res) => {
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
    const param = {};
    if (isNotEmpty(req.query.dir)) param.dir = req.query.dir;
    if (isNotEmpty(req.query.category)) {
      if (Number(req.query.category)) {
        param.category = req.query.category;
      } else {
        param.dir = '/';
      }
    }
    if (isNotEmpty(req.query.q)) {
      param.name = {$regex: new RegExp(req.query.q)};
    }
    const count = await fileModel.count(param);
    const docs = await fileModel.find(param);
    // sort causes fetch padding in prod env,why?
    // docs = await docs.sort({lastModified: -1, type: -1});
    // res.charset = 'utf-8';
    res.json({
      code: 0,
      total: count,
      data: docs
    });
  },
  createFolder: async (req, res) => {
    const { dir = '/', name } = req.body;
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
  },
  rename: async (req, res) => {
    const id = req.params.id;
    const newName = req.query.name;
    if (isNotEmpty(id) && isNotEmpty(newName)) {
      const replaced = await fileModel.update({_id : id}, {$set: {name: newName, lastModified: new Date().getTime()}});
      if (replaced) {
        return res.json({
          code: 0,
          data: '成功修改文件/文件夹名！'
        });
      }
      return res.json({
        code: 1,
        data: replaced
      });
      
    }
    return res.json({
      code: 1,
      data: '参数无效，{id}或{name}不能为空！'
    });
  },
  move: async (req, res) => {
        
    // const { dir = '/', name } = req.body;
    console.log(req.body);
    // if (isNotEmpty(name)) {
    //   const docs = await fileModel.insert(
    //     {
    //       dir: dir,
    //       name: name,
    //       lastModified: new Date().getTime(),
    //       type: 'folder'
    //     }
    //   );
        
    return res.json({
      code: 0,
      data: []
    });
  },

  delete: async (req, res) => {
    try {
      if (isNotEmpty(req.params.id)) {
        // 单个删除
        await fileModel.remove({_id: req.params.id});
      }
      if (isNotEmpty(req.body)) {
        // 多个删除
        const deletetion = req.body;
        for (let i = 0; i < deletetion.length; i++) {
          await fileModel.remove({_id: deletetion[i]});
        }
      }
      res.json({
        code: 0,
        data: 'success'
      });
    } catch (error) {
      res.json({
        code: 1,
        data: error
      });
    }
  }
};