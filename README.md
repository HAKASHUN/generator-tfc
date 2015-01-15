# generator-tfc

> [Yeoman](http://yeoman.io) generator for Toolkit for CreateJS with tfcsprite and balmung

## Getting Started

```bash
npm install -g yo
npm install -g generator-tfc
```

Ex. sampleというタイトルのアニメーション開発

## fla開発ワークフロー

### 0). (初回のみ)ツールのインストール

* `yo` - YEOMANというツール
* `generator-tfc` - createjsの作業環境を生成するジェネレータ

```bash
npm install -g yo
npm install -g generator-tfc
```

### 1). 作業前のディレクトリ構成
```
$ cd sample
$ yo tfc

     _-----_
    |       |    .--------------------------.
    |--(o)--|    |      Welcome to the      |
   `---------´   |  marvelousTfc generator! |
    ( _´U`_ )    '--------------------------'
    /___A___\    
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

[?] What is this animation name? (sample) {{Enter}} 
```

これでflaの開発環境が勝手にインストールされます。

```
sample
├── assets // 解像度3の素材画像を入れるフォルダ
├── conf // balmung設定が入ったフォルダ
├── gulpfile.js // gulp定義フォルダ
├── node_modules // nodeのモジュールが入ったフォルダ
├── package.json
└── public
    ├── images // flashが画像を出力するフォルダ
    ├── sprites // flash上で作ったスプライト画像とJSONを入れるフォルダ
    └── sample.fla // メインのflaファイル
```

### 2). 解像度3の素材画像から解像度2の素材画像を作り出す

photoshopなどで書き出す画像は、解像度3のままで、`sample/assets`の中に入れてください。
下記のコマンドを実行すれば、解像度2用の画像を自動で生成します。

```
$ cd sample
$ gulp assets
```

実行後は、解像度3から2にコンバートされた画像がpublic以下の`_images`に入ります。

```
sample
├── assets
├── conf
├── gulpfile.js
├── node_modules
├── package.json
└── public
    ├── _images // flashに読み込ませる素材画像が入るフォルダ
    ├── images
    ├── sprites
    └── sample.fla
```

flaに画像素材を読み込ませるときは、`_images`の中のものを使ってください。

### 3). flaで演出をつくる

※追加の素材などがあったら

1. `assets`に解像度3の画像を入れる
2. もう一度`gulp assets`を実行する
3. `public/_images`内に画像が出力されるので、flashで読み込んで配置する

### 4). flaでの演出が決まったら

#### fla上でスプライト画像を作る

1. どの画像郡をスプライト画像化するか決めます。
2. flaのライブラリ上で、スプライト画像化する画像名の先頭に`_`をつけてまとめます。
3. fla上でスプライト画像を生成します。(※出力先は`public/sprites`)

### 5). モック確認

```
$ cd sample
$ gulp build
```

上記を実行すると、tfcspriteやbalmungなどが実行され、`build`ディレクトリが出力されます。

```
sample
├── assets
├── build // モック確認用のファイルが入るディレクトリ
│   ├── sample.html
│   ├── sample.js
│   ├── images
│   └── sprites
└── public
    ├── sample.fla
    ├── _images
    ├── images
    └── sprites
```

`build`フォルダ内のhtmlを開くか、`build`フォルダをモックサーバーにあげれば、アニメーションを確認することができます。

### 6). SVNにコミット

`sample`フォルダごとsvnにコミットしてください。(※その他はsvnignoreします)

#### SVNにコミットするもの
- `sample/assets` 解像度3の画像が入っています。
- `sample/public/sample.fla` メインのfla
- `sample/public/images/` flaが出力した画像群
- `sample/public/sprites` スプライト画像とjsonデータ

## License

MIT
