import FileProcessor from './fileProcessor';

let fileProcessor = new FileProcessor();
fileProcessor.processFile(process.argv[2]);