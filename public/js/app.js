
//FRONT END This is saying that when button gets submitted run this function
//all this function does is it says when it gets submited submit this info
//to sweepstakes and print it with a link to the next page. Connects up with view template

//   ************ TEMPLATE 1 SWEEPSTAKE  (front end)*************************

$('#sweepstakeForm').on('submit', function (e) {
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
      $('#result').html('<a href="/viewTemplate.html">' + '<br>' + 'Check out the preview! ID was' + " " + response.id + '</a>');
    }
  });
});

//When a sweepstakes template is requested, send the ID in and return the data
//Then display it
$('#templateForm').on('submit', function (e) {
  //ajax call to the url /view and passing in a query selector /route?param=value
  $.ajax({
    url: '/view?id=' + $('#templateId').val(),
    method: 'GET',
    //now this gets the response back and it's going to get the response passed.
    success: function (response) {
      var params = response.params
      var $container = $('#templateResult');

      var html = '<h5>' + 'Hello! ' + params.firstname + ' ' + params.lastname + ',' + '<br>' + '</h5>';
      html+= '<h5>' + 'Here are your sweepstakes for the week: ' +params.sweepstake + ' ' + '<br>' + '<br>' + 'Follow this link for more information: ' + params.link + '</h5>';

      $container.html(html);
      $container.show();
    }
  })
});

//   ************ TEMPLATE 2 COUPON  (front end)*************************

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
      $('#result').html('<a href="/viewTemplate2.html">' + '<br>' + 'Check out the preview! ID was' + " " + response.id + '</a>');
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

      var html = '<h5>' + 'Howdy ' + params.firstname + ' ' + params.lastname + ',' + '</h5>';
      html+= '<h5>' + '<br>' + 'Here is your coupon for this week: ' + params.coupon + ' ' + '<br>' + '<br>' + 'Follow this link if you want to know more: ' + params.link + '</h5>';

      $container.html(html);
      $container.show();
    }
  })
});

//   ************ TEMPLATE 3 EVENTS  (front end)*************************

//When the coupon template is submitted, create the tempate in the DB
//and return the ID
$('#eventsForm').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/submit/events',
    method: 'POST',
    data: $(this).serialize(),
    success: function (response) {
      if (response.status !== 'success') {
        throw new Error('Failed API call.');
      }

      console.log(response);
      $('#result').html('<a href="/viewTemplate3.html">' + '<br>' + 'Check out the preview! ID was' + " " + response.id + '</a>');
    }
  });
});

//When a coupon template is requested, send the ID in and return the data
//Then display it
$('#templateEventsForm').on('submit', function (e) {
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

      var html = '<h5>' + 'Good day ' + params.firstname + ' ' + params.lastname + ',' + '</h5>';
      html+= '<h5>' + '<br>' + 'Here is an event near you this week: ' + params.events + ' ' + '<br>' + '<br>' + 'Here is a link if you want more information on this event: ' + params.link + '</h5>';

      $container.html(html);
      $container.show();
    }
  })
});














