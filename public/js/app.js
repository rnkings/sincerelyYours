
//FRONT END This is saying that when button gets submitted run this function
//all this function does is it says when it gets submited submit this info
//to sweepstakes and print it with a link to the next page. Connects up with view template

$('#sweepstakeForm').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/submit/sweepstakes',
    method: 'POST',
    //serialize
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

//When a sweepstakes template is requested, send the ID in and return the data
//Then display it
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

// TEMPLATE 2

//When the coupon template is submitted, create the tempate in the DB
//and return the ID
$('#couponForm').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/submit/coupon',
    method: 'POST',
    data: $(this).serialize(),
    success: function (response) {
      if (response.status !== 'success') {
        throw new Error('Failed API call.');
      }

      console.log(response);
      $('#result').html('<a href="/viewTemplate2.html">Check out the preview! ID was' + response.id + '</a>');
    }
  });
});

//When a coupon template is requested, send the ID in and return the data
//Then display it
$('#templateCouponForm').on('submit', function (e) {
  //don't submit normally
  e.preventDefault();
  //ajax call to the url /view and passing in a query selector /route?param=value
  $.ajax({
    url: '/view?id=' + $('#templateId').val(),
    method: 'GET',
    //now this gets the response back and it's going to get the response passed.
    success: function (response) {
      var params = response.params;
      var $container = $('#templateResult');

      console.log("HERE");

      var html = '<h1>' + params.firstname + ' ' + params.lastname + '</h1>';
      html+= '<h2>' + params.coupon + ' ' + params.link + '</h2>';

      $container.html(html);
      $container.show();
    }
  })
});