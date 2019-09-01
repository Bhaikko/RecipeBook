$.get("/user/getDetails", details => {
    $(".userDetails").append(
        `
            <img src="${details.image}" class="profilePicture">
            <div class="details">
                <div class="username">${details.username}</div><br>
                <div class="rating">
                    <span class="stars">
                        <img src="/uploads/star.png">
                        <img src="/uploads/star.png">
                        <img src="/uploads/star.png">
                        <img src="/uploads/star.png">
                        <img src="/uploads/star.png">
                    </span>
                    <span class="number">100k</span>
        
                </div>
                <div class="about">
                    <h4><u>About</u></h4>
                    ${details.about}
                </div>
                <button class="editButton">Edit Profile</button>
            </div>
        `
    )
});

// $.get("/user/getRecipes", recipes => {
//     recipes.map(recipe => {
//         $(".favouriteBox").append(
//             `
//                 <div class="recipe">
//                     <img src="/uploads/users/recipies/${recipe.image}" class="recipeImage" />
//                     <span class="recipeName">${recipe.name}</span>
//                     <span class="recipeStars">
//                         ${starRender(recipe.reviews)}
//                     </span>
//                     <span class="recipeNumbers">${recipe.reviews.length}</span>
//                     <button class="deleteButton"><img src="/uploads/deleteButton.png"></button>
//                 </div>
//             `
//         )
//     })
        
// });


// $.get("/user/getFavouriteRecipe", recipes => {
//     recipes.map(recipe => {
//         $(".recipeBox").append(
//             `
//                 <div class="recipe">
//                     <img src="/uploads/users/recipies/${recipe[0].image}" class="recipeImage" />
//                     <span class="recipeName">${recipe[0].name}</span>
//                     <span class="recipeStars">
//                         ${starRender(recipe[0].reviews)}
//                     </span>
//                     <span class="recipeNumbers">${recipe[0].reviews.length}</span>
//                     <button class="deleteButton"><img src="/uploads/deleteButton.png"></button>
//                 </div>
//             `
//         )
//     })
// });

const starRender = reviews => {
    let count = 0;
    reviews.map(review => {
        count += review.stars;
    });

    let average = count / reviews.length;
    let starDomElement = ""
    for(let i = 1; i <= average; i++)
        starDomElement += `<img src="/uploads/star.png">`;

    return starDomElement;
}