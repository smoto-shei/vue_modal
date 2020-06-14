# docker 構築の手順
1. イメージをビルドする
- docker build -t process_demo .
2. イメージカラコンテナを起動する
- docker run -v `pwd`:/usr/src/app -p 8082:8082 --name process_demo -it -d process_demo
3. コンテナに入る
- docker exec -it process_demo sh
4. 実行する
- npm run serve -- -port 8082