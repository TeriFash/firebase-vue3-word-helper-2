<template>
  <header-navbar :signed-in="isSignedIn" />
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useUser, useIsSignedIn, initClipboardData } from '@/utils/utils';

export default defineComponent({
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    onMounted(async () => {
      await initClipboardData();
    });

    return {
      user,
      isSignedIn
    };
  }
});
</script>

<style lang="scss">
@import '~@/assets/scss/index.scss';

html,
body {
  @apply min-h-full;
}

body {
  @apply pb-8;
}

#app {
  /* @apply rounded-md p-2 bg-white dark:bg-dark-secondary; */
  @apply font-sans antialiased text-center text-gray-700;

  a {
    @apply cursor-pointer;
  }
}
</style>
