var PKT_EXT = PKT_EXT || {};

if (window.thePKT_BM) {
    window.thePKT_BM.save();
}
else {
    /*
    PKT_BM_OVERLAY is the view itself and contains all of the methods to manipute the overlay and messaging.
    It does not contain any logic for saving or communication with the extension or server.
    */
    var PKT_BM_OVERLAY = function (options) {
        var self = this;
        this.baseHost                               = "getpocket.com";
        this.inited                                 = false;
        this.premiumStatus                          = (window.___PKT__PREM_STATUS === '1');
        this.premiumUpsell                          = (window.___PKT__PREM_UPSELL === '1');
        this.saveCount                              = window.___PKT__SAVE_COUNT;
        this.cxt_suggested_available                = 0;
        this.cxt_entered                            = 0;
        this.cxt_suggested                          = 0;
        this.cxt_removed                            = 0;

    };
    PKT_BM_OVERLAY.prototype = {
        showStateSaved : function(urlToSave, itemID) {
            PKT_EXT.ERROR.closeError()
            PKT_EXT.SAVE.saveURL( urlToSave, itemID )
        },
        showStateError : function(message) {
            PKT_EXT.SAVE.closeSave()
            PKT_EXT.ERROR.saveError('Page Not Saved', 'Pocket encountered an error when trying to this page. Please try again.')
        },
        showStateUnauthorized : function() {
            PKT_EXT.SAVE.closeSave()
            PKT_EXT.ERROR.saveError('Pocket Temporarily Unavailable', 'Pocket is currently in maintenance mode. Please try again later.')
        }
    };


    var PKT_BM = function () {}

    PKT_BM.prototype = {
        init: function () {
            if (this.inited) return

            this.overlay = new PKT_BM_OVERLAY()
            this.inited = true
            this.requestListener = undefined

            this.save();
        },

        addMessageListener: function (listener) {
            // Remove event listener if one is currently registered
            if (this.requestListener !== undefined) this.removeMessageListener()
            this.requestListener = listener
            chrome.extension.onMessage.addListener(listener)
        },

        removeMessageListener: function () {
            chrome.extension.onMessage.removeListener(this.requestListener)
            this.requestListener = undefined
        },

        sendMessage: function (message, cb) {

            if (window.chrome.extension.sendMessage) {
                window.chrome.extension.sendMessage(message, cb)
            } else {
                window.chrome.extension.sendRequest(message, cb)
            }

        },

        handleMessageResponse: function(response) {
            switch(response.status){

                case "success":
                    this.overlay.showStateSaved(window.___PKT__URL_TO_SAVE,response.item_id)
                    break
                case "unauthorized":
                    this.overlay.showStateUnauthorized();
                    break
                case "error":
                    this.overlay.showStateError(response.message)
                    break
            }

        },

        save: function() {
            this.addMessageListener(function(request, sender, response) {
                this.handleMessageResponse(request)
            }.bind(this))

            thePKT_BM.sendMessage({action: "listenerReady"}, function (response) {})

        }
    }

    window.thePKT_BM = new PKT_BM()
    thePKT_BM.init()

}

void(0)
