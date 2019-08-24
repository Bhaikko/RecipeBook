const parallax = document.getElementById("page1");

window.addEventListener("scroll", () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = -1 * offset * 0.3 + "px";
});

const info2 = document.getElementsByClassName("info2")[0];
const recipeCircles = document.getElementsByClassName("recipeCircle");

const radius = 175;
let angle = 0;
const delta = 2 * Math.PI * radius / recipeCircles.length;

const centerX = info2.clientWidth / 2;
const centerY = info2.clientHeight / 2;

const p1X = centerX + radius - 200;
const p1Y = centerY + 150;


Array.prototype.forEach.call(recipeCircles, element => {   
    
    let x = p1X + radius * Math.sin(angle);
    let y = p1Y - (radius * (1 - Math.cos(angle))); 

    angle += delta / radius;
    
    console.log(x, y);
    element.style.setProperty("--x", x + "px");
    element.style.setProperty("--y", y + "px");
    element.style.animation = `move 1s ease forwards`;

});