var app = {
    initialize: function () {
        var _this = this;
        this.bindEvents();
        if (!localStorage.getItem('refresh_token')) {
            window.location = "index.html";
        }
        _this.getUserSSO(function (data) {
            $(".loading").remove();
            $("#username").text(data.preferred_username);
            $("#email").text(data.email);
            $("#phone_number").text(data.phone_number);
        })
    },
    bindEvents: function () {
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        $('#back-btn').on('click', function (e) {
            window.location = "home.html";
        });
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    getUserSSO: function (callback) {
        $.ajax({
            url: config.sso_service + 'user',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            method: 'GET',
            success: function (data) {
                callback(data);
            }
        });
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        window.location = 'home.html';
    }
};
