"use strict";

(function (PKT_EXT) {

    var sendMessage = function sendMessage(message, cb) {
        if (window.chrome.extension.sendMessage) {
            window.chrome.extension.sendMessage(message, cb);
        } else {
            window.chrome.extension.sendRequest(message, cb);
        }
    };

    PKT_EXT.INTERFACE = { sendMessage: sendMessage };
})(PKT_EXT || {});