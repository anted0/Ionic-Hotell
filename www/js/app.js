var app = angular.module('starter', ['ionic',]) 



app.config(function($stateProvider, $urlRouterProvider){
  
  $stateProvider
  .state("tabs" , {
    url : "/tab" ,
    abstract:true,
    templateUrl : "templates/tabs.html"
  })
  .state("tabs.home" , {
    url : "/home" ,
    views : {
      "home-tab" : {
        templateUrl : "templates/home.html"
      }
    }
  })
  .state("tabs.list" , {
    url : "/list" ,
    views : {
      "list-tab" : {
        controller : "ListController",
        templateUrl: "templates/list.html"
      }
    }
  })
  .state("tabs.detail", {
    url : "/list/:aID",
    views :{
      "list-tab" : {
        templateUrl : "templates/detail.html",
        controller: "ListController"
        
      }
    }
  }) 
    $urlRouterProvider.otherwise("/tab/home");
  })
  
    
  //Controllers
  app.controller("ListController",function($scope,$http,$state,$stateParams,$ionicModal){
    $http.get('js/hotels1.json').success(function(data1){  
      $scope.hotels = data1;
    });
    $scope.whichHotel = $state.params.aID;  

    
    $scope.data = {
      adults: 1,
      kids: 0,
      roomid: $state.params.id
    }
    //submit metoden som tar emot formulärdata genom submit-knappen
    $scope.submit = function(){  
      //data skickas hit
      var url = "http://localhost/hotellx/index.php";
      
      $http.post(url, $scope.data).then(function(response){
            $scope.response = response.data;   
          })
       }    

       //antal dagar
  $scope.days = function(date1, date2){
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    $scope.dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if($scope.dayDiff == 0){
      $scope.dayDiff = 1;

    }
    return $scope.dayDiff;
    
  }

  // totalpris
  $scope.totalPrice = function(pris, days){
    var pris;
    var days;
    $scope.priceToReturn = pris * days;

    return $scope.priceToReturn;
  }
       
       $ionicModal.fromTemplateUrl('modal1.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.reset = function(){
        $scope.modal.hide();
        $scope.data = {}
        }
  })




app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
