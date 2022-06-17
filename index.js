
const mealsCont = document.getElementById("meals");

let title = document.getElementById("title");

const searchOutput = document.querySelector('.search-output');

const dishWrapper = document.getElementById("dishWrapper");

const searchTerm = document.getElementById("search-term");

const searchBtn = document.getElementById("search-btn");

let closePopUpBtn = document.querySelector("#close-popup");
const mealInfo = document.getElementById("meal-info");
const popUpContainer = document.querySelector(".popup-container");

 let mealHeader = document.querySelector(".meal-header");
// console.log(popUpContainer);

getRandomMeal = async () => {
  const  response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  
  const responseData = await response.json();
  
  const randomMeal = responseData.meals[0];
  console.log(randomMeal);
  
  addMeals(randomMeal, true);
  // fetchFavMeals();
};
getRandomMeal();
// debugger
 
getMealById = async (id) => {
  console.log(id,"as id");
  
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
  const responseData = await response.json();
  // console.log(responseData);
  const meal = responseData.meals[0];
  
  // console.log(meal) ;

  return meal 
};


getMealBySearch = async (term) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

  const responseData = await response.json();
  const meals = responseData.meals;

  return meals

  // addMeals(mealData, random = false)

};
 

//random meal
/* <div class="meal">
            <div class="meal-header">
              <span class="random-recipe">Random Recipe</span>
              <img src="./image/download (4).jpg" loading="lazy" alt="" />
            </div>
            <div class="meal-body">
              <h4>Veggie Veggie</h4>
              <button class="fav-btn active"><i class="fas fa-heart"></i></button>
            </div>
          </div> */

const addMeals = (mealData, random = false) => {
  console.log("testing",mealData);
  const meal = document.createElement("div");
  meal.classList.add("meal")
  // meal.classList.add("search-output-result")
  meal.innerHTML = `<div class="meal-header">
              ${random ? `<span class="random-recipe">Random Recipe</span>` : ""}
              <img src="${mealData.strMealThumb}" loading="lazy" alt="${mealData.strMeal}" />
            </div>
            <div class="meal-body">
              <p>${mealData.strMeal}</p>
              <button class="fav-btn"><i class="fas fa-heart"></i></button>
            </div>`

  const btn = meal.querySelector(".meal-body .fav-btn");
  


  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
     addFavMealToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
    // btn.classList.toggle("active");
  }); 

  mealHeader = meal.querySelector(".meal-header");

   mealHeader.addEventListener("click", () => { 
    displayMealInfo(mealData);
  });


  mealsCont.appendChild(meal)
};

const addResult = (mealData, random = false) => {
  console.log("testing",mealData);
  const meal = document.createElement("div");
  // meal.classList.add("meal")
  meal.classList.add("search-output-result")
  meal.innerHTML = `<div class="meal-header ">
              ${random ? `<span class="random-recipe">Random Recipe</span>` : ""}
              <img src="${mealData.strMealThumb}" loading="lazy" alt="${mealData.strMeal}" />
            </div>
            <div class="meal-body ">
              <p class="extra-font-size">${mealData.strMeal}</p>
              <button class="fav-btn"><i class="fas fa-heart"></i></button>
            </div>`

  const btn = meal.querySelector(".meal-body .fav-btn");
  


  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
     addFavMealToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
    // btn.classList.toggle("active");
  }); 

  mealHeader = meal.querySelector(".meal-header");

   mealHeader.addEventListener("click", () => { 
    displayMealInfo(mealData);
  });


  searchOutput.appendChild(meal)
};

// console.log(localStorage.getItem('mealIds'));
const addFavMealToLocalStorage = (mealId) => { 

// console.log(addFavMealToLocalStorage);
 const mealIds = getFavMealsFromLocalStorage();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));

//   fetchFavMeals();
};

const removeMealFromLocalStorage = (mealId) => { 
 const mealIds = getFavMealsFromLocalStorage();
  localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
};

const getFavMealsFromLocalStorage = () => { 
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
//  console.log(mealIds);
  return mealIds === null ? [] : mealIds;
};

const fetchFavMeals = async () => {
  dishWrapper.innerHTML = ""; //clean the container
  const mealIds = getFavMealsFromLocalStorage();
// console.log(mealIds);
  // const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    let mealId;
    if (mealIds[i] != null && mealIds[i] != undefined) {
      mealId = mealIds[i];
      // console.log("testing",mealIds);
      
      const meal = await getMealById(mealId);
      
      // meals.push(meal);
      addFavMeal(meal)
    }

  }
};
fetchFavMeals();


//adding meal to favorite list

/* <div class="textAlign">
            <div class="image-wrapper">
              <img src="./image/download (2).jpg" loading="lazy" alt="" />
            </div>
            <span>Hand Burger</span>
          </div> */
 
const addFavMeal = (mealData) => {
// console.log(mealData);
  const favoriteMeal = document.createElement("div");

  favoriteMeal.classList.add("textAlign");

  favoriteMeal.innerHTML = `<div class="image-wrapper">

   <img src="${mealData.strMealThumb}" loading="lazy"
   
   alt="${mealData.strMeal}"/>

  </div>

  <p>${mealData.strMeal}</p>
  <button class="clearMeal"><i class="fas fa-window-close"></i></button>`;

  const btn = favoriteMeal.querySelector(".clearMeal");
  btn.addEventListener("click", () => { 
    removeMealFromLocalStorage(mealData.idMeal);

    fetchFavMeals();
  });

  favoriteMeal.addEventListener("click", () => { 
    displayMealInfo(mealData);
  });

  
  dishWrapper.appendChild(favoriteMeal);

};

    searchBtn.addEventListener("click", async () => { 
    searchOutput.innerHTML = "";//clearing container
    const search = searchTerm.value;
    const meals = await getMealBySearch(search);
      title.innerText = "Search Result";
      title.style.marginTop = "100px";

      dishWrapper.style.opacity="0"
    searchOutput.style.backgroundColor =" #e4e0e0"
    searchOutput.classList.add('overflow-attr')
      
    if (meals) {
      
      meals.forEach((meal) => {
        addResult(meal)
        
      });
    } else {
    searchOutput.innerHTML = "<small>Meal is not available.</small>"
    }
    }); 
  

/* <div class="meal-info" id="meal-info">
        <h1>Title</h1>
        <img src="./image/download.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          obcaecati ad sapiente eveniet distinctio, repellendus ipsa aperiam
          possimus optio error commodi. Tenetur vero eaque temporibus sed,
          asperiores placeat velit nulla in nostrum quod molestias sit
          assumenda.
        </p>
        <!-- <ul>
          <li>ing1/measure</li>
          <li>ing2/measure</li>
          <li>ing3/measure</li>
        </ul> -->
        <button class="close-popup" id="close-popup">
          <i class="fas fa-times"></i>
        </button>
      </div> */
 
function displayMealInfo(mealData) { 
  mealInfo.innerHTML = "";

  //update meal info
  const popUpInfo = document.createElement("div");

  const ingredients = [];
//set meal ingredient and measure
  
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {

      ingredients.push(`${mealData["strIngredient" + i]}  -  ${mealData["strMeasure" + i]}`);

    } else {
      break;
      
    }
    
  }
//  console.log(popUpInfo, "testing");
  popUpInfo.classList.add("popup-info");
  popUpInfo.innerHTML = `
          <h1>${mealData.strMeal}</h1>
          <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
          <p>
             ${mealData.strInstructions}
          </p> 
          <h3>Ingredient:</h3>
          <ul>
${ingredients.map((ing)=>`<li>${ing}</li>
`).join("")}
            
          </ul>
          <button class="close-popup" id="close-popup">
            <i class="fas fa-times"></i>
          </button>            
          
  `

  closePopUpBtn = popUpInfo.querySelector("#close-popup");

  closePopUpBtn.addEventListener("click", () => {
  popUpContainer.classList.add("hidden");
});

  

  popUpContainer.classList.remove("hidden");
  mealInfo.appendChild(popUpInfo);
};


  
//     // addFavMeal();

// //const breakWords =()=>{
//  // var lineBreak = '\n';
//   //if (mealData.strMeal.length > 3) {
   
    
//  // }
// // const text = 'Hey can I call you by your name?';
// // const text = 'Hey can I call you by your name?';
// // const breakString = (str, limit) => {
// //   let brokenString = '';
// //   for(let i = 0, count = 0; i < str.length; i++){
// //       if(count >= limit && str[i] === ' '){
// //         count = 0;
// //         brokenString += '\n';
// //       }else{
// //         count++;
// //         brokenString += str[i];
// //       }
// //   }
// //   return brokenString;
// // }
// // console.log(breakString(text, 4));
//  // console.log(favoriteMeal.innerText.length)
//   // console.log( favoriteMeal);
   
// // // function breakString (str, limit) {
// // //    let brokenString = '';
// // //    for(let i = 0, count = 0; i < favoriteMeal.innerText.length; i++){
// // //    //  console.log("testing",mealData.strMeal.length)
// // //       if(count > limit && favoriteMeal.innerText[i] === ' '){
// // //          count = 0;
// // //          brokenString += '\n';
// // //       }else{
// // //          count++;
// // //          brokenString += favoriteMeal.innerText[i];
// // //       }
       
// // //   //  const breakWords = breakString(favoriteMeal.innerText, 3);
      
// // //    }
// // //   return brokenString;


// // }
// // console.log(breakString(favoriteMeal.innerText,3));
 