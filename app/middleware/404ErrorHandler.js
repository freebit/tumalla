module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    console.log('Http error - ', res.statusCode)
    res.status(404).json({ message: 'Freeb err 404' })
  }
}