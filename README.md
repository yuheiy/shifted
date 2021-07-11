# shifted

静的サイト構築のためのフロントエンド開発環境です。ページ数の多いサイトも柔軟かつ快適に開発できます。静的サイトジェネレーターの [Eleventy](https://www.11ty.dev/) と [Vite](https://vitejs.dev/) を中心に構成されています。

## 特徴

- 静的サイトジェネレーターの [Eleventy](https://www.11ty.dev/) を利用した HTML ファイル構築の支援
- [Vite](https://vitejs.dev/) の採用および Eleventy との連携
- HTML のテンプレートエンジンとして [Pug](https://pugjs.org/api/getting-started.html) を採用
  - [別のテンプレートエンジン](https://www.11ty.dev/docs/languages/)との入れ替えおよび併用も可能
- [Sass](https://sass-lang.com/) の採用
- CSS アーキテクチャとして [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss) を採用
  - レイヤリングに基づいたファイル構成の採用
  - ベースとなるコンポーネントやユーティリティを同梱
- [TypeScript](https://www.typescriptlang.org/) の採用
- MPA（非 SPA）向けの JavaScript コンポーネント化ライブラリとして [Catalyst](https://github.github.io/catalyst/) を採用
- コンポーネント指向開発のための構成
  - コンポーネント中心のディレクトリ構成
  - コンポーネントの各種ファイル自動読み込み
  - [Hygen](http://www.hygen.io/) を利用したソースコードの雛形の自動生成
- [Prettier](https://prettier.io/) の採用
- [stylelint](https://stylelint.io/) の採用
- [サブディレクトリでの公開](#サブディレクトリでの公開)に対応
- Internet Explorer を除くモダンブラウザに向けた構成

## 導入

要求開発環境:

- macOS、Windows、Linux
- Node.js 16 以降

推奨開発環境:

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

依存パッケージのインストール:

```sh
$ npm install
```

ローカルサーバーの起動:

```sh
$ npm run dev
```

## ディレクトリ構成

```sh
.
├── _templates/
├── dist/
│   ├── assets/
│   │   ├── main.[hash].js
│   │   └── main.[hash].css
│   ├── favicon.ico
│   └── index.html
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── base-disclosure/
│   │       ├── base-disclosure.controller.ts
│   │       ├── base-disclosure.pug
│   │       └── base-disclosure.scss
│   ├── controllers/
│   │   └── modal-dialog.controller.ts
│   ├── site/
│   │   ├── data/
│   │   │   └── metadata.js
│   │   └── pages/
│   │       ├── index.11tydata.js
│   │       └── index.pug
│   ├── styles/
│   │   ├── settings/
│   │   ├── tools/
│   │   ├── generic/
│   │   ├── elements/
│   │   ├── objects/
│   │   ├── scopes/
│   │   ├── themes/
│   │   └── utilities/
│   ├── main.scss
│   └── main.ts
├── .eleventy.js
├── config.js
└── package.json
```

### `src` ディレクトリ

サイト本体のソースコードを配置します。

### `src/site` ディレクトリ

Eleventy で生成するページやそのデータファイル、その他 Eleventy に関するファイルを配置します。

### `src/components` ディレクトリ

サイトで利用するコンポーネントごとにファイルを配置します。

### `public` ディレクトリ

コンパイル等の処理を介さず `dist` ディレクトリ直下にコピーされ、そのまま公開されるファイルを配置します。

### `dist` ディレクトリ

ビルドされたファイルが当該ディレクトリに出力されます。

## 開発用コマンド

### `npm run dev`

ローカルサーバーを起動して、ファイルの変更監視を行います。

### `npm run build`

本番向けにビルドしたファイルを `dist` ディレクトリに出力します。

### `npx hygen`

[Hygen](http://www.hygen.io/) を利用して、ソースコードの雛形（scaffold）となるファイルを生成します。テンプレートは `_templates` ディレクトリに配置されています。

コンポーネント:

```sh
$ npx hygen component new my-component
```

コンポーネント（コントローラー含む）:

```sh
$ npx hygen component new my-component --controller
```

コントローラー:

```sh
$ npx hygen controller my-controller
```

ページ:

```sh
$ npx hygen page path/to/page
```

### `npm test`

[Jest](https://jestjs.io/) を利用した自動テストを実行します。

### `npm run format`

[Prettier](https://prettier.io/) と [stylelint](https://stylelint.io/) を利用して、ファイルの自動整形を行います。

GitHub Actions を利用して、GitHub リポジトリにプッシュするたびに当該コマンドが自動実行されます。

## サブディレクトリでの公開

サブディレクトリでサイトが公開される場合、`config.js` を次のように記述することでビルド設定を変更できます。

```diff
const config = {
	// root: `/`
	// subdir: `/path/to/subdir/`
-	pathPrefix: "/",
+	pathPrefix: "/my-subdir/",
};
```

[Eleventy](https://www.11ty.dev/) の [Pug](https://pugjs.org/) テンプレート内でサブディレクトリのパスを解決するためには、`f.url()` 関数を使用する必要があります。

```diff
-a(href="/about/") 私たちについて
+a(href=f.url('/about/')) 私たちについて
```

[Vite](https://vitejs.dev/) 環境でビルドされる JavaScript か TypeScript からサブディレクトリのパスを参照するには、`import.meta.env.BASE_URL` 変数を使用します。

```javascript
import.meta.env.BASE_URL; // "/my-subdir/"
```

デフォルトで生成される `robots.txt` は、[サブディレクトリでは機能しません](https://developers.google.com/search/docs/advanced/robots/robots_txt?hl=ja#examples-of-valid-robots.txt-urls)。

## 推奨ライブラリ

- [eleventy-cache-assets](https://www.11ty.dev/docs/plugins/cache/): 外部ネットワークに依存する、取得に時間がかかるデータをキャッシュするための Eleventy プラグイン
- [\<include-fragment> element](https://github.com/github/include-fragment-element): 指定した URL から HTML 片を読み込んで、ページの特定箇所に自動で挿入できるカスタム要素。コンテンツを非同期的に読み込む必要がある場合に便利
- [unistore](https://github.com/developit/unistore): ミニマルな状態管理ライブラリ。[Catalyst](https://github.github.io/catalyst/) のコントローラー同士で状態を共有する場合などに便利
- [Mitt](https://github.com/developit/mitt): ミニマルなイベントエミッター。[Vite](https://vitejs.dev/) 環境では Node.js の [Events モジュール](https://nodejs.org/api/events.html)が利用できないため、代替として採用できる
