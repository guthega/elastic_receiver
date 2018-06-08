import chai, { expect } from 'chai';
import asPromised from 'chai-as-promised';
import receiver from '../src/elastic_receiver';
import uuid from 'uuid';
import request from 'request';

chai.use(asPromised);

describe('elastic_receiver', function() {
  var receiverContext = {
    config: {
      index: "guthega",
      type: "event",
      connection: {
        host: "localhost:9200"
      }
    },
    log: {
      debug(){},
      log(){}
    },
  };

  var f = receiver(receiverContext);

  describe('receiver()', function() {

    it('receiver factory should return a function', function() {
      expect(f).to.be.a('Function');
    });

    it('receiver should return a promise', function() {
      var h = f();
      expect(h).to.be.a('Promise')
    });
  });

  describe('messageReceived()', function() {
    const requestId = uuid.v4();

    it('receiver promise should resolve', function(done) {
      var h = f({ test: 'Message created during testing' }, { requestId });
      expect(h).to.be.fulfilled;
      done();
    });

    it('should store a document in the Elasticsearch index', function(done) {
      this.timeout(2000);
      //wait for a second while the ES index catches up
      setTimeout(() => {
        const search = {
          query: {
            match: {
              requestId
            }
          }
        };

        const options = {
          uri: 'http://localhost:9200/guthega/_search',
          method: 'POST',
          body: search,
          json: true,
        };

        request(options, (err, res, body) => {
          expect(err).to.be.null;
          expect(res.statusCode).to.equal(200);

          expect(body.hits.total).to.equal(1);

          done();
        });
      }, 1000);
    });
  });
});
