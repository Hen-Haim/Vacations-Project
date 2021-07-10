let errorHandler = (err, req, res, next) => {
    if (err.errorType != undefined) {

        if (err.errorType.isShowStackTrace) {
            console.error("show me my error", err);
        }
        if(err.innerError?.errorType?.httpCode){
            res.status(err.innerError.errorType.httpCode).json({ error: err.innerError.errorType.message });
        }else{
            res.status(err.errorType.httpCode).json({ error: err.errorType.message });
        }
        return;
    }
    console.error(err);
    res.status(700).json({ error: "General error" });
}

module.exports = errorHandler;