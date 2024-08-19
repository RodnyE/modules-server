
const { TEMP } = require('../../config');
const fs = require('fs-extra');
const { jobsJson } = require('../utils/json');

const deleteModule = async (id) => {
  const job = jobsJson.data[id];
  if (!job || job.status !== 'success') return 0;
  
  // delete tarball 
  await fs.remove(job.result.tarball);

  delete jobsJson.data[id];
  jobsJson.write(); 
}

module.exports = {
  deleteModule,
}