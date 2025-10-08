// src/jsonforms/QuasarStringRenderer.vue
<template>
  <q-input
    v-model="control.data"
    type="number"
    @update:model-value="onChange"
    :label="control.label"
    :error="!!control.errors"
    :error-message="control.errors"
    :required="control.required"
  />
</template>

<script setup lang="ts">
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';

const props = defineProps(rendererProps());
import type { ControlElement } from '@jsonforms/core';

const controlResult = useJsonFormsControl({
  ...props,
  uischema: props.uischema as ControlElement,
});

const control = controlResult.control;

const onChange = (value: string | number | null) => {
  controlResult.handleChange(control.value.path, Number(value));
};
</script>
