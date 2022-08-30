<template>
  <header-navbar :signed-in="isSignedIn" />
  <Suspense>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useUser, useIsSignedIn } from '@utils/utils';
import { auth, db } from '@utils/firebase';
import { useLocalizedUrl } from '@/i18n/utils';
import mixinApp from '@/mixins/mixinApp';
export default defineComponent({
  mixins: [mixinApp],
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    onMounted(async () => {
      await useLocalizedUrl();
    });

    return {
      db,
      auth,
      user,
      isSignedIn
    };
  }
});
</script>

<style lang="scss">
@import '~@/assets/scss/index.scss';
</style>
