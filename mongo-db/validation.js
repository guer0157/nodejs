const mongoose=require('mongoose')
//set the connection to the mongobd
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser:true})
.then(()=>console.log('Connected to mongoDB'))
.catch(err=>console.error('Could not connecto to mngod', err))
const courseSchema=new mongoose.Schema({
    //validate required fields by passing an object as the value of the key {type:String, required:true}  setting the 'type' property to
    //the data type ex: 'String' and adding an additional property called 'required' with the value set to true
name: {
    //String validators: minlength,maxlength,match,enum
    type: String,
    required:true,
    minlength:5,
    maxlength:255,
    // match:/patter/
},
category:{
    type:String,
    required:true,
    //'enum' may be use when only a certain set of predefined values is valid
    //we can set those values inside an array an set the array to the value of the 'enum' property
    enum:['web', 'mobile', 'network']
},
author: String,
tags: [String],
//number and date validators: min, max
date: {type:Date, default:Date.now},
isPublished: Boolean,
//We can pass function as th value of the required property qwhen we want to set conditional validation
//for example is 'price' is only required when 'isPublished' is set to 'true'
price:{ type:Number, required:function(){ return this.isPublished} }
})
const Course=mongoose.model('Course', courseSchema)

async function addCourse(){
    const newCourse= await Course({
        tags:['frontend', 'Xamarin'],
        category:'0',
        name:'Xamarin for Beginners', 
        author:'Silvia',
        isPublished:true,
        price:15
    })
    // const result=
    await newCourse.save().catch(err=>console.log("Error",err.message))   
    // console.log(result)
}
addCourse()