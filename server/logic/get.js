
const { TEMP } = require('../../config');
const { jobsJson } = require('../utils/json');
const fs = require('fs').promises;

const getModule = async (id) => {
  const job = jobsJson.data[id];
  
  if (!job || job.status !== 'success') return null;
  
  try {
    await fs.access(job.result.tarball);
    return job.result.tarball;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getModule,
}