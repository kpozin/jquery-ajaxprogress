# Description

This jQuery plugin provides access to the [onprogress](http://www.w3.org/TR/progress-events/) event of the `XMLHttpRequest` object available
in modern browsers.

This allows you to get the information needed to visually show download progress when your web application is
making a large AJAX request.

The code has been tested in recent versions of Chrome/Chromium and in Firefox 4.

# Dependencies

This plugin requires jQuery 1.5 or higher.

# How to use

Add the script to the page's list of `<script>` tags after the jQuery reference.

In your page code, check the value of `jQuery.support.ajaxProgress`. If this value is false, then the browser doesn't
support the `onprogress` event, so you'll have to write fallback code (for example, showing a generic progress spinner
instead of a percentage).

The `onprogress` event passes to its handlers a native object conforming to the
[ProgressEvent interface](http://www.w3.org/TR/progress-events/#interface-progressevent):

### The ProgressEvent object

The interface has the following fields

 - `{Boolean} lengthComputable` - true if the size of the response is known. This is usually known if the server sends a `Content-Length` header.
 - `{Number} loaded` - the number of bytes loaded so far
 - `{Number} total` - the total number of bytes in the response.

The plugin exposes the `onprogress` event in two ways:

### Global AJAX Event
As a [global AJAX event](http://docs.jquery.com/Ajax_Events#Global_Events) that you can subscribe to.
You can set a handler on any jQuery selection in the DOM, and it will get triggered for all AJAX requests.

```javascript
$("#loading").bind("ajaxProgress", function(jqEvent, progressEvent, jqXHR) {
    if (progressEvent.lengthComputable) {
        $(this).text("Loaded " + (Math.round(progressEvent.loaded / progressEvent.total * 100)) + "%");
    } else {
        $(this).text(Loading...);
    }
});
```

The handler signature is `function ( jqEvent, progressEvent, jqXHR )`, where `jqEvent` is the the event object created by
jQuery, `progressEvent` is the native ProgressEvent object described above, and `jqXHR` is the original
[wrapper around the XMLHttpRequest object](http://api.jquery.com/jQuery.ajax/#jqXHR).

### Local AJAX Event

You can also provide a handler for a specific `jQuery.ajax()` call by including a `progress` field in the options
object you pass to `jQuery.ajax()`.

```javascript
$.ajax("/myfile", {progress: function(jqXHR, progressEvent) {
    if (progressEvent.lengthComputable) {
        console.log("Loaded " + (Math.round(progressEvent.loaded / progressEvent.total * 100)) + "%");
    } else {
        console.log(Loading...);
    }
}});
```