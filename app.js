
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();


const startingContent = "This is the page where you will see all the post that you are going to make. They will be listed with there Title first and then the first 100 characters. You can open the respective entry by clicking on the read more link that appears after the 100 character.";
const aboutInfo = "This is the about page of the project. Created by Kishlay Kumar";
const contactInfo = "You can contact me at the following email address -> Kishay1228@gmail.com";

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: startingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutInfo: aboutInfo});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactInfo: contactInfo});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  console.log(req.body)
  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
