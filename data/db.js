const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

//find(): calling find returns a promise that resolves to an array of all the posts contained in the database.
function find() {
  return db("posts");
}

// findById(): this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
function findById(id) {
  return db("posts").where({ id: Number(id) });
}

// insert(): calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: { id: 123 }.
function insert(post) {
  return db("posts")
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

// update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
function update(id, post) {
  return db("posts")
    .where("id", Number(id))
    .update(post);
}

// remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
function remove(id) {
  return db("posts")
    .where("id", Number(id))
    .del();
}
