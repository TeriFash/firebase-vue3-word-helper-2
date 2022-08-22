<template>
  <b-nav-item-dropdown tag="ul" class="languages" v-if="navbar" :text="selectedValue" right>
    <b-dropdown-item
      class="text-1xl"
      @click="updateNavbarValue($event, option)"
      v-for="(option, index) in languages"
      :key="index"
      :title="option"
      >{{ $t('languages.' + option) }} <span class="text-1xl font-bold ml-2">{{ option }}</span></b-dropdown-item
    >
  </b-nav-item-dropdown>

  <select class="languages" v-else @change="updateValue">
    <option
      v-for="(option, index) in languages"
      :value="option"
      :key="index"
      :selected="option === selectedValue ? true : false"
    >
      {{ $t('languages.' + option) }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { languages } from '@/i18n/index';
import { useI18nParam } from '@/i18n/utils';

export default defineComponent({
  emits: ['change'],
  name: 'Languages',
  props: {
    navbar: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const i18n = useI18n();
    const selectedValue = ref(i18n.locale.value);
    const localLang: any = window.localStorage.getItem('lang');

    const lang = computed(() => {
      return (i18n.locale.value as string) || localLang;
    });

    const updateValue = (event: Event) => {
      const target: EventTarget | null = event.target;
      const { value }: any = target;

      const basePath = (() => {
        if (route.params.lang) {
          return route.path.slice(route.params.lang.length + 1);
        }
        return route.path;
      })();
      const newPath = `/${value}${basePath}`;
      if (newPath !== route.path) {
        router.push(newPath);
      }
    };

    const updateNavbarValue = (event: Event | any, value: string) => {
      if (value !== selectedValue.value) {
        const basePath = (() => {
          if (route.params.lang) {
            return route.path.slice(route.params.lang.length + 1);
          }
          return route.path;
        })();
        const newPath = `/${value}${basePath}`;
        if (newPath !== route.path) {
          router.push(newPath);
        }
      }
    };

    const initNavbarValue = (value: string) => {
      if (!route.params.lang) {
        const basePath = (() => {
          if (route.params.lang) {
            return route.path.slice(route.params.lang.length + 1);
          }
          return route.path;
        })();
        const newPath = `/${value}${basePath}`;
        if (newPath !== route.path) {
          router.push(newPath);
        }
      }
    };

    watch(lang, () => {
      selectedValue.value = lang.value;
    });

    onMounted(() => {
      useI18nParam();
      initNavbarValue(localLang);
    });

    return {
      languages,
      lang,
      selectedValue,
      updateValue,
      updateNavbarValue
    };
  }
});
</script>

<style lang="scss">
.languages {
  &.dropdown {
    /* @apply text-gray-600 outline-none focus:outline-none; */

    & .btn.btn-link.dropdown-toggle {
      text-decoration: none;
      text-transform: uppercase;
      @apply font-bold;
    }
  }
}
</style>
