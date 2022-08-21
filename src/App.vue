<template>
  <!-- <div id="nav"> -->
  <header-navbar :signed-in="isSignedIn" />
  <!--
	  <template v-if="isSignedIn">
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link> |
    </template>
    <template v-else>
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link> |
      <router-link :to="localizedUrl('/account')">Signin</router-link> |
      <router-link :to="localizedUrl('/words')">Words</router-link>
    </template>
   -->
  <!-- </div> -->

  <Suspense>
    <router-view />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useUser, useIsSignedIn, initClipboardData } from '@/utils/utils';
// import HeaderNavbar from '@/components/HeaderNavbar.vue';

export default defineComponent({
  // components: {
  //   HeaderNavbar
  // },
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    onMounted(() => {
      initClipboardData();
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
