//import mongoose
const mongoose = require("mongoose");
//import the model
const Persons = require("./model/Persons");
//import dotenv for mongo_uri
require("dotenv").config();

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  //  { useNewUrlParser: true, useUnifiedTopology: true }) = to avoid deprecation warning 
  .then(() => {
    console.log("Connected to MongoDB");

    //Create and Save a Record of a Model:
    const person = new Persons({
        name: 'Mohamed',
        age: 30,
        favoriteFoods: ['Pizza', 'Burger']
    });
    person.save()
        .then(doc => {
            console.log('Person saved:', doc);
        })
    .catch(err =>{
        console.error("error saving person:", err);
    });

    // create many records with model.create()
    const arrayOfPeople = [
      { name: "Jaddi ", age: 25, favoriteFoods: ["Pasta", "Salad"] },
      { name: "nsibi ", age: 40, favoriteFoods: ["Tacos", "Burritos"] },
      { name: "ftayri", age: 35, favoriteFoods: ["Steak", "Fries"] },
      { name: "ghrab", age: 28, favoriteFoods: ["Sushi", "Ramen"] },
    ];
    Persons.create(arrayOfPeople)
      .then((docs) => {
        console.log("People saved:", docs);
      })
      .catch((err) => {
        console.error("error saving people:", err);
      });

    // Use model.find() to Search Your Database : get all the people 
    Persons.find()
      .then((docs) => {
        console.log("Found people:", docs);
      })
      .catch((err) => {
        console.error("error finding people:", err);
      });

      // get user by id 
      const PersonId = "68c4734c9b20844fa12ddf37"; 
      Persons.findById(PersonId)
        .then((doc) => {
          console.log("Found person:", doc);
        })
        .catch((err) => {
          console.error("error finding person:", err);
        });

        // find person by id and  update, add "hamburger" to favoriteFoods
      const foodToAdd = "Helba";
      Persons.findById("68c4734c9b20844fa12ddf36") // find person by id
      .then(person => {
        person.favoriteFoods.push(foodToAdd); // add food to favoriteFoods array
        person.markModified('favoriteFoods'); // Notify Mongoose of the change
        return person.save(); // save the updated person
      })
      .then(updatedPerson => {
        console.log("Updated person:", updatedPerson);
      })
      .catch(err => {
        console.error("error updating person:", err);
      });

    // find one and update the age of the person named "ghrab" to 20
     const personName = "ghrab";
      Persons.findOneAndUpdate({ name: personName }, 
      { age: 20 }, { new: true }) // return the updated document
      .then((doc) => {
        console.log("Updated person:", doc);
      })
      .catch((err) => {
        console.error("error updating person:", err);
      });

      // Delete one person by ID
      const personIdToDelete = "68c4734c9b20844fa12ddf39"; 
      Persons.findByIdAndDelete(personIdToDelete)
      .then((doc)=>{
        console.log("Deleted person:", doc);
      })
      .catch((err)=>{
        console.error("error deleting person:", err);
      });

      // Delete many people named "ftayri"
      const nameToDelete = "ftayri";
      Persons.deleteMany({ name: nameToDelete })
      .then((result) => {
        console.log("Deleted people:", result);
      })
      .catch((err) => {
        console.error("error deleting people:", err);
      });


    // Chain Search Query Helpers to Narrow Search Results :  Sort them by name, limit the results  
      const foodToSearch = "hamburger";
    Persons.find({ favoriteFoods: foodToSearch }) // find people who like Hamburgers
    .sort({ name: 1 }) // sort by name descending
      .limit(2) // limit to 2 results
      .select({ age: 0 }) // hide age field
      .exec() // execute the query
      .then((docs) => {
        console.log("Search results:", docs);
      })
      .catch((err) => {
        console.error("error searching people:", err);
      });


      // end of the database operations
      // catch any connection errors
  })
  .catch((err) => console.error("Connection error...", err));
