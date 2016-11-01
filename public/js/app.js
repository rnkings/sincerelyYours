
//FRONT END This is saying that when button gets submitted run this function
//all this function does is it says when it gets submited submit this info
//to sweepstakes and print it with a link to the next page. Connects up with view template

$('#sweepstakeForm').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/submit/sweepstakes',
    method: 'POST',
    data: $(this).serialize(),
    success: function (response) {
      if (response.status !== 'success') {
        throw new Error('Failed API call.');
      }

      console.log(response);
      $('#result').html('<a href="/viewTemplate.html">Check out the preview! ID was' + response.id + '</a>');
    }
  });
});
//when template form gets submitted run it 
$('#templateForm').on('submit', function (e) {
  //don't submit normally
  e.preventDefault();
  //ajax call to the url /view and passing in a query selector /route?param=value
  $.ajax({
    url: '/view?id=' + $('#templateId').val(),
    method: 'GET',
    //now this gets the response back and it's going to get the response passed.
    success: function (response) {
      var params = response.params
      var $container = $('#templateResult');

      var html = '<h1>' + params.firstname + ' ' + params.lastname + '</h1>';
      html+= '<h2>' + params.sweepstake + ' ' + params.link + '</h2>';

      $container.html(html);
      $container.show();
    }
  })
});




//  function fetchData(){
//    $.ajax({
//      url: "/api/data",
//      method: "GET",
//      success: function(data){
//        // might want to pretty print things here :)
//        document.getElementById("main").innerHTML = "<p>" + data + "</p>";
//      }
//    });
//  }

// function sendData(x = {}){
//   $.ajax({
//     url: "/api/data",
//     method: "POST",
//     data: x,
//     success: function(output){
//       // might want to pretty print things here :)
//       document.getElementById("main").innerHTML = "<p>" + output + "</p>";
//     }
//   });
// }