<template>
  <div class="home">
    <div class="flex justify-center items-center space-x-8">
      <p ref="data">Some data</p>
      <b-button
        variant="outline-primary"
        v-clipboard:copy="value"
        v-clipboard:success="onSuccess"
        v-clipboard:error="onError"
        >Copy</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate } from 'vue';
import { toClipboard } from '@soerenmartius/vue3-clipboard';

export default defineComponent({
  name: 'HomePage',
  components: {
  },
  setup() {
    const data = ref<HTMLElement | undefined | null>(null);
    const value = ref<HTMLElement | undefined | null | string>(null);

    const onSuccess = (e: any) => {
      console.log('🧊 onSuccess', e);
    };

    const onError = (e: any) => {
      console.log('🧊 onError', e);
    };

    onMounted(() => {
      const text = data.value?.textContent;
      value.value = text;
    });

    onBeforeUpdate(() => {
      value.value = '';
    });

    return { data, value, toClipboard, onSuccess, onError };
  },
  data: () => ({
    // valueSet: undefined
  })
});
</script>
