import { Directive, DirectiveBinding, isRef } from "vue";

type TriggerEventType = "contextmenu" | "click";

interface ContextmenuDirectiveValue {
  trigger?: TriggerEventType | TriggerEventType[];
}

interface ReferenceOptions {
  triggers: TriggerEventType[];
  handler: (evt: Event) => void;
}

interface ContextmenuDirectiveEl extends Element {
  $contextmenuKey?: string;
}
type ContextmenuDirectiveBinding = DirectiveBinding<ContextmenuDirectiveValue>;

// FIXME
type ContextmenuRef = any;

const bind = (
  el: ContextmenuDirectiveEl,
  binding: ContextmenuDirectiveBinding,
): void => {
  const contextmenuKey = binding.arg;

  if (!contextmenuKey) {
    console.error("🔺Неверный параметр");
    return;
  }

  const contextmenuOptions = binding.value;
  const contextmenuRef: ContextmenuRef = isRef(contextmenuKey)
    ? contextmenuKey.value
    : binding.instance?.$refs[contextmenuKey];

  if (!contextmenuRef) {
    console.error(`🔺Не смог найти ${contextmenuKey} соответствующий экземпляр`);
    return;
  }

  if (typeof contextmenuRef.addReference !== "function") {
    console.error(`🔺${contextmenuKey} Соответствующий экземпляр не VContextmenu`);
    return;
  }

  el.$contextmenuKey = contextmenuKey;

  contextmenuRef.addReference(el, contextmenuOptions);
};

const unbind = (
  el: ContextmenuDirectiveEl,
  binding: ContextmenuDirectiveBinding,
): void => {
  const contextmenuKey = el.$contextmenuKey;

  if (!contextmenuKey) return;

  const contextmenuRef: ContextmenuRef =
    binding.instance?.$refs[contextmenuKey];

  contextmenuRef?.removeReference(el);
};

const rebind = (
  el: ContextmenuDirectiveEl,
  binding: ContextmenuDirectiveBinding,
): void => {
  unbind(el, binding);
  bind(el, binding);
};

const contextmenuDirective: Directive<
  ContextmenuDirectiveEl,
  ContextmenuDirectiveValue
> = {
  mounted: bind,
  updated: rebind,
  beforeUnmount: unbind,
};

export default contextmenuDirective;