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