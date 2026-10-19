const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../app.log'), { flags: 'a' });

module.exports = (req, res, next) => {
    const logData = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    logStream.write(logData);
    next();
};