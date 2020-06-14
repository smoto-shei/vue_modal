<template>
  <div id="all">
    <div class="wrapper">
      <div class="signin">
        <div class="title">
          <h1>Process Test</h1>
        </div>

        <!-- 1 -->
        <div class="btn-column">
          <button @click="nonProcess()" class="signin-btn">普通に実行</button>
        </div>

        <!-- 2 -->
        <div class="btn-column">
          <button @click="useSetTimeout1()" class="signin-btn">
            setTimeout使う
          </button>
        </div>

        <!-- 3 -->
        <div class="btn-column">
          <button @click="useCallBack()" class="signin-btn">
            setTimeoutにコールバック関数を定義
          </button>
        </div>

        <!-- 4 -->
        <div class="btn-column">
          <button @click="buyApple1()" class="signin-btn">
            150円のりんご買う(同期)
          </button>
        </div>

        <!-- 5 -->
        <div class="btn-column">
          <button @click="buyApple2()" class="signin-btn">
            150円のりんご買う(コールバック地獄)
          </button>
        </div>

        <!-- 6 -->
        <div class="btn-column">
          <button @click="buyApple3()" class="signin-btn">
            150円のりんご買う(プロミスバージョン)
          </button>
        </div>

        <!-- 7 -->
        <div class="btn-column">
          <button @click="buyApple4()" class="signin-btn">
            150円のりんご買う(プロミスバージョン(アロー関数にした))
          </button>
        </div>

        <!-- 8 -->
        <div class="btn-column">
          <button @click="buyApple5()" class="signin-btn">
            150円のりんご買う(async await 正解の書き方)
          </button>
        </div>

        <!-- 9 -->
        <div class="btn-column">
          <button @click="buyApple6()" class="signin-btn">
            150円のりんご買う(async await エラー処理失敗パターン)
          </button>
        </div>

        <!-- 9 -->
        <div class="btn-column">
          <button @click="buyApple7()" class="signin-btn">
            150円のりんご買う(await 失敗パターン)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcessDemo",
  methods: {
    // 最初のボタン
    nonProcess() {
      console.log(1);
      console.log(2);
      console.log(3);
    },

    // 2番目のボタン
    useSetTimeout1() {
      console.log(1);
      setTimeout(function() {
        console.log(2);
      }, 1000);
      console.log(3);
    },

    // ３番目のボタン
    useCallBack() {
      //コールバック関数を別に定義
      var logresult = function() {
        console.log(2);
      };

      console.log(1);
      setTimeout(logresult, 1000);
      console.log(3);
    },

    // 同期的にりんごかう
    syncBuyApple(payment) {
      if (payment >= 150) {
        return { change: payment - 150, error: null };
      } else {
        return { change: null, error: 150 - payment + "円足りません。" };
      }
    },

    // ４番目のボタン
    buyApple1() {
      // 初回
      var result1 = this.syncBuyApple(500);
      if (result1.change !== null) {
        console.log("1つ目のおつりは" + result1.change + "円です。");
      }
      if (result1.error !== null) {
        console.log("1つ目でエラーが発生しました：" + result1.error);
      }

      // ２回目
      var result2 = this.syncBuyApple(result1.change);
      if (result2.change !== null) {
        console.log("2つ目のおつりは" + result2.change + "円です。");
      }
      if (result2.error !== null) {
        console.log("2つ目でエラーが発生しました：" + result2.error);
      }

      // ３回目
      var result3 = this.syncBuyApple(result2.change);
      if (result3.change !== null) {
        console.log("3つ目のおつりは" + result3.change + "円です。");
      }
      if (result3.error !== null) {
        console.log("3つ目でエラーが発生しました：" + result3.error);
      }

      // ４回目
      var result4 = this.syncBuyApple(result3.change);
      if (result4.change !== null) {
        console.log("4つ目のおつりは" + result4.change + "円です。");
      }
      if (result4.error !== null) {
        console.log("4つ目でエラーが発生しました：" + result4.error);
      }
    },

    // 1秒後にりんご買う
    aSecondBuyApple(payment, callback) {
      setTimeout(function() {
        if (payment >= 150) {
          callback(payment - 150, null);
        } else {
          callback(null, "金額が足りません。");
        }
      }, 1000);
    },

    // 5番目のボタン
    // いわゆるコールバック地獄。ネストが深くなってしまう。
    buyApple2() {
      const self = this;
      self.aSecondBuyApple(500, function(change, error) {
        if (change !== null) {
          console.log("１回目のおつりは" + change + "円です。");
          self.aSecondBuyApple(change, function(change, error) {
            if (change !== null) {
              console.log("２回目のおつりは" + change + "円です。");

              self.aSecondBuyApple(change, function(change, error) {
                if (change !== null) {
                  console.log("３回目のおつりは" + change + "円です。");
                }
                if (error !== null) {
                  console.log("３回目でエラーが発生しました：" + error);
                }
              });
            }
            if (error !== null) {
              console.log("２回目でエラーが発生しました：" + error);
            }
          });
        }
        if (error !== null) {
          console.log("１回目でエラーが発生しました：" + error);
        }
      });
    },

    // りんごプロミス
    promiseBuyApple(payment) {
      // 成功した場合に実行する関数（okFunc)、失敗したときに実行する関数(ngFunc)を渡す
      // 一般的には resolve, reject が返される
      // 呼び出し側で,resolveが帰って来たら .then に渡され rejectが帰って来たら .catchに渡される
      return new Promise(function(okFunc, ngFunc) {
        if (payment >= 150) {
          okFunc(payment - 150);
        } else {
          ngFunc("金額が足りません。");
        }
      });
    },

    // ６番目のボタン
    buyApple3() {
      const self = this;
      self
        .promiseBuyApple(400)
        // thenの場合はresolveが帰ってくす
        .then(function(change) {
          console.log("おつりは" + change + "円です");
          return self.promiseBuyApple(change);
        })
        .then(function(change) {
          console.log("おつりは" + change + "円です");
          return self.promiseBuyApple(change);
        })
        .then(function(change) {
          console.log("おつりは" + change + "円です");
        })
        .catch(function(error) {
          console.log("エラーが発生しました：" + error);
        });
    },

    // 7番目のボタン(アロー関数バージョン)
    buyApple4() {
      const self = this;
      ////りんごをたくさん買う
      self
        .promiseBuyApple(400)
        .then(change => {
          console.log("おつりは" + change + "円です");
          return self.promiseBuyApple(change);
        })
        .then(change => {
          console.log("おつりは" + change + "円です");
          return self.promiseBuyApple(change);
        })
        .then(change => {
          console.log("おつりは" + change + "円です");
        })
        .catch(error => {
          console.log("エラーが発生しました：" + error);
        });
    },

    // OK 疑似的 API
    fakeAPI(payment) {
      // プロミスを作る
      return new Promise(function(okFunc, ngFunc) {
        setTimeout(function() {
          if (payment >= 150) {
            okFunc(payment - 150);
          } else {
            ngFunc("金額がたりません");
          }
        }, 1000);
      });
    },

    // 8番目のボタン
    async buyApple5() {
      // await は Promise の値が取り出されるまでまつ
      // 処理に失敗した場合(==ngFuncが帰って来た場合)は catch に入る
      const self = this;
      try {
        var status = await self.fakeAPI(1000);
        console.log("残りの金額は", status, "円です");
      } catch (error) {
        console.log(error);
      }
    },

    // 9番目のボタン
    async buyApple6() {
      // これでもいいかと思ったけど、ngFuncが帰って来たときにエラーになる
      const self = this;
      var status = await self.fakeAPI(100);
      console.log(status);
    },

    // NG 疑似的 API
    async fakeAPIng(payment) {
      // プロミスをでないと呼び出しもとで await されても待てない
      setTimeout(function() {
        if (payment >= 150) {
          console.log("fakeAPIng実行");
          return payment - 150;
        } else {
          console.log("fakeAPIng実行");
          return 0;
        }
      }, 1000);
    },

    // 9番目のボタン
    async buyApple7() {
      // いくら await を書いても関数がプロミスでなければ待てない
      // await はあくまで Promise の値を取り出すまでまつやつ
      const self = this;
      var status = await self.fakeAPIng(500);
      console.log("status", status);
    }

    // ------------- 実際に外部のAPI叩いて同期処理書いてる例 ---------------
    // ストライプのAPIを叩く→ FireStore の更新を行う → ページ遷移 を同期的に行っているコード
    // stripe側の再開関数
    // async stripeRestart() {
    //   let sub_id = this.stripe_fs_info.subscription.id;
    //   let restartStripeSubscriptionFunc = await firebase
    //     .functions()
    //     .httpsCallable("restartStripeSubscription");

    //   let stripe_res = await restartStripeSubscriptionFunc({
    //     sub_id: sub_id
    //   });
    //   return stripe_res;
    // },

    // // FS側の書き換え関数
    // async updateFSSubscription(stripe_res) {
    //   let self = this;
    //   let FS_result = await firebase
    //     .firestore()
    //     .collection("stripe_customers")
    //     .doc(self.currentUser.uid)
    //     .update({ "subscription.status.behavior": "continue" });
    //   return FS_result;
    // },

    // // 再開の一連の流れ
    // async restartSubscription() {
    //   const self = this;
    //   self.is_loading = true;

    //   // 1.stripe側の更新
    //   const stripe_res = await self.stripeRestart();
    //   // エラーハンドリング
    //   if (stripe_res.data.error !== void 0) {
    //     self.modalSwitch(false, "reSubsctiption");
    //     self.modal_title = "Failed";
    //     self.modal_body = "予期せぬエラーが発生しました";
    //     return "error";
    //   }

    //   // 2. firestore側のsubsctiptionの情報更新
    //   const FS_result = await self.updateFSSubscription(stripe_res);

    //   self.$router.push({
    //     name: "Account"
    //   });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  margin: 0 auto;
  max-width: 480px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: left;
}
.signin {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.input-box {
  align-items: stretch;
  padding: 20px 20px 0;
  font-size: 12px;
}
input {
  display: block;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid gray;
}
input:focus {
  border-bottom: 1px solid blue;
  outline: none;
}

.btn-column {
  display: flex;
  padding: 20px 20px 0;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.link {
  /* text-decoration: underline #00a4c9; */
}
.what-texta {
  display: flex;
  margin-top: 2vw;
  font-size: 1vw;
}
.forget-btn {
  color: #00a4c9;
}
.signin-btn {
  background: #3f51b5;
  color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  height: 36px;
  line-height: 35px;
  padding: 1px 16px 0;
  border-radius: 2px;
  font-weight: 500;
  cursor: pointer;
}

/* モーダル  */
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
  height: 20%;
  padding: 5px 25px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.modal-header p {
  height: 20%;
  font-size: 23px;
  font-weight: bold;
  text-align: center;
}
.modal-body {
  text-align: center;
  height: 60%;
  padding: 5px 25px;
}
.modal-footer {
  position: relative;
  height: 20%;
  padding: 5px 25px;
  border-top: 1px solid #ddd;
}
.footer-left {
  color: #3399ff;
  position: absolute;
  top: 50%;
  left: 13%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
.footer-right {
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>
