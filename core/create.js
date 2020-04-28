/**
 * @class create
 */
const chalk = require('chalk');
const shell = require('shelljs');
const request = require('request');
const RequestHandler = require('../libs/https');
class CreateBranch {
  constructor(options, branchName) {
    this._options = Object.assign({}, options);
    this._branchName = branchName;
  }
  /**
   * @desc 初始化
   */
  _init() {
    this._getProjectId();
  }
  /**
   * @desc 获取项目id
   */
  _getProjectId() {
    const url = `${this._options.url}?private_token=${this._options.token}&search=${this._options.project}`;
    RequestHandler._get(request, url).then(data => {
      const id = data[0].id;
      this._create(id);
    });
  }
  /**
   * @desc 创建分支
   * @param { Number } id
   * @param { Object } params
   */
  _create(id) {
    const url = `${this._options.url}/${id}/repository/branches`;
    const params = {
      branch: this._branchName,
      ref: this._options.target
    }
    RequestHandler._post(request, url, params, this._options.token).then(data => {
      if(!data.name) {
        console.log(chalk.red(data.message));
      } else {
        const name = data.name;
        this._switchBranch(name);
      }
    }).catch(err => {
      console.log(chalk.red(err));
    });
  }
  /**
   * @desc 切换到新建分支
   * @param { String } name 新分支名称
   */
  _switchBranch(name) {
    shell.exec(`git fetch origin ${name}:${name}`);
    shell.exec(`git checkout ${name}`);
  }
};
module.exports = CreateBranch;