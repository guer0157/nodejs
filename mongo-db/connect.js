const mongoose=require('mongoose')
//set the connection to the mongobd
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

mongoose.connect('mongodb://localhost:27017/playground',{useNewUrlParser:true})
.then(()=>console.log('Connected to mongoDB'))
.catch(err=>console.error('Could not connecto to mngod', err))

//mongoose has schema class that specifies the structure of the
//documents
// user type: ObjectId to set unique identifiers
const courseSchema=new mongoose.Schema({
name: String,
author: String,
tags: [String],
//use an object with one property for  the type and one to set a default date
date: {type:Date, default:Date.now},
isPublished: Boolean
})
const Course=mongoose.model('Course', courseSchema)

async function getCourse(){
    const pageNumber=2;
    const pageSize=10
    //api/courses?pageNumber=1&pageSize=10

    const courses = await Course()
    .find({author:'Mosh', isPublished:true})
    .skip((pageNumber-1*pageSize))
    .limit(pageSize)
    .sort()
    .select()
    console.log(courses)
}