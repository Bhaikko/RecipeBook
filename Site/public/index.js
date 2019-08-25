const parallax = document.getElementById("page1");

window.addEventListener("scroll", () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = -1 * offset * 0.3 + "px";

    if(offset > 100)
        recipeCircleAnimate();
});

const info2 = document.getElementsByClassName("info2")[0];
const recipeCircles = document.getElementsByClassName("recipeCircle");

const radius = 175;
let angle = 0;
const delta = 2 * Math.PI * radius / recipeCircles.length;


const p1X = radius - 200;
const p1Y = 300;

const recipeCircleAnimate = () => {
    Array.prototype.forEach.call(recipeCircles, element => {   
    
        let x = p1X + radius * Math.sin(angle);
        let y = p1Y - (radius * (1 - Math.cos(angle))); 
    
        angle += delta / radius;
    
        element.style.setProperty("--x", x + "px");
        element.style.setProperty("--y", y + "px");
        element.style.animation = `move 1s ease forwards`;
    
    });
    
}
