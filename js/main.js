//1) Upload image - image analyser
$(document).ready(function () {
        
  $("#submit").on("click", function (e) {
      e.preventDefault();
       
      var form = new FormData();
      const fileInput = document.querySelector('#file') ;//fileinput html id
      form.append("file", fileInput.files[0]);
      
      var settings = {
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/images/analyze",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "1b403f52a7964470963e3e30543d59da"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };//end settings
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

  });
});//end jquery


// 3) Search recipe by name
let apiKey = "1b403f52a7964470963e3e30543d59da";
let apiURL = "https://api.spoonacular.com/recipes/complexSearch";


//document ready then go
$(function(){

  //attach event listener
  $("#search-btn3").on("click", function(){
    //retrieve search terms
    let searchTerms = $("#search-terms").val();
    console.log(searchTerms);
    //set search parameters
    let params = {
      "apiKey": apiKey,
      "query" : searchTerms
    };

    axios.get(apiURL,{
      "params": params
    }).then(function (response) {
      console.log(response);

      closestID = response.data.results[0].id;
      console.log(closestID);

      //2nd GET to display nutrition widget
      let widgetURL = `https://api.spoonacular.com/recipes/${closestID}/information`
      console.log(widgetURL)

      let params2 = {
        "apiKey": apiKey,
        "includeNutrition" : false
      };

      axios.get(widgetURL,{
        "params": params2
      }).then(function (response) {
        console.log(response);
        document.getElementById("nutrition").innerHTML = "Closest Recipe Search";
        document.getElementById("nutrition-widget").innerHTML = response;
      })

        //show all search results
        for (let recipe of response.data.results){
          $("#search-results").append(`<li class=''>
           ${recipe.id} 
           ${recipe.title} 
          <img src="${recipe.image}"></li>`);
        }
        //create pagination.... 


        $("#search-total").text(`Total Results: ${response.data.totalResults}`);


    })




  });//end eventlistener
})//end function