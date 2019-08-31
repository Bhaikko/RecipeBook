
// FOR MODAL TO DISPLAY, IT REQUIRES AN ELEMENT WITH '#giveMeModal' AND '#modal' to display the modal
// REQUIRES JQUERY
//  do add, <script src="modal.js"></script> at the end

class Modal
{
    constructor() {
        this.render();
        this.buttonEvents();
        this.addHeaders();
    }

    render = () => {
        const modal = document.getElementById("modal");
        modal.innerHTML = 
        `
            <div id="modal-closeButton">X</div>
            <div id="modal-header">New Recipe</div>
            <div id="modal-form">
                <form id="new-recipe-form" method="POST" action="/recipe/addRecipe" enctype="multipart/form-data">
                    <div class="form-field">
                        <label for="recipe-name">Recipe Name: </label><br>
                        <input id="recipe-name" name="recipeName" placeholder="Enter Recipe Name" class="input" required/>
                    </div>
                    <div class="form-field">
                        <label for="recipe-image">Recipe Image: </label><br>
                        <input id="recipe-image" type="file" name="recipeImage" required/>
                    </div>
                    <div class="form-field">
                        <label for="recipe-type">Recipe Type: </label>
                        <select id="recipe-name" name="recipeType">
                            <option>Chicken Recipe</option>
                            <option>Cookie Recipe</option>
                            <option>Cake Recipe</option>
                            <option>Breakfast And Brunch Recipe</option>
                            <option>BBQ And Grilling Recipe</option>
                            <option>Appetizers And Snacks Recipe</option>
                            <option>World Cuisine Recipe</option>
                            <option>Instant Pop Recipe</option>
                            <option>Slow Cooker Recipe</option>
                            <option>Shrimp Recipe</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label>Recipe Ingredients: </label><br>
                        <div id="ingredients">
                            <div class="ingredient">
                                <input class="recipe-ingredient-name" name="ingredients[][name]" placeholder="Enter Ingredient Name" required>
                                <input class="recipe-ingredient-quantity" name="ingredients[][quantity]" placeholder="Enter Ingredient Quantity" required>
                                <button type="button" class="recipe-ingredient-remove">X</button>
                            </div>
                            

                        </div>
                        <button type="button" id="addMoreIngredients">Add More Ingredients</button>
                    </div>
                    <div class="form-field">
                        <label for="recipe-direction">Recipe Directions</label><br>
                        <textarea id="recipe-direction" name="recipeDirection" placeholder="Enter Recipe Directions" required></textarea>
                    </div>

                    <button type="submit" id="modal-submit">Add New Recipe</button>
                </form>
            </div>
        `
    }

    buttonEvents = () => {
        const modal = $("#modal");
        $("#giveMeModal").click(event => {
            modal.css({
                "animation": `modal-slide-down 0.75s ease forwards`,
                "z-index": "2"
            });
            $("body > *").not("body > #modal").css({
                "filter": "blur(5px) grayscale(10%)"
            });
        });

        $("#modal-closeButton").click(event => {
            
            $("body > *").not("body > #modal").css({
                "filter": "blur(0px)"
            });

            modal.css({
                "animation": "",
            });
        });


        $("#addMoreIngredients").click(() => {
            
            $("#ingredients").append(
                `
                    <div class="ingredient">
                        <input class="recipe-ingredient-name" name="ingredients[][name]" placeholder="Enter Ingredient Name" required>
                        <input class="recipe-ingredient-quantity" name="ingredients[][quantity]" placeholder="Enter Ingredient Quantity" required>
                        <button type="button" class="recipe-ingredient-remove">X</button>
                    </div>
                `
            )
        });

        $(document).on("click", ".recipe-ingredient-remove", event => {
            event.target.parentNode.remove();
        });
    }

    addHeaders = () => {
        const head = document.getElementsByTagName("head");
        head[0].innerHTML += `<link rel="stylesheet" href="./Components/modal.css">`;

    }

}

const modal = new Modal();

