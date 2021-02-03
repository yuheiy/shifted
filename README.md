# shifted

静的サイト構築のための開発環境です。ページ数が多いサイトでも柔軟かつ快適な開発ができます。静的サイトジェネレーターのEleventyとwebpackを中心に構成されています。

## 特徴

- [Eleventy](https://www.11ty.io/)によってHTMLファイルの柔軟で効率的な構築を支援
- [webpack](https://webpack.js.org/)との統合
  - 開発用サーバーの[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)によってアセットのビルドおよびライブリロードを提供
  - アセットのファイル名へのフィンガープリント付与による[Cache busting](#cache-busting)が組み込み済み
- HTMLのテンプレートエンジンとして[Pug](https://pugjs.org/api/getting-started.html)を採用
  - [Eleventyが対応しているテンプレートエンジン](https://www.11ty.dev/docs/languages/)との入れ替えおよび併用が可能
- CSSのビルドに[Sass](https://sass-lang.com/)と[Autoprefixer](https://github.com/postcss/autoprefixer)を採用
- JavaScriptの代替として[TypeScript](https://www.typescriptlang.org/)を採用
- MPA（非SPA）向けのJavaScriptコンポーネント化ライブラリとして[Stimulus](https://stimulus.hotwire.dev/)を採用
- コンポーネント指向開発の支援機能
  - Pug mixin、Sassコンポーネント、Stimulusコントローラーの各種ファイルの自動読み込み
  - [Plop](https://github.com/plopjs/plop)によるScaffoldの自動生成

## 導入

要求開発環境:

- Mac OS X、Windows、Linux
- Node.js 12以上およびnpm

依存パッケージのインストール:

```sh
npm install
```

## 開発用コマンド

### `npm start`

開発用サーバーを起動してファイルの変更監視を行います。起動したサーバーのURLがコンソールに出力され、プライベートネットワーク上から同URLへアクセスできるようになります。

### `npx plop [type] [name]`

Plopを利用してソースコードのScaffoldを生成します。テンプレートは`plop-templates`ディレクトリに配置されています。

#### コンポーネント

```sh
npx plop ct my-component
```

Pug mixin、Sassコンポーネントを生成します。

#### コントローラー

```sh
npx plop cr my-controller
```

Stimulusコントローラーを生成します。

#### ページ

```sh
npx plop p services/research
```

Eleventyのページに対応するテンプレートファイルとデータファイルを生成します。

### `npm run build`

本番用にビルドしたファイルを`dist`ディレクトリに出力します。

### `npx webpack --analyze`

[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)を利用してwebpackが出力するバンドルファイルを解析します。

### `npm run test`

[Jest](https://jestjs.io/en/)による自動テストを実行します。

`npm run test -- --watch`コマンドを利用するとファイルの変更を監視できます。

### `npm run type-check`

TypeScriptの型検査を実行します。

型検査は通常、開発時のエディタ上やGitHub Actionsによる実行を推奨します。

### `npm run format`

[Prettier](https://prettier.io/)によるフォーマットを実行します。

フォーマットはエディタと[VS CodeのPrettierプラグイン](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)などを用いてコーディングの最中に実行することを推奨します。もしフォーマットに漏れがあった場合は、Gitにコミットするタイミングで[husky](https://github.com/typicode/husky)によって自動的にフォーマットが実行されます。フォーマットされていないソースコードがGitHubリポジトリにプッシュされた場合は、GitHub Actionsによってフォーマット後の変更が自動的にコミットされます。

## ディレクトリ構成

```
.
├── dist/
│   ├── assets/
│   │   ├── main.[contenthash].css
│   │   ├── main.[contenthash].js
│   │   ├── ogp.[contenthash].png
│   │   └── polyfill-nomodule.[contenthash].js
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   └── my-component.scss
│   │   ├── controllers/
│   │   │   ├── index.ts
│   │   │   ├── index.ts.hbs
│   │   │   └── my-controller.ts
│   │   ├── styles/
│   │   │   ├── utilities/
│   │   │   │   └── my-utility.scss
│   │   │   ├── abstracts.scss
│   │   │   └── base.scss
│   │   ├── main.scss
│   │   ├── main.scss.hbs
│   │   ├── main.ts
│   │   ├── ogp.png
│   │   └── polyfill-nomodule.ts
│   ├── site/
│   │   ├── _data/
│   │   │   └── metadata.yml
│   │   ├── _includes/
│   │   │   ├── components/
│   │   │   │   ├── index.pug
│   │   │   │   ├── index.pug.hbs
│   │   │   │   └── my-component.pug
│   │   │   ├── layouts/
│   │   │   │   └── base.pug
│   │   │   └── setup.pug
│   │   ├── index.pug
│   │   ├── index.yml
│   │   └── webpack-manifest.json
│   └── static/
│       └── favicon.ico
├── .eleventy.js
├── config.js
├── drygen.config.js
├── package.json
└── webpack.config.js
```

### `src`ディレクトリ

アプリケーション本体のソースコードを配置します。

### `src/site`ディレクトリ

Eleventyで生成するページやそのデータファイルを配置します。同ディレクトリ内のページから`src/assets`ディレクトリ内にあるアセットへのパスを参照する場合は`assetPath()`関数を利用します。

webpackが出力するアセットのパスは`webpack-manifest.json`として同ディレクトリ内に出力されます。

### `src/assets`ディレクトリ

CSS、TypeScript、画像ファイルなどを配置します。同ディレクトリに配置されたすべてのアセットは`main.ts`によって自動的に読み込まれ、ファイル名にフィンガープリントが付与された状態で`dist`ディレクトリに出力されます。

### `src/static`ディレクトリ

`dist`ディレクトリ直下にそのままコピーするファイルを配置します。同ディレクトリに配置されたファイルについては、ファイル名にフィンガープリントが付与されません。

### `dist`ディレクトリ

ビルド時に同ディレクトリへすべてのファイルが出力されます。[サブディレクトリ](#サブディレクトリでの公開)が指定された場合でもファイルは同ディレクトリ直下に出力されます。

## Cache busting

`src/assets`ディレクトリに配置されたファイルは、`main.51fb6a95.js`のようにファイル名にフィンガープリントが付与された状態で出力されます。これは、ソースファイルの内容が変更された際に出力するファイル名を変更することで、ブラウザに保存された前回のキャッシュを無効化するためです。

参考: [アセットパイプライン - Railsガイド § 1.2 フィンガープリントと注意点](https://railsguides.jp/asset_pipeline.html#%E3%83%95%E3%82%A3%E3%83%B3%E3%82%AC%E3%83%BC%E3%83%97%E3%83%AA%E3%83%B3%E3%83%88%E3%81%A8%E6%B3%A8%E6%84%8F%E7%82%B9)

ソースファイル内では次のようにしてファイル名を参照します。存在しないファイルを指定した場合はエラーが出力されます。

Pug:

```pug
img(src=assetPath('components/header/background.svg') alt="")
//- -> /assets/components/header/background.[contenthash].svg
```

Sass:

```scss
// src/assets/components/header.scss

.header {
  background-image: url("./header/background.svg");
  // -> /assets/components/header/background.[contenthash].svg
}
```

TypeScript:

```typescript
// src/assets/controllers/header.ts

import background from "../components/header/background.svg";

const img = document.createElement("img");
img.src = background;
// -> /assets/components/header/background.[contenthash].svg
```

[サブディレクトリ](#サブディレクトリでの公開)が設定された場合にも同様の指定方法によって自動的にパスが解決されます。

`src/static`ディレクトリに配置されたファイルにはこの機能が適用されません。

## サブディレクトリでの公開

サブディレクトリでサイトが公開される場合には、`config.js`に次のように指定してビルドの設定を変更できます。

```diff
module.exports = {
- pathPrefix: "",
+ pathPrefix: "/path/to/subdir",
};
```

Eleventyのテンプレート内でサブディレクトリを前提としたパスを解決するには、`url()`関数を利用する必要があります。

```diff
- a(href="/about/") About
+ a(href=url('/about/')) About
```

`assetPath()`関数では値の先頭にサブディレクトリへのパスが自動的に付与されます。

```pug
= assetPath('main.js')
//- `/path/to/subdir/assets/main.[contenthash].js`
```

TypeScript内では`process.env.PATH_PREFIX`変数から設定を参照できます。

```typescript
location.assign(`${process.env.PATH_PREFIX}/about/`);
```

## 対応ブラウザ

`package.json`に指定されている次の[Browserslist](https://github.com/browserslist/browserslist)の設定にもとづいて、[Autoprefixer](https://github.com/postcss/autoprefixer)と[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)が実行されます。必要に応じてこの設定を変更してください。

```json
  "browserslist": [
    "> 0.5% in JP",
    "last 2 versions and > 0.01%",
    "Firefox ESR",
    "not dead"
  ],
```

また、レガシーブラウザ向けのポリフィル（`polyfill-nomodule.ts`）は、`nomodule`属性を用いてES Modulesが実装されていない環境にのみ提供されるよう設定されています。

## ライセンス

MIT © [Yuhei Yasuda](http://yuheiy.com/)
