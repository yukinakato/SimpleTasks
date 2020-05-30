# SimpleTasks
## 概要
3 つの優先度およびフリーメモ欄でタスクが管理できるアプリ。
<br><br>
## 制作背景
Web アプリ 1 作目。並行して学んでいた Ruby on Rails のルーティングやビューの考え方を意識しつつ、データベースを利用したシンプルな ToDo アプリを制作し学習しようと思った。
<br><br>
## 使用技術
Node.js (Express, EJS, MySQL, dotenv), HTML, CSS
<br><br>
## 使用方法
前提として、同じネットワークに属するコンテナで MySQL サーバーが動作していること。<br>
それに対応した内容で .env ファイルをルートに作成する。
```
DB_HOST=ホスト名
DB_USER=ユーザー名
DB_PASS=パスワード
DB_NAME=データベース名
```
Dockerfileをビルドし、起動する。なおポート 3000 番で待ち受けている。
```
docker build -t simpletasks .
docker run -d -p 3000:3000 --network my-network simpletasks
```
