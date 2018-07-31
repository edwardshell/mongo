var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// var request = require("request");
// var exphbs = require("express-handlebars");

var db = require("./models");

var cheerio = require("cheerio");
var axios = require("axios");

var PORT = process.env.PORT || 3000;

var app = express();

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// COnfigure middleware
// Use morgan logger for logging each request on routes
app.use(logger("dev"));
// handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Connect to mongodb using Heroku built in mongo supporter
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
  axios
    .get(
      "https://www.nytimes.com/section/world?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=World&pgtype=Homepage"
    )
    .then(function(response) {
      var $ = cheerio.load(response.data);

      $("div.story-body").each(function(i, element) {
        var result = {};

        result.title = $(this)
          .children("h2")
          .text();
        result.summary = $(this)
          .children("p")
          .text();
        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href");

        // create new article using the result object from above
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
      console.log("Scrape Complete");
    });
});
// route for getting articles from db
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  db.Saved.find({})
    .then(function(dbSaved) {
      res.json(dbSaved);
    })
    .catch(function(err) {
      res.json(err);
    });
  // res.sendFile(path.join(__dirname, "./public/saved.html"));
});

app.post("/saved", function(req, res) {
  db.Saved.create(req.body)
    .then(function(dbSaved) {
      return db.Article.findOne(
        { _id: req.params.id },
        { title: dbSaved.data.title },
        { summary: dbSaved.data.summary },
        { link: dbArticle.data.link }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
  console.log("http://localhost:" + PORT + "/");
});
