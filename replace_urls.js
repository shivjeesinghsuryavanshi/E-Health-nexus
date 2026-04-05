const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'src');

const replacePatterns = [
  {
    // Replace single quotes: 'http://localhost:5000
    regex: /'http:\/\/localhost:5000/g,
    replacement: "(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '"
  },
  {
    // Replace double quotes: "http://localhost:5000
    regex: /"http:\/\/localhost:5000/g,
    replacement: `(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "`
  },
  {
    // Replace backticks: `http://localhost:5000
    regex: /`http:\/\/localhost:5000/g,
    replacement: "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}"
  }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      replacePatterns.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated URLs in: ${fullPath}`);
      }
    }
  }
}

// And also fix `utils/api.js` BASE_URL directly
function fixApiUtilsLoader() {
  const apiPath = path.join(__dirname, 'frontend', 'src', 'utils', 'api.js');
  if (fs.existsSync(apiPath)) {
    let content = fs.readFileSync(apiPath, 'utf8');
    content = content.replace(
      /const BASE_URL = 'http:\/\/localhost:5000';/g,
      "const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';"
    );
    fs.writeFileSync(apiPath, content, 'utf8');
    console.log("Updated utils/api.js");
  }
}

console.log('Starting URL replacement...');
processDirectory(directoryPath);
fixApiUtilsLoader();
console.log('Finished URL replacement.');
