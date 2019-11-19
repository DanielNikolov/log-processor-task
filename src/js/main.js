import FileProcessor from './fileProcessor';

let fileProcessor = new FileProcessor();
fileProcessor.readFile(process.argv[2]);