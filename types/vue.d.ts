import type { Directive } from 'vue';

export interface Permission extends HTMLElement {
  [INSTANCE_KEY]?: {
    options: string[];
  };
}

 type vPermission = Directive<Permission, string[]>;
declare module 'vue' {
  interface ComponentCustomProperties {

  }
  interface ComponentCustomProperties {
    vPermission: vPermission;
  }
}

export {};
