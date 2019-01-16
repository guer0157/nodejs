//call app.use to install a middleware function in the request processing pipeline
//function takes req, res, and "next". "next" is a reference to the next middleware function in the pipeline "the next function to run"
let log = (req, res, next)=>{
    //perform code here
    console.log('logging');
    //then call the "next" function to pass control to the next request processing function. which will terminate the process and
    //send reponse back to client
    next()
}
module.exports = log