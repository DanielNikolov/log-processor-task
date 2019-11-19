# Log Processor Task
Log Processor Task implemented using ES6
The application processes log file content (provided as command line file parameter - file path)
and produces 2 output files - json representation and error file, containing processing errors.

Requirements:
- Node JS installed and readline module. Recommended version of NodeJS: v8.x.x or newer
- NodeJS installation: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Install Mocha: npm install mocha -g
- Install nyc (replacer of Istanbul): npm install nyc -g
- In project folder run: npm install

In order to start the project you need to go to the project folder and type the following command: npm run console <full file path>
In order to run test cases, type the following command in project folder: npm run test
In order to run coverage, type the following command in project folder: npm run cover

Developer: Daniel Nikolov
