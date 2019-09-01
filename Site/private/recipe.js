const flipbook = $("#flipbook");

const id = window.location.href.split("?")[1].split("=")[1];

const ingredientParser = (ingredients) => {
    let ingredientObject = ingredients.split("+");
    
    ingredients = [];

    ingredientObject.map(ingredient => {
        let current = ingredient.split("#");
        let newIngredient = {};
        newIngredient.name = current[0];
        newIngredient.quantity = current[1];
        ingredients.push(newIngredient);
    })

    ingredients.pop();

    let ingredientDomElement = "";
    ingredients.map(ingredient => {

        ingredientDomElement += 
        `
            <tr>
                <td>${ingredient.name}</td>
                <td>${ingredient.quantity}</td>
            </tr>
        `
    });
    return ingredientDomElement;
}

const directionsParser = (directions) => {
    directions = directions.split(".");
    directions.pop();
    
    let directionsDomElement = "";

    directions.map(direction => {
        directionsDomElement += 
        `   
            <li>${direction}</li>
        `
    });

    return directionsDomElement;
}

const commentParser = comments => {

    let commentDomElement = "";

    comments.map(comment => {
        commentDomElement +=
        `
            <div class="comment">
                <img src="${comment.user.image}" class="commentProfile">
                <span class="authorProfileName">${comment.user.username}</span>
                <div class="rating backcoverRating">
                    <span class="stars">
                        ${starParser(comment.stars)}
                    </span>                            
                </div>
                <p class="commentText">${comment.review}</p>
            </div>
        `
    });

    return commentDomElement;

}

const starParser = stars => {
    let starDomElement = "";

    for(let i = 1; i <= stars; i++)
        starDomElement += `<img src="/uploads/star.png" style="margin-right: 5px;">`;

    return starDomElement;
}

const averageStars = reviews => {
    let count = 0;

    reviews.map(review => {
        count += review.stars;
    });

    const average = count / reviews.length;
    return starParser(average);
}

const checkWishlist = async () => {
    let output = "";
    await $.get("/recipe/checkInWishlist?id=" + id, response => {
        if(response == "DoesNotExist")
            output += '<img class="heart" src="/uploads/heartNotAdded.png">';
        else 
            output += '<img class="heart" src="/uploads/heartAdded.jpg">';
    });
    return output;
}

$.get("/recipe/getRecipeDetails?recipeid=" + id, recipe => {
    const flipbook = $("#flipbook");

    flipbook.empty();
    checkWishlist()
        .then(output => {
            flipbook.append(
                `
                    <div class="hard coverpage">
                        <div class="authorImage">
                            <img class="authorProfile" src="${recipe.user.image}"><br>
                        </div>
                    </div>
                    
                    <div class="hard">
                        <h1 class="pageHeading"><u>Recipe</u></h1>
                        <div class="recipeName">${recipe.name}</div> 
                        <div class="authorProfileName">by ${recipe.user.username}</div>
                        <img class="recipeImage" src="/uploads/users/recipies/${recipe.image}" />
                        <!-- <div class="recipeName">${recipe.name}</div>  -->
                        <div class="rating">
                            <span class="stars">
                                ${averageStars(recipe.reviews)}
                            </span>
                            <span class="number">
                                ${recipe.reviews.length}
                            </span><br>
                            
                        </div>
        
                        ${output}
                    </div>
                    
                    <div class="ingredients page"> 
                        <h1 class="pageHeading"><u>Ingredients</u></h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td><b>Quantity</b></td>
                                </tr>
                                ${ingredientParser(recipe.ingredients)}
                            </tbody>
                            
                        </table>
                    </div>
                    <div class="directions page ">
                        <h1 class="pageHeading"><u>Directions</u></h1>
                    
                        <ul class="directions-list">
                            ${directionsParser(recipe.directions)}
                        </ul>
                        
                    </div>
                    
                    
                    
                    <div class="page">
                        <h1 class="pageHeading"><u>Reviews</u></h1>
                        <div class="comments">
                            ${commentParser(recipe.reviews)}
                        </div>
                
                    </div>
        
                    <div class="page">
                        <h1 class="pageHeading"><u>Add Review</u></h1>
                        <form method="POST" action="/recipe/addReview" id="reviewForm">
                            <input name="recipeid" value=${id} hidden>
                            <div class="review-form-field">
                                <label for="review-stars">Stars: </label>
                                <input id="review-stars" placeholder="1 - 5" max="5" min="1" type="number" name="stars" required/>
                            </div>
                            <div class="review-form-field">
                                <label for="review-text">Review: </label>
                                <textarea id="review-text" height="50%" name="review" required></textarea>
                            </div>
                            <button type="submit" id="review-submit">Submit Review</button>
                        </form>
        
                    </div>
        
        
                    <div class="hard lastpage">
                        <div class="message">Dont Forget To Rate The Recipe And Add It To Your Favourites.</div>
                        <div class="note">Thank You</div>
                    </div>
                    <div class="hard"></div>
                        
                `
            )
        
            renderBook();

        });
    
   
    
    
});

const renderBook = () => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    flipbook.turn({
        width: viewportWidth * 0.8,
        height: viewportHeight * 0.7,
        // autoCenter: true
    });
}

$(document).on("click", ".heart", event => {
    $.post("/recipe/toggleWishlistItem", {
        recipeId: id 
    }, response => {
        if(response == "Deleted")
            $(".heart").attr("src", "/uploads/heartNotAdded.png");
        else 
            $(".heart").attr("src", "/uploads/heartAdded.jpg");
    });
})