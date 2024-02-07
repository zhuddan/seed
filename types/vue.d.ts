import type { Directive } from 'vue';

export interface Permission extends HTMLElement {
  [INSTANCE_KEY]?: {
    options: string[];
  };
}

 type vPermission = Directive<Permission, string[]>;
declare module 'vue' {
  interface ComponentCustomProperties {
    $app_name: string;
  }
  interface ComponentCustomProperties {
    vPermission: vPermission;
  }
}

export {};
