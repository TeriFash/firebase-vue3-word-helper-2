<template>
  <div class="words">
    <b-tabs v-model="tabIndex" content-class="mt-3" nav-wrapper-class="words__tab" lazy>
      <b-tab
        class="words__tab"
        v-for="(item, i, num) in getSectionsList"
        :key="i"
        :title-link-class="linkClass(num)"
        :title="headerTitle(i)"
        lazy
      >
        <word-list :title="i" :data-words="item" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import WordList from '@/components/WordList.vue';

export default defineComponent({
  name: 'Words',
  components: {
    WordList
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      getSectionsList: 'getSectionsList',
      getSectionsTitles: 'getSectionsTitles',
      getTabActive: 'getTabActive'
    }),
    listIndex() {
      const listKeys: any = Object.keys(this.getSectionsTitles);
      return listKeys;
    },
    listTitles() {
      const listValues: any = Object.values(this.getSectionsTitles);
      return listValues;
    }
  },
  watch: {
    tabIndex(value, oldValue) {
      if (value !== oldValue) {
        this.setIndexTabActive(value);
      }
    }
  },
  created() {
    this.setIndexTabActive(this.tabIndex);
  },
  beforeMount() {
    this.setIndexTabActive(this.tabIndex);
  },
  methods: {
    ...mapActions({
      setTabActive: 'setTabActive'
    }),
    headerTitle(idx: any) {
      return this.getSectionsTitles[idx];
    },
    setIndexTabActive(idx: any) {
      const listKeys: any = Object.keys(this.getSectionsList);
      this.setTabActive(listKeys[idx]);
    },
    linkClass(idx: any) {
      if (this.tabIndex === idx) {
        return ['words__nav-link', 'bg-success', 'text-light'];
      } else {
        return ['words__nav-link', 'bg-light', 'text-gray-600'];
      }
    }
  }
});
</script>

<style lang="scss">
.words__tab {
  //
}

.words__nav-link {
  @apply hover:text-gray-600;

  &.active {
    @apply text-gray-600 hover:text-gray-600 bg-green-600;
  }
}
</style>
