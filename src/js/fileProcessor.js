import lineReader from 'line-reader';
import LogRecord from './logRecord';
import LogCollection from './logCollection';

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

let mapping = {
    0: 'date',
    1: 'time',
    7: 'status',
    8: 'bytes',
    10: 'host'
};

export default class FileProcessor {
    constructor() {
        this._fieldsCount = 0;
        this._collection = new LogCollection();
        this._errors = [];
    }

    /**
     * Gets array of tokens in the string separated by space
     * @param {string} line space separated string value
     * @returns {Array} array of tokens
     */
    getTokens(line) {
        return line.match(/("[^"]*")|[^\s]+/g);
    }

    /**
     * Checks if the string specified is a valid header
     * @param {string} line space separated string value
     * @returns {boolean} true if valid header, false otherwise
     */
    isHeader(line) {
        let result = true;
        result = result && line.startsWith('#Fields');
        let fieldsCount = this.getTokens(line).length-1;
        result = result && (fieldsCount >= fieldMapping[fieldMapping.length-1].position);

        return result;
    }

    parseLogRecord(line, lineNumber) {
        try {
            let tokens = this.getTokens(line);
            if (tokens.length !== this._fieldsCount) {
                throw new Error(`Expected ${this._fieldsCount}`)
            }
            let logRecord = new LogRecord();
            fieldMapping.forEach(mapping => logRecord[mapping.field](tokens[mapping.position]));
            this._collection.addLogRecord(logRecord);
        } catch (error) {
            this._errors.push(`${error.message} on line ${lineNumber}`)
        }
    }

    readFile(filePath) {
        let lineIndex = 0;
        try {
            lineReader.open(filePath, (err, reader) => {
                if (err) {
                    throw err;
                }
                while (reader.hasNextLine()) {
                    reader.nextLine((err, line) => {
                        if (err) {
                            throw err;
                        }
                        if (this.isHeader(line)) {
                            this._fieldsCount = this.getTokens(line).length-1;
                        } else if (this._fieldsCount < 1) {
                            throw err;
                        } else {
                            lineIndex += 1;
                            this.parseLogRecord(line, lineIndex);
                        }
                    });
                }

                reader.close((err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
        } catch(error) {
            console.log(error.message);
        }

        console.log(`Errors: ${this._errors.join('\n')}`);
        console.log(JSON.stringify(this._collection.collection));
    }
}