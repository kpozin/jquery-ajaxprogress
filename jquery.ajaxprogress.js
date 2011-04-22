/*!
 * jQuery ajaxProgress Plugin v1.0.0
 * http://www.kpozin.net/ajaxprogress
 *
 * (c) 2011, Konstantin Pozin
 * Licensed under MIT license.
 */

(function($) {

    // Test whether onprogress is supported
    $.support.ajaxProgress = (XMLHttpRequest && "onprogress" in (new XMLHttpRequest()));

    // If it's not supported, we can't do anything
    if (!$.support.ajaxProgress) {
        return;
    }

    // Create global "ajaxProgress" event
    $.fn.ajaxProgress = function (f) {
        return this.bind("ajaxProgress", f);
    };


    // Hold on to a reference to the jqXHR object so that we can pass it to the progress callback
    $(window).bind("ajaxSend.ajaxprogress", function(event, jqXHR, ajaxOptions) {
        ajaxOptions.__jqXHR = jqXHR;
    });

    /**
     * @param evt XMLHttpRequest progress event
     * @param options jQuery AJAX options
     */
    function handleOnProgress(evt, options) {
        if (options.global) {
            $.event.trigger("ajaxProgress", evt);
        }

        if (typeof options.progress === "function") {
            options.progress(options.__jqXHR, evt);
        }
    }


    // We'll work with the original factory method just in case
    var makeOriginalXhr = $.ajaxSettings.xhr.bind($.ajaxSettings);

    // Options to be passed into $.ajaxSetup;
    var newOptions = {};

    // Wrap the XMLHttpRequest factory method
    newOptions.xhr = function () {

        // Reference to the extended options object
        var s = this;

        var newXhr = makeOriginalXhr();
        if (newXhr) {
            newXhr.onprogress = function(evt) {
                handleOnProgress(evt, s);
            }
        }
        return newXhr;
    };


    $.ajaxSetup(newOptions);

})(jQuery);
