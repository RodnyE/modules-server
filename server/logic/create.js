
const { TEMP } = require('../../config.js');
const fs = require('fs-extra');
const childProcess = require('child_process');
const tar = require('tar');
const uuid = require('uuid');  

/**
 * Create and compress node_modules folder
 * @param {object} packageJson 
 * @return {Promise<{id:string}>} 
 */
const createModule = async (packageJson) => {
  const id = uuid.v4();
  const tempDir = `${TEMP}/${id}`;

  // Create the temporary directory and return the id immediately
  await fs.mkdir(tempDir);
  
  // Start task in Background
  installModules(id, packageJson)
    .then(() => console.log('Success', packageJson))
    .catch(console.error);
  
  return { id };
}

const installModules = async (id, packageJson) => {
  const tempDir = `${TEMP}/${id}`;

  try {
    await fs.writeFile(`${tempDir}/package.json`, JSON.stringify(packageJson));
    await new Promise((resolve, reject) => {
      childProcess.exec(`cd ${tempDir} && npx pnpm install`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    const tarball = `${tempDir}.tar`;
    await tar.c({ cwd: tempDir, file: tarball, level: 7 }, ['node_modules']);
    await fs.remove(tempDir);
    
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createModule,
}