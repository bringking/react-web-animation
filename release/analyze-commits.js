const { parseRawCommit } = require('conventional-changelog/lib/git');

module.exports = function(pluginConfig, { commits }, cb) {
  let type = null;
  const minorTypes = pluginConfig.minorTypes || [];
  const patchTypes = pluginConfig.patchTypes || [];
  commits
    .map((commit) => parseRawCommit(`${commit.hash}\n${commit.message}`))
    .filter((commit) => !!commit)
    .every((commit) => {
      if (commit.breaks.length) {
        type = 'major';
        return false;
      }
      if (minorTypes.indexOf(commit.type) > -1) type = 'minor';
      if (!type && patchTypes.indexOf(commit.type) > -1) type = 'patch';
      return true;
    });
  cb(null, type);
};
