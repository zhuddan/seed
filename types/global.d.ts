/**
 * 是否开发模式
 */
declare const __DEV__: boolean;
/**
 * 项目标题
 */
declare const APP_TITLE: string;
/**
 * api地址
 */
declare const APP_API_URL: string;
/**
 * 静态资源地址
 */
declare const APP_STATIC_URL: string;

/**
 * 函数
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
/**
 * @deprecated
 */
declare interface PromiseFn<P extends any[], T = any> {
  (...params: P): Promise<T>;
}
/**
 * 树形结构节点
 */
type TreeItem<T, ChildrenKey extends string = 'children'> = T & {
  [K in ChildrenKey]?: TreeItem<T, ChildrenKey>[];
};
/**
 * 树形列表
 */
declare type TreeList<T> = TreeItem<T>[];

/**
 * @deprecated
 */
declare type Nullable<T> = T | null;

/**
 * maybe 数组
 */
declare type Arrayable<T> = T | T[];

/**
 * maybe Promise
 */
declare type Awaitable<T> = Promise<T> | T;

/**
 * maybe Function
 */
declare type Functionable<T> = () => T | T;

/**
 * vue emit
 */
declare type EmitType = (event: string, ...args: any[]) => void;

/**
 * @deprecated use NodeJS.Timeout
 */
declare type IntervalHandle = ReturnType<typeof setInterval>;

/**
 * @deprecated use NodeJS.Timeout
 */
declare type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * 任意对象 请使用 object
 */
declare interface AnyObject {
  [key: string]: any;
}
/**
 * 数值
 */
declare type numeric = number | string;