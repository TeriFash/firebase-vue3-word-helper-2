<template>
  <header-navbar :signed-in="isSignedIn" />
  <Suspense>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUser, useIsSignedIn, initClipboardData } from '@/utils/utils';
// import { useLocalizedUrl } from '@/i18n/utils';

export default defineComponent({
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    onMounted(async () => {
      //  useLocalizedUrl();

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
  @apply font-sans antialiased text-center text-gray-700 w-full;
  /* @apply max-w-screen-lg mt-16 mb-20 px-8 mx-auto pb-24 sm:mt-28 sm:px-16 slg:px-24 lg:mt-48 lg:mt-58; */

  a {
    @apply cursor-pointer;
  }
}
</style>
