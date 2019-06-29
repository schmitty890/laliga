// // when save comment is clicked, add comment to db
$(document).on('click', '#submit-fact', function(e) {
    e.preventDefault();
    // console.log('story-post save clicked');
  //   console.log(digitalData);
    // grab id from data attr, use ajax post method to send comment from text-input val to the article
    $.ajax({
      method: "POST",
      url: "/fact",
      data: {
        description: $("#fact-description").val(),
        category: $("#fact-category").val(),
        approved: false,
        upvote: 0,
        downvote: 0,
        contestFact: 0,
        submittedBy: digitalData.user._id
      }
      // then log it and empty the input box
    }).done(function(data) {
      console.log(data);
      var html = `
        <div class="alert alert-success">
            ${data}
        </div>
      `;
      $('#fact-alert-msg').append(html);
    });
  });
  