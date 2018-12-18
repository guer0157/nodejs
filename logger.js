
const EventEmitter = require('events');

var url = 'http://mylogger.io//log'

class Logger extends EventEmitter{

   log(message){
        //sedn an HTTP request.
        console.log(message)
        //signal that an event is happening
        //when raising an event you can add more arguments inside an object
        this.emit('messageLogged', {id:1,url:'http://'});
    
    
    }

}

module.exports = Logger;