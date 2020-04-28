const promptConfig = {
  createConfig: {
    type:'input',
    name:'branch',
    message:'请输入新建分支名称'
  },
  mrConfig: {
    type:'input',
    name:'merge',
    message:'请输入Merge Request 描述'
  }
};
module.exports = promptConfig;