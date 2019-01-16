//To update multiple object use the update method

const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongo-exercises', {useNewUrlParser:true})
const courseSchema= new mongoose.Schema({
    tags:[String],
    author:String,
    name:String,
    isPublished:Boolean,
    date:{type:Date, default:Date.now},
    price:Number
})
const Course=mongoose.model('Course', courseSchema)

async function updateCourse(id){
    //you may use the .updateMany(({parameter}), {updateObject}) and pass it the parameter you're looking for and one of the mongo db update methods.
    //example: Course.updateMany({isPublished:false}) will return all the courses where the
    //'isPublished' property is false and you can then update all of them at once.
    //*google mongo db update operators */
    //Use updateOne(), updateMany(), or bulkWrite(), findByIdAndUpdate() return the document that was updated.
    //the third argument is oprtional and it specifies if you want the method to return the new docuement after it is updated.
    const courses= await Course.findByIdAndUpdate({_id:id},{$set:{author:'Cesar',isPublished:true}},{new:true})
    console.log(courses)
}
updateCourse('5c3a8a8a7fea8b037503e4cf')