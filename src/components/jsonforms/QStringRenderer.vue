// src/jsonforms/QuasarStringRenderer.vue
<template>
  <q-input
    v-if="control.visible !== false"
    :model-value="control.data"
    @update:model-value="onChange"
    :label="control.label"
    :error="!!control.errors"
    :error-message="control.errors"
    :required="control.required"
    :disable="!control.enabled"
    :hint="control.description"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';

const props = defineProps(rendererProps());
import type { ControlElement } from '@jsonforms/core';

const controlResult = useJsonFormsControl({
  ...props,
  uischema: props.uischema as ControlElement,
});

const control = controlResult.control;

watch(
  () => control.value.visible,
  (newValue: boolean) => {
    if (newValue === false) {
      onChange(undefined);
    }
  },
);

const onChange = (value: string | number | null | undefined) => {
  controlResult.handleChange(control.value.path, value);
};
</script>
