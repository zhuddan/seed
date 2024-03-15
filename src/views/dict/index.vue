<script setup lang="ts">
import { useDicts } from '@/hooks/useDicts';

const value = ref('DEFAULT');
const b = ref('');

const { formatDictSync, formatDictComputed } = useDicts(
  ['sys_yes_or_no'],
  {},
  () => {
    b.value = formatDictSync('sys_yes_or_no', 'DEFAULT');
  });
const a = formatDictComputed('sys_yes_or_no', value);

function toggle() {
  value.value = value.value == 'DEFAULT' ? 'SYSTEM' : 'DEFAULT';
}

setInterval(() => {
  toggle();
}, 500);
</script>

<template>
  <div>
    {{ $app_name }}
    <p>
      value: {{ value }}
    </p>
    <p>
      formatDictComputed: {{ a }}
    </p>
    <b>
      formatDictSync: {{ b }}
    </b>
  </div>
</template>

<style scoped>

</style>