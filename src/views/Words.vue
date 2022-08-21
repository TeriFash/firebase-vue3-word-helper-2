<template>
  <div class="words">
    <b-tabs content-class="mt-3">
      <b-tab v-for="(item, i) in getSectionsList" :key="i" :title="headerTitle(i)" lazy>
        <WordList :title="headerTitle(i)" :data-words="item" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import WordList from '@/components/WordList.vue';

export default defineComponent({
  name: 'Words',
  components: {
    WordList
  },
  setup() {
    return {};
  },
  computed: {
    ...mapGetters({ getSectionsList: 'getSectionsList' }),
    listTitles() {
      const listKeys: any = this.getSectionsList;
      return Object.keys(listKeys);
    }
  },
  methods: {
    headerTitle(i: any) {
      console.log('✅ 🧊 ~ i', i);
      // const key: any = this.listTitles[i];
      return `${i[0].toUpperCase()}${i.slice(1)}`;
    }
  }
});
</script>
