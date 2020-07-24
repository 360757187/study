'use strict';

const Controller = require('egg').Controller;

class InterfaceController extends Controller {


  /**
   * 插入数据
   * **/
  async insert() {
    const { ctx } = this;
    const params = ctx.request.body.Service.Data.Request;
    const table = Object.keys(params)[0].toUpperCase();
    const result = await ctx.service.interface.insert(table, params[table]);
    result.success ? ctx.status = 200 : ctx.status = 500;
    ctx.body = {
      data: result,
    };
  }

  /**
   * 查询数据
   * **/
  async query() {
    const { ctx } = this;
    const params = ctx.request.body;
    // params示例
    // {
    //   "Service": {
    //     "Route": {
    //       "SerialNO": "2020071615283354561",
    //       "ServiceID": "10013000000001",
    //       "ServiceTime": "20200716152833",
    //       "SourceSysID": "01002"
    //     },
    //     "Data": {
    //       "Request": {
    //         "tableName": "test",
    //          "url": "localhost:7001/interface/test"
    //       }
    //     }
    //   }
    // }
    const result = await ctx.service.interface.query(params);
    ctx.body = {
      data: result,
    };
  }
  /**
   * 测试
   * **/
  async test() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.body = {
      ...params,
    };
  }

}

module.exports = InterfaceController;
