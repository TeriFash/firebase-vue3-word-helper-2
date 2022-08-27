<template>
  <div class="theme-switcher" :class="currentTheme">
    <label class="theme-switcher__wrapper">
      <input
        @change="handlerUpdate"
        :value="currentTheme"
        type="checkbox"
        name="theme-switcher"
      />
      <div class="theme-switcher__container">
        <b-icon-brightness-high-fill
          class="theme-switcher__icon sun"
          v-bind="iconsAttrs"
        />
        <b-icon-arrow-right-short
          class="theme-switcher__icon arrow"
          v-bind="iconsAttrs"
        />
        <b-icon-moon-stars-fill
          class="theme-switcher__icon moon"
          v-bind="iconsAttrs"
        />
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { currentTheme, initTheme, switchTheme } from '@use/useTheme';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'ThemeSwitcher',
  // props: {
  //   theme: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    return {
      checkbox: false,
      iconsAttrs: {
        width: '1.5em',
        height: '1.5em',
        viewBox: '0 0 16 16'
      }
    };
  },
  components: {},
  setup() {
    // const user = useUser();
    // const visible = ref(true);
    return {
      // visible
      switchTheme,
      currentTheme
    };
  },
  created() {
    this.checkbox = currentTheme === 'light';
  },
  computed: {
    ...mapGetters({
      getTabActive: 'getTabActive',
      getSectionsTitles: 'getSectionsTitles'
    })
  },
  methods: {
    handlerUpdate(val: any) {
      switchTheme();
      this.checkbox = currentTheme === 'light';
    }
  }
});
</script>

<style lang="scss">
.theme-switcher {
  &.dark {
    --bg: #1d1f20;
    --switcher-bg: #232527;
    --shadow-color: #000000b0;
    --color-text: #777;
    --color-text-active: #7489ff;
    --color-arrow: #88888852;
  }
  &.light {
    --bg: #fcfcfc;
    --switcher-bg: #fff;
    --shadow-color: #00000044;
    --color-text: #88888895;
    --color-text-active: #7489ff;
    --color-arrow: #656565;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
  }

  &__icon {
    &.arrow {
      font-size: 24px;
      margin: 0px 20px;
      color: var(--color-arrow);
      transition: all 400ms cubic-bezier(0.995, -0.265, 0.855, 0.505);
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 156px;
    max-height: 60px;
    height: 100%;
    width: 100%;

    user-select: none;
    cursor: pointer;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0px 0px 20px -2px var(--shadow-color);
    background: var(--switcher-bg);

    transition: background-color 400ms cubic-bezier(0.995, -0.265, 0.855, 0.505),
      box-shadow 100ms linear;

    &:hover {
      box-shadow: 0px 0px 30px -2px var(--shadow-color);
    }

    input[type='checkbox'] {
      height: 0;
      width: 0;
      display: none;

      + div > .theme-switcher__icon {
        transition: all 400ms cubic-bezier(0.995, -0.265, 0.855, 0.505);
      }

      &:checked {
        + div {
          .arrow {
            transform: rotate(-180deg);
          }

          > :first-child {
            color: var(--color-text-active);
          }
        }
      }

      &:not(:checked) {
        + div {
          > :last-child {
            color: var(--color-text-active);
          }
        }
      }
    }
  }
}
</style>
