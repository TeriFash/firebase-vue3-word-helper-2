<template>
  <b-navbar class="header-navbar" id="nav" toggleable="md" type="dark" variant="dark">
    <b-navbar-brand tag="h1" class="mb-0 mr-4" type="light" :to="localizedUrl('/')">
      Words
      <span class="header-navbar__subline" v-if="$store.state.tabActive">
        {{ $store.state.sectionsTitles[$store.state.tabActive] }}
      </span>
    </b-navbar-brand>

    <!-- <b-navbar-toggle :class="{ 'header-navbar__collapse-btn': true }" target="nav-collapse"></b-navbar-toggle> -->

    <b-navbar-toggle :class="{ 'header-navbar__collapse-btn': true }" target="nav-collapse">
      <!-- <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template> -->
    </b-navbar-toggle>

    <b-collapse
      @update:modelValue="collapse = $event"
      :class="{ 'header-navbar__collapse': collapse }"
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav :class="{ 'header-navbar__collapse-left': collapse }" class="mr-auto">
        <template v-if="signedIn">
          <b-nav-item :to="localizedUrl('/')">Home</b-nav-item>
          <b-nav-item :to="localizedUrl('/about')">About</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item :to="localizedUrl('/')">Home</b-nav-item>
          <b-nav-item :to="localizedUrl('/about')">About</b-nav-item>
          <b-nav-item :to="localizedUrl('/account')">SignIn</b-nav-item>
          <b-nav-item :to="localizedUrl('/words')">Words</b-nav-item>
        </template>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav justified :class="{ 'header-navbar__collapse-right': collapse }" class="ml-auto">
        <languages navbar />

        <b-nav-form class="d-flex">
          <b-form-input size="md" class="py-2 mr-md-2" placeholder="Search"></b-form-input>
          <b-button size="md" class="ml-1 mr-2 my-md-0" type="submit">Search</b-button>
        </b-nav-form>

        <!-- <b-nav-item-dropdown right>
          <template #button-content>
            <span>User</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
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
  data() {
    return {
      collapse: null
    };
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
  },
  methods: {
    handlerUpdate(val: any) {
      //
    }
  }
});
</script>

<style lang="scss">
.header-navbar {
  &.navbar {
    @apply p-6;

    .nav-link,
    .navbar-brand {
      @apply font-bold text-gray-600 hover:text-green-700;
    }

    .router-link-exact-active {
      @apply text-green-600 hover:text-green-700;
    }
  }
  &__subline {
    font-size: 12px;
    margin-left: 8px;
    @apply text-gray-500 hover:text-gray-600;
  }
  /* & a {
    @apply font-bold text-gray-700;
  }

  & a.router-link-exact-active {
    @apply text-green-600;
  } */

  & .nav-item.dropdown {
    @apply text-gray-600 outline-none focus:outline-none active:outline-none hover:outline-none;

    & .btn-group {
      @apply outline-none focus:outline-none;
    }

    & .btn.btn-link.dropdown-toggle.show {
      box-shadow: none;
      text-align: left;
      @apply text-gray-700 outline-none focus:outline-none active:outline-none hover:outline-none;
    }
    & .btn.btn-link.dropdown-toggle {
      text-decoration: none;
      box-shadow: none;
      @apply text-gray-600 outline-none focus:outline-none;
    }
  }
}

.header-navbar {
  .header-navbar__collapse-left {
    flex-direction: row;

    .nav-item {
      margin-right: 4px;
    }
  }

  .header-navbar__collapse-right {
    justify-content: flex-start;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;

    form {
      flex-grow: 1;
      max-height: 38px;
      width: 50%;
    }
    .nav-item {
      &.dropdown.languages {
        flex-direction: row;
        width: auto;
        display: flex;
        justify-self: flex-start;

        .dropdown-toggle {
          display: block;
        }
      }
      &.dropdown .btn-group {
        flex-direction: column;
      }
    }
  }

  .header-navbar__collapse-btn {
    &[type='button'] {
      .navbar-toggler-icon {
        /* background-color: #fff; */
        /* color: #fff; */
      }
      background-color: #fff;
    }
  }
}
</style>
