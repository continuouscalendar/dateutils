const __ = {}

Function.prototype.curry = function () {
  return curry(this, Array.prototype.slice.call(arguments))
}

Function.prototype.wrap = function () {
  const _this = this
  const _arguments = arguments
  return () => _this.apply(_this, _arguments)
}

module.exports = {
  __: __,
  sequence: sequence
}

function sequence(start, end) {
  const list = []
  for (let i = start; i <= end; i++) list.push(i)
  return list
}

function curry(func, givenArguments) {
  const indexOf = givenArguments.indexOf(__)
  const givenArgsSize = givenArguments.length
  const requiredArgsSize = func.length
  if (givenArgsSize >= requiredArgsSize && (indexOf < 0 || indexOf >= requiredArgsSize))
    return func.apply(func, givenArguments)
  else
    return function () {
      return ((givenArguments, remainingArguments) => {
        for (let i = 0; i < givenArguments.length; i++)
          if (givenArguments[i] === __) givenArguments[i] = remainingArguments.shift()
        return curry(func, givenArguments.concat(remainingArguments))
      })(givenArguments.slice(0), Array.prototype.slice.call(arguments))
    }
}
