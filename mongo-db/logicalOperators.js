    
    
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground', {useNewUrlParser: true})
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connecto to mngod', err))

    const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})

    const Course = mongoose.model('Course', courseSchema)

    async function createCourse() {
    const course = new Course({
        name: 'Cross Platform Course',
        author: 'Steve',
        tags: ['Vue', 'frontend'],
        isPublished: true
    })
    const result = await course.save();
    console.log(result)
}
    async function getCourses() {
/*Logical operators
    and
    or
*/
/*Regular expressions

    use .find({author:}) set the value of the property
    to a regular expression .find({author: /RegEx/ })
*/
/*
 */
    const courses = await Course
        .find()
        //use .or or .and to use logical operators
        //takes an array with the filters 
        //this will return docs where isPublished is true or author is Cesar
        .or([{author:'Cesar'},{isPublished:true}])
        // .and([])
        .limit(10)
        //user -1 to return descending order
        .sort({name: 1})
        //it is also possible to return the ammount of docs returned
        //with .countDocuments()
        .countDocuments()
        //selects returns only the properties specified '{name:1, tags:1}' 
        .select({name: 1,tags: 1})
    console.log(courses)
}
getCourses();   
// createCourse()