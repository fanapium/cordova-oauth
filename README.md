# cordova-oauth
a simple mobile app using fanapium oauth implemented with cordova and jquery

About SSO
----------
In this sample mobile app authorization code flow is implemented, first a webview is opened and  redirected to _/oauth2/authorize_ endpoint with parameters like table below to input their username and password:
 
Request | Response (redirect)
------- | --------
https://auth2server.com/oauth2/authorize | https://example.com/oauth/callback
?client_id=$CLIENT_ID | ?code=$AUTHORIZATION_CODE
&response_type=code |  &state=$STATE
&redirect_uri=$CLIENT_REDIRECT_URI |

   
You can use the retrieved token to access user information by sending GET request to the _/user_ endpoint: 

```http
https://auth2server.com/user
```
the token must be sent using header like this:

Key | Value
--- | -----
Authorization | Bearer _THE_TOKEN_STRING_

for study more about Oauth2 concept see the link below:
https://aaronparecki.com/oauth-2-simplified/ 


How to use this project
-----------------------

After cloning you must add platform into the cordova project like command below

```
    cordova platform add android
```
using iOS or Web instead of android for other platform

and for running project the next command can be used:
```
   cordova run android 
```

