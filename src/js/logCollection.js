let methodPath = ['getHttpHost', 'getLogDate', 'getLogTime', 'gethttpStatusCode', 'gethttpStatus']

export default class LogCollection {
    addLogRecord(logRecord) {
        this._collection = this._collection || {};
        let treeNode = this._collection;
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

    get collection() {
        return this._collection;
    }
}