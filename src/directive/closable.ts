import { ObjectDirective } from "vue";

/*
  Allow an object to be closed when the user clicks outside of certain elements, example on a popup or a
  dropdown menu.
  Usage:
    v-closeable[onmount]= {
      ecluded: [], - array of classes to be excluded so when the user clicks does not affect
      handler: function  - function called on clicked outside
    }
    There's two ways of usage, one is when you use v-show or manipulate display css property, so the
    element is rendered but not showing, in that case use v-closeable, and it will attach the listener
    when you change it's visibility.

    <div v-show="expanded" v-closable="{ excluded: ['classes-to-be-excluded'], handler: expand }">
    The other way is using v-if so the element is not rendered until it's shown. In this case use
    v-closeableonmount with the same params as before.
    <div v-if="expanded" v-closableonmount="{ excluded: ['classes-to-be-excluded'], handler: expand }">
*/

const Closable = (onMount = false): ObjectDirective => ({
  mounted(el, binding) {
    el.handleClickOutside = (event:Event) => {
      event.stopPropagation();
      const { handler, excluded } = binding.value;
      let clickedOnExcludedEl = false;
      // Exclude elements passed as an Array
      if (excluded) {
        excluded.forEach((refName: any) => {
          if (!clickedOnExcludedEl) {
            const excludedEl = document.getElementsByClassName(refName)[0];
            clickedOnExcludedEl = excludedEl.contains(event.target as Node);
          }
        });
      }
      if (!el.contains(event.target) && !clickedOnExcludedEl) {
        handler(event);
      }
    }
    if(onMount) {
      document.addEventListener('mouseup', el.handleClickOutside);
    }
  },
  updated(el) {
    if(!onMount) {
      if (el.style.display !== 'none') {
        document.addEventListener('mouseup', el.handleClickOutside);
      } else {
        document.removeEventListener('mouseup', el.handleClickOutside);
      }
    }
  },
  unmounted(el) {
    document.removeEventListener('mouseup', el.handleClickOutside);
  }
});

export default Closable;