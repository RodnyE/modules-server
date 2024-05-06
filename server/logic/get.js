
const { TEMP } = require('../../config.js');
const fs = require('fs').promises;

const getModule = async (id) => {
  const tarball = `${TEMP}/${id}.tar`;
  
  try {
    await fs.access(tarball);
    return tarball;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getModule,
}