import LogRecord from '../src/js/logRecord';

const assert = require('assert');

let logRecord;

describe('LogRecord', function () {
    beforeEach(() => {
        logRecord = new LogRecord();
    });

    afterEach(() => {
        logRecord = null;
    });

    it('test - valid host name', () => {
        let result = true;
        try {
            logRecord.setHttpHost('http://www.youtube.com');
        } catch(error) {
            result = false;
        }
        assert.equal(result, true);
        assert.equal(logRecord.getHttpHost(), 'www.youtube.com');
    })

    it('test - invalid host name', () => {
        let result = true;
        try {
            logRecord.setHttpHost('http:///www.youtube.com');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - valid log date', () => {
        let result = true;
        try {
            logRecord.setLogDate('2019-07-07');
        } catch(error) {
            result = false;
        }
        assert.equal(result, true);
        assert.equal(logRecord.getLogDate(), '2019-07-07');
    })

    it('test - invalid log date', () => {
        let result = true;
        try {
            logRecord.setLogDate('2019-017-07');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - valid log time', () => {
        let result = true;
        try {
            logRecord.setLogTime('02:20:00');
        } catch(error) {
            result = false;
        }
        assert.equal(result, true);
        assert.equal(logRecord.getLogTime(), '02:20');
    })

    it('test - invalid log time', () => {
        let result = true;
        try {
            logRecord.setLogTime('-02:20:00');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - invalid cache status', () => {
        let result = true;
        try {
            logRecord.setCacheStatus('TCP');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - invalid cache status', () => {
        let result = true;
        try {
            logRecord.setCacheStatus('TCP/200');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - invalid cache status', () => {
        let result = true;
        try {
            logRecord.setCacheStatus('TCP_HIT/300.34');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - valid cache status', () => {
        let result = true;
        try {
            logRecord.setCacheStatus('TCP_HIT/300');
        } catch(error) {
            result = false;
        }
        assert.equal(result, true);
        assert.equal(logRecord.gethttpStatus(), 'hit');
        assert.equal(logRecord.gethttpStatusCode(), '300');
    })

    it('test - invalid bytes count', () => {
        let result = true;
        try {
            logRecord.setBytes('300.1442');
        } catch(error) {
            result = false;
        }
        assert.equal(result, false);
    })

    it('test - valid bytes count', () => {
        let result = true;
        try {
            logRecord.setBytes('300');
        } catch(error) {
            result = false;
        }
        assert.equal(result, true);
    })
});