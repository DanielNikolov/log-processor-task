import LogCollection from '../src/js/logCollection';

const assert = require('assert');
let logCollection = null;
const correctString = '2014-04-02 02:26:28 0 60.53.122.6 87424 46.22.71.180 80 TCP_HIT/200 87687 GET http://images.tedbakerimages.com/prints-threefeature.jpg?o=ncjIw8@b9jIScMpXLRDrtJUNc7Mj&V=jhNs& - 0 453 "-" "Mozilla/5.0 (Windows NT 6.1; rv:28.0) Gecko/20100101 Firefox/28.0" 26792 "http://www.tedbaker.com/row/Womens/c/category_womens"';
const invalidString = '2014-04-02 -02:26:28 0 60.53.122.6 87424 46.22.71.180 80 TCP_HIT/200 87687 GET http://images.tedbakerimages.com/prints-threefeature.jpg?o=ncjIw8@b9jIScMpXLRDrtJUNc7Mj&V=jhNs& - 0 453 "-" "Mozilla/5.0 (Windows NT 6.1; rv:28.0) Gecko/20100101 Firefox/28.0" 26792 "http://www.tedbaker.com/row/Womens/c/category_womens"';
const invalidHostString = '2014-04-02 02:26:28 0 60.53.122.6 87424 46.22.71.180 80 TCP_HIT/200 87687 GET http:///prints-threefeature.jpg?o=ncjIw8@b9jIScMpXLRDrtJUNc7Mj&V=jhNs& - 0 453 "-" "Mozilla/5.0 (Windows NT 6.1; rv:28.0) Gecko/20100101 Firefox/28.0" 26792 "http://www.tedbaker.com/row/Womens/c/category_womens"';

const getTokens = (line) => line.match(/("[^"]*")|[^\s]+/g);


describe('LogCollection', function () {

    beforeEach(() => {
        logCollection = new LogCollection();
    });

    afterEach(() => {
        logCollection = null;
    });

    it('test - parsing valid record line', () => {
        let parseResult = true;
        try {
            logCollection.processLogRecord(getTokens(correctString), 18, 1);
        } catch(error) {
            parseResult = false;
        }
        assert.equal(parseResult, true);
        assert(Object.keys(logCollection.logRecords).length > 0);
        assert(typeof logCollection.logRecords['2014-04-02'] !== undefined);
    });

    it('test - parsing invalid record line', () => {
        let parseResult = true;
        try {
            logCollection.processLogRecord(getTokens(invalidString), 18, 1);
        } catch(error) {
            parseResult = false;
        }
        assert.equal(parseResult, false);
        assert(Object.keys(logCollection.logRecords).length < 1);
    });

    it('test - parsing invalid host record line', () => {
        let parseResult = true;
        try {
            logCollection.processLogRecord(getTokens(invalidHostString), 18, 18);
        } catch(error) {
            parseResult = false;
        }
        assert.equal(parseResult, false);
        assert(Object.keys(logCollection.logRecords).length < 1);
    });
})