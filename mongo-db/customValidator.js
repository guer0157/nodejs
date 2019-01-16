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
    //to set a custom validator set the value of the property you want to validate to an object set the first key
    //in the object to 'type' and set its value to the required datatype
    //then set the second key to 'validate' and set the vlaue to an object with the key 'validator' with a value of function(){}
    //where you can perform the logic you need to validate 
    //the below coe check if the property 'tags' is set to an array and if lengh of the array is more than 0  
 validate:{
    validator: function(v){
        return v&&v.lenght>0;
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