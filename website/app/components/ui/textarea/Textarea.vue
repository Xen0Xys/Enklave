<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface TextareaProps {
  class?: HTMLAttributes['class']
  disabled?: boolean
  placeholder?: string
  rows?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
})

const model = defineModel<string>()
</script>

<template>
  <textarea
    v-model="model"
    :class="cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :rows="props.rows"
    v-bind="$attrs"
  />
</template>