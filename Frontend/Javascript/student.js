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
        
        var password = $('#password').val();
        $.ajax({
            url: `http://localhost:3000/admin/students/sid/${username}`,
            type: 'GET',
            success: function(allStudents) {
                console.log(allStudents)
                if (password == allStudents[0].password) {
                    createCookie('student', username, 1); 
                    window.location.href = 'StudentHome.html';
                } else {
                    
                    $('#error-message').text('Invalid username or password').show();
                }
            },
            error: function(error) {
                alert('Error username or password');
            }
        });

        
        
    });
});