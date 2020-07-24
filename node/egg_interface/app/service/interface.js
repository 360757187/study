'use strict';

const Service = require('egg').Service;


class InterfaceService extends Service {
  constructor(ctx) {
    super(ctx);
    this._MAP = {}; // 根据出粗过程名字存储对应储存过程的参数字段名
  }

  /**
   * 获取存储过程的参数字段名
   * @param {String} name - 存储过程名称
   * @return {Array} - 字段名数组
  **/
  async getKeys(name) {
    if (this._MAP[name]) {
      return this._MAP[name];
    }
    let result = await this.app.mysql.query(`SELECT PARAMETER_NAME FROM information_schema.PARAMETERS WHERE SPECIFIC_SCHEMA = "${this.config.mysql.client.database}" AND SPECIFIC_NAME = "${name}" ORDER BY ORDINAL_POSITION`);
    result = result.map(item => {
      return item.PARAMETER_NAME.split('_')[1];
    });
    this._MAP[name] = result;
    return result;
  }

  /**
    * 获单条数据的值，转换为逗号分割字符串
    * @param {Array} keys - 字段数组
    * @param {Object} obj - 单条数据对象
    * @return {String} - 单条数据值对应的逗号分隔字符串
  **/
  getValues(keys, obj) {
    return keys.map(item => "'" + obj[item] + "'").join(',');
  }

  /**
    * 写入数据到数据库
    * @param {String} table - 表名
    * @param {Array} list - 写入数据，格式为数组对象
    * @return {Object} - 写入过程结果
  **/
  async insert(table, list) {
    // 按规定的存储过程名称拼接存储过程
    table = 'AFTER_INSERT_' + table;
    const keys = await this.getKeys(table);
    // 通过事务控制写入过程是否完整
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await Promise.all(list.map(el => {
        return this.getValues(keys, el);
      }).map(values => {
        return conn.query(`CALL ${table}(${values})`);
      }));
      return { success: true };
    }, this.ctx).catch(err => {
      return {
        err,
        success: false,
      };
    });
    // console.log(result);
    return result;
  }

  /**
    * 查询数据
    * @param {Object} params - ESB请求参数对象
    * @return {Object} - 操作结果对象
  **/
  async query(params) {
    const { tableName, url } = params.Service.Data.Request;
    delete params.Service.Data.Request.tableName;
    delete params.Service.Data.Request.url;
    const list = await this.app.mysql.query(`SELECT * FROM ${tableName}`);
    console.log(list);
    params.Service.Data.Request.list = list;
    const result = await this.app.curl(url, {
      method: 'POST',
      contentType: 'json',
      data: {
        Service: params.Service,
      },
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = InterfaceService;
