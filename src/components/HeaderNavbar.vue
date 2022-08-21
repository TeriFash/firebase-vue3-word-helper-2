<template>
  <b-navbar class="header-navbar" id="nav" toggleable="md" type="dark" variant="dark">
    <b-navbar-brand :to="localizedUrl('/')" href="#">Words</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mr-auto">
        <template v-if="signedIn">
          <b-nav-item :to="localizedUrl('/')">Home | </b-nav-item>
          <b-nav-item :to="localizedUrl('/about')">About | </b-nav-item>
        </template>
        <template v-else>
          <b-nav-item :to="localizedUrl('/')">Home | </b-nav-item>
          <b-nav-item :to="localizedUrl('/about')">About | </b-nav-item>
          <b-nav-item :to="localizedUrl('/account')">Signin | </b-nav-item>
          <b-nav-item :to="localizedUrl('/words')"> Words</b-nav-item>
        </template>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav justified>
        <b-nav-form class="d-flex">
          <b-form-input size="sm" class="py-2 mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="ml-1 mr-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <Languages navbar />

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18nParam } from '@/i18n/utils';
import Languages from '@/components/Languages.vue';
// import { useUser } from '@/utils/utils';

export default defineComponent({
  name: 'HeaderNavbar',
  props: {
    signedIn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Languages
  },
  setup() {
    useI18nParam();
    // const user = useUser();
    return {
      // user
    };
  }
});
</script>

<style lang="scss">
.header-navbar {
  &.navbar {
    @apply p-6;
  }

  & .nav-link {
    @apply text-gray-600;
  }

  & a {
    @apply font-bold text-gray-700;
  }

  & a.router-link-exact-active {
    @apply text-green-600;
  }

  & .nav-item.dropdown {
    @apply text-gray-600 outline-none focus:outline-none active:outline-none hover:outline-none;

    & .btn-group {
      @apply outline-none focus:outline-none;
    }

    & .btn.btn-link.dropdown-toggle.show {
      box-shadow: none;
      @apply text-gray-700 bg-gray-800 outline-none focus:outline-none active:outline-none hover:outline-none;
    }
    & .btn.btn-link.dropdown-toggle {
      text-decoration: none;
      box-shadow: none;
      @apply text-gray-600 outline-none focus:outline-none;
    }
  }
}
</style>
