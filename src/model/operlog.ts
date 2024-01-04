/**
 * 日志 数据模型
 */
export interface OperlogModel {
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  operId: number;
  title: string;
  businessType: number;
  businessTypes?: any;
  method: string;
  requestMethod: string;
  operatorType: number;
  operName: string;
  deptName: string;
  operUrl: string;
  operIp: string;
  operLocation: string;
  operParam: string;
  jsonResult?: string;
  status: number;
  errorMsg?: any;
  operTime: string;
  costTime: number;
}