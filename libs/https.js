/**
 * @class RequestHandler
 */
class RequestHandler {
  /**
   * @desc _get请求封装
   * @param { Function } request
   * @param { String } url 请求url
   */
  static _get(request, url) {
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err || res.statusCode != 200) {
          reject({
            code: 500,
            message: '_get methods err'
          });
          return;
        }
        let data = JSON.parse(body);
        resolve(data);
      });
    }).catch(err => {
      console.log(err);
    });
  }
  /**
   * @desc _post请求封装
   * @param { Function } request
   * @param { String } url
   * @param { Object } data
   * @param { String } token
   */
  static _post(request, url, data, token) {
    return new Promise((resolve, reject) => {
      request.post({
        url: url,
        form: data,
        headers: {
          'content-type': 'application/json',
          'PRIVATE-TOKEN': token
        }
      }, (err, res, body) => {
        if (err) {
          reject({
            code: 500,
            message: err.message
          })
        } else {
          let data = JSON.parse(body);
          resolve(data);
        }
      })
    }).catch(err => {
      console.log(err);
    });
  };
};
module.exports = RequestHandler;