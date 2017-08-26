var app = {
    initialize: function () {
        this.bindEvents();
        if (!localStorage.getItem('refresh_token')) {
            window.location = "index.html";
        }
    },
    bindEvents: function () {
        var _this = this;
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        $('#logout-btn').on('click', function (e) {
            _this.logout();
        });
        $('#userinfo-btn').on('click', function (e) {
            window.location = "userinfo.html";
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
    logout: function () {
        var ref = window.open(config.sso + 'logout', '_blank', 'location=no');
        ref.addEventListener('loadstop', function () {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('expires_in');
            localStorage.removeItem('id_token');
            window.location = "index.html";
        });
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        navigator.app.exitApp();
    }
};
