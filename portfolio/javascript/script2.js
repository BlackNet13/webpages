AFRAME.registerComponent('link-handler', {
  init: function () {
    this.el.addEventListener('click', () => {
      const id = this.el.id;

      if (!id) {
        console.warn('Clicked element has no ID:', this.el);
        return;
      }

      switch (id) {
        case 'txtBtn':
          resetRoom();
          break;
        case 'resume':
        case 'histBtn':
        case 'otherWkBtn':
          openModal(id); 
          break;
        default:
          console.log('Unhandled click from:', id);
      }
    });
  }
});

    
    let currentYRotation = 0;
      function rotateRoom(amount) {
        currentYRotation += amount;
        const cube = document.getElementById('cube');
        cube.setAttribute('animation__rotate', {
          property: 'rotation',
          to: `0 ${currentYRotation} 0`,
          dur: 1000,
          easing: 'easeInOutQuad'
        });
        
        updateLights(currentYRotation % 360);

      }

      let slides = ['#slide1', '#slide2', '#slide3','#slide4','#slide5', '#slide6', '#slide7'];
    let currentIndex = 0;
    let slideEl = document.getElementById('slideshow');

    let intervalId = null;

    function startSlideshow() {
      if (!intervalId) {
        intervalId = setInterval(() => {
         currentIndex = (currentIndex + 1) % slides.length;
          slideEl.setAttribute('material', 'src', slides[currentIndex]);
        }, 3000);
      }
    }

    function stopSlideshow() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
    
     startSlideshow();

    // setInterval(() => {
    //   currentIndex = (currentIndex + 1) % slides.length;
    //   slideEl.setAttribute('material', 'src', slides[currentIndex]);
    // }, 3000); // Change slide every 3 seconds



AFRAME.registerComponent('flicker-light', {
  schema: {
    minIntensity: { type: 'number', default: 1.5 },
    maxIntensity: { type: 'number', default: 3 },
    speed: { type: 'number', default: 800 }, // Base flicker interval in ms
    enabled: { type: 'boolean', default: false }
  },

  init: function () {
    this.light = this.el.getObject3D('light');
    this.lastFlicker = 0;
    this.nextInterval = this.data.speed + Math.random() * this.data.speed;
    this.targetIntensity = this.data.maxIntensity;
  },

  tick: function (time, timeDelta) {
    if (!this.data.enabled || !this.light) return;

    // Time to update target intensity
    if (time - this.lastFlicker > this.nextInterval) {
      this.lastFlicker = time;
      this.nextInterval = this.data.speed + Math.random() * this.data.speed;

      // Choose a new random target intensity
      this.targetIntensity = this.data.minIntensity + Math.random() * (this.data.maxIntensity - this.data.minIntensity);
    }

    // Smoothly interpolate current intensity toward target
    this.light.intensity = THREE.MathUtils.lerp(this.light.intensity, this.targetIntensity, 0.05);
  },

  update: function () {
    if (!this.light) return;

    if (!this.data.enabled) {
      // When flicker is disabled, reset intensity to max
      this.light.intensity = this.data.maxIntensity;
    }
  }
});



      function updateLights(yRot) {
  // Normalize rotation to 0-360
  yRot = (yRot + 360) % 360;

  // Get your lights
  const light = document.getElementById('light');
  let color = '#2c7ac1'; // Default color 
  let intensity = 3; 
  let targetEl = '.rm1';
  let enabledFlicker = true;


  // Depending on the cube rotation, enable the light for the facing side, #2c7ac1 red, pink, green
  if (yRot >= 315 || yRot < 45) {
    color = '#2c7ac1'; // Default color
    targetEl = document.querySelector('.rm1');
    startSlideshow();
  } else if (yRot >= 45 && yRot < 135) {
   color = 'green';
    targetEl = document.querySelector('.rm4');
    stopSlideshow();
    enabledFlicker = false;
  } else if (yRot >= 135 && yRot < 225) {
    color = 'red'; 
    targetEl = document.querySelector('.rm3');
    enabledFlicker = false;
    stopSlideshow();
  } else if (yRot >= 225 && yRot < 315) {
    color = 'pink';
    intensity = 2;
    targetEl = document.querySelector('.rm2');
    enabledFlicker = false;
    stopSlideshow();
  }

  
   document.querySelector('.lghtMain').setAttribute('light', {color: color, intensity: intensity});
  // light.setAttribute('light', {color: color, intensity: intensity });

  document.querySelectorAll('.lght').forEach(light => {
  light.setAttribute('flicker-light', 'enabled', enabledFlicker);
});

//   document.querySelectorAll('.lght').forEach(light => {
//   light.setAttribute('light', {color: color, intensity: intensity });
// });
    const lightObj = light.getObject3D('light');
  if (lightObj && targetEl) {
    lightObj.target = targetEl.object3D;
    light.object3D.lookAt(targetEl.object3D.position);
  }

}


    AFRAME.registerComponent('face-btn', {
    init: function () {
      // Select all cylinders with the "face-button" class
      const buttons = document.querySelectorAll('.navBtn');
      const target = document.querySelector('#cube'); // Object to rotate

      buttons.forEach(button => {
        button.addEventListener('click', function () {
          const face = button.getAttribute('data-face');
          console.log('Clicked face:', face);

          // Now rotate based on face
          let rotation = { x: 0, y: 0, z: 0 };

          switch (face) {
            case 'main': rotation = { x: 0, y: 0, z: 0 }; break;
            case 'about': rotation = { x: 0, y: -90, z: 0 }; break;
            case 'portfolio': rotation = { x: 0, y: -180, z: 0 }; break;
            case 'contact': rotation = { x: 0, y: -270, z: 0 }; break;
          }

           // Animate rotation smoothly
        target.setAttribute('animation__face', {
          property: 'rotation',
          to: `${rotation.x} ${rotation.y} ${rotation.z}`,
          dur: 1000,
          easing: 'easeInOutQuad'
        });

        // Update lights to match the new face
        updateLights(rotation.y);
        });
      });
    }
  });

function resetRoom() {
  const cube = document.getElementById('cube');
  const rotation = cube.object3D.rotation;

  // Check if there's no visible rotation (approximately 0)
  const isAtRest = Math.abs(rotation.x) < 0.01 &&
                   Math.abs(rotation.y) < 0.01 &&
                   Math.abs(rotation.z) < 0.01;

  if (isAtRest) {
    // Reload the page
    location.reload();
    return;
  }

  // Otherwise, animate rotation reset
  cube.removeAttribute('animation__rotate'); // optional, clean up

  cube.setAttribute('animation__rotate', {
    property: 'rotation',
    to: `0 0 0`,
    dur: 1000,
    easing: 'easeInOutQuad'
  });

  currentYRotation = 0;
  updateLights(0);
}

const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");

let typingInterval = null;

function showDialogue(text) {
  dialogueBox.style.display = "block"; // make sure box is visible
  typeText(text, 40);                  // type the text
}

function hideDialogue() {
  dialogueBox.style.display = "none";  // hide the box
  clearInterval(typingInterval);       // stop any ongoing typing
}

// Plane 1 events
document.querySelector("#plane1").addEventListener("mouseenter", () => {
  showDialogue("Click here to view my design works, currently work in progress");
});
document.querySelector("#plane1").addEventListener("mouseleave", hideDialogue);

// Plane 2 events
document.querySelector("#plane2").addEventListener("mouseenter", () => {
  showDialogue("This is the calm blue plane!");
});
document.querySelector("#plane2").addEventListener("mouseleave", hideDialogue);

// Typing effect using setInterval
function typeText(text, speed = 50) {
  dialogueText.textContent = ""; // clear old text
  let i = 0;

  // stop previous typing if any
  if (typingInterval) clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    if (i < text.length) {
      dialogueText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval); // stop interval when done
      typingInterval = null;
    }
  }, speed);
}





  


function openModal(triggerId) {
  const modal = document.getElementById('pdfModal');
  const container = document.getElementById('pdfContainer');

  modal.style.display = 'flex';

  if (triggerId === 'resume') {
    // Lazy-load PDF: only add iframe if it doesn't exist
    if (!document.getElementById('pdfIframe')) {
      const iframe = document.createElement('iframe');
      iframe.id = 'pdfIframe';
      iframe.src = 'file/Yvonne_Resume_V25.pdf#toolbar=0&navpanes=0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      container.appendChild(iframe);
      console.log('PDF iframe added to modal.');
    }
  } else {
    // Clear old content
    container.innerHTML = '';

    // Load generic HTML content
    const content = document.createElement('div');
    content.innerHTML = getModalContent(triggerId);
    content.style.padding = '20px';
    content.style.color = '#333';
    container.appendChild(content);
  }
}

function closeModal() {
  document.getElementById('pdfModal').style.display = 'none';
  
  // Only clear content if it's NOT the PDF
  const pdfIframe = document.getElementById('pdfIframe');
  if (!pdfIframe) {
    document.getElementById('pdfContainer').innerHTML = '';
  }
}

function getModalContent(id) {
  switch(id) {
    case 'histBtn':
  return `
    <div style="
      overflow-y: auto;
      padding: 0; margin:10px;
      height: 75vh;
    ">
      <h2>Portfolio History</h2>
      <p>This is a history of the portfolio and how it evolved over time...</p>
      <br>
      <div class="clearfix">
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>2013</b></p></div><br/>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/2013.gif" width="60%" height:"60%"; style="margin-right:20px;"/>
          <img src="images/2013_gallery.gif" width="60%" height:"60%"; />
        </div>
        <div class="box2" style="background-color:#ccc"><p>This was created for my final module for the study of interactive media design in ITE,
        it was my first portfolio,it may be abit lacking but things have change since then.<br/><br/> The gallery can no longer be played together inside of the webpage as it's a flash swf object, but it can be played with a standalone flashplayer.</p></div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>EO2022-2023</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/2022_2023.gif" width="50%" height:"50%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>After quite a period of time I actually got back into tech and design doing digital design and development, this was a portfolio design during my second year. <br/><br/>It felt like a tribute to my portfolio in the past therefore I stuck with the bear theme. This did not get a chance to be coded but I was quite satisfied with it.</p></div>
        
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>2023</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/2023.gif" width="30%" height:"30%";/>
        </div>
        <div class="box2" style="background-color:#ccc; padding-bottom:210px;"><p>Tried another style for this other module for portfolio,up to prototype level. This also comes with a splash screen, with an ocean theme. Was also working with the idea of having mobile friendly portfolio. <br/> <br/> The animation for the splash screen was fun to create.</p></div>

         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>EO2023-2024</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 5%;">
          <img src="images/2023_2024.gif" width="80%" height:"80%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>This was the portfolio created at the end of my time in polytechnic. It went through many iterations and designs. Slumberous Cat is a symbol of embracing my fatigue from life. 
        Had wanted to keep to a purple accent instead but was told that was not viable therefore the final design was this. the front page animation was to keep animation minimal yet interesting. The transition animation as shown sometimes would bug out 
        and not show.<br/> <br/> A very functional portfolio with working contact page, I tried to incorporate the teacher's advice of having something different on the side , like a tab to allow easy access to social media like linkedin or github. This was also mobile friendly from the start but was not encouraged.</p></div>

          <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>2025</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/_.gif" width="50%" height:"50%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>My current portfolio, this was created via experimenting with a-frame and the idea of using rooms as pages instead. This got develop further into a CCTV type of camera view which is quite interesting.<br/><br/>Working with 3D space really makes things quite tough but it's really something else to be able to put simple tinkercad items into the scene as well. Will be updating the gif once the portfolio is completed.</p></div>
      </div>
    </div>
  `;
    case 'otherWkBtn':
      return `<h2>Other Content</h2><p>Something else goes here.</p>`;
    default:
      return `<p>No content found for this section.</p>`;
  }
}


