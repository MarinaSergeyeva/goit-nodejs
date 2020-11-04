const { promises: fsPromises } = require('fs');
const AvatarGenerator = require('avatar-generator');
const { v4: uuidv4 } = require('uuid');

const avatarGenerator = async userId => {
  try {
    const avatar = new AvatarGenerator({
      parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
      partsLocation: './img',
      imageExtension: '.png',
    });
    const variant = 'female';
    const image = await avatar.generate('email@example.com', variant);

    const fileName = `user-${userId}-${uuidv4()}.png`;
    const filePath = normalizeImageminPath(`./public/images/${fileName}`);
    image.png().toFile(`${filePath}`);
    return fileName;
  } catch (error) {
    console.log('error', error);
  }
};

function normalizeImageminPath(path) {
  console.log('path', path);
  return path.replace(/\\/g, '/');
}

module.exports = avatarGenerator;
