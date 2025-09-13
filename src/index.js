//import mongoose
const mongoose = require("mongoose");
//import personController
const {
  addPerson,
  addPersons,
  findAllPersons,
  findPersonById,
  addFoodToPerson,
  updatePersonAgeByName,
  deletePersonById,
  deleteManyByName,
  chainSearch,
} = require("./controllers/personController");
//import dotenv for mongo_uri
require("dotenv").config();

// connect to database with  async/await syntax
const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    {
      /*perform database operations here*/
    }

    // Save a Record of a Model:
    const savePerson = await addPerson();
    console.log("Person added:", savePerson);

    // create many records with model.create()
    const savePersons = await addPersons();
    console.log("People added:", savePersons);

    // get all persons
    const allPersons = await findAllPersons();
    console.log("All persons:", allPersons);

    // get user by id
    const personId = "68c58599eb8bbe3b6ac1ce91";
    const personById = await findPersonById(personId);
    console.log("Person by ID:", personById);

    //  add "hamburger" to favoriteFoods
    const foodToAdd = "hamburger";
    const id = "68c58461dadb862fddd19868";
    const updatePerson = await addFoodToPerson(id, foodToAdd);
    console.log("Update person:", updatePerson);

    // change the age of  "Mohamed" to 20
    const personName = "Mohamed";
    const newAge = 20;
    const updatedPerson = await updatePersonAgeByName(personName, newAge);
    console.log("Updated person:", updatedPerson);

    // Delete by ID
    const personIdToDelete = "68c58599eb8bbe3b6ac1ce94";
    const deletedPerson = await deletePersonById(personIdToDelete);
    console.log("Deleted person:", deletedPerson);

    // Delete many people named "ftayri"
    const nameToDelete = "ftayri";
    const deleteResult = await deleteManyByName(nameToDelete);
    console.log("Delete many result:", deleteResult);

    // Chain Search Query Helpers
    const foodToSearch = "hamburger";
    const searchResults = await chainSearch(foodToSearch);
    console.log("Search results:", searchResults);

    {
      /*end of the database operations*/
    }

    // catch any connection errors and close the connection
  } catch (error) {
    console.error("Connection error...", error);
  } finally {
    mongoose.connection.close(); // close the connection
    console.log("Connection closed");
  }
};
server(); // run the server function
