// implement your API here

//import express from 'express'; // ES2015 Module Import
const express = require("express"); // define the server; // CommonJS Module Import

//initialize router
const postsRouter = require("./posts/posts-router.js");

const server = express(); // instantiate the server; return back the server

//parses body and add it to req object
const parser = express.json();
server.use(parser); // server now knows how to write JSON. Extends express by using middleware

server.get("/", (req, res) => {
  //this function is a request handler. It is also middleware.
  //request and response are positional arguments.
  res.send("It's alive!"); // .send is a method of the response object. This sends a quick response back to the client
});

server.use("/api/posts", postsRouter);

// export default server
module.exports = server;
