// Create our main angular app
const app = angular.module("BulletinApp", []);

// Define the main controller for our app
app.controller("MainController", ['$http', function($http){
  // A trick to make the index.html and app.js use the same variable
  const ctrl = this;
  // Everything else uses ctrl
  ctrl.pageHeading = "Welcome to the Bulletin Board!";
  ctrl.posts = []
  ctrl.newPost = {};

  // Get all of the posts and store them into the posts variable
  ctrl.getPosts = () => {
    $http({
      method: 'GET',
      url: '/posts'
    }).then((response)=>{
      ctrl.posts = response.data;
    },(error)=>{
      console.log("HTTP error:", error);
    }).catch((err)=>{ console.log("Promise error:", err); });
  }

  // Create a new post (assuming the UI successfully populated the object)
  ctrl.createPost = () => {
    $http({
      method: 'POST',
      url: '/posts',
      data: ctrl.newPost
    }).then((response)=>{
      ctrl.posts.push(response.data);
      ctrl.newPost = {};
    },(error)=>{
      console.log("HTTP error:", error);
    }).catch((err)=>{ console.log("Promise error:", err); });
  }

  // Get the documents on page load
  ctrl.getPosts();
}]);
