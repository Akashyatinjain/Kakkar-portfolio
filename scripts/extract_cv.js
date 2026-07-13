const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node extract_cv.js <path-to-pdf>');
  process.exit(2);
}

const dataBuffer = fs.readFileSync(filePath);
pdf(dataBuffer).then(function(data) {
  // Print the extracted text to stdout
  console.log(data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err.message || err);
  process.exit(1);
});
