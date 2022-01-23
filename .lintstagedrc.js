const path = require("path");

/**
 * @param {string[]} filenames absolute path
 */
const buildEslintCommand = (filenames) => {
  const relativePaths = filenames.map((f) => path.relative(process.cwd(), f));
  return `next lint --fix ${relativePaths.map((f) => `--file ${f}`).join(" ")}`;
};

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*": ["prettier --ignore-unknown --write"],
};
