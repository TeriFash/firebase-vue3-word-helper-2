<template>
  <b-list-group-item class="word-list-item flex flex-row justify-between w-full" :button="true" v-clipboard:copy="text">
    <div class="flex-auto w-full">
      <p class="word-list-item__paragraph" ref="contentListItem">
        {{ text }}
      </p>
    </div>
    <div class="flex-auto flex justify-end w-10 ml-2">
      <b-button title="Delete" :disabled="true" variant="danger" class="word-list-item__button" @click="doDelete">
        <b-icon-file-earmark-x-fill v-bind="iconsAttrs" />
      </b-button>
    </div>
    <div class="flex-auto flex justify-end w-10 ml-2">
      <b-button title="Clear" variant="warning" class="word-list-item__button" @click="doClear">
        <b-icon-eraser-fill v-bind="iconsAttrs" />
      </b-button>
    </div>
    <div class="flex-auto flex justify-end w-10 ml-2">
      <b-button title="Copy" variant="success" class="word-list-item__button" @click="doCopy">
        <b-icon-clipboard-data v-bind="iconsAttrs" />
      </b-button>
    </div>
  </b-list-group-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useToCopy, { toClipboard } from '@/composables/useToCopy';
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
      iconsAttrs: {
        width: '1.5em',
        height: '1.5em',
        viewBox: '0 0 16 16'
      },
      dialogs: {
        delete: false,
        alert: {
          success: {
            eventType: 'alert',
            type: 'success'
          },
          info: {
            eventType: 'alert',
            type: 'info'
          },
          warning: {
            eventType: 'alert',
            type: 'warning'
          },
          error: {
            eventType: 'alert',
            type: 'danger'
          }
        }
      }
      // useToCopy: useToCopy()
    };
  },
  mounted() {
    // this.setText(this.text);
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
        await useToCopy(this.text, contentListItem);
        await this.$emit('dialog', { type: 'success', text: this.text });
        this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.success, text: this.text });
        this.isLoading = false;
      } catch (error) {
        this.$emit('dialog', { type: 'danger' });
        this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.error, text: this.text });
        this.isLoading = false;
      }
    },
    async doDelete() {
      try {
        // await this.deleteWord({ id: this.textKey[0], section: this.tabActive })
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
				this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.warning, text: this.text });
        this.$emit('dialog', 'success');
      } catch (error) {
        this.$emit('dialog', 'error');
				this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.error, text: this.text });
      }
    },

    async doClear() {
      try {
        this.isLoading = true;
        const res = await this.$copyTo(this.text, 'cut');
        this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.success, text: this.text });
        // this.$emit('dialog', 'success');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.$emit('dialog', 'error');
        this.$emitter.emit('global-notifications-action', { ...this.dialogs.alert.error, text: this.text });
      }
    }
  }
});
</script>

<style lang="scss">
.word-list-item {
  justify-self: flex-start;
  flex-wrap: nowrap;

  &__paragraph {
    text-align: left;
    width: 100%;
    display: inline-block;
  }
}

.word-list-item__button {
  height: 34px;
  min-height: 34px;
  width: 34px;
  min-width: 34px;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &.btn-danger {
    @apply bg-red-500 hover:bg-red-600;
  }

  &.btn-warning {
    @apply bg-orange-400 hover:bg-orange-500 text-white;
  }

  &.btn-success {
    @apply bg-green-500 hover:bg-green-700;
  }
}
</style>
