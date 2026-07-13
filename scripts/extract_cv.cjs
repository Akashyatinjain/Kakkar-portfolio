const fs = require('fs');
let pdf;
try {
  pdf = require('pdf-parse/lib/pdf-parse');
} catch (e) {
  pdf = require('pdf-parse');
  pdf = pdf && pdf.default ? pdf.default : pdf;
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node extract_cv.cjs <path-to-pdf>');
  process.exit(2);
}

const dataBuffer = fs.readFileSync(filePath);
pdf(dataBuffer).then(function(data) {
  console.log(data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err.message || err);
  process.exit(1);
});
