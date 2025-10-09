import Prism from 'prismjs';

export default {
  mounted(el: HTMLElement) {
    Prism.highlightElement(el);
  },
  updated(el: HTMLElement) {
    Prism.highlightElement(el);
  },
};
