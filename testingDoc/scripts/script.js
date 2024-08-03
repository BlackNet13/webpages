//***tv noise: https://codepen.io/matthewhudson/pen/KOPxNv
const canvas = document.getElementById('staticCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function generateNoise(ctx) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;        // red
    data[i + 1] = value;    // green
    data[i + 2] = value;    // blue
    data[i + 3] = 255;      // alpha
  }

  ctx.putImageData(imageData, 0, 0);
}

// Animate the noise generation
function animateStatic() {
  generateNoise(ctx);
  requestAnimationFrame(animateStatic);
}

animateStatic();



//*** minimize
const toggleButton = document.querySelector('.mini');
const contentSpan = document.querySelector('.contentMin');

// Add an event listener to toggle the minimized class
toggleButton.addEventListener('click', function (event) {
    event.preventDefault(); 

    const isMinimized = contentSpan.classList.toggle('minimized');

    this.textContent = isMinimized ? 'Maximize' : 'Minimize';
});




//***theme: https://youtu.be/fyuao3G-2qg?feature=shared

const colorThemes = document.querySelectorAll('[name="theme"]');

//store
const saveTheme = function(theme){
    localStorage.setItem("theme", theme)
};


const getTheme = function(){
    const activeTheme = localStorage.getItem("theme");
    colorThemes.forEach((thmoption)=>{
        if(thmoption.id === activeTheme){
            thmoption.checked = true;
        }
    });
    document.documentElement.className = theme; //failsafe for no :has() support
};

colorThemes.forEach(thmoption => {
    thmoption.addEventListener("click",()=>{
        saveTheme(thmoption.id);
    });
});

//apply
document.onload = getTheme();
