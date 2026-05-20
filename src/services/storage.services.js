const imagekit = require('@imagekit/nodejs');

const Imagekit = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function musicUpload(file) {
const result = await Imagekit.files.upload({
    file,
    fileName: 'music-file',
    folder: '/music'
});
return result;
console.log(result);
}

module.exports = { musicUpload };