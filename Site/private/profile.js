$.get("/user/getDetails", details => {
    $(".userDetails").append(
        `
            <img src="${details.image}" class="profilePicture">
            <div class="details">
                <div class="username">${details.username}</div><br>
                <div class="rating">
                    <span class="stars">
                        
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
    details.recipes.map(recipe => {
        $(".recipeBox").append(
            `
                <div class="recipe" data-recipeid="${recipe.id}">
                    <img src="/uploads/users/recipies/${recipe.image}" class="recipeImage" />
                    <span class="recipeName">${recipe.name}</span>
                    <span class="recipeStars">
                        ${starRender(recipe.reviews, true)}
                    </span>
                    <span class="recipeNumbers">${recipe.reviews.length}</span>
                    <button class="deleteButton deleteRecipe"><img src="/uploads/deleteButton.png"></button>
                </div>
            `
        )
        
    })

    let totalRating = totalStars / totalReviews;
    let ratingString = "";
    for(let i = 1; i <= totalRating; i++)
        ratingString += '<img src="/uploads/star.png" style="margin-right: 5%;">';

    $(".userDetails .stars").html(ratingString);
    $(".userDetails .number").text(totalReviews);
});

$.get("/user/getFavouriteRecipes", recipes => {
    recipes.map(recipe => {
        $(".favouriteBox").append(
            `
                <div class="recipe" data-recipeid="${recipe.id}">
                    <img src="/uploads/users/recipies/${recipe.image}" class="recipeImage" />
                    <span class="recipeName">${recipe.name}</span>
                    <span class="recipeStars">
                        ${starRender(recipe.reviews, false)}
                    </span>
                    <span class="recipeNumbers">${recipe.reviews.length}</span>
                    <button class="deleteButton deleteFavourite"><img src="/uploads/deleteButton.png"></button>
                </div>
            `
        )
    })
});

let totalStars = 0;
let totalReviews = 0;

const starRender = (reviews, bMine) => {
    let count = 0;
    reviews.map(review => {
        count += review.stars;
        if(bMine)
            totalStars += review.stars;
    });
    if(bMine)
        totalReviews += reviews.length;

    
    let average = count / reviews.length;
    let starDomElement = ""
    for(let i = 1; i <= average; i++)
        starDomElement += `<img src="/uploads/star.png">`;

    return starDomElement;
}

$(document).on("click", ".deleteRecipe", event => {
    
    $.post("/user/deleteRecipe", {
        recipeId: event.target.parentNode.parentNode.getAttribute("data-recipeid")
    }, () => {
        event.target.parentNode.parentNode.remove();
    });
});

$(document).on("click", ".deleteFavourite", event => {
    
    $.post("/user/deleteFavourite", {
        recipeId: event.target.parentNode.parentNode.getAttribute("data-recipeid")
    }, () => {
        event.target.parentNode.parentNode.remove();
    });
});