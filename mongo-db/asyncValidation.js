const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/mongo-exercises',{useNewUrlParser:true})
.then(()=>console.log('Connected to mongoDB'))
.catch(err=>console.error('Could not connecto to mngod', err))
const courseSchema=new mongoose.Schema({
name: {
    type: String,
    required:true,
    minlength:5,
    maxlength:255,

},
category:{
    type:String,
    required:true,
    enum:['web', 'mobile', 'network']
},
author: String,
tags: {type:Array,
 validate:{
    isAsync:true,
    validator: function(v, callback){
        setTimeout(()=>{
            const result=v&&v.lenght>0; 
            callback(result);
        },4000)
        
    },
    message:'Course should have atleast one tag'
}
},
date: {type:Date, default:Date.now},
isPublished: Boolean,
price:{ type:Number, required:function(){ return this.isPublished} }
})
const Course=mongoose.model('Course', courseSchema)

async function addCourse(){
    const newCourse= await Course({
        tags:null,
        category:'web',
        name:'Xamarin for Beginners', 
        author:'Silvia',
        isPublished:true,
        price:15
    })
   
    await newCourse.save().catch(err=>console.log("Error",err.message))   

}
addCourse()