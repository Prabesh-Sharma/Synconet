const catchAsyncErr = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => { // Pass a function to `catch`
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    }
}

export default catchAsyncErr
