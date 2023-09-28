#!/usr/bin/node

$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).data('name')] = $(this).data('id');
    } else {
      delete amenities[$(this).data('name')];
    }
    const idsamenities = Object.keys(amenities);
    const listamenities = idsamenities.join(', ');
    $(' .amenities h4').text(listamenities);
  });
});
$.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
  if (textStatus === 'success' && data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
	  data.forEach((place) => {
	      $.ajax({
		  type: 'GET',
		  url: 'http://localhost:5001/api/v1/users/' + place.user_id,
		  success: function (user) {
		      const html = `<article><div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                    </div>
                                    <div class="information">
                                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                    </div>
                                    <div class="user">
			                <b>Owner:</b> ${user.first_name} ${user.last_name}
				    </div>
                                    <div class="description">
                                        ${place.description}
                                    </div>
                                    </article>`;
		      $('section.places').append(html);
		  }
	      });
	  });
    }
  });
});
