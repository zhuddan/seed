import type { DictData } from '@/hooks/useDicts';

export const ORDER_TABS: DictData[] = [
  {
    label: '全部',
    value: '-1',
    raw: {
      cssClass: '',
    },
  },
  {
    label: '待过磅',
    value: '0',
    raw: {
      cssClass: 'text-primary',
    },
  },
  {
    label: '待结算',
    value: '1',
    raw: {
      cssClass: 'text-warning',
    },
  },
  {
    label: '已结算',
    value: '2',
    raw: {
      cssClass: 'text-success',
    },
  },
];