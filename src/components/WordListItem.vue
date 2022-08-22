<template>
  <b-list-group-item href="#" class="word-list-item flex flex-row justify-between w-full">
    <div class="flex-auto w-full">
      <p class="word-list-item__paragraph" ref="contentListItem"></p>
    </div>
    <div class="flex-auto flex justify-end w-28">
      <b-button :disabled="true" squared variant="danger" class="word-list-item__button" @click="doDelete">
        Delete
        <!-- <b-icon icon="trash-fill" aria-hidden="true"></b-icon> -->
      </b-button>
    </div>
    <div class="flex-auto flex justify-end w-28">
      <b-button squared variant="success" class="word-list-item__button" @click="doCopy">
        Copy
        <!-- <b-icon icon="journals" aria-hidden="true"></b-icon> -->
      </b-button>
    </div>
  </b-list-group-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useToCopy from '@/composables/useToCopy';

// import { useStore } from "vuex";

// const { setData } = useActions(['setData'])

import { useTextInClipboard } from '@/utils/utils';

export default defineComponent({
  name: 'WordListItem',
  events: ['dialog'],
  props: {
    handler: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    textKey: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // isDblClick: false,
      isLoading: false,
      isSetText: '',
      dialogs: {
        delete: false
      }
      // useToCopy: useToCopy()
    };
  },
  mounted() {
    this.setText(this.text);
  },
  updated() {
    // const dataValue: any = initClipboardData();
    // const { value }: any = useTextInClipboard();
    // if (this.isSetText !== value) {
    //   this.setText(this.text);
    // }
  },
  methods: {
    firstWordUppercase(val: string) {
      if (!val) return '<span class="mark text-gray-400">{ name }</span>';
      return `${val[0].toUpperCase()}${val.slice(1)}`;
    },
    setText(val: string) {
      const { contentListItem = '' }: any = this.$refs;
      const { value }: any = useTextInClipboard();
      this.isSetText = value;

      if (!contentListItem) return;
      const opt = {
        name: '{ }',
        nameCompany: '{ $2 }',
        titleOffer: '{ $1 }',
        cost: '{ $cost }',
        time: '{ $time }'
      };
      const headerFixer = this.firstWordUppercase(value);
      const text = val.replace(opt.name, headerFixer);

      contentListItem.innerHTML = text;
      return text;
    },
    async doCopy() {
      try {
        const { contentListItem = '' }: any = this.$refs;
        this.isLoading = true;
        const tetx = contentListItem?.innerHTML;
        await useToCopy(tetx);
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
        await this.$emit('dialog', { type: 'success' });
        this.isLoading = false;
      } catch (error) {
        this.$emit('dialog', { type: 'danger' });
        this.isLoading = false;
      }
    },
    async doDelete() {
      try {
        // await this.deleteWord({ id: this.textKey[0], section: this.tabActive })
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
        this.$emit('dialog', 'success');
      } catch (error) {
        this.$emit('dialog', 'error');
      }
    }
  }
});
</script>

<style>
.word-list-item {
  justify-self: flex-start;
  flex-wrap: nowrap;
}

.word-list-item__button {
  height: 24px;
  min-height: 24px;
  width: 54px;
  min-width: 54px;
  padding: 2px 0;
  font-size: 12px;
  /* line-height: 20px; */
}

.word-list-item__button.btn-danger {
  background-color: var(--bs-red);
}

.word-list-item__button.btn-success {
  background-color: var(--bs-green);
}

.word-list-item__paragraph {
  text-align: left;
  /* width: fit-content; */
  width: 100%;
  display: inline-block;
}
</style>
