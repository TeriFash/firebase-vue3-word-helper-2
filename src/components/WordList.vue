<template>
  <div class="word-list container mx-auto">
    <h1 class="font-bold text-3xl text-gray-700 mt-8">{{ headerTitle }} !</h1>
    <b-list-group class="word-list__container mt-4">
      <word-list-item
        @dialog="handlerAlertSuccess($event)"
        v-for="(item, i) in getSectionsList[title]"
        :handler="i"
        :key="i"
        :text="item"
      />
    </b-list-group>
    <b-alert :show="dismissCountDown" :variant="typeAlert">Success Alert</b-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import WordListItem from '@/components/WordListItem.vue';

export default defineComponent({
  name: 'WordList',
  props: {
    title: {
      type: [String],
      default: ''
    },
  },
  data() {
    return {
      showAlert: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      typeAlert: 'success'
    };
  },
  components: {
    WordListItem
  },
  computed: {
    ...mapGetters({
      getTextInputName: 'getTextInputName',
      getClipboardData: 'getClipboardData',
      getClipboardLoading: 'getClipboardLoading',
      getSectionsList: 'getSectionsList',
      getSectionsTitles: 'getSectionsTitles'
    }),
    headerIndex() {
      return Object.keys(this.getSectionsList).findIndex((e) => e === this.title);
    },
    headerTitle() {
      return this.getSectionsTitles[this.title];
    }
  },
  methods: {
    countDownChanged(dismissCountDown: any) {
      this.dismissCountDown = dismissCountDown;
    },
    handlerAlertSuccess(event: Event) {
      this.typeAlert = event.type;
      this.dismissCountDown = 5;
    }
  }
});
</script>
