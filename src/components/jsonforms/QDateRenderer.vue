// src/jsonforms/QuasarStringRenderer.vue
<template>
  <q-input
    :model-value="control.data"
    @update:model-value="onChange"
    :label="control.label"
    :error="!!control.errors"
    :error-message="control.errors"
    :required="control.required"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date :model-value="control.data" mask="YYYY-MM-DD" @update:model-value="onChange">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
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
  controlResult.handleChange(control.value.path, value);
};
</script>
