<template>
  <div>
    // eslint-disable
    <select @change="updateValue()">
      <option
        v-for="(option, index) in languages"
        :value="option"
        :key="index"
        :selected="option == selectedValue ? true : false"
      >
        {{ $t("languages." + option) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { languages } from "@/i18n/index";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const i18n = useI18n();

    const selectedValue = ref(i18n.locale.value);

// (property) 'change': ((payload: Event) => void) | undefined
    const updateValue = (value: { target: { value: any; }; }) => {
			// value: {target: HTMLSelectElement}
		// const {target: HTMLSelectElement} = event.target as HTMLSelectElement
      const basePath = (() => {
        if (route.params.lang) {
          return route.path.slice(route.params.lang.length + 1);
        }
        return route.path;
      })();
      const newPath = `/${value.target.value}${basePath}`;
      if (newPath !== route.path) {
        router.push(newPath);
      }
    };
    return {
      languages,
      selectedValue,
      updateValue,
    };
  },
});
</script>
