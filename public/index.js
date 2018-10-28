$(document).ready(function() {
  $("#btnGetBook").click(function(event) {
    $.ajax({
      url: "http://127.0.0.1:8080/api/books/",
      method: "GET",
      contentType: "application/x-www-form-urlencoded",
      data: {
        bid: $('#Enter_the_Form_Element_for_Book_ID_field').val()
      },
      success: function(data) {
        console.log(data);
      },
      error: function(err, status, errorThrown) {
        console.log("Data: " + err + "\nStatus: " + status + "\nError: " + errorThrown);
      }
    });
    event.preventDefault();
  });

  $("#btnGetBooks").click(function(event) {
    $.ajax({
      url: "http://127.0.0.1:8080/api/books/",
      method: "GET",
      contentType: "application/x-www-form-urlencoded",
      data: {},
      success: function(data) {
        console.log(data);
      },
      error: function(err, status, errorThrown) {
        console.log("Data: " + err + "\nStatus: " + status + "\nError: " + errorThrown);
      }
    });
    event.preventDefault();
  });

});
