/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/components/Navbar.tsx',
  'src/components/GameCard.tsx',
  'src/app/page.tsx',
  'src/app/game/[slug]/page.tsx'
];

let extractedCSS = '\n/* Extracted from components */\n';

for (const file of filesToProcess) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract CSS
  const styleRegex = /<style jsx>\{`([\s\S]*?)`\}<\/style>/g;
  let match;
  while ((match = styleRegex.exec(content)) !== null) {
    extractedCSS += `\n/* From ${file} */\n${match[1]}\n`;
  }
  
  // Remove CSS from file
  content = content.replace(/<style jsx>\{`[\s\S]*?`\}<\/style>/g, '');
  
  // Write back to file
  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
}

const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
fs.appendFileSync(globalsPath, extractedCSS);
console.log('Appended CSS to globals.css');
