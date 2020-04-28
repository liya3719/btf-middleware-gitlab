const fs = require('fs');
const path = require('path');
const baseCwd = process.cwd();
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const createHandler = require('./core/create');
const mergeHandler = require('./core/mr');
const config = require(`${baseCwd}/gitlab.config`);
const promptConfig = require('./config/prompt');
const params = {
  url: config.baseUrl,
  token: config.private_token, 
  project: config.project,
  target: config.targetBranch
};
if (!fs.existsSync(`${baseCwd}/gitlab.config.js`)) {
  fsExtra.copySync(path.join(__dirname, `../gitlab.config.js`), `${baseCwd}/gitlab.config.js`);
}
/**
 * @class 流程入口
 */
class BtfMiddlewareGitLab {
  /**
   * @desc 创建新分支
   */
  static _create() {
    inquirer.prompt(promptConfig.createConfig).then((res) => {
      try {
        const branch = res.branch;
        const _createHandler = new createHandler(params, branch);
        _createHandler._init();
      } catch (error) {
        console.log(error.message);
      };
    });
  }
  /**
   * @desc 创建mr
   */
  static _mergeRequest() {
    inquirer.prompt(promptConfig.mrConfig).then((res) => {
      try {
        const merge = res.merge;
        const _mergeHandler = new mergeHandler(params, merge);
        _mergeHandler._init();
      } catch (error) {
        console.log(error.message);
      };
    });
  }
};
module.exports = BtfMiddlewareGitLab;