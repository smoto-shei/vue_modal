export default {
    data() {
      return {};
    },
    computed: {},
    methods: {
      // modal
      modalSwitch: function(judge, modal_name) {
        if (judge == true) {
          this.$refs.l_modal.show(modal_name);
        } else {
          this.$refs.l_modal.hide(modal_name);
        }
      },

      // reload
      reload: function() {
        location.reload();
      },
    }
  };
