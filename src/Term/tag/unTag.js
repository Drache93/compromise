const fns = require('./fns')

const untagAll = function(term, tagOrTags, reason, world) {
  if (tagOrTags === '*') {
    term.tags = {}
    return term
  }

  const tagset = world.tags
  const tags = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags]
  const isVerbose = world.isVerbose()

  // Add tags to remove list
  const remove = new Set(tags)

  // Get tagset for each tag and add lineage to remove list
  for (let i = 0; i < tags.length; i++) {
    const t = tagset[tags[i]]

    if (!t) {
      continue
    }

    for (let j = 0; j < t.lineage.length; j++) {
      remove.add(t.lineage[j])
    }
  }

  // Create new object with removed tags
  const entries = Object.entries(term.tags)
  const newTags = {}
  for (let i = 0; i < entries.length; i++) {
    const [k, v] = entries[i]

    if (v === true && remove.has(k)) {
      if (isVerbose === true) {
        fns.logUntag(term, k, reason)
      }

      continue
    }

    newTags[k] = v
  }

  term.tags = newTags

  return term
}

module.exports = untagAll
