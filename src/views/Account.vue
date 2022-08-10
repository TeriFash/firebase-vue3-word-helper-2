<template>
  <div class="account">
    <b-button
      class="account-btn"
      @click="googleSignin"
      title="'Google account'"
      variant="info"
    >
<<<<<<< HEAD
      Signin with Google account
    </b-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { googleSignin } from '@utils/SocialLogin';
=======
      Signing with Google account
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { googleSignin } from "@/utils/SocialLogin";
>>>>>>> 426f61e (fix: page)

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

<style lang="scss">
.account {
  &.account-btn.btn.btn-info {
    @apply inline-flex justify-center rounded-lg px-6 shadow-lg;
  }
}
</style>
