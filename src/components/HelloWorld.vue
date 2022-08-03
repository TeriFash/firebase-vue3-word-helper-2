<template>
  <div class="hello">
 <h1 class="text-4xl font-bold my-6">{{ $t("message.hello") }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  /* margin: 40px 0 0; */
  @apply mt-10;
}

ul {
  /* list-style-type: none;
  padding: 0; */
}

li {
  /* display: inline-block;
  margin: 0 10px; */
  @apply inline-block mx-3;
}

a {
  /* color: #42b983; */
  @apply text-green-600;
}
</style>
