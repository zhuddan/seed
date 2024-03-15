import type { VSay } from '@/directive/index';
import type { AppGlobalProperties } from '@/utils/app/global-properties';
import 'vue';
// export interface Permission extends HTMLElement {
//   [INSTANCE_KEY]?: {
//     options: string[];
//   };
// }

// type vPermission = Directive<Permission, string[]>;
declare module 'vue' {
  interface ComponentCustomProperties extends AppGlobalProperties {

  }
  interface ComponentCustomProperties {
    // vPermission: vPermission;
    vSay: VSay;
  }
}

export {};
