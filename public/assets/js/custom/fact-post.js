// // when save comment is clicked, add comment to db
$(document).on('click', '#submit-fact', function(e) {
    e.preventDefault();
    // console.log('story-post save clicked');
  //   console.log(digitalData);
    var category = $("#fact-category").val();
    var description = $("#fact-description").val();
    if(category == '' || description == '') {
        $('#fact-alert-msg').html('');
        var html = `
        <div class="alert alert-warning">
            You cannot enter a blank fact
        </div>
      `;
      $('#fact-alert-msg').append(html);
    } else {
        $.ajax({
            method: "POST",
            url: "/fact",
            data: {
              description: description,
              category: category,
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
            $('#fact-alert-msg').html('');
            $('#fact-alert-msg').append(html);
          });
    }

  });
  