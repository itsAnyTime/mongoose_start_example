// docs: https://mongoosejs.com/docs/index.html
// install: $ npm install mongoose --save

// connect to Mongo database
const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test', {
mongoose.connect('mongodb://localhost/mongoose_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// connection test
mongoose.connection.on('error', console.error);
mongoose.connection.on('open', function () {
    console.log('Database connection established.');
});

// or
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });


// document: instance of a model 
// mongoose model: class created with a name and a schema
// schema: blueprint for a model

// everything is derived from a Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// compiling our schema into a Model
const User = mongoose.model('User', userSchema);

// A model is a class with which we construct documents. In this case, each document will be a User with properties as declared in our schema. 
const Leila = new User({
    name: 'Leila',
    age: 39
})

// // behaviors example (see docu) and more
// Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//   const greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

// const Kitten = mongoose.model('Kitten', kittySchema);

// Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:

// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"

// We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.

//   fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//   });

// Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

// We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.

// Kitten.find({ name: /^fluff/ }, callback);

// This performs a search for all documents with a name property that begins with "fluff" and returns the result as an array of kittens to the callback.
// Congratulations

// That's the end of our quick start. We created a schema, added a custom document method, saved and queried kittens in MongoDB using Mongoose. Head over to the guide, or API docs for more.

Leila.save().then(() => {  // () => : classically: function() {...}  (here error function)
    console.log(Leila);
}).catch((error) => {
    console.log('Error', error);
});