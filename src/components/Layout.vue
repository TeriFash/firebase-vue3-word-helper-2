<template>
  <div class="layout" :class="`bg-${currentTheme}`">
    <!-- <template v-if="$store.state.tabActive"> {{ $store.state.sectionsTitles[$store.state.tabActive] }}!! </template> -->
    <theme-switcher />
    <router-view />
    <notifications />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { currentTheme, initTheme, switchTheme } from '@/composables/useTheme';

import { auth, firebaseBdDataSetStore } from '@/utils/firebase';
import { User } from 'firebase/auth';

import { initClipboardData } from '@/utils/utils'; //useI18nParam

// import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
const ThemeSwitcher = defineAsyncComponent(() => import('@/components/ThemeSwitcher.vue'));
const Notifications = defineAsyncComponent(() => import('@/components/Notifications.vue'));

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    ThemeSwitcher,
    Notifications
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });
    const polling: any = ref('');

    const onClipParse = async () => {
      polling.value = await setInterval(() => {
        initClipboardData();
        const dataLocal: any = localStorage.getItem('textInClipboard');
        console.log('✅ 🧊 ~ dataLocal', dataLocal);
      }, 4000);
    };
    const setFocused = () => {
      onClipParse();
    };
    const setBlurred = () => {
      clearInterval(polling.value);
    };
    const setSectionsData = async () => {
      try {
        const dataLocal: any = localStorage.getItem('sections');

        if (JSON.parse(dataLocal)) {
          store.dispatch('setSetionData', JSON.parse(dataLocal));
        } else {
          const data: any[] | undefined = await firebaseBdDataSetStore();
          store.dispatch('setSetionData', data);
        }
      } catch (error) {
        console.error('setSetionData', error);
      }
    };

    onBeforeUnmount(() => {
      window.removeEventListener('focus', setFocused);
      window.removeEventListener('blur', setBlurred);
    });

    onMounted(() => {
      window.addEventListener('focus', setFocused);
      window.addEventListener('blur', setBlurred);

      setSectionsData();
      onClipParse();
      initTheme();

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
      currentTheme,
      switchTheme
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
      @apply dark:text-white dark:bg-rb-dark;
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
  @apply dark:text-white dark:bg-rb-dark bg-rb-light;
}
</style>
