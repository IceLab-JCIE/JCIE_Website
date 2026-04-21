const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Create .nojekyll file to disable Jekyll processing
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

// Copy 404.html to root if needed
const zh404Path = path.join(outDir, 'zh', '404.html');
const en404Path = path.join(outDir, 'en', '404.html');
const root404Path = path.join(outDir, '404.html');

if (fs.existsSync(zh404Path)) {
  fs.copyFileSync(zh404Path, root404Path);
}

// Create CNAME file (uncomment and replace with your actual domain if needed)
// fs.writeFileSync(path.join(outDir, 'CNAME'), 'jcie.vercel.app');

console.log('Postbuild completed: .nojekyll created, 404.html copied to root');