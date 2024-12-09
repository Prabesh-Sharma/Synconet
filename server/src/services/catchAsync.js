const catchAsyncErr = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: error.message,
        error: error,
      })
    }
  }
}

export default catchAsyncErr
