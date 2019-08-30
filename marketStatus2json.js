const drug_file = './drugsatfda20190827/MarketingStatus.txt';

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
    if (val === 'MarketingStatusID') {
      if (values[idx] === '1') {
        rowobject['MarketingStatus'] = 'Prescription';
      } else if (values[idx] === '2') {
        rowobject['MarketingStatus'] = 'Over-the-counter';
      } else if (values[idx] === '3') {
        rowobject['MarketingStatus'] = 'Discontinued';
      } else {
        rowobject['MarketingStatus'] = 'None (Tentative Approval)';
      } 
    } else {
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