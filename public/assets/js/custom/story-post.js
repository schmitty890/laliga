// when save comment is clicked, add comment to db
$(document).on('click', '#post-coment-form-submit', function() {
  // console.log('story-post save clicked');
  // grab id from data attr, use ajax post method to send comment from text-input val to the article
  $.ajax({
    method: "POST",
    url: "/story-post",
    data: {
      title: $("#input-title").val(),
      comment: $("#textarea-comment").val(),
      image: $("#input-image").val(),
      user: digitalData.user.teamName,
      logo: digitalData.user.logo
    }
    // then log it and empty the input box
  }).done(function(data) {
    console.log(data);
    // $(this).html("Comment Saved")
  })
});
