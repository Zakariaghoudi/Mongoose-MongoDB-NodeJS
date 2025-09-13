const Persons = require("../model/Persons");

// Create and Save a Record of a Model
exports.addPerson = () => {
  const person = new Persons({
    name: "Mohamed",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });
  return person.save();
};
// Create Many Records with model.create()
exports.addPersons = () => {
  const arrayOfPeople = [
    { name: "Jaddi ", age: 25, favoriteFoods: ["Pasta", "Salad"] },
    { name: "nsibi ", age: 40, favoriteFoods: ["Tacos", "Burritos"] },
    { name: "ftayri", age: 35, favoriteFoods: ["Steak", "Fries"] },
    { name: "ghrab", age: 28, favoriteFoods: ["Sushi", "Ramen"] },
  ];
  return Persons.create(arrayOfPeople);
};

// find all persons
exports.findAllPersons = () => {
  return Persons.find();
};

// find person by ID
exports.findPersonById = (personId) => {
  return Persons.findById(personId);
};

// find person by id and  update : addfood to favoriteFoods
exports.addFoodToPerson = (personId, foodToAdd) => {
  return Persons.findById(personId).then((person) => {
    person.favoriteFoods.push(foodToAdd);
    person.markModified("favoriteFoods");
    return person.save();
  });
};

// find one by name and update the age of this person
exports.updatePersonAgeByName = (personName, newAge) => {
  return Persons.findOneAndUpdate(
    { name: personName },
    { age: newAge },
    { new: true }
  );
};

// Delete one person by ID
exports.deletePersonById = (personId) => {
  return Persons.findByIdAndDelete(personId);
};

// Delete many people by name
exports.deleteManyByName = (personName) => {
  return Persons.deleteMany({ name: personName });
};

// Chain Search Query Helpers to Narrow Search Results
exports.chainSearch = (foodToSearch) => {
  return Persons.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // sort by name
    .limit(2) // limit to 2 results
    .select({ age: 0 }) // hide age field
    .exec(); // execute the query
};
