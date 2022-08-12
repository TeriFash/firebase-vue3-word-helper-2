<template>
  <div id="nav">
    <template v-if="isSignedIn">
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link> |
    </template>
    <template v-else>
      <router-link :to="localizedUrl('/')">Home</router-link> |
      <router-link :to="localizedUrl('/about')">About</router-link> |
      <router-link :to="localizedUrl('/account')">Signin</router-link> |
      <router-link :to="localizedUrl('/words')">Words</router-link>
    </template>
  </div>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useUser, useIsSignedIn } from "@/utils/utils";

export default defineComponent({
  setup() {
    const user = useUser();
    const isSignedIn = useIsSignedIn();

    return {
      user,
      isSignedIn
    };
  }
});
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */

  @apply font-sans antialiased text-center text-gray-700;
}

body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* overflow-y: scroll; */
  scrollbar-color: #a0a3bd #eff0f7;
  scrollbar-width: thin;
}

body::-webkit-scrollbar-track {
  background-color: #eff0f7;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

body::-webkit-scrollbar {
  width: 5px;
  background-color: #eff0f7;
}

body::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #a0a3bd;
}

#nav {
  /* padding: 30px; */
  @apply p-8;
}

#nav a {
  /* font-weight: bold;
  color: #2c3e50; */
  @apply font-bold text-gray-700;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  @apply text-green-600;
}

a {
  @apply cursor-pointer;
}
</style>
