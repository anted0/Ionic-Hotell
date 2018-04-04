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
    url : "/list/:ID",
    views :{
      "list-tab" : {
        templateUrl : "templates/detail.html",
        controller: "ListController"
        
      }
    }
  }) 
    $urlRouterProvider.otherwise("/tab/home");
  })
  
    
  //Controllern
  app.controller("ListController",function($scope,$http,$state,$stateParams,$ionicModal){
    $http.get('js/hotels1.json').success(function(data1){  
      //data ifrån hotels1.json hämtas och sparas som $scope.hotels
      $scope.hotels = data1;
    });
    //de 3 olika rummen får olika idn
    $scope.whichHotel = $state.params.ID;  

    //binder inputet ifrån bokning hit
    $scope.data = {
      adults: 1,
      children: 0,
    }
    //submit metoden som tar emot formulärdata genom submit-knappen
    $scope.submit = function(){  
      //data skickas hit
      var url = "http://localhost/hotellx/index.php";
      
      $http.post(url, $scope.data).then(function(response){
            $scope.response = response.data;   
          })
       }    

       //func som tar utch och inch datum och returnerar skillnaden i dagar
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
  $scope.totalPrice = function(price, days){
    var price;
    var days;
    $scope.priceToReturn = price * days;

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
