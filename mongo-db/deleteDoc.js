const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser:true})
let courseSchema= new mongoose.Schema({
    author:String,
    tags:[String],
    name:String,
    isPublished:Boolean,
    price:Number,
    date:{type:Date, default:d=Date.now}
})
let Course=mongoose.model('Course', courseSchema)

async function deleteCourse(id){
    // let courses=await Course.deleteOne({_id:id})
    //findByIdAndremove will return the docuement that was removed.
    let courses= await Course.findByIdAndRemove({_id:id})
    console.log(courses)
}
deleteCourse('5c3a8a8a7fea8b037503e4cf')