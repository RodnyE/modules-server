
const { PORT } = require('../config.js');
const app = require('./app.js');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});