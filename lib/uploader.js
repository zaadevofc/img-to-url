'use-strict'
const fs = require('fs')
let cheerio = require('cheerio')
let BodyForm = require('form-data')
var mime = require('mime-types')
let axios = require('axios')
const packJson = JSON.parse(fs.readFileSync('./package.json'))
const fileExt = ['GIF', 'JPG', 'PNG', 'BMP', 'WEBP', 'APNG', 'HEIC', 'FLIF', 'AVIF', 'MNG']
const validFile = (p) => (fileExt.indexOf(mime.lookup(p).split('/')[1].toUpperCase()) == -1) ? false : true

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes
}
let pathRequired = `\n> Path tidak valid atau tidak ditemukan!\n> see the readme for details : ${packJson.homepage}\n`
let limitsSize = `\n> Batas maksimal hanya 50MB!\n> see the readme for details : ${packJson.homepage}\n`
let fileNotValid = `\n> Hanya mendukung file dengan ekstensi :\n> GIF, JPG, PNG, BMP, WebP, APNG, HEIC, FLIF, AVIF, MNG\n> see the readme for details : ${packJson.homepage}\n`

exports.upload = (path) => {
	return new Promise((resolve, reject) => {
	    if (getFilesizeInBytes(path) > 50000000) throw new Error(limitsSize)
	   if (!validFile(path)) throw new Error(fileNotValid)
		 const form = new BodyForm()
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://ezgif.com/resize',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(async ({ data }) => {
			const $ = cheerio.load(data)
			   const getUrl = $('img#target').attr('src').split('//')[1]
			   const getSize = getFilesizeInBytes(path)
			   resolve({
					ok: true,
					code: 200,
					result: {
					    url: 'https://' + getUrl,
					    mime: mime.lookup(path),
					    size: getSize
					},
					HostedBy: 'https://ezgif.com',
					CreatedBy: 'https://github.com/zaadevofc'
			   })
		 }).catch(e => {
		     throw new Error(pathRequired)
		 })
	})
}