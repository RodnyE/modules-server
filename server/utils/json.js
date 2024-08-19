const fs = require('fs'); 
const { JOBLIST } = require('../../config');

class Json {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = {};
  }

  read() {
    try {
      const jsonData = fs.readFileSync(this.filePath, 'utf8');
      this.data = JSON.parse(jsonData);
    } catch (err) {
      if (err.code === 'ENOENT') {

      }
      else {
        throw err;
      }
    }
    return this.data;
  }

  write() { 
    const jsonData = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(this.filePath, jsonData);
  }
}

module.exports = {
  Json,
  jobsJson: new Json(JOBLIST),
}