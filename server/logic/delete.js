
const { TEMP } = require('../../config.js');
const fs = require('fs-extra');

const deleteModule = async (id) => {
  const tarball = `${TEMP}/${id}.tar`;
  
  try {
    await fs.remove(tarball);
    return tarball;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  deleteModule,
}