// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default {
  data: () => ({}),
  created() {
    window.addEventListener('resize', this.setFullHeight);
  },
  mounted() {
    this.setFullHeight();
  },
  unmounted() {
    window.removeEventListener('resize', this.setFullHeight);
  },
  methods: {
    setFullHeight() {
      const vh = window.innerHeight * 0.01;
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--vh', `${vh}px`);
    },
  },
};
