import lineReader from 'line-reader';

let fieldMapping = {
    0: 'date',
    1: 'time',
    7: 'status',
    8: 'bytes',
    10: 'host'
};

export default class FileProcessor {
    constructor() {
        this._fieldsCount = 0;
    }

    /**
     * Gets number of tokens in the string separated by space
     * @param {string} line space separated string value
     * @returns {number} number of tokens
     */
    getTokensCount(line) {
        return line.split(/\s+/).length;
    }

    /**
     * Checks if the string specified is a valid header
     * @param {string} line space separated string value
     * @returns {boolean} true if valid header, false otherwise
     */
    isHeader(line) {
        let result = true;
        result = result && line.startsWith('#Fields');
        let fieldsCount = getTokensCount(line)-1;
        result = result && (fieldsCount >= Object.keys(fieldMapping).length);

        return result;
    }

    readFile(filePath) {
        lineReader.open(filePath, (err, reader) => {
            if (err) {
                throw err;
            }
            while (reader.hasNextLine()) {
                reader.nextLine((err, line) => {
                    if (err) {
                        throw err;
                    }
                    /* Checks if header and init the fields count */
                    if (this.isHeader(line)) {
                        this._fieldsCount = this.getTokensCount(line)-1;
                    }
                    /* Throw error if fields count not obtained */
                    if (this._fieldsCount < 1) {
                        throw err;
                    }
                    console.log(line);
                });
            }

            reader.close((err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }
}