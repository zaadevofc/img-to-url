'use-strict'
const img2url = require('../lib/uploader')

const getUrl = async () => {
    const up = await img2url.upload('./image/pic.png').then(x => x)
    console.log(up)
}
getUrl()

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