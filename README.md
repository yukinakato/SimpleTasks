# SimpleTasks
## 概要
3 つの優先度およびフリーメモ欄でタスクが管理できるアプリ。
<br><br>
## 制作背景
Web アプリ 1 作目。並行して学んでいた Ruby on Rails のルーティングやビューの考え方を意識しつつ、
データベースを利用したシンプルな ToDo アプリを制作し学習しようと思った。
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
Dockerfile をビルドし、起動する。なおポート 3000 番で待ち受けている。
```
docker build -t simpletasks .
docker run -d -p 3000:3000 --network my-network simpletasks
```
<br>
## コメント
初めての Web アプリ制作で、CSS もゼロから作成したり、環境構築に Docker を取り入れたりと、多くのことを学んだ。
一方で、メインのコードはエラー処理がほぼなされておらず、今後は品質の向上を意識したコーディングの必要性を感じた。
