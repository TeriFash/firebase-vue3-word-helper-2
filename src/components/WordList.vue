<template>
  <div class="word-list container mx-auto">
    <h1 class="font-bold text-3xl text-gray-700 mt-8">{{ headerTitle }} !!</h1>
    <b-list-group class="word-list__container mt-4">
      <WordListItem v-for="(item, i) in dataWords" :key="i" :text="item" />
    </b-list-group>
  </div>
  <!-- :text-key="[index++, listLength[tabActive]]" -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

// import { useI18nParam } from "@/i18n/utils";

import WordListItem from "@/components/WordListItem.vue";

export default defineComponent({
  name: "WordList",
  props: {
    title: {
      type: [String],
      default: ""
    },
    dataWords: {
      type: [Object],
      default: () => ({})
    }
  },
  components: {
    WordListItem
  },
  computed: {
    ...mapGetters({
      getTextInputName: "getTextInputName",
      getClipboardData: "getClipboardData",
      getClipboardLoading: "getClipboardLoading",
      getSectionsList: "getSectionsList"
    }),
    headerIndex() {
      return Object.keys(this.getSectionsList).findIndex(
        (e) => e === this.title
      );
    },
    headerTitle() {
      return `${this.title[0].toUpperCase()}${this.title.slice(1)}`;
    }
  }
});
</script>
