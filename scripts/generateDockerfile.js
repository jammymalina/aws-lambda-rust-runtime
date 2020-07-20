const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error('Please provide rust version');
  }
  const rustVersion = args[0].trim();

  const dockerfileContent = await ejs.renderFile(path.resolve(__dirname, '../Dockerfile.template.ejs'), {
    rustVersion,
  });
  fs.writeFileSync(path.resolve(__dirname, '../Dockerfile'), dockerfileContent);

  process.exit(0);
})();
