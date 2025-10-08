<template>
  <div class="q-mb-md">
    <q-select
      v-if="control.visible !== false"
      :model-value="control.data"
      @update:model-value="onChange"
      :options="options"
      :label="control.label"
      :error="control.errors.length > 0"
      :error-message="control.errors"
      :required="control.required"
      :disable="!control.enabled"
      :hint="control.description"
      emit-value
      map-options
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import type { ControlElement } from '@jsonforms/core';

const props = defineProps(rendererProps());

const controlResult = useJsonFormsControl({
  ...props,
  uischema: props.uischema as ControlElement,
});

const control = controlResult.control;

// Transform enum values into q-select options
const options = computed(() => {
  const schema = controlResult.control.value.schema;

  if (!schema.enum) {
    return [];
  }

  return schema.enum.map((value: string | number) => ({
    label: String(value),
    value: value,
  }));
});

watch(
  () => control.value.visible,
  (newValue: boolean) => {
    if (newValue === false) {
      onChange(undefined);
    }
  },
);

const onChange = (value: string | number | null | undefined) => {
  controlResult.handleChange(controlResult.control.value.path, value);
};
</script>
