/** apply a tag, or tags to all terms */
const fastTag = function(tag, doc, reason) {
  for (let i = 0; i < doc.list.length; i++) {
    const p = doc.list[i]

    let terms = p.cache.terms || p.terms()

    for (let j = 0; j < terms.length; j++) {
      const t = terms[j]

      t.tagUnsafe(tag, reason, doc.world)
    }
  }
  return
}
module.exports = fastTag
