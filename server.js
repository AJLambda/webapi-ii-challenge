// implement your API here

//import express from 'express'; // ES2015 Module Import
const express = require("express"); // define the server; // CommonJS Module Import

const db = require("./data/db.js"); // import the db functions;

const server = express(); // instantiate the server; return back the server
//parses body and add it to req object
const parser = express.json();
server.use(parser); // server now knows how to write JSON. Extends express by using middleware

//initialize router
const router = express.Router();

server.get("/", (req, res) => {
  //this function is a request handler. It is also middleware.
  //request and response are positional arguments.
  res.send("It's alive!"); // .send is a method of the response object. This sends a quick response back to the client
});

////////////// GET REQUEST //////////////////

// READ POSTS

// When the client makes a GET request to /api/posts:

// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

//GET	/api/posts	Returns an array of all the post objects contained in the database.

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log("Get all posts:", posts);
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The posts information could not be retrieved."
      });
    });
});

// When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in retrieving the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.

//GET	/api/posts/:id	Returns the post object with the specified id.

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  console.log("req params id:", req.params.id);

  db.findById(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

////////////// POST REQUEST //////////////////
// CREATE POST

// When the client makes a POST request to /api/posts:

// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If the information about the post is valid:

// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.
// If there's an error while saving the post:

// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.
// When the client makes a GET request to /api/posts:

//POST	/api/posts	Creates a post using the information sent inside the request body.

server.post("/api/posts", (req, res) => {
  // one way to get data from the client is in the request's body
  // axios.post(url, data) => the data shows up as the body on the server
  const post = req.body;
  console.log("request body:", post);

  if (post.title && post.contents) {
    res.status(201).json(post);
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
  db.insert(post)
    .then(post => {
      console.log("New post:", post);
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "There was an error while saving the post to the database"
      });
    });
});

////////////// PUT REQUEST /////////////////
// UPDATE POST

// When the client makes a PUT request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.

//PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log("request params:", req.params);
  const updatePost = req.body;
  console.log("request body:", updatePost);

  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
  if (updatePost.title && updatePost.contents) {
    db.update(id, updatePost)
      .then(updated => {
        res.status(201).json(updated);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The post information could not be modified."
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return;
  }
});

////////////// DELETE REQUEST /////////////////
// DELETE POST

// When the client makes a DELETE request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in removing the post from the database:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.

//DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

server.delete("/api/posts/:id", (req, res) => {
  // axios.delete(.../posts/${id})  ----- front end
  const id = req.params.id; // req.params has the URL parameters

  db.remove(id)
    .then(post => {
      if (post) {
        console.log("deleted post:", post);
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err, message: "The post could not be removed" });
    });
});

// export default server
module.exports = server;
