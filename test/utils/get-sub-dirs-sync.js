import glob from 'glob';
export default cwd => glob.sync('*/', { cwd: cwd }).map(subDir => subDir.replace(/\/$/, ''));
