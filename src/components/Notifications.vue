<template>
  <div class="notifications" :class="`notifications--${type || eventType}`">
    <div :class="`notifications__conainer--${type || eventType}`" v-if="eventType === 'alert'">
      <b-alert
        v-model="alert.dismissCountDown"
        dismissible
        @dismissed="alert.dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        :show="alert.dismissCountDown"
        fade
        :variant="alert.typeAlert"
      >
        <h4 class="alert-heading">Well done!</h4>
        <hr />
        <p>{{ textAlertComplete }}</p>
      </b-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { TNotificationEvent } from '@/plugins/emitter/types';
import { defineComponent, reactive, onMounted } from 'vue';
import { mapGetters } from 'vuex';

// import { useI18nParam } from '@/i18n/utils';

// import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

export default defineComponent({
  name: 'Notifications',
  // events: ['dialog'],
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    //
  },
  data() {
    return {
      eventType: 'alert',
      alert: {
        showAlert: false,
        dismissSecs: 5,
        dismissCountDown: 0,
        typeAlert: 'success',
        textAlert: 'Done'
      }
    };
  },
  computed: {
    ...mapGetters({
      getClipboardData: 'getClipboardData'
    }),
    textAlertComplete() {
      return `${this.alert.typeAlert[0].toUpperCase()}${this.alert.typeAlert.slice(1)} "${this.alert.textAlert}"`;
    }
  },
  mounted() {
    this.$emitter.on('global-notifications-action', this.handlerNotification);
  },
  beforeUnmount() {
    this.$emitter.off('global-notifications-action', this.handlerNotification);
  },
  methods: {
    handlerNotification(event: TNotificationEvent) {
      console.log('✅ 🧊 ~ event', event);
      this.eventType = event.eventType;

      switch (this.eventType) {
        case 'notification':
          //
          break;
        case 'alert':
        default:
          this.handlerAlertSuccess(event);
          break;
      }
      //
    },
    countDownChanged(dismissCountDown: any) {
      this.alert.dismissCountDown = dismissCountDown;
    },
    handlerAlertSuccess(event: TNotificationEvent) {
      this.alert.typeAlert = event.type;
      this.alert.textAlert = this.getClipboardData;

      this.alert.showAlert = true;
      this.alert.dismissCountDown = this.alert.dismissSecs;
    },
    typeClass(idx: any) {
      if (idx) {
        return ['words__nav-link', 'bg-success', 'text-light'];
      } else {
        return ['words__nav-link', 'bg-light', 'text-gray-600'];
      }
    }
  }
});
</script>
<style lang="scss">
.notifications {
  /* @apply container mx-auto pt-6; */
  /* @apply dark:text-gray-50; */

  &--alert {
    //
  }

  &__conainer {
    position: relative;

    &--alert {
      position: fixed;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 60vw;
      width: 100%;
    }
  }
}
</style>
