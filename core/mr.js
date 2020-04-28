/**
 * @class CreateMergeRequest
 * @desc 创建mr
 */
const shell = require('shelljs');
const request = require('request');
const RequestHandler = require('../libs/https');
class CreateMergeRequest {
  constructor(options, title) {
    this._branch = null;
    this._options = Object.assign({}, options);
    this._title = title;
  }
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
      this._createMr(id);
    });
  }
  /**
   * @desc 创建merge request
   * @param { Number } id 项目id
   */
  static _createMr(id) {
    if (!shell.which('git')) {
      shell.echo('Sorry, this script requires git');
      shell.exit(1);
    };
    this._branch = shell.exec('git symbolic-ref --short -q HEAD').replace(/\n/, '');
    const url = `${this._options.url}/projects/${id}/merge_requests`;
    const paramsConfig = {
      id: id,
      source_branch: this._branch,
      target_branch: this._options._target,
      title: this._title
    };
    RequestHandler._post(request, url, paramsConfig, this._options.token).then(data => {
      console.log(data);
    });
  }
};
module.exports = CreateMergeRequest;