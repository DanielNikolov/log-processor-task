import LogRecord from './logRecord';
let methodPath = ['getHttpHost', 'getLogDate', 'getLogTime', 'gethttpStatusCode', 'gethttpStatus']
let fieldMapping = [
    {
        position: 0,
        field: [ 'setLogDate' ]
    },
    {
        position: 1,
        field: [ 'setLogTime' ]
    },
    {
        position: 7,
        field: [ 'setCacheStatus' ]
    },
    {
        position: 8,
        field: [ 'setBytes' ]
    },
    {
        position: 10,
        field: [ 'setHttpHost' ]
    }
];

export default class LogCollection {
    constructor() {
        this._logRecords = {};
    }

    addLogRecord(logRecord) {
        let treeNode = this._logRecords;
        methodPath.forEach(method => {
            let key = logRecord[method]();
            if (!treeNode[key]) {
                Object.assign(treeNode, {
                    [key]: {}
                });
            }
            treeNode = treeNode[key];
        });
        let requestsCount = treeNode['requests'];
        treeNode['requests'] = !requestsCount ? 1 : requestsCount + 1;
        let bytesCount = treeNode['bytes'];
        treeNode['bytes'] = !bytesCount ? logRecord.getBytes() : bytesCount + logRecord.getBytes();
    }

    processLogRecord(tokens, fieldsCount) {
        if (tokens.length !== fieldsCount) {
            throw new Error(`Expected ${fieldsCount} found ${tokens.length} values`);
        }
        let logRecord = new LogRecord();
        fieldMapping.forEach(mapping => logRecord[mapping.field](tokens[mapping.position]));
        this.addLogRecord(logRecord);
    }

    get logRecords() {
        return this._logRecords;
    }
}