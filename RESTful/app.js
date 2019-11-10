/*
install use nodemon <filename> to automatically listen on the port
install joi to add easy validation
install helmet to set up http headers
install debug to quickly debug you application
install morgan to log http request (NOTE: morgan is not necesary and logging each request will delay the
    request processing time. try not to use in production.)
Create 'config' folder and require it to set the seetings of the app in different build modes
 */
//require express and joi from node_modules
const config=require('config')
const express= require('express')
const Joi = require('joi')
const logger=require('./middleware/logger')
const helmet=require('helmet');
const morgan=require('morgan');
const authenticate = require('./authenticator')
//Moved all routes with '/api/courses/' to separate file
//in order to use them we need to require them from the courses file and the tell express to use then
//see line 46 app.use('/api/courses', courses)
const courses=require('./routes/courses')
const home=require('./routes/home')
//use debug you need to store it in a constant and pass in a name for the name space where these 
//log messages will be stored. you will also need to create a environment variable with that name 
const debug=require('debug')('app:debug');
// create an instance of the express class and store in variable
const app = express()
/*These two approaches get the type of environment the project is set to (production, development, etc..) 
NOTE: app.get will return a default value of development 'NODE_ENV' is undefined.

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`);

*/
// enable parsing of json objects. this feature is disabled by default
//if there is a json object in the request this will add the json object to the "req" argument and the json
//can be accessed as "req.body"
//app.use tells express to use these pieces of middleware passed to the function ".use()"
app.use(express.json())
//this is used if you have a url encoded request "thorough urlquesryStrings."
//extended prop needs to be turned to true to allow arrays and object in the body of the request
// app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(logger)
app.use(authenticate)
app.use(helmet());
//in order to use the other module. we need to tell express to use this route and pass it two arguments
//the route used '/api/courses' and the constant where the route is stored 'course'
//for any route that is using that end point ex:'api/courses' use this router ex: courses

app.use('/api/courses',courses)
app.use('/',home)
//CONFIGURATION*********************************************
debug('Application Name: ',config.get('name'))
debug('Mail Server: ',config.get('mail.host'))
debug('Mail Password: ',config.get('mail.password'))
//tiny is the format of the log you want to see. 'tiny' is the shortest format
//you can use the value returned from "NODE_ENV" to make a conditional
if(app.get('env')==='development'){
app.use(morgan('tiny'));
debug('Morgan Enabled')
}
// const courses=[{id:1,name:"course1"},{id:2,name:"course2"},{id:3,name:"course3"}];

/*
    Add a listener to listen for the request
    listen takes 2 parameters:
    First: a port to listen
    Second is optional: a function that will be called when the listener is triggered 

*/
/* Avoid hardcoding the value of the port use an
enviroment variable to set the port number*/
//use the 'process' object with the property "env" for for enviroment variable
//then add the name of the enviroment variable "PORT" you need to make this evironment variable using
//the following command on the terminal
// export <Environment Variable Name>=<Number Value>

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
