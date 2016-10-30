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
      $('#result').html('<a href="' + response.link + '">Check out the preview!</a>');
    }
  });
});