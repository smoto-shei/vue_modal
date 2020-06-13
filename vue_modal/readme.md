# 導入方法
## 流れ
1. モジュールインポート
2. main.js に追記
3. vueファイルを入れる
4. mixin.js の関数を追加


### 1. モジュールを2つインポートします
npm i vue-loading-overlay --save
npm i vue-js-modal --save

### 2. main.js に以下を記述
    ```
    import VModal from 'vue-js-modal'
    Vue.use(VModal)
    ```

### 3. modules/LoadingModal.vue をプロダクトのsrc/modules に入れる


## 使い方詳細

### 1. 親側で登録（components/SampleParents.vue 参考）
    - html

    ```
    <!-- モーダル の名前は指定する -->
    <loading-modal ref="l_modal" modal_name="update_csv">
      <p slot="modal-header">Complite</p>
      <p slot="modal-body">更新が完了しました</p>
      <button slot="footer-right" @click="reload" class="submit-btn">再読み込み</button>
    </loading-modal>
    ```

    - script
    ```
    <!-- 呼び込み -->
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
      // true の時は modalのbody は自動的にグルグルになる
      is_loading: false
    };

    ...

    <!-- モーダル 開け閉め -->
    <!-- 第二引数はモーダルの名前 -->
    　  self.modalSwitch(true, "update_csv");
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
            self.create_modal_body = "失敗です";
            console.log("err", err);
        });
    },
    ```

### 2. footer はご自由に。今はリロードするようにしてます。

# 参考
vue-js-modal
https://www.kabanoki.net/3144/

- loading
https://www.kabanoki.net/4916/