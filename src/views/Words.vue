<template>
  <div class="words">
    <b-tabs
      v-model="tabIndex"
      nav-class="words__tab-nav"
      active-nav-item-class="words__tab-nav--active"
      active-tab-class="words__tab--active"
      content-class="mt-3"
      nav-wrapper-class="words__tab container px-4 "
      :lazy="true"
    >
      <b-tab
        class="words__tab px-4 mx-auto container"
        title-item-class="words__tab-title"
        href="#"
        v-for="(item, i, num) in getSectionsList"
        :key="i"
        :title-link-class="linkClass(num)"
        :title="headerTitle(i)"
        :lazy="true"
      >
        <word-list @dialog="handlerAlertSuccess" :title="i" :data-words="item" />
      </b-tab>
    </b-tabs>
    <div class="words__alerts">
      <b-alert
        v-model="dismissCountDown"
        dismissible
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        :show="dismissCountDown"
        fade
        :variant="typeAlert"
        >{{ textAlertComplete }}</b-alert
      >
    </div>
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
      tabIndex: 0,
      showAlert: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      typeAlert: 'success',
      textAlert: 'Done'
    };
  },
  computed: {
    ...mapGetters({
      getSectionsList: 'getSectionsList',
      getSectionsTitles: 'getSectionsTitles',
      getClipboardData: 'getClipboardData',
      getTabActive: 'getTabActive'
    }),
    listIndex() {
      const listKeys: any = Object.keys(this.getSectionsTitles);
      return listKeys;
    },
    listTitles() {
      const listValues: any = Object.values(this.getSectionsTitles);
      return listValues;
    },
    textAlertComplete() {
      const listValues: any = `${this.typeAlert[0].toUpperCase()}${this.typeAlert.slice(1)} (${this.textAlert}) COPY!`;
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
    countDownChanged(dismissCountDown: any) {
      this.dismissCountDown = dismissCountDown;
    },
    handlerAlertSuccess(event: Event) {
      this.typeAlert = event.type;
      this.textAlert = this.getClipboardData;

      this.showAlert = true;
      this.dismissCountDown = this.dismissSecs;
    },
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

.words {
  position: relative;
  &__alerts {
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 60vw;
    width: 100%;
  }
}

.words__nav-link {
  @apply hover:text-gray-600;

  &.active {
    @apply text-gray-600 hover:text-gray-600 bg-green-600;
  }
}
</style>
