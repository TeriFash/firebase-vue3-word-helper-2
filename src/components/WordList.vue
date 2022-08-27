<template>
  <!-- <h1 class="font-bold text-3xl text-gray-700 mt-8">{{ headerTitle }} !</h1> -->
  <b-list-group class="word-list">
    <word-list-item
      class="word-list__item"
      v-for="(item, i) in data"
      :handler="i"
      :key="i"
      :text="setText(item)"
    />
  </b-list-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { useTextInClipboard } from '@/utils/utils';
import WordListItem from '@cc/WordListItem.vue';

export default defineComponent({
  name: 'WordList',
  props: {
    title: {
      type: [String],
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
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
      return Object.keys(this.getSectionsList).findIndex(
        (e) => e === this.title
      );
    },
    headerTitle() {
      return this.getSectionsTitles[this.title];
    }
  },
  methods: {
    firstWordUppercase(val: string) {
      if (!val) return '<span class="mark text-gray-400">{ name }</span>';
      return `${val[0].toUpperCase()}${val.slice(1)}`;
    },
    setText(val: string) {
      const { value }: any = useTextInClipboard();
      let text;
      const opt = {
        name: '{ }',
        nameCompany: '{ $2 }',
        titleOffer: '{ $1 }',
        cost: '{ $cost }',
        time: '{ $time }'
      };
      const headerFixer = this.firstWordUppercase(value);
      text = val.replace(opt.name, headerFixer);
      if (this.title === 'rare') {
        return text.split(' ').slice(1).join(' ');
      }

      return text;
    }
  }
});
</script>
<styles scoped lang="scss">
.word-list {
  @apply mx-auto;

  &__item {
    @apply mx-auto py-4 hover:bg-gray-200;
  }
}
</styles>
