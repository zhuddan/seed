/**
 * @deprecated dot
 */
declare const __DEV__: boolean;

declare const APP_TITLE: string;

declare const APP_API_URL: string;

declare const APP_STATIC_URL: string;

// common
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
/**
 *
 */
declare interface PromiseFn<P extends any[], T = any> {
  (...params: P): Promise<T>;
}

declare interface PromiseFunction<T, P extends any[]> {
  (...params: P): Promise<T>;
}

declare type TreeItem<T> = T & {
  children?: TreeItem<T>[];
};

declare type TreeList<T> = TreeItem<T>[];

declare type Nullable<T> = T | null;

declare type Arrayable<T> = T | T[];

declare type Awaitable<T> = Promise<T> | T;

declare type Functionable<T> = () => T | T;

// vue

declare type EmitType = (event: string, ...args: any[]) => void;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
// 解决类型嵌套过深的问题
// declare type MaybeRef<T> = T | Ref<T>;
declare type MaybeRef<T> = Ref<UnwrapRef<T>> | T;

declare type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

declare type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;
// window

declare function setInterval(
  handler: (...args: any[]) => void,
  timeout: number
): number;

declare type TargetContext = '_self' | '_blank';

declare interface VEvent extends Event {
  target: HTMLInputElement;
}

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare interface AnyObject {
  [key: string]: any;
}
