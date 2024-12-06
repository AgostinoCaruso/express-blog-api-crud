server.use("/",notFound);
function notFound(req,res,next){
    res.status(404).json({})
}

function interalServerErr(err,req,res,next){
    res.status(500).json({error: err.message});
}

module.exports = {notFound, interalServerErr}
