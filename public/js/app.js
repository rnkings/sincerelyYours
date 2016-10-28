 function fetchData(){
   $.ajax({
     url: "/api/data",
     method: "GET",
     success: function(data){
       // might want to pretty print things here :)
       document.getElementById("main").innerHTML = "<p>" + data + "</p>";
     }
   });
 }

function sendData(x = {}){
  $.ajax({
    url: "/api/data",
    method: "POST",
    data: x,
    success: function(output){
      // might want to pretty print things here :)
      document.getElementById("main").innerHTML = "<p>" + output + "</p>";
    }
  });
}