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
</style>
