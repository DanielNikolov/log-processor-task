const numberRegEx = /\d+/g;

const httpStatusMap = {
    tcp_expired_miss: 'miss',
    tcp_miss: 'miss',
    tcp_hit: 'hit',
    tcp_partial_hit: 'hit'
};

/**
 * Validate string value if integer
 * @param {string} value value to validate
 * @returns {boolean} valid or not
 */
const validateInteger = (value) => {
    let regexResult = value.match(numberRegEx);
    if (!regexResult || regexResult.length > 1) {
        return false;
    }

    return true;
}

export default class LogRecord {

    setHttpHost(url) {
        let hostName = url.indexOf("//") > -1 ? url.split('/')[2] : url.split('/')[0];
        if (!hostName) {
            throw new Error(`Invalid host name in ${url}`);
        }
        this._httpHost = hostName;
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
            throw new Error(`Invalid cache status ${httpStatus}`);
        }
        let cacheStatus = httpStatusMap[arrayStatuses[0].toLowerCase()];
        if (!cacheStatus) {
            throw new Error(`Invalid cache status ${httpStatus}`);
        }
        if (!validateInteger(arrayStatuses[1])) {
            throw new Error(`Invalid cache status ${httpStatus}`);
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
        if (!validateInteger(bytesCount)) {
            throw new Error(`Invalid value for bytes count ${bytesCount}`);
        }

        this._bytes = parseInt(bytesCount);
    }

    getBytes() {
        return this._bytes;
    }

    set fieldsCount(fieldsCount) {
        this._fieldsCount = fieldsCount;
    }
}