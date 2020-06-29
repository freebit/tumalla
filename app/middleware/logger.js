module.exports = (format) => (req, res, next) => {
  const regExp = /:(\w+)/g;
  const str = format.replace(regExp, (match, property) => req[property])
  console.log(str)
  next()
}