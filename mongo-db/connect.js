const mongoose=require('mongoose')
//set the connection to the mongobd
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/mongo-exercises/', { useNewUrlParser: true })
.then(()=>console.log('Connected to mongoDB'))
.catch(err=>console.error('Could not connecto to mngod', err))
