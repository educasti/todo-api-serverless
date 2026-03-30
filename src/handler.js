const serverlessExpress = require('@vendia/serverless-express');
const app = require('./index');

let serverlessExpressInstance;

exports.handler = async (event, context) => {
  if (!serverlessExpressInstance) {
    serverlessExpressInstance = serverlessExpress({ app });
  }

  // Elimina el prefijo /prod del path
  if (event.rawPath) {
    event.rawPath = event.rawPath.replace(/^\/prod/, '') || '/';
    event.requestContext.http.path = event.rawPath;
  }

  return serverlessExpressInstance(event, context);
};