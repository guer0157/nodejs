//conectin to mongo db
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
//compile the schema into a model this will allow us to add
//content to the database always with the same structure that we defined in the schema.
//use mongoose.model takes 2 arguments first is the singular
//name of the collection 'courses'->'course'
//second argument is the schema 'courseSchema'
//the model will create a class which we can store in a const
const Course = mongoose.model('Course', courseSchema)
//access the Course class and store it in a course object
async function createCourse(){
const course = new Course({
    name:'Angular Course',
    author:'Cesar',
    tags:['angular','frontend'],
    isPublished:true
})
const result = await course.save();
console.log(result)
}
async function getCourses(){
    /*
    **** Regular Expressions******
    add /i to make the expression case insesitive.
    returns all where author starts with Cesar
    .find({author: /^Cesar/ })
      returns all where author ends with Guerrero
    .find({author: /Guerrero$/ })
      returns all where author contains Garcia anywhere in the author string
.find({author: / .*Guerrero.* / })

      ****Comparison operators******
    eq  (equal)
    ne  ( not equal)
    gt  (greater than)
    gte (greater or equal to)
    lt  (less than)
    lte (less than or equal to)
    in  
    nin (not in)
    */
    const courses = await Course
    //The find method gets all the db documents
    //it also takes an optional object with filters
    //for ecample the below code will only return documents
    //where the author is cesar and isPublished is set to true
    /************************************************** */
    /*********** Using Comparison Operators************
    **************************************************
    to use comparison operators set the value of the property
    you want to use the operator on to an object .find({price:{}})
    then set a key with the operator you want to use preceded by $
    price:{$gt:} and the condition as the value price:{$gt:10}

    .find({price:{$gt:10}}) gets all docs with price greater than 10

    use 'in' when you're looking for specific values.
    .find({price:{$in:[10, 15, 20]}})
    this query will only get courses with a price of 10, 15 or 20 dollars
    *********************************/
    .find({author:'Cesar', isPublished:true})
    //we can change different methods
    //limit will only return 10 documents
    .limit(10)
    //sort takes the property that you want to sort by
    //and either 1 or -1 to sort by ascending or descending order
    .sort({name:1})
    //return only the properties you want to return
    .select({name:1, tags:1})
    console.log(courses)
}
// getCourses();
createCourse();