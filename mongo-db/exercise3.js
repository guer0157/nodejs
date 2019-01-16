const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser:true})

const courseSchema= new mongoose.Schema({
    author:String,
    price:Number,
    date:{type:Date, default:Date.now},
    isPublished:Boolean,
    name:String,
    tags:[String]
})
const Course=mongoose.model('Course', courseSchema)

async function getCourses(){
    return await Course
    .find({isPublished:true})
    .or([{name:/.*by.*/}, {price:{$gte:15}}])
}
async function showCourses(){
    const courses=await getCourses()
    console.log(courses)
}
showCourses()