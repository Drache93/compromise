//add 'downward' tags (that immediately depend on this one)
const inferIsA = function(tags) {
  const keys = Object.keys(tags)

  for (let j = 0; j < keys.length; j++) {
    const k = keys[j]
    const tag = tags[k]
    const len = tag.isA.length
    const updatedIsA = new Set(tag.isA)

    for (let i = 0; i < len; i++) {
      let down = tag.isA[i]
      if (tags[down]) {
        for (let l = 0; l < tags[down].isA.length; l++) {
          updatedIsA.add(tags[down].isA[l])
        }
      }
    }

    // clean it up
    tag.isA = [...updatedIsA]
  }
  return tags
}
module.exports = inferIsA
