import { Client } from 'elasticsearch';

const receiver = (receiverContext) => {
  const { config, log } = receiverContext;
  const { connection, index, type } = config;

  log.debug('Elasticsearch configuration', receiverContext.config);

  const esClient = new Client(connection);

  return (message, messageContext) => new Promise((res, rej) => {
    esClient
      .index({
        index,
        type,
        body: Object.assign({}, message, messageContext),
      })
      .then(r => res(r))
      .catch((e) => {
        log.error('Unable to index message', { errorMessage: e.message, name: e.name });
        rej(e);
      });
  });
};

export default receiver;
