var urlPotlogin = "/Account/PostLogin";
var urlGetUser = "/Account/GetUser";
var app = angular.module("myApp", ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])
    .controller("abilityController", function ($scope, $http, $filter) {
        $scope.data = {
            listquestions: {},
            questions: [],
            username: "",
            password: ""
        };
        //$scope.Getlistuser = function () {
        //    $http({
        //        method: 'GET',
        //        url: urlGetQuestion,
        //    }).then(respone => {
        //        $scope.data.listquestions = respone.data.data;
        //        $scope.data.totalquestion = respone.data.totalquestion;
        //        if ($scope.data.listanswerquetion.length == 0) {
        //            for (var i = 0; i < $scope.data.totalquestion; i++) {
        //                var addanswer = {
        //                    id: (i + 1),
        //                    answer: ''
        //                };
        //                $scope.data.listanswerquetion.push(addanswer);
        //            }
        //        }
        //        $scope.GetQuestion();
        //    });
        //};
        //$scope.GetUserClient = function () {
        //    $http({
        //        method: 'GET',
        //        url: urlGetUser
        //    }).then(respone => {
        //        $scope.data.userclient = respone.data.username;

        //    });
        //};
        $scope.submitlogin = function () {
            var flag = true;
            if ($scope.data.username == "" || $scope.data.username == null) {
                document.getElementById("erorrusername").innerHTML = "Bạn chưa nhập thông tin tài khoản";
                flag = false;
            } else {
                document.getElementById("erorrusername").innerHTML = "";
            }
            if ($scope.data.password == "" || $scope.data.password == null) {
                document.getElementById("erorrpassword").innerHTML = "Bạn chưa nhập thông tin mật khẩu";
                flag = false;
            } else {
                document.getElementById("erorrpassword").innerHTML = "";
            }
            if (flag == true) {
                $http({
                    method: 'POST',
                    url: urlPotlogin,
                    data: {
                        username: $scope.data.username,
                        password: $scope.data.password
                    },
                    contentType: 'application/x-www-form-urlencoded; charset-UTF-8'
                }).then(respone => {
                    if (respone.data.succsess == true) {
                        if ($scope.data.username == "admin") {
                            window.location = "/admin/Account/manageruser";
                        } else {
                            window.location = "/Account/Index";
                        }
                    } else {
                        toastr["error"](respone.data.messeger);
                    }
                });
            }
        }
    })
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});