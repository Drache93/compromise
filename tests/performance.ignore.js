const test = require('tape')
const nlp = require('./_lib')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')

function calculateRegression(x, y, t) {
  const sumX = x.reduce((acc, v) => acc + v, 0)
  const sumY = y.reduce((acc, v) => acc + v, 0)

  const avgX = sumX / x.length
  const avgY = sumY / y.length

  let sumSqX = 0
  for (let i = 0; i < x.length; i++) {
    sumSqX += Math.pow(x[i] - avgX, 2) // this will never change unless we add more tests...
  }

  let sumP = 0
  for (let i = 0; i < y.length; i++) {
    sumP += (x[i] - avgX) * (y[i] - avgY)
  }

  const b = sumP / sumSqX
  const a = avgY - b * avgX
  const result = `${b.toFixed(5)}X ${a > 0 ? '+' : '-'} ${a.toFixed(5)}`

  // test something....

  return result
}

test('Performance', function(t) {
  const res = shell.exec('wget -O - https://unpkg.com/nlp-corpus@3.3.0/builds/nlp-corpus-1.json')
  const outputPath = path.join(__dirname, './performance.results.json')

  if (!res.stdout) {
    t.fail(res.stderr)
  }

  const textArr = JSON.parse(res.stdout).sort((a, b) => a.length - b.length)
  const x = []
  const y = []

  for (let i = 0; i < textArr.length; i++) {
    const text = textArr[i]
    const yI = []

    console.group('Test', i)

    for (let j = 0; j < 5; j++) {
      console.log('--', j)
      const start = Date.now()
      nlp(text)
      const end = Date.now()

      yI.push(end - start)
    }

    x.push(text.length)
    y.push(yI.reduce((acc, v) => acc + v, 0) / yI.length)

    console.groupEnd()
  }

  const regression = calculateRegression(x, y, t)

  const results = { x, y, key: { x: 'Length', y: 'Time' }, regression }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))

  t.end()
})
