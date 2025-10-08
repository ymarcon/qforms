<template>
  <q-page class="q-pa-md">
    <div class="text-h5">{{ t('json_form') }}</div>
    <JsonForm :schema="schema" :uischema="uischema" v-model:moduleValue="formData" />
    <pre>{{ formData }}</pre>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JsonForm from 'components/JsonForm.vue';
import { useI18n } from 'vue-i18n';

const formData = ref({});
const { t } = useI18n();

// Define your JSON Schema
const schema = {
  type: 'object',
  properties: {
    string: {
      type: 'string',
    },
    boolean: {
      type: 'boolean',
      description: 'Boolean description as a tooltip',
    },
    number: {
      type: 'number',
    },
    integer: {
      type: 'integer',
    },
    date: {
      type: 'string',
      format: 'date',
    },
    time: {
      type: 'string',
      format: 'time',
    },
    dateTime: {
      type: 'string',
      format: 'date-time',
    },
    enum: {
      type: 'string',
      enum: ['One', 'Two', 'Three'],
    },
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          message: {
            type: 'string',
            maxLength: 5,
          },
          enum: {
            type: 'string',
            enum: ['foo', 'bar'],
          },
        },
      },
    },
  },
};

// Optional UI Schema for layout customization
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/string',
    },
    {
      type: 'Control',
      scope: '#/properties/boolean',
    },
    {
      type: 'Control',
      scope: '#/properties/number',
    },
    {
      type: 'Control',
      scope: '#/properties/integer',
    },
    {
      type: 'Control',
      scope: '#/properties/date',
    },
    {
      type: 'Control',
      scope: '#/properties/time',
    },
    {
      type: 'Control',
      scope: '#/properties/dateTime',
    },
    {
      type: 'Control',
      scope: '#/properties/enum',
    },
    {
      type: 'Control',
      scope: '#/properties/comments',
    },
  ],
};
</script>
