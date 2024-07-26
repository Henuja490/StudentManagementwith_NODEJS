$(document).ready(function() {

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toUTCString();
        } else {
            var expires = "";
        }
        $.cookie(name, value, { expires: days, path: '/' });
    }

   
    function getCookie(name) {
        return $.cookie(name);
    }

    
    $('#login-form').on('submit', function(event) {
        event.preventDefault();

        var username = $('#username').val();
        console.log(username);
        var password = $('#password').val();

        
        if (username === 'UNIAdmin' && password === '123') {
            
            createCookie('sessionToken', 'admin', 1); 

            
            window.location.href = 'index.html';
        } else {
            
            $('#error-message').text('Invalid username or password').show();
        }
    });
});