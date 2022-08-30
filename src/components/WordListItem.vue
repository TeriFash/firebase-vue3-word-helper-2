<template>
  <b-list-group-item
    class="word-list-item"
    :href="path"
    :action="true"
    :button="true"
    @click.prevent="toSelect"
  >
    <div class="word-list-item__left">
      <p
        class="word-list-item__paragraph"
        ref="contentListItem"
        v-clipboard:copy="text"
        :id="`text-${handler}`"
      ></p>
    </div>
    <div class="word-list-item__right">
      <b-button
        v-for="(btn, i) in btnList"
        :key="i"
        :class="btn.class"
        @click="doAction(btn.action)"
        :title="btn.title"
        :variant="`${btn.variant}`"
        :disabled="btn.disabled"
      >
        <b-icon-file-earmark-x-fill
          v-if="btn.variant === 'danger'"
          v-bind="iconsAttrs"
        />
        <b-icon-eraser-fill
          v-if="btn.variant === 'warning'"
          v-bind="iconsAttrs"
        />
        <b-icon-clipboard-data
          v-if="btn.variant === 'success'"
          v-bind="iconsAttrs"
        />
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
  props: {
    handler: {
      type: [String, Number],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    textObj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isLoading: false,
      isSetText: '',
      iconsAttrs: {
        width: '1.5em',
        height: '1.5em',
        viewBox: '0 0 16 16'
      },
      dialogs: {
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
    };
  },
  mounted() {
    this.textSet();
  },
  updated() {
    //
  },
  computed: {
    path() {
      return `${this.$route.path}#${this.handler}`;
    },
    btnList() {
      return [
        {
          title: 'Delete',
          variant: 'danger',
          action: 'delete',
          disabled: true,
          class: 'word-list-item__button'
        },
        {
          title: 'Clear',
          variant: 'warning',
          action: 'copy',
          disabled: false,
          class: 'word-list-item__button'
        },
        {
          title: 'Copy',
          variant: 'success',
          action: 'copy',
          disabled: false,
          class: 'word-list-item__button'
        }
      ];
    }
  },
  methods: {
    textSet() {
      const { contentListItem }: any = this.$refs;
      if (this.textObj.textMarked) {
        contentListItem.innerHTML = this.textObj.textMarked;
        return;
      } else {
        contentListItem.innerHTML = this.textObj.text;
        return;
      }
    },
    toSelect() {
      let doc: Document | any = document;
      let text = doc.getElementById(
        `text-${this.handler}`
      ) as HTMLElement | null;
      if (doc.body.createTextRange) {
        const range: any = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) {
        const selection: Selection | any = window.getSelection();
        const range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      const path = `${this.$route.path}#${this.handler}`;
      if (path) this.$router.push(path);
    },

    doAction(type: any) {
      switch (type) {
        case 'delete':
          this.doDelete();
          break;
        case 'clear':
          this.doClear();
          break;
        case 'copy':
        default:
          this.doCopy();
          break;
      }
    },
    async doCopy() {
      try {
        const { contentListItem }: any = this.$refs;
        this.isLoading = true;
        await useToCopy(this.text, contentListItem);
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.success,
          text: this.text
        });
        this.isLoading = false;
      } catch (error) {
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.error,
          text: this.text
        });
        this.isLoading = false;
      }
    },
    async doDelete() {
      try {
        // await this.deleteWord({ id: this.textKey[0], section: this.tabActive })
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.warning,
          text: this.text
        });
      } catch (error) {
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.error,
          text: this.text
        });
      }
    },

    async doClear() {
      try {
        this.isLoading = true;
        const res = await this.$copyTo(this.text, 'cut');
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.success,
          text: this.text
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.$emitter.emit('global-notifications-action', {
          ...this.dialogs.alert.error,
          text: this.text
        });
      }
    }
  }
});
</script>

<style scope lang="scss">
.word-list-item {
  justify-self: flex-start;
  flex-wrap: nowrap;
  appearance: none;
  user-select: text;

  @apply flex w-full justify-between;

  &__left {
    @apply flex flex-auto;
  }

  &__right {
    @apply ml-2 flex flex-auto justify-end;
  }

  &__paragraph {
    text-align: left;
    user-select: contain;
    display: inline;
    cursor: text;

    &::selection {
      @apply bg-green-200 px-2 text-gray-800 hover:bg-green-600;
    }
  }
}

.word-list-item__button {
  @apply ml-2;

  height: 34px;
  min-height: 34px;
  width: 34px;
  min-width: 34px;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-color: transparent;

  outline: none;
  &:hover {
    border-color: transparent;
    outline: none;
  }

  &.btn-danger {
    @apply bg-red-500 hover:bg-red-600;
  }

  &.btn-warning {
    @apply bg-orange-400 text-white hover:bg-orange-500;
  }

  &.btn-success {
    @apply border-collapse bg-green-500 text-white hover:bg-green-600;
  }
}
</style>
