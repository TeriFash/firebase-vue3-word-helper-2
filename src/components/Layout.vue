<template>
  <div class="layout" :class="`bg-${currentTheme}`">
    <!-- <template v-if="$store.state.tabActive"> {{ $store.state.sectionsTitles[$store.state.tabActive] }}!! </template> -->
    <theme-switcher />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { currentTheme, initTheme, switchTheme } from '@/composables/useTheme';

import { auth, firebaseBdDataSetStore } from '@/utils/firebase';
import { User } from 'firebase/auth';

// import { useI18nParam } from '@/i18n/utils';

import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    ThemeSwitcher
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });

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

    onMounted(() => {
      setSectionsData();
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
