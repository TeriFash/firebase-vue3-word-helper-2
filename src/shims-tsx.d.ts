// @ts-ignore
import Vue, { VNode } from 'vue';

// @ts-ignore
declare global {
  namespace JSX {
    // @ts-ignore
    type Element = VNode
    // @ts-ignore
    type ElementClass = Vue
    // @ts-ignore
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
