<template>
  <li class="word-list-item flex w-full">
    <p class="word-list-item__paragraph" ref="contentListItem"></p>

    <button class="word-list-item__button" @click="doDelete">
      <i color="red lighten-1" class="btn-clipboard" />
    </button>

    <button class="word-list-item__button" @click="doCopy">
      <i color="green lighten-1" class="btn-clipboard" />
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { useStore } from "vuex";

// const { setData } = useActions(['setData'])

// import { useI18nParam } from "@/i18n/utils";

export default defineComponent({
  name: "WordListItem",
  props: {
    handler: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
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
      dialogs: {
        delete: false
      }
    };
  },
  mounted() {
    this.setText(this.text);
  },
  methods: {
    setText(val: string) {
      const { contentListItem = "" }: any = this.$refs;
      if (!contentListItem) return;
      const opt = {
        name: "{ }",
        nameCompany: "{ $2 }",
        titleOffer: "{ $1 }",
        cost: "{ $cost }",
        time: "{ $time }"
      };
      const headerDefault =
        this.handler || '<span class="mark text-gray-400">{ name }</span>';
      const headerDefaultFixer = `${headerDefault[0].toUpperCase()}${headerDefault.slice(
        1
      )}`;
      const text = val.replace(opt.name, headerDefaultFixer);

      contentListItem.innerHTML = text;
      return text;
    },
    async doCopy() {
      // console.log("✅ [87] ~ e", e);
      try {
        this.isLoading = true;
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
        this.$emit("dialog", "success");
      } catch (error) {
        this.$emit("dialog", "error");
      }
    },
    async doDelete() {
      try {
        // await this.deleteWord({ id: this.textKey[0], section: this.tabActive })
        // await this.$copyText(this.$refs.contentListItem.innerHTML)
        this.$emit("dialog", "success");
      } catch (error) {
        this.$emit("dialog", "error");
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
}

.word-list-item__paragraph {
  text-align: left;
  /* width: fit-content; */
  width: 100%;
  display: inline-block;
}
</style>
