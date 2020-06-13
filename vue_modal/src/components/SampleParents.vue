<template>
  <div class="container">
    <!-- csv アップデートのモーダル  -->
    <loading-modal ref="l_modal" modal_name="update_csv">
      <p slot="modal-header">Complite</p>
      <p slot="modal-body">更新が完了しました</p>
      <button slot="footer-right" @click="reload" class="submit-btn">再読み込み</button>
    </loading-modal>

    <!-- モデル作成中のモーダル  -->
    <loading-modal ref="l_modal" modal_name="create_model" :is_loading="is_loading">
      <p slot="modal-header-loading">モデルの作成中です...</p>
      <p slot="modal-header">{{ create_modal_title }}</p>
      <p slot="modal-body">{{ create_modal_body }}</p>
      <button slot="footer-right" @click="reload" class="submit-btn">再読み込み</button>
    </loading-modal>

    <main class="main">
      <!-- モデル生成ボタン -->
      <div>
        <button type="button" @click="createModel" class="submit-btn">モデルの作成</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
// 自作モジュール
import Mixin from "@components/mixins/mixin";
import LoadingModal from "@/components/modules/LoadingModal.vue";

export default {
  mixins: [Mixin],
  name: "SampleParents",
  components: {
    LoadingModal
  },
  data() {
    return {
      // モーダル
      is_loading: false
      // 初期値（ご自由に）
      //   create_modal_title: "少々お待ちください",
      //   create_modal_body: "モデル作成中"
    };
  },

  created: function() {},

  methods: {
    // csvのアップデート
    updateCSV: function() {
      const self = this;

      // モーダルの表示とグルグル
      self.modalSwitch(true, "update_csv");
      self.is_loading = true;

      // API叩く
      axios
        .post("http://0.0.0.0:5000/update_csv", data)
        .then(() => {
          self.is_loading = false;
          self.create_modal_title = "Complite";
          self.create_modal_body = "CSVアップデート完了しました";
        })
        .catch(err => {
          self.is_loading = false;
          self.create_modal_title = "Failed";
          self.create_modal_body = "予期せぬエラーが発生しました";
          console.log("err", err);
        });
    },

    // モデルの作成
    createModel: function() {
      const self = this;

      // モーダルの表示とグルグル
      this.modalSwitch(true, "create_model");
      self.is_loading = true;

      // API叩く
      axios
        .post("http://0.0.0.0:5000/createModel", params)
        .then(res => {
          self.is_loading = false;
          self.create_modal_title = "Complite";
          self.create_modal_body = "モデルの作成に成功しました";
          return res;
        })
        .catch(err => {
          self.is_loading = false;
          self.create_modal_title = "Failed";
          self.create_modal_body = "モデルの作成に失敗しました";
          console.log("err:", err);
        });
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding: 5% 5% 5% 15%;
  margin-right: auto;
  width: 80%;
  z-index: 50;
}

/* submitボタン */
.submit-btn {
  background: #3f51b5;
  color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  height: 36px;
  line-height: 35px;
  padding: 1px 30px 0;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
}
/* ローディング表示 */
.loading {
  margin: 40px;
}
.btn-wrapper-side {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px 10px 0px;
}
</style>
