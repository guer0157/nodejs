/*Event Emitter let you create events that the port can listen on */
const EventEmitter = require('events');

var url = 'http://mylogger.io//log'

/**Best practice to always make your own custom class that inherits the EventEmitter */
class Logger extends EventEmitter{

   log(message){
        //sedn an HTTP request.
        console.log(message)
        //signal that an event is happening
        //when raising an event you can add more arguments inside an object
        this.emit('messageLogged', {id:1,url:'http://'});
    
    
    }

}
/*Don't forget to always export the class you'll use*/
module.exports = Logger;