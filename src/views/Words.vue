<template>
  <div class="words">
    <WordList v-for="(item, i) in getSectionsList" :key="i" :title="i" :data-words="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import WordList from "@/components/WordList.vue";

export default defineComponent({
  name: "Words",
  components: {
    WordList
  },
  setup() {
    return {};
  },
  computed: {
    ...mapGetters({ getSectionsList: "getSectionsList" }),
    listTitles() {
			const listKeys: any = this.getSectionsList;
      return Object.keys(listKeys);
    }
  }
});
</script>
