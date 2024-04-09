const errorHandler = (err, req, res, next) => {
    res.status(res.statuscode?res.statuscode:500);
    res.json({ message: err.message? err.message:err.stack|| "Internal Server Error" });
  };
  
  export default errorHandler;
  