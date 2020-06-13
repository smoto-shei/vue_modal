<template>
  <div>
    <modal
      :name="modal_name"
      :clickToClose="false"
      :draggable="false"
      :resizable="false"
      class="modal"
    >
      <div v-if="is_loading" class="modal-content">
        <div class="modal-header-loading">
          <slot name="modal-header-loading" class="modal-header-text">{{ load_header_text }}</slot>
        </div>
        <div class="modal-body">
          <loading v-if="is_loading" :active.sync="is_loading" :can-cancel="true" class="loading"></loading>
        </div>
      </div>
      <div v-if="!is_loading" class="modal-content">
        <div class="modal-header">
          <slot name="modal-header" class="modal-header-text"></slot>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <div class="footer-left">
            <slot name="footer-left"></slot>
          </div>
          <div class="footer-right">
            <slot name="footer-right"></slot>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  name: "LoadingModal",
  components: {
    Loading
  },
  data() {
    return {
      load_header_text: "少々お待ちください..."
    };
  },
  props: {
    modal_name: {
      type: String,
      defalult: ""
    },
    is_loading: {
      type: Boolean,
      default: false
    }
  },
  created: function() {},
  computed: {},
  methods: {
    show: function(modal_name) {
      this.$modal.show(modal_name);
    },
    hide: function(modal_name) {
      this.$modal.hide(modal_name);
    }
  }
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
.modal-content {
  height: 100%;
}

.modal-header {
  height: 16%;
  padding: 1% 25px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.modal-header-loading {
  height: 16%;
  padding: 1% 25px;
  text-align: center;
}
.modal-header p {
  height: 20%;
  font-size: 23px;
  font-weight: bold;
  text-align: center;
}
.modal-body {
  text-align: center;
  height: 56%;
  padding: 1% 25px;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  height: 16%;
  padding: 2% 25px;
  border-top: 1px solid #ddd;
}
</style>
