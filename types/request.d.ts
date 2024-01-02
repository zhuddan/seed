/**
 * @description 基础数据类型
 */
declare type ResponseResult<T extends AnyObject = AnyObject> = {
  code: number;
  msg: string;
} & T;

/**
 * @description 列表数据 ruoyi 返回的是 rows 和 total 如果是其他格式请自定义
 *              注意！ rows 已经 是个 T[] 类型！
 */
declare type ResponseList<T> = ResponseResult<{
  total: number;
  rows: T[];
}>;

/**
 * @description 数据类型 包含在 data 里面
 */
declare type ResponseData<T = any> = ResponseResult<{
  data: T;
}>;

/**
 * @description 基础分页参数 pageNum pageSize
 */
declare interface ListParamsBase {
  pageNum: number;
  pageSize: number;
  orderByColumn?: string;
  isAsc?: string;
}
/**
 * @description 基础分页参数查询
 */
declare type ListParamsWrapper<T extends AnyObject = AnyObject> = ListParamsBase & Partial<T>;

declare type ListQuery<T extends AnyObject = AnyObject> = ListParamsBase | ListParamsWrapper<T> | Partial<T>;