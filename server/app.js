
const { TEMP } = require('../config.js');
const { createModule } = require('./logic/create.js');
const { getModule } = require('./logic/get.js');
const { deleteModule } = require('./logic/delete.js');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

/**
 * 
 */
app.post('/api/create', async (req, res) => {
  try {
    const packageName = req.body.name;
    const packageJson = req.body;
    const job = await createModule(packageJson);
    
    res.send({ 
      status: true,
      message: 'Started create node_modules operation',
      job,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send({ 
      status: false,
      message: 'Failed to start job' 
    });
  }
});

/**
 * 
 */
app.get('/api/modules/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const tarball = await getModule(id);
    res.download(tarball);
  } catch (err) {
    res.status(404).send({ error: 'Module not ready yet' });
  }
});

/**
 * 
 */
app.delete('/api/modules/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const tarball = await deleteModule(id);
    res.send({
      status: true,
      message: 'Removed ' + id,
    })
  } catch (err) {
    res.status(404).send({ 
      status: false,
      message: 'Module not ready yet' 
    });
  }
});

module.exports = app;