$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<div class='indArticle'><h3 data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "</h3><p>" +
        data[i].summary +
        "</p><a href='" +
        data[i].link +
        "'>Here is the Article</a>" +
        "<button class='btn btn-primary btn-sm' data-id='" +
        data[i]._id +
        "' " +
        "id='save'>Save</button></div><br />"
    );
  }
});

// $(document).on("click", "#save", function() {
//   var thisId = $(this).attr("data-id");

//   console.log(thisId);

//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   }).then(function(data) {
//     res.json(data);
    
//   });
// });
