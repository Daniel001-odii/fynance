<script setup>
import { cn } from '@/lib/utils';
import { PinInputInput, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  index: { type: Number, required: true },
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <PinInputInput
    v-bind="forwardedProps"
    :class="
      cn(
        'relative text-center focus:outline-none focus:ring-2 focus:ring-slate-950 focus:relative focus:z-10 flex h-9 w-9 items-center justify-center border-y border-r border-slate-200 text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md dark:focus:ring-slate-300 dark:border-slate-800',
        props.class,
      )
    "
  />
</template>
