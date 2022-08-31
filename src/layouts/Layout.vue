<template>
  <div class="layout" :class="`bg-${currentTheme}`">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
    <notifications />
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { Ref } from 'vue';
import { User } from 'firebase/auth';
import { currentTheme } from '@use/useTheme';
import { auth, firebaseRunTransaction } from '@/utils/firebase';
import { FIRESTORE_COLLECTION } from '@/types';
import { useSetSectionsData } from '@utils/utils'; // useI18nParam // initClipboardData

const Notifications = defineAsyncComponent(
  () => import('@/components/Notifications.vue')
);

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    Notifications
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });
    const polling: any = ref<Ref>();

    const onClipParse = async function () {
      polling.value = setInterval(() => {
        setFocusedStore();
      }, 4000);
    };

    const setFocusedStore = async () => {
      const text = await window.navigator.clipboard.readText();
      store.dispatch('fetchClipboardData', text);
    };

    const setFocused = () => {
      onClipParse();
    };

    const setBlurred = () => {
      clearInterval(polling.value);
      polling.value = null;
    };

    onBeforeUnmount(() => {
      window.removeEventListener('focus', setFocused);
      window.removeEventListener('blur', setBlurred);
    });

    onMounted(() => {
      useSetSectionsData();
      // firebaseRunTransaction(data.value, FIRESTORE_COLLECTION.accompanying);
      onClipParse();

      window.addEventListener('focus', setFocused);
      window.addEventListener('blur', setBlurred);

      auth.onAuthStateChanged((fbuser) => {
        if (fbuser) {
          console.log('authStateChanged:');
          user.user = fbuser;
          store.commit('setUser', fbuser);
        } else {
          store.commit('setUser', null);
        }
      });
    });

    return {
      user,
      currentTheme
    };
  }
});
</script>
<style lang="scss">
.layout {
  @apply container mx-auto pt-6;
  /* @apply dark:text-gray-50; */

  &.bg-dark {
    .list-group-item-action:hover,
    .list-group-item-action:focus,
    .word-list-item__paragraph {
      @apply dark:bg-rb-dark dark:text-white;
    }
  }

  &.bg-light {
    /* @apply bg-rb-dark; */
    /* @apply dark-bg-dark; */
  }
}

#app {
  @apply dark:text-white;
}

body {
  @apply bg-rb-light dark:bg-rb-dark dark:text-white;
}
</style>
