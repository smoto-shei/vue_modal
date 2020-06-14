# 非同期処理 のデモ
## 一番いい同期処理の書き方
- components/PromiseDemo.vue 内の buyApple5()
    - 待ちたい関数をプロミスにする → 実行する関数は async で作成 → 待ちたい関数の実行前に await をつける
```
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
    // 処理に失敗した場合は catch に入る
    const self = this;
    try {
    var status = await self.fakeAPI(1000);
    console.log("残りの金額は", status, "円です");
    } catch (error) {
    console.log(error);
    }
},
```

- 実際のAPIを使ったコード
```
// ストライプのAPIを叩く→ FireStore の更新を行う → ページ遷移 を同期的に行っているコード
// stripe側の再開関数
async stripeRestart() {
    let sub_id = this.stripe_fs_info.subscription.id;
    let restartStripeSubscriptionFunc = await firebase
    .functions()
    .httpsCallable("restartStripeSubscription");

    let stripe_res = await restartStripeSubscriptionFunc({
    sub_id: sub_id
    });
    return stripe_res;
},

// FS側の書き換え関数
async updateFSSubscription(stripe_res) {
    let self = this;
    let FS_result = await firebase
    .firestore()
    .collection("stripe_customers")
    .doc(self.currentUser.uid)
    .update({ "subscription.status.behavior": "continue" });
    return FS_result;
},

// 再開の一連の流れ
async restartSubscription() {
    const self = this;
    self.is_loading = true;

    // 1.stripe側の更新
    const stripe_res = await self.stripeRestart();
    // エラーハンドリング
    if (stripe_res.data.error !== void 0) {
    self.modalSwitch(false, "reSubsctiption");
    self.modal_title = "Failed";
    self.modal_body = "予期せぬエラーが発生しました";
    return "error";
    }

    // 2. firestore側のsubsctiptionの情報更新
    const FS_result = await self.updateFSSubscription(stripe_res);

    self.$router.push({
    name: "Account"
    });
}
```

# 参考

若干詰まったやつ
- [button タグで勝手にリロードされてしまう(vue.js)](https://qiita.com/haruraruru/items/53614e739437bf7e5b1c)

- [Promise の使い方、それに代わる async/await の使い方](https://qiita.com/suin/items/97041d3e0691c12f4974)
