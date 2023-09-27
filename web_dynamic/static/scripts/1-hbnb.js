#!/usr/bin/node
$(document).ready(function () {
    let amenities = {};

    $('input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        let idsamenities = Object.values(amenities);
        let listamenities = idsamenities.join(', ');
        if (listamenities.length > 30) {
            listamenities = listamenities.substring(0, 30) + '...';
        }
        listamenities += '&nbsp;'
        $('.amenities h4').html(listamenities);
    });
});