<template>
  <HeaderNavbar :signed-in="isSignedIn" />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUser, useIsSignedIn } from '@utils/utils';
import { auth, db } from '@utils/firebase';
import { useLocalizedUrl } from '@/i18n/utils';
import mixinApp from '@/mixins/mixinApp';
import HeaderNavbar from '@/components/HeaderNavbar.vue';

export default defineComponent({
  mixins: [mixinApp],
  components: {
    HeaderNavbar,
    RouterView
  },
  setup() {
    const user = useUser();
    const isSignedIn: any = useIsSignedIn();

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
