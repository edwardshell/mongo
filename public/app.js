$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<div class='indArticle'><h3>" +
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

$(document).on("click", "#save", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
    data: {
      title: this.title,
      summary: this.summary,
      link: this.link
    }
  }).then(function(data) {
    console.log(data);
    $.ajax({
      method: "POST",
      url: "/saved/",
      data: {
        title: data.title,
        summary: data.summary,
        link: data.link
      }
    }).then(function(data) {
      console.log(data.data);
    });
  });
});

