export interface UserInfo {
  permissions: string[];
  roles: string[];
  user: UserModel;
}

export interface UserModel {
  searchValue?: any;
  createBy: string;
  createTime: string;
  updateBy?: any;
  updateTime?: any;
  remark: string;
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  dept: Dept;
  roles: Role[];
  roleIds?: any;
  postIds?: any;
  roleId?: any;
  admin: boolean;
}

interface Role {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: string;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  delFlag?: any;
  flag: boolean;
  menuIds?: any;
  deptIds?: any;
  admin: boolean;
}

interface Dept {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  deptId: number;
  parentId: number;
  ancestors: string;
  deptName: string;
  orderNum: number;
  leader: string;
  phone?: any;
  email?: any;
  status: string;
  delFlag?: any;
  parentName?: any;
  children: any[];
}

