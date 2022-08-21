<template>
  <div class="layout">
    <template v-if="user.user"> {{ user.user.displayName }}!! </template>
    <!-- <Languages class="mt-4" /> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

import { auth, firebaseBdDataSetStore } from '@/utils/firebase';
import { User } from 'firebase/auth';

import { useI18nParam } from '@/i18n/utils';

// import Languages from '@/components/Languages.vue'

interface UserData {
  user: User | null;
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    // Languages
  },
  async setup() {
    const store = useStore();
    const user = reactive<UserData>({ user: null });
    useI18nParam();

    const setClipboardData = async () => {
      try {
        const data = await firebaseBdDataSetStore();
        // const sections: [] | undefined = [...data].find((item) => item?.accompanying )
        store.commit('loadData', data);
        store.commit('loadSections', data);
      } catch (error) {
        console.error('setClipboardData', error);
      }
    };

    onMounted(() => {
      setClipboardData();

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
      user
    };
  }
});
</script>
<style lang="scss">
.layout {
  @apply container mx-auto pt-6;
}
</style>
