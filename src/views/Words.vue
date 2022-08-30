<template>
  <b-tabs
    class="words"
    v-model="tabIndex"
    nav-class="words__tab-nav"
    active-nav-item-class="words__tab-nav--active"
    active-tab-class="words__tab--active"
    content-class="words__tab--content"
    nav-wrapper-class="words__tab-nav--wrapper"
    :lazy="true"
  >
    <b-tab
      class="words__tab"
      title-item-class="words__tab-title"
      href="#"
      v-for="(item, i) in getSectionsKeys"
      :key="i"
      :active="i === tabIndex"
      :title-link-class="[
        'words__nav-link',
        `words__nav-link--${currentTheme}`
      ]"
      :lazy="true"
    >
      <template #title>
        <h5 class="mb-1">{{ getSectionsTitles[item] }}</h5>
        <b-badge :variant="i === tabIndex ? 'success' : 'disabled'" pill>{{
          getSectionsList[item].length
        }}</b-badge>
      </template>
      <template #default>
        <word-list :title="item" :data="getSearchedData" />
      </template>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { useGetTabActive, useTabActive } from '@utils/utils';
import { currentTheme } from '@use/useTheme';
import WordList from '@cc/WordList.vue';
// import { isNumber } from 'lodash';

export default defineComponent({
  name: 'Words',
  components: {
    WordList
  },
  setup() {
    onMounted(() => {
      useTabActive();
    });

    return { currentTheme };
  },
  data() {
    return {
      search: '',
      tabIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      getSectionsList: 'getSectionsList',
      getSectionsTitles: 'getSectionsTitles',
      getSectionsKeys: 'getSectionsKeys',
      getClipboardData: 'getClipboardData',
      getTabActive: 'getTabActive',
      getSectionCurrentData: 'getSectionCurrentData'
    }),
    listIndex() {
      const listKeys: any = Object.keys(this.getSectionsTitles);
      return listKeys;
    },
    listTitles() {
      const listValues: any = Object.values(this.getSectionsTitles);
      return listValues;
    },
    getSearchedData(): any {
      const list: any = Object.values(this.getSectionsList);
      if (this.search === '') return list[this.tabIndex];
      return list[this.tabIndex].filter((item: any) =>
        (item || '').toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  watch: {
    tabIndex: {
      immediate: false,
      handler(value, oldValue) {
        if (value !== oldValue) {
          this.setIndexTabActive(value);
        }
      }
    }
  },
  created() {
    const { value }: any = useGetTabActive();
    if (!value?.name) this.setTabActive(value);
    this.tabIndex = value.index;
  },
  mounted() {
    this.$emitter.on('global-search-action', (event: any) => {
      this.search = event;
    });
  },
  beforeMount() {
    // this.setIndexTabActive(this.tabIndex);
  },
  methods: {
    ...mapActions({
      setTabActive: 'setTabActive'
    }),
    headerTitle(idx: any) {
      return this.getSectionsTitles[idx];
    },
    setIndexTabActive(index: any, nameValue: any = '') {
      const name = nameValue || this.getSectionsKeys[index];
      this.setTabActive({ index, name });
    }
  }
});
</script>

<style lang="scss">
.words {
  button.words__nav-link {
    @apply text-gray-600 hover:text-green-600;

    &.words__tab-nav--active {
      @apply bg-green-600 text-white hover:text-white;
    }
  }

  & .nav-tabs .nav-link.active.words__nav-link--dark {
    @apply border-green-600 bg-green-600 text-white hover:text-white;
  }

  & .nav-tabs .nav-link.words__nav-link--dark {
    @apply border-gray-800 bg-gray-600 text-white hover:text-white;
  }

  &__tab {
    @apply container px-6;

    &--content {
      /* @apply mx-auto; */
    }
  }

  &__tab-nav--wrapper {
    @apply px-6;
  }

  &__tab-nav {
    border-width: 0;
    &--active {
    }
  }

  &__nav-link {
    position: relative;
    display: flex;
    h5 {
      @apply font-bold text-gray-400;
    }

    &.active {
      h5 {
        @apply font-bold text-white;
      }
    }

    .badge {
      margin-left: 10px;
    }

    .badge.bg-success {
    }

    .badge.bg-disabled {
      @apply bg-gray-200 font-bold text-gray-400 hover:text-gray-600;
    }

    &--dark {
      &.active {
        @apply border-green-600 bg-green-600 text-white hover:text-white;
      }
    }
  }
}
</style>
