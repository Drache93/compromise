const fns = require('./fns')

/** add a tag to a term */
const fastAdd = function(t, tag, reason, world) {
  // log it?
  const isVerbose = world.isVerbose()
  if (isVerbose === true) {
    fns.logTag(t, tag, reason)
  }
  //add tag
  t.tags[tag] = true //whee!
}

module.exports = fastAdd
