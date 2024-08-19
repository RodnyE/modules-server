
const { PORT } = require('../config');
const app = require('./app');
const { jobsJson } = require('./utils/json');

jobsJson.read();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});