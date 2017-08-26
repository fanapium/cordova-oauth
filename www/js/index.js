var app = {
    initialize: function () {
        this.bindEvents();
        if (localStorage.getItem('refresh_token')) {
            window.location = "home.html";
        }
    },
    bindEvents: function () {
        var _this = this;
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        $('#login-btn').on('click', function (e) {
            _this.authenticate();
        });
        $('#signup-btn').on('click', function (e) {
            _this.signUp();
        });
    },
    authenticate: function (callback) {
        var sso_login = 'authorize/?client_id=' + config.client_id + '&response_type=code&redirect_uri=' + config.home + 'redirect';
        var sso_token = 'token';
        console.log(config.sso + sso_login);
        var ref = window.open(config.sso + sso_login, '_blank', 'location=no');
        ref.addEventListener('loadstart', function (event) {
            var url = event.url;
            var code = url.split("code=");
            if (code[0].indexOf(config.home + "redirect") == 0) {
                $(".sso-loading").removeClass("sso-hidden");
                $.post(config.sso + sso_token, {
                    client_id: config.client_id,
                    client_secret: config.client_secret,
                    code: code[1],
                    redirect_uri: config.home + 'redirect',
                    grant_type: 'authorization_code'
                }, function (data) {
                    $(".sso-loading").hide();
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('expires_in', data.expires_in);
                    localStorage.setItem('id_token', data.id_token);
                    window.location = "home.html";
                    ref.close();
                });
            }
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
    signUp: function (callback) {
        var sso = 'http://sandbox.fanapium.com/oauth2/';
        var sso_login = 'authorize/?client_id=' + config.client_id + '&response_type=code&redirect_uri=' + config.home + 'redirect&prompt=signup';
        var sso_token = 'token';
        var ref = window.open(config.sso + sso_login, '_blank', 'location=no');
        ref.addEventListener('loadstart', function (event) {
            var url = event.url;
            var code = url.split("code=");
            console.log("JJJJJJJJJJJJJJJ");
            console.log(config.home + "redirect");
            console.log("tttttttttttt",code[0]);
            if (code[0].indexOf(config.home + "redirect") == 0) {
                $(".sso-loading").removeClass("sso-hidden");
                $.post(config.sso + sso_token, {
                    client_id: config.client_id,
                    client_secret: config.client_secret,
                    code: code[1],
                    redirect_uri: config.home + 'redirect',
                    grant_type: 'authorization_code'
                }, function (data) {
                    $(".sso-loading").hide();
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('expires_in', data.expires_in);
                    localStorage.setItem('id_token', data.id_token);
                    window.location = "home.html";
                    ref.close();
                });
            }
        });
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        navigator.app.exitApp();
    }
};
