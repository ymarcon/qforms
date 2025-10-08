<template>
  <div class="json-form-wrapper">
    <json-forms
      :data="moduleValue"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import {
  rankWith,
  isStringControl,
  type UISchemaElement,
  isIntegerControl,
  isNumberControl,
} from '@jsonforms/core';
import QStringRenderer from './jsonforms/QStringRenderer.vue';
import QNumRenderer from './jsonforms/QNumberRenderer.vue';

// Define your custom renderers
const customRenderers = [
  {
    renderer: QStringRenderer,
    tester: rankWith(3, isStringControl), // Priority 3 - higher than default (usually 1-2)
  },
  {
    renderer: QNumRenderer,
    tester: rankWith(3, isIntegerControl), // Priority 3 - higher than default (usually 1-2)
  },
  {
    renderer: QNumRenderer,
    tester: rankWith(3, isNumberControl), // Priority 3 - higher than default (usually 1-2)
  },
];

// Combine custom renderers with default vanilla renderers
const renderers = Object.freeze([...vanillaRenderers, ...customRenderers]);

defineProps({
  moduleValue: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  schema: {
    type: Object,
    required: true,
  },
  uischema: {
    type: Object as () => UISchemaElement,
    required: false,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:moduleValue']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onChange = (event: any) => {
  emit('update:moduleValue', event.data);
};
</script>

<style>
@import '@jsonforms/vue-vanilla/vanilla.css';
</style>
