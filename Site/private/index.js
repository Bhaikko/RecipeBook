const renderRecipes = (recipes) => {
    const recipesBox = $($(".recipesBox")[0]);
    if(recipes == "")
        return;
    else if(typeof recipes == "string")
        recipes = [recipes];
    
    recipesBox.empty();
    recipes.map(recipe => {
        recipesBox.append(
            `
                <div class="recipeCard">   
                    <img class="recipeImage" src="/uploads/users/recipies/${recipe.image}" />
                    <div class="recipeContent">
                        <div class="recipeName">${recipe.name}</div>
                        <div class="rating">
                            <span class="stars">
                                <img src="/uploads/star.png">
                                <img src="/uploads/star.png">
                                <img src="/uploads/star.png">
                                <img src="/uploads/star.png">
                                <img src="/uploads/star.png">
                            </span>
                            <span class="number">
                                100k
                            </span>
                        </div>
                        <div class="author">
                            <img class="authorProfile" src="${recipe.user.image}"> By
                            <span class="authorProfileName">${recipe.user.username}</span>
                        </div>
                    </div>       
                </div>
            `
        )
    });
}

try {
    let name = window.location.href.split("?")[1].split("=")[1];
    $.get("/recipe/getRecipeByName?name=" + name, recipes => renderRecipes(recipes));
}
catch {
    $.get("/recipe/getRecipes", recipes => renderRecipes(recipes));
}




$(".sidePanel").click(event => {
    $.get("/recipe/getRecipeByType?type=" + event.target.innerText + " Recipe", recipes => renderRecipes(recipes));
});