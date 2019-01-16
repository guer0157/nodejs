//one more to authenticate
let authenticate = (req, res, next)=>{
    //perform code here
    console.log('Authenticating');
    //then call the "next" function to pass control to the next request processing function. which will terminate the process and
    //send reponse back to client
    next()
}
module.exports = authenticate