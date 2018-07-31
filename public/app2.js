$.getJSON("/saved", function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    $("#saved").append(
      "<div class='indArticle'><h3 data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "</h3><p>" +
        data[i].summary +
        "</p><a href='" +
        data[i].link +
        "'>Here is the Article</a></div><br />"
    );
  }
});
