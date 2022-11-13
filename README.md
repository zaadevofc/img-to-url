## Image to Url Converter

Ubah gambar menjadi url dengan instan!, gambarmu akan bisa diakses melalui url yang sudah dikonversi nantinya!

Di hosting menggunakan [EzGif](https://ezgif.com).

* Ekstensi yang didukung : `GIF, JPG, PNG, BMP, WebP, APNG, HEIC, FLIF, AVIF, MNG`
* Batas maksimal ukuran file : `50MB`

## Installation

Install with npm:

```js
$ npm install img-to-url
```

With require:

```js
const img2url = require("img-to-url");
```

### Usage

#### Example :

see [example.js](https://github.com/zaadevofc/img-to-url/blob/master/example.js) for details.

```js
const getUrl = async () => {
    const result = await img2url.upload('./your/path/image.png').then(x => x)
    console.log(result)
    /* Result :
    {
      ok: true,                                                         
      code: 200,
      result: {
        url: 'https://im.ezgif.com/tmp/<HASH-ID>.png',
        mime: 'image/png',
        size: 245844
      },
      HostedBy: 'https://ezgif.com',
      CreatedBy: 'https://github.com/zaadevofc'
    }
    */
}
```

## Testing

Install dependencies:

```
npm install
```

Run tests:

```
npm run test
```

## License

Code released under the [MIT license](LICENSE).