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
import { RouterLink, RouterView } from 'vue-router';
import { useUser, useIsSignedIn } from '@utils/utils';
import {
  firebaseSnapshotStore,
  useAuth,
  useFirestore,
  auth,
  firestore
} from '@utils/firebase';
import { useLocalizedUrl } from '@/i18n/utils';

export default defineComponent({
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    onMounted(async () => {
      useLocalizedUrl();

      console.log('✅ 🧊 ~ useFirestore', await useFirestore());
      console.log('✅ 🧊 ~ firestore', await firestore());
      console.log('✅ 🧊 ~ db', await useAuth());
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
