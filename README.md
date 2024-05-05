# modules-server

Welcome to modules-server, a simple and efficient solution for creating and managing `node_modules` folders using a RESTful API. With modules-server, you can easily create a `tar` archive containing all the dependencies specified in a JSON package, and download the resulting archive using a unique job ID.

## Features

* Create `node_modules` folders using a JSON package
* Generate a `tar` archive containing all dependencies
* Download the archive using a unique job ID
* Simple and easy-to-use RESTful API

## Getting Started

To get started with modules-server, simply clone the repository and install the dependencies:

```bash
git clone https://github.com/RodnyE/modules-server.git
cd modules-server
npm install
```

Once the dependencies are installed, you can start the server using the following command:

```bash
npm start
```

This will start the server on `http://localhost:3000`. You can then use the API to create and download `node_modules` archives.

## API 
### POST /api/create

Create a new `node_modules` archive using a JSON package. The JSON package should be similar to a `package.json` file, and should include a `dependencies` field specifying the required dependencies.

#### Request Body

The request body should be a JSON object with the following format:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "^4.17.21"
  }
}
```

#### Response

The response will include a JSON object with the following format:

```json
{
  "status": true,
  "job": {
    "id": "abc123"
  },
  "message": "Started create node_modules operation"
}
```

### GET /api/modules/:id

Download a previously created `node_modules` archive using a unique job ID.

#### Path Parameters

The `:id` parameter should be a unique identifier for the job, as returned by the `POST /api/create` endpoint.

#### Response

The response will include a `tar` archive containing all the dependencies specified in the original JSON package.
