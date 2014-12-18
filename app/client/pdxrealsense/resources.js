/*global define*/
define({
    api : {
        base : {
            errors : {
                400 : 'Bad Request',
                401 : 'Unauthorized',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
        },
        login : {
            errors : {
                400 : 'Bad Request',
                401 : 'Incorrect Username Or Password',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
        }
    },
    thisIsTheLoginView : 'This is the Login view.',
    thisIsTheLogoutView : 'This is the logout view.',
    thisIsTheHomeView : 'This is the home view.',
    login : 'Login',
    logout : 'Logout',
    username : 'username',
    password : 'password'
});
