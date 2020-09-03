export default {
  methods: {
    copy(node) {
      const range = document.createRange();

      range.selectNode(node);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy')
      selection.removeAllRanges();
    }
  }
}