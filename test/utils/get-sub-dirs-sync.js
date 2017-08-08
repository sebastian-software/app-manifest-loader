var glob = require('glob');

module.exports = cwd => glob.sync('*/', { cwd: cwd }).map(subDir => subDir.replace(/\/$/, ''));
