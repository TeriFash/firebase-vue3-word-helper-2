<template>
  <div class="account">
    <b-button
      class="account_btn"
      @click="googleSignin"
      title="'Google account'"
    >
      Signin with Google account
    </b-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { googleSignin } from '@utils/SocialLogin';

export default defineComponent({
  name: 'AccountPage',
  setup() {
    return {
      googleSignin: googleSignin(
        () => {
          console.log('✅ 🧊', this);
        },
        (err) => {
          console.log('✅ 🧊 ~ err', err);
        }
      )
    };
  }
});
</script>

<style scope lang="scss">
.account {
  &__btn.btn {
    @apply inline-flex h-12 items-center justify-center rounded-lg bg-blue-700  px-6 shadow-lg hover:bg-blue-700 hover:text-white;
  }
}
</style>
