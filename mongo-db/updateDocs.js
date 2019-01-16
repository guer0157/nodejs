const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser:true})
.then(()=>console.log('Connected to mongoDB'))
.catch(err=>console.error('Could not connecto to mngod', err))
const courseSchema=new mongoose.Schema({
id:String,
name: String,
author: String,
tags: [String],
date: {type:Date, default:Date.now},
isPublished: Boolean,
price:Number
})
const Course=mongoose.model('Course', courseSchema)

async function updateCourse(id){
    // console.log(id)
    //Approad: QueryFirst
    //findByid()
    //Modify its properties
    //save()
    //find the element by id
    const courses=await Course.findById(id)
    //check if there is a course with that id
    if (!courses){ return}
    //set the values of the properties you want to modify
    courses.isPublished=false;
    courses.author='Another Author';
    //await the result fo the async func and save it.
    const result= await courses.save()
    console.log(courses)

}

updateCourse("5c3a8a8a7fea8b037503e4cf")