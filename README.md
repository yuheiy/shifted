## このプロジェクトの使用は推奨されていません

今後このプロジェクトはメンテナンスされません。代わりに、後継プロジェクトである[sdenv](https://github.com/yuheiy/sdenv)を利用してください。

---

# shifted

静的サイト構築のためのフロントエンド開発環境です。ページ数の多いサイトも柔軟かつ快適に開発できます。静的サイトジェネレーターの [Eleventy](https://www.11ty.dev/) と [Vite](https://vitejs.dev/) を中心に構成されています。

## 特徴

- 静的サイトジェネレーターの [Eleventy](https://www.11ty.dev/) を利用した HTML ファイル構築の支援
- [Vite](https://vitejs.dev/) の採用および Eleventy との連携
- HTML のテンプレートエンジンとして [Pug](https://pugjs.org/api/getting-started.html) を採用
  - [別のテンプレートエンジン](https://www.11ty.dev/docs/languages/)との入れ替えおよび併用も可能
- [Tailwind CSS](https://tailwindcss.com/) の採用
- [TypeScript](https://www.typescriptlang.org/) の採用
- MPA（非 SPA）向けの JavaScript フレームワークとして [Alpine.js](https://alpinejs.dev/) を採用
- [Prettier](https://prettier.io/) の採用
- [サブディレクトリでの公開](#サブディレクトリでの公開)に対応
- Internet Explorer を除くモダンブラウザに向けた構成

## 導入

要求開発環境:

- macOS、Windows、Linux
- Node.js 16 以降

依存パッケージのインストール:

```bash
npm ci
```

ローカルサーバーの起動:

```bash
npm run dev
```

## ディレクトリ構成

```
.
├── dist/
│   ├── assets/
│   │   ├── images/
│   │   │   └── ogp.png
│   │   ├── main.[hash].css
│   │   └── main.[hash].js
│   ├── favicon.ico
│   └── index.html
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── ogp.png
│   └── favicon.ico
├── src/
│   ├── scripts/
│   │   ├── components/
│   │   │   └── example.ts
│   │   ├── stores/
│   │   │   └── example.ts
│   │   └── main.ts
│   ├── site/
│   │   ├── data/
│   │   │   └── metadata.js
│   │   ├── includes/
│   │   │   ├── layouts/
│   │   │   │   └── base.pug
│   │   │   ├── mixins/
│   │   │   │   └── page-title.pug
│   │   │   └── partials/
│   │   │       └── site-menu.pug
│   │   └── pages/
│   │       ├── index.11tydata.js
│   │       └── index.pug
│   └── styles/
│       └── main.css
├── .eleventy.js
├── config.js
└── package.json
```

### `src` ディレクトリ

サイト本体のソースコードを配置します。

### `src/site` ディレクトリ

[Eleventy](https://www.11ty.dev/) で生成するページやそのデータファイル、その他 Eleventy に関するファイルを配置します。

### `src/scripts/components` ディレクトリ

[Alpine.js](https://alpinejs.dev/) のコンポーネントを配置します。

### `src/scripts/stores` ディレクトリ

[Alpine.js](https://alpinejs.dev/) の Store を配置します。

### `public` ディレクトリ

コンパイル等の処理を行わず、そのまま公開されるファイルを配置します。`dist` ディレクトリ直下にコピーされます。

### `dist` ディレクトリ

ビルドされたファイルが当該ディレクトリに出力されます。

## 開発用コマンド

### `npm run dev`

ローカルサーバーを起動して、ファイルの変更監視を行います。

### `npm run build`

本番用にビルドしたファイルを `dist` ディレクトリに出力します。

### `npm run preview`

本番用にビルドしたファイルをプレビューできる静的サーバーを起動します。事前に `npm run build` を実行しておく必要があります。http://localhost:4173 から確認できます。

### `npm run format`

[Prettier](https://prettier.io/) を利用して、ファイルの自動整形を行います。

GitHub Actions によって、GitHub リポジトリにプッシュされるたびに当該コマンドが自動実行されます。

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

## 推奨ライブラリ

- [eleventy-navigation](https://www.11ty.dev/docs/plugins/navigation/): 階層構造になったナビゲーションやパンくずリストを生成する Eleventy プラグイン
- [eleventy-img](https://www.11ty.dev/docs/plugins/image/): 指定した画像を複数のサイズと形式で出力する Eleventy プラグイン
- [eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/): 外部ネットワークに依存する、取得に時間がかかるデータをキャッシュするための Eleventy プラグイン
