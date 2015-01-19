angular.module('AngularUpstart')
  .controller('UsersCtrl', function ($scope, Session) {
    $scope.login = function(user) {
        $scope.authError = null;

        Session.login(user.email, user.password)
        .then(function(response) {
            if (!response) {
                $scope.authError = 'Credentials are not valid';
            } else {
                $scope.authError = 'Success!';
            }
        }, function(response) {
            $scope.authError = 'Server offline, please try later';
        });
    };

    $scope.logout = function() {
      Session.logout();
    };

    $scope.register = function(user) {
        $scope.authError = null;

        Session.register(user.email, user.password, user.confirm_password)
            .then(function(response) {
            }, function(response) {
                var errors = '';
                $.each(response.data.errors, function(index, value) {
                    errors += index.substr(0,1).toUpperCase()+index.substr(1) + ' ' + value + ''
                });
                $scope.authError = errors;
            });
    };
});

