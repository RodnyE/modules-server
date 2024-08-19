
const { TEMP, JOBLIST } = require('../../config');
const fs = require('fs-extra');
const childProcess = require('child_process');
const tar = require('tar');
const uuid = require('uuid');  
const {jobsJson} = require('../utils/json');

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
  
  // Save job status
  jobsJson.data[id] = {
    id,
    status: 'running',
  }
  jobsJson.write();

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
      childProcess.exec(`cd ${tempDir} && npm install`, (err, stdout, stderr) => {
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

    jobsJson.data[id].status = 'success';
    jobsJson.data[id].result = { tarball };

    jobsJson.write();

    
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createModule,
}