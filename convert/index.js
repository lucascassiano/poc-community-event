const marked = require("marked");
const html = marked('# Marked in Node.js\n\nRendered by **marked**.');
console.log(html)