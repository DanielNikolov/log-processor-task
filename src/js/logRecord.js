let httpStatusMap = {
    tcp_expired_miss: 'miss',
    tcp_miss: 'miss',
    tcp_hit: 'hit',
    tcp_partial_hit: 'hit'
};

export default class LogRecord {

    setHttpHost(httpHost) {
        let match = httpHost.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            this._httpHost = match[2];
        } else {
            return new Error(`Invalid host name in ${httpHost}`);
        }
    }

    getHttpHost() {
        return this._httpHost;
    }

    setLogDate(logDate) {
        if (isNaN(Date.parse(logDate))) {
            throw new Error(`Invalid date value in ${logDate}`);
        }
        this._logDate = logDate;
    }

    getLogDate() {
        return this._logDate;
    }

    setLogTime(logTime) {
        console.log()
        if (isNaN(Date.parse('1970-01-01T' + logTime + 'Z'))) {
            throw new Error(`Invalid time value in ${logTime}`);
        }
        this._logTime = logTime.substring(0, 4) + '0';
    }

    getLogTime() {
        return this._logTime;
    }

    setCacheStatus(httpStatus) {
        let arrayStatuses = httpStatus.split('/');
        if (arrayStatuses.length !== 2) {
            throw new Error('Invalid cache status ' + httpStatus);
        }
        let cacheStatus = httpStatusMap[arrayStatuses[0].toLowerCase()];
        if (!cacheStatus) {
            throw new Error('Invalid cache status ' + httpStatus);
        }
        if (!/\d+$/.test(arrayStatuses[1])) {
            throw new Error('Invalid cache status ' + httpStatus);
        }
        this._httpStatus = cacheStatus;
        this._httpStatusCode = arrayStatuses[1];
    }

    gethttpStatusCode() {
        return this._httpStatusCode;
    }

    gethttpStatus() {
        return this._httpStatus;
    }

    setBytes(bytesCount) {
        if (!/\d+$/.test(bytesCount)) {
            throw new Error('Invalid value for bytes count ' + bytesCount);
        }
        this._bytes = parseInt(bytesCount);
    }

    getBytes() {
        return this._bytes;
    }

    set fieldsCount(fieldsCount) {
        this._fieldsCount = fieldsCount;
    }

    /*
    parseRecordString(line, lineIndex) {

    }
    */
}