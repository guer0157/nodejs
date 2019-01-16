const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-exercises', {useNewUrlParser:true})
.then(()=>console.log("connected to Mongo DB"))
.catch(err=>console.log(err))
const courseSchema=mongoose.Schema({
    author:String,
    tags:[String],
    name:String,
    price:Number,
    date:{type:Date, default:Date.now},
    isPublished:Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses(){
    return await Course
    .find({isPublished:true, tags:{$in:['frontend', 'backend']}})
    .sort({price:-1})
    .select({name:1, author:1})
}
async function showCourses(){
    const course= await getCourses()
    console.log(course)
}
showCourses()



