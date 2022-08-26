<template>
  <!-- <h1 class="font-bold text-3xl text-gray-700 mt-8">{{ headerTitle }} !</h1> -->
  <b-list-group :flush="true" class="word-list mx-auto word-list__container mt-4">
    <word-list-item
      @dialog="$emit('dialog', $event)"
      v-for="(item, i) in getSectionsList[title]"
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
import WordListItem from '@/components/WordListItem.vue';

export default defineComponent({
  name: 'WordList',
  props: {
    title: {
      type: [String],
      default: ''
    },
    wordData: {
      type: [Object],
      default: () => ({})
    }
  },
  emits: ['dialog'],
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
      return Object.keys(this.getSectionsList).findIndex((e) => e === this.title);
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
      const opt = {
        name: '{ }',
        nameCompany: '{ $2 }',
        titleOffer: '{ $1 }',
        cost: '{ $cost }',
        time: '{ $time }'
      };
      const headerFixer = this.firstWordUppercase(value);
      const text = val.replace(opt.name, headerFixer);

      return text;
    }
  }
});
</script>
