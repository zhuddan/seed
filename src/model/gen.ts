/**
 * 代码生成 数据模型
 */
export interface GenModel {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime?: string;
  remark?: any;
  tableId: number;
  tableName: string;
  tableComment: string;
  subTableName?: string;
  subTableFkName?: string;
  className: string;
  tplCategory: string;
  tplWebType: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  functionAuthor: string;
  genType: string;
  genPath: string;
  pkColumn?: any;
  subTable?: any;
  columns: Column[];
  options?: string;
  treeCode?: any;
  treeParentCode?: any;
  treeName?: any;
  parentMenuId?: any;
  parentMenuName?: any;
  sub: boolean;
  tree: boolean;
  crud: boolean;
}

interface Column {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime?: string;
  remark?: any;
  columnId?: any;
  tableId: number;
  columnName?: any;
  columnComment?: any;
  columnType?: any;
  javaType?: any;
  javaField?: any;
  isPk?: any;
  isIncrement?: any;
  isRequired?: any;
  isInsert?: any;
  isEdit?: any;
  isList?: any;
  isQuery?: any;
  queryType?: any;
  htmlType?: any;
  dictType?: any;
  sort?: any;
  list: boolean;
  insert: boolean;
  edit: boolean;
  usableColumn: boolean;
  superColumn: boolean;
  required: boolean;
  pk: boolean;
  query: boolean;
  increment: boolean;
  capJavaField?: any;
}
