
const formidable = require('formidable')

module.exports = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(err) throw new Error('formidable parse error')
    req.body = {...fields, ...files}
    next()
  })
}