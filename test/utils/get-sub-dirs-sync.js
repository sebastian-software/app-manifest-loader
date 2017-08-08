import glob from "glob"
export default (cwd) =>
  glob.sync("*/", { cwd }).map((subDir) => subDir.replace(/\/$/, ""))
