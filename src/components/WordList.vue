<template>
  <b-list-group class="word-list">
    <word-list-item
      class="word-list__item"
      v-for="(item, i) in data"
      :handler="i"
      :key="i"
      :text="setText(item).text"
      :textObj="setText(item)"
    />
  </b-list-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { useTextInClipboard } from '@/utils/utils';
import { toUpperFirst } from '@/utils';
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
      if (!val) return '<span class="mark text-orange-600">{ name }</span>';
      return toUpperFirst(val);
    },
    replaceWord({ value, replaceIt, replaceBy, mark = false }: any) {
      const replaceByLocal = mark
        ? `<span class="mark text-green-600">${replaceBy}</span>`
        : replaceBy;
      return value.replace(replaceIt, replaceByLocal);
    },
    setText(val: string) {
      const { value }: any = useTextInClipboard();
      const opt = {
        name: '{ }',
        nameCompany: '{ $2 }',
        titleOffer: '{ $1 }',
        cost: '{ $cost }',
        time: '{ $time }'
      };
      const headerFixer = this.firstWordUppercase(value);

      const replace = {
        value: val,
        replaceIt: opt.name,
        replaceBy: headerFixer
      };
      const text = this.replaceWord(replace);
      const textMarked =
        value &&
        this.replaceWord({
          ...replace,
          mark: true
        });

      if (this.title === 'rare') {
        return text.split(' ').slice(1).join(' ');
      }
      return { text, textMarked };
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
