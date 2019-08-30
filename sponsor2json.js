const drug_file = './drugsatfda20190827/Applications.txt';

const readline = require('readline');
const fs = require('fs');

const lineReader = readline.createInterface({
  input: fs.createReadStream(drug_file)
});

let isHeader = false;
let colNames = [];

function parseLine(line) {
  return line.trim().split('\t');
}

function createRowObject(values) {
  const rowobject = {};
  colNames.forEach((val, idx) => {
    if (val === 'ApplNo' || val === 'SponsorName') {
      rowobject[val] = values[idx];
    }
  });
  return rowobject;
}

const json = [];

lineReader.on('line', function(line) {
  if(!isHeader) {
    colNames = parseLine(line);
    isHeader = true;
  } else {
    json.push(createRowObject(parseLine(line)));
  }
});

lineReader.on('close', function() {
  fs.writeFileSync(drug_file + '.js', JSON.stringify(json, null, 2));
});