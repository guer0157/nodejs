const express = require("express");
const router = express.Router();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/", (req, res) => {
  /*
    request argument has many options
    */

  res.send(courses);
});
//EXAMPLE 3
//Getting specific items with id
//request has a params property that hold all the parameters in the querystring
router.get("/:id", (req, res) => {
  //below:
  //courses.find will loop through the array and return true when the param passed matches
  //an 'id' in the courses array.
  //req.params return a strin so we use the parseInt method to make it an Int value
  const course = courses.find(item => item.id === parseInt(req.params.id));
  //catch any error if id is not found. set the status of the response and also a message
  //can be appended.
  if (!course)
    return res.status(404).send("The course with the given id was not found.");
  res.send(course);
});
//EXAMPLE 4
//it is possible to have multiple parameters in one route
//access an object with all parameters passed using "req.params" or
//access a specific param from the object by using "req.params" and the name of the param "req.params.year"
router.get("//:year/:month", (req, res) => {
  res.send(req.params);
});
//EXAMPLE 5
//We can also read queryString parameter wich are identified by after a "?" in the url
//for ex: user sortBy=name to sort them by name
//to read queryString parameters use ".query" instead of params
router.get("/:year/:month", (req, res) => {
  res.send(req.query);
});
/*
    //////    ///       ///     ////////////  
    //   // //  //    //  //        //
    // //   //  //    ///           //
    //      //  //      //          //
    //        //    /////           //

    ADD "joi" package to add validation to your api.

*/
//ALWAYS VALIDATE THE INPUT!!!
router.post("/api/courses", (req, res) => {
  //WITH JOI FIRST WEE NEED TO DEFINE A SCHEMA which mean which properties we will have.

  /************Start here code was refactored to use a recyclable fucntion to validate *****************
     
    const schema={
        //define the properies expected
        //call the joi variable "Joi" then set the data type ".string" then the min length if applies ".min(3)"
        //and if required
        name:Joi.string().min(3).required()
    }
    //to validate call the variable where joi is stored "Joi" then call the "validate" method
    //takes 2 arguments the body of the request and the schema if body matches schema request is good
    const joiResult=Joi.validate(req.body, schema)


    //store the params passed in an object
    //NOTE: id will be automatically created when dealing with real db
    //use req.body to get the body of the request plus the property you want to read ex:"req.body.name"
    if(joiResult.error){
        console.log(joiResult.error.details[0].message)
        // 400 codes are used for bad requests.
        //SEND send the response back to the client
        res.status(400).send(joiResult.error.details)
        return;
    }***********************Ends Here******************************************************/
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(error);
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name
  };
  //push object to the array.
  //in read dv you would send the data to the db here.
  courses.push(newCourse);
  //when posting it is good practice to return the body of the object
  res.send(newCourse);
});
/*
    //////  //  //    ////////////  
    //   // //  //        //
    // //   //  //        //
    //      //  //        //
    //        //          //
*/
//put method need the specific route for the course to change
router.put("/:id", (req, res) => {
  //Look for the course

  const course = courses.find(item => item.id === parseInt(req.params.id));
  console.log("This is course", course);

  //if courses does not exists return 404
  if (!course)
    return res.status(404).send("The course was not found, could no update.");
  //if it exists validate data by passing to a recyclable function to validate
  const { error } = validateCourse(req.body); //use object destruction to get the error only.
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //Update the code
  course.name = req.body.name;
  res.send(course);
  //return the updated course
});
/*
    //////  /////    //  
    //   // //       //
    //   // ////     //
    //   // //       //
    /////   /////    //////
*/
router.delete("/:id", (req, res) => {
  const course = courses.find(item => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course could not be found");
  //to delete find the index of the course that's stored in the course constant
  const index = courses.indexOf(course);
  console.log("This is index", index);
  //splice deletes 1 item from the courses array at the passed index
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
