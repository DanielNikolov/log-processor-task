import fs from 'fs';
import readline from 'readline';
import LogCollection from './logCollection';

/**
 * Checks if the string specified is a valid header
 * @param {string} line space separated string value
 * @returns {boolean} true if valid header, false otherwise
 */
let isHeader = line => line.startsWith('#Fields');

/**
 * Gets array of tokens in the string separated by space
 * @param {string} line space separated string value
 * @returns {Array} array of tokens
 */
let getTokens = line => line.match(/("[^"]*")|[^\s]+/g);

export default class FileProcessor {
    constructor() {
        this._fieldsCount = 0;
        this._collection = new LogCollection();
        this._errors = [];
    }

    /**
     * Reads input file and log processing results
     * @param {string} filePath full file path
     */
    async processFile(filePath) {
        if (!filePath) {
            console.log('No file path specified');
            return;
        }

        let initFileReader = (filePath) => {
            let stream = fs.createReadStream(filePath);
            stream.on('error', (err) => {
                console.log('File not found. Invalid file name or directory');
            });
            stream.on('end', () => {
                if (this._errors.length > 0) {
                    fs.writeFile('log-processor.log.err', this._errors.join('\n'), err => {
                        if (err) {
                            console.log(`Error creating error log file. ERROR: ${err}`);
                        }
                    })
                }
                if (Object.keys(this._collection.logRecords).length > 0) {
                    fs.writeFile('log-processor.json', JSON.stringify(this._collection.logRecords), err => {
                        if (err) {
                            console.log(`Error creating json log file. ERROR: ${err}`);
                        }
                    });
                }
            });
            return readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });
        };

        let lineIndex = 0;
        let rl = (await initFileReader(filePath));
        rl.on('line', (line) => {
            if (lineIndex < 1 && isHeader(line)) {
                this._fieldsCount = getTokens(line).length-1;
            } else if (this._fieldsCount > 0) {
                try {
                    this._collection.processLogRecord(getTokens(line), this._fieldsCount);
                } catch (error) {
                    this._errors.push(`${error.message} on line ${lineIndex}`);
                }
            }
            lineIndex++;
        });
    }
}