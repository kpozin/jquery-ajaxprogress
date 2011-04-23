# Description

This jQuery plugin provides access to the [onprogress](http://www.w3.org/TR/progress-events/) event of the `XMLHttpRequest` object available
in modern browsers. It has been tested in recent versions of Chrome/Chromium and in Firefox 4.

# Dependencies

This plugin requires jQuery 1.5 or higher.

# How to use

Add the script to the page's list of `<script>` tags after the jQuery reference.

In your page code, check the value of `jQuery.support.ajaxProgress`. If this value is false, then the browser doesn't
support the `onprogress` event, so you'll have to write fallback code (for example, showing a generic progress spinner
instead of a percentage).

The plugin exposes the `onprogress` event in two ways:

### Global AJAX Event
As a [global AJAX event](http://docs.jquery.com/Ajax_Events#Global_Events) that you can subscribe to.
You can set a handler on any jQuery selection in the DOM, and it will get triggered for all AJAX requests.

    $("#loading").bind("ajaxProgress", function(jqEvent, progressEvent, jqXHR) {
        if (progressEvent.lengthComputable) {
            $(this).text("Loaded " + (Math.round(progressEvent.loaded / progressEvent.total * 100) / 100)) + "%");
        } else {
            $(this).text(Loading...);
        }
    });

The handler signature is `function ( jqEvent, progressEvent, jqXHR )`, where `jqEvent` is the the event object created by
jQuery, `progressEvent` is the native object conforming to the
[ProgressEvent interface](http://www.w3.org/TR/progress-events/#interface-progressevent), and `jqXHR` is the original
[wrapper around the XMLHttpRequest object](http://api.jquery.com/jQuery.ajax/#jqXHR).


### Local AJAX Event

You can also provide a handler for a specific `jQuery.ajax()` call by including a `progress` field in the options
object you pass to `jQuery.ajax()`.

    $.ajax("/myfile", {progress: function(jqXHR, progressEvent) {
        if (progressEvent.lengthComputable) {
            console.log("Loaded " + (Math.round(progressEvent.loaded / progressEvent.total * 100) / 100)) + "%");
        } else {
            console.log(Loading...);
        }
    }});
    