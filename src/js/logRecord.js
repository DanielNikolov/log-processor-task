export default class LogRecord {

    set httpHost(httpHost) {
        this._httpHost = httpHost;
    }

    get httpHost() {
        return this._httpHost;
    }

    set logDate(logDate) {
        this._logDate = logDate;
    }

    get logDate() {
        return this._logDate;
    }

    set logTime(logTime) {
        this._logTime = logTime;
    }

    get logTime() {
        return this._logTime;
    }

    set httpStatusCode(httpStatusCode) {
        this._httpStatusCode = httpStatusCode;
    }

    get httpStatusCode() {
        return this._httpStatusCode;
    }

    set httpStatus(httpStatus) {
        this._httpStatus = httpStatus;
    }

    get httpStatus() {
        return this._httpStatus;
    }
}