// crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time
const inferNotA = function(tags) {
  const keys = Object.keys(tags)

  for (let j = 0; j < keys.length; j++) {
    const k = keys[j]
    const tag = tags[k]
    const updatedNotA = new Set(tag.notA || [])

    for (let l = 0; l < tag.isA.length; l++) {
      const down = tag.isA[l]
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        const notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || []
        updatedNotA.add(...notA)
      }
    }
    // any tag that lists us as a conflict, we conflict it back.
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (tags[key].notA.indexOf(k) !== -1) {
        updatedNotA.add(key)
      }
    }
    // clean it up
    tag.notA = [...updatedNotA]
  }
  return tags
}
module.exports = inferNotA
