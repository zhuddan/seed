import 'vue';
import type { VSay } from '@/directive/index';
import type { AppGlobalProperties } from '@/utils/app/global-properties';

declare module 'vue' {
  interface ComponentCustomProperties extends AppGlobalProperties {

    // vPermission: vPermission;
    vSay: VSay;
  }
}

export {};
