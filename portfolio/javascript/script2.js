let currentPage = "main"; // default

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
        case 'designBtn':
        case 'codeBtn':
        case 'otherWrkBtn':
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
    currentPage = "main";
    startSlideshow();
  } else if (yRot >= 45 && yRot < 135) {
   color = 'green';
    targetEl = document.querySelector('.rm4');
    currentPage = "contact";
    stopSlideshow();
    enabledFlicker = false;
  } else if (yRot >= 135 && yRot < 225) {
    color = 'red'; 
    targetEl = document.querySelector('.rm3');
    currentPage = "portfolio";
    enabledFlicker = false;
    stopSlideshow();
  } else if (yRot >= 225 && yRot < 315) {
    color = 'pink';
    intensity = 2;
    currentPage = "about";
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
            case 'main': rotation = { x: 0, y: 0, z: 0 }; currentPage = "main"; break;
            case 'about': rotation = { x: 0, y: -90, z: 0 }; currentPage = "about"; break;
            case 'portfolio': rotation = { x: 0, y: -180, z: 0 }; currentPage = "portfolio"; break;
            case 'contact': rotation = { x: 0, y: -270, z: 0 }; currentPage = "contact"; break;
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
    currentPage = "main";
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
  typingInterval = null;
   typingSound.pause();
  typingSound.currentTime = 0;
}

// designF events
document.querySelector("#designF").addEventListener("mouseenter", () => {
  if (currentPage === "portfolio") {
  showDialogue("Click here to view my design works");
  }
});
document.querySelector("#designF").addEventListener("mouseleave", hideDialogue);

// othersF events
document.querySelector("#othersF").addEventListener("mouseenter", () => {
  if (currentPage === "portfolio") {
  showDialogue("Click here to view my other works, currently work in progress");
  }
});
document.querySelector("#othersF").addEventListener("mouseleave", hideDialogue);

// codeF events
document.querySelector("#codeF").addEventListener("mouseenter", () => {
  if (currentPage === "portfolio") {
  showDialogue("Click here to view my code works");
  }
});
document.querySelector("#codeF").addEventListener("mouseleave", hideDialogue);

const typingSound = new Audio("sounds/typing.mp3"); 
typingSound.loop = true;
typingSound.volume = 0.5;

// Typing effect using setInterval
function typeText(text, speed = 50) {
  dialogueText.textContent = ""; // clear old text
  let i = 0;

  // stop previous typing if any
  if (typingInterval) clearInterval(typingInterval);

  // stop and reset sound if already playing
  typingSound.pause();
  typingSound.currentTime = 0;

  // start typing sound
  typingSound.play();

  typingInterval = setInterval(() => {
    if (i < text.length) {
      dialogueText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval); // stop interval when done
      typingInterval = null;

      typingSound.pause();
      typingSound.currentTime = 0;
    }
  }, speed);
}



function openModal(triggerId) {
  const modal = document.getElementById('pdfModal');
  const container = document.getElementById('pdfContainer');

  modal.style.display = 'flex';

   typingSound.pause();
  typingSound.currentTime = 0;

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
          <img src="images/2022_2023.gif" loading="lazy" width="50%" height:"50%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>After quite a period of time I actually got back into tech and design doing digital design and development, this was a portfolio design during my second year. <br/><br/>It felt like a tribute to my portfolio in the past therefore I stuck with the bear theme. This did not get a chance to be coded but I was quite satisfied with it.</p></div>
        
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>2023</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/2023.gif" loading="lazy" width="30%" height:"30%";/>
        </div>
        <div class="box2" style="background-color:#ccc; padding-bottom:210px;"><p>Tried another style for this other module for portfolio,up to prototype level. This also comes with a splash screen, with an ocean theme. Was also working with the idea of having mobile friendly portfolio. <br/> <br/> The animation for the splash screen was fun to create.</p></div>

         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>EO2023-2024</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 5%;">
          <img src="images/2023_2024.gif" loading="lazy" width="80%" height:"80%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>This was the portfolio created at the end of my time in polytechnic. It went through many iterations and designs. Slumberous Cat is a symbol of embracing my fatigue from life. 
        Had wanted to keep to a purple accent instead but was told that was not viable therefore the final design was this. the front page animation was to keep animation minimal yet interesting. The transition animation as shown sometimes would bug out 
        and not show.<br/> <br/> A very functional portfolio with working contact page, I tried to incorporate the teacher's advice of having something different on the side , like a tab to allow easy access to social media like linkedin or github. This was also mobile friendly from the start but was not encouraged.</p></div>

          <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>2025</b></p></div>
        <div class="box1" style="background-color:#bbb; display:flex; justify-content:center; margin-top: 1%;">
          <img src="images/_.gif" loading="lazy" width="50%" height:"50%";/>
        </div>
        <div class="box2" style="background-color:#ccc"><p>My current portfolio, this was created via experimenting with a-frame and the idea of using rooms as pages instead. This got develop further into a CCTV type of camera view which is quite interesting.<br/><br/>Working with 3D space really makes things quite tough but it's really something else to be able to put simple tinkercad items into the scene as well. Will be updating the gif once the portfolio is completed.</p></div>
      </div>
    </div>
  `;
    case 'otherWkBtn':
      return `<h2>Other Content</h2><p>Something else goes here.</p>`;
    
    case 'designBtn':
      return `<div style="
      overflow-y: auto;
      padding: 0; margin:10px;
      height: 75vh;
    ">
      <h2>Design</h2>
      <p>Here are my design works</p>
      <br>
      <div class="clearfix">
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Diners Website Design (View on <a href="https://xd.adobe.com/view/b0b34507-7a51-4013-9ac6-eb8e2a6f7c48-e5e0/" aria-label='see on adobe xd' target="_blank">Adobe XD</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/web1.webp" width="40%" style="margin-right:20px;" />
    <img src="images/siteMap1.webp" width="45%" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
      The color scheme is split complementary which consist of blue and green to reflect
      the freshness the brand aims to provide, the orange and yellow gives touches of
      warmth, enthusiasm to the visual identity
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#009688;" data-color="#009688"></span>
    <span class="colorBox" style="background:#FF9800;" data-color="#FF9800"></span>
    <span class="colorBox" style="background:#FFC107;" data-color="#FFC107"></span>
    <span class="colorBox" style="background:#153243;" data-color="#153243"></span>
    <span class="colorBox" style="background:#284B63;" data-color="#284B63"></span>
    </span>
    <br/>
    <p style="color:black;">
    The typography chosen appeals to their target audience which consist of
                                                mostly women therefore a cursive style can frame the brand as something
                                                more delicate and feminine. There are errors at the time of creating the gif with the cart page as shown below
                                            </p>
    <img src="images/typography1.webp" loading="lazy" width="45%" style="margin-right:20px;" />
    <img src="images/Diners.gif" loading="lazy" width="45%" />
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Diners</b></h2>
        <p>"Healthy meals made easier" is the tagline for the placeholder brand call Diners, the image seen is what the customer's of this brand will see on the website when they first enter.</p>
        <br/>
        <h3><b>Brand Story</b></h3>
        <p>This placeholder brand was build around providing nourishing healthy options to the common public. Their menu ranges from bento boxes that consist of lean proteins, vibrant vegetables that are paired with rice or soba, to acai bowls and kombucha drinks. They source their ingredients from local and foreign farms.</p>
        </div>


        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>'Gucci' Magazine Spread</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/mag2.webp" loading="lazy" width="45%" style="margin-right:20px;" />
    <img src="images/moodboard2.webp" loading="lazy" width="55%" />
  </div>
  <div>
  <p style="color:black;">
    During the research, the mood board is primarily focus on how other
                                                photographers capture a certain look and what the end goal of the
                                                magazine spread should carry in it's looks.
                                            </p>
    <p style="margin-top:10px; color:black;">
      The color scheme makes use of grey scale and color to make the subject pop
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#3F5A3D;" data-color="#3F5A3D"></span>
    <span class="colorBox" style="background:#FF9800;" data-color="#FF9800"></span>
    <span class="colorBox" style="background:#4E554E;" data-color="#4E554E"></span>
    <span class="colorBox" style="background:#153243;" data-color="#153243"></span>
    <span class="colorBox" style="background:#D3B59E;" data-color="#D3B59E"></span>
    </span>
    <br/>
    
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>'Gucci' Magazine</b></h2>
        <p>"This is a mockup of a fashion magazine spread but it has no real
                                                relation to the actual brand GUCCI except for the look of the
                                                Gucci name.</p>
        <br/>
        <h3><b>Other details</b></h3>
        <p>The focus is on minimalistic design to give it a posh look. Lesser words more
                                                focus on the overall feeling of the design. The fake overlay of color lighting
                                                make it look like it is done in a photoshoot, the overlaid shadow adds to the
                                                realism of the surroundings.</p>
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Auti-learners App Prototype (View on <a href="https://xd.adobe.com/view/7deece64-621a-4427-b895-3aa27bf001f3-28bd/" aria-label='see on adobe xd' target="_blank">Adobe XD</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/app3.webp" loading="lazy" width="40%" style="margin-right:20px;" />
    <img src="images/siteMap3.webp" loading="lazy" width="45%" />
  </div>
  <div>
  <p style="color:black;">
   The site map shows an overview of the contents of each page
                                            </p>
    <p style="margin-top:10px; color:black;">
      The color scheme is compound color based on the base colors extracted from their
                                                webpage: #00A5E3(light mode), #34383D(dark mode), the colors shown are for
                                                the aforementioned light mode. The reason to implement dark mode is based
                                                on the consideration that the child might be sensitive to having too many colors or bright lights
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
    <span class="colorBox" style="background:#1232B0;" data-color="#1232B0"></span>
    <span class="colorBox" style="background:#32427D;" data-color="#32427D"></span>
    <span class="colorBox" style="background:#00A5E3;" data-color="#00A5E3"></span>
    <span class="colorBox" style="background:#E67A3A;" data-color="#E67A3A"></span>
    <span class="colorBox" style="background:#B03512;" data-color="#B03512"></span>
    </span>
    <br/>
    
    <img src="images/auti.gif" loading="lazy" width="35%" style="margin: 0 35%" />
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Auti-learners</b></h2>
        <p>Auti-learners is made for MINDS (Movement for the intellectually
                                                Disabled of Singapore) for kids having Autism Spectrum Disorder.
                                                The app has games base on matching, sorting and quizzes, with
                                                a tutorial beforehand that shows the user how to interact with
                                                the app. It uses auditory and haptic feedback to communicate
                                                errors/success to support their learning.</p>
        <br/>
        <h3><b>Other details</b></h3>
        <p>MINDS center their brand around the belief of the inherent worth and potential of the
                                                individuals with intellectual disabilities and creating a inclusive society where individuals
                                                can be recognized, respected and supported with the opportunities to thrive. This app
                                                hopes work with kids with autism on their skill sets.</p>
        </div>

         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>'Maldives' Magazine Mockup</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/mag4.webp" loading="lazy" width="55%" style="margin-right:20px;" />
    <img src="images/moodboard4.webp" loading="lazy" width="45%" />
  </div>
  <div>
  <p style="color:black;">
    During the research, the mood board bring inspiration for the type of end
                                                feeling for what the final magazine spread would be like.
                                            </p>
    <p style="margin-top:10px; color:black;">
      The color palette makes use of white beige and the colors present in the images
                                                provided to create it's overall look and feel. It also uses opacity for the shades of
                                                color to give it an overlaylook.
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#E6D5C8;" data-color="#E6D5C8"></span>
      <span class="colorBox" style="background:#FFFFFF;" data-color="#FFFFFF"></span>
      <span class="colorBox" style="background:#26BCB4;" data-color="#26BCB4"></span>
      <span class="colorBox" style="background:#000000;" data-color="#000000"></span>
      <span class="colorBox" style="background:#CCCC66;" data-color="#CCCC66"></span>
    </span>
    <br/>
    
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>'Maldives' Special 2 page spread</b></h2>
        <p>This is a mockup of a travel magazine's 2 page spread but it has
                                                no real relation to any actual magazine, this was an exercise on
                                                layout with grids. This was created with a normal column grid.</p>
        <br/>
        <h3><b>Other details</b></h3>
        <p>The design is build around the grid first followed by elementslike the overlay to
                                                create visual interest, the title logo placed on the image of the beach will attract
                                                the interest of readers the other images are place in a way that they represent
                                                windows of what it may be like to have a vacation at this location.</p>
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>'Portfolio' Poster Design</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/poster5.webp" loading="lazy" width="55%" style="margin-right:20px;" />
    <img src="images/moodboard5.webp" loading="lazy" width="45%" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
     The color scheme is compound and consist of blue and yellow as the night sky and
                                                city's colors. The grey and white, make up the roads and moon.
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#FCEE23;" data-color="#FCEE23"></span>
      <span class="colorBox" style="background:#36406B;" data-color="#36406B"></span>
      <span class="colorBox" style="background:#626161;" data-color="#626161"></span>
      <span class="colorBox" style="background:#F3F4F8;" data-color="#F3F4F8"></span>
      <span class="colorBox" style="background:#AC8158;" data-color="#AC8158"></span>
    </span>
    <br/>
    <img src="images/poster5_big.webp" loading="lazy" width="35%" style="margin: 0 35%" />
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Portfolio Poster Design</b></h2>
        <p>This is a poster designed to promote a portfolio, this is based
                                                on a work I previously worked on as a possible portfolio de-
                                                sign. It is city themed with a bear mascot.</p>
        <br/>
        <h3><b>Other details</b></h3>
        <p>This view is a depiction of being inside the Y logo building that is in the webpage
                                                itself. The imagery suppose to hold the meaning of hope, going through changes
                                                and having abundance. It also holds a feeling of disconnectedness and a longing
                                                to see more of the world.</p>
        </div>


         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Ocean Themed Portfolio (View on <a href="https://xd.adobe.com/view/874658db-38d0-4871-9693-f2a0fc3d811f-d215/" aria-label='see on adobe xd' target="_blank">Adobe XD</a> )</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/mobile6.webp" loading="lazy" width="40%" style="margin-right:20px;" />
    <img src="images/type6.webp" loading="lazy" width="60%" />
  </div>
  <div>
  <p style="color:black;">
    The typography chosen gives a more personable feeling.
                                            </p>
    

    <p style="margin-top:10px; color:black;">
     The color scheme is monochromatic, inspired by hues of the ocean to convey
                                                tranquility and meaning.
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
      <span class="colorBox" style="background:#0F3842;" data-color="#0F3842"></span>
      <span class="colorBox" style="background:#6CB9CC;" data-color="#6CB9CC"></span>
      <span class="colorBox" style="background:#2DA4C2;" data-color="#2DA4C2"></span>
      <span class="colorBox" style="background:#233C42;" data-color="#233C42"></span>
      <span class="colorBox" style="background:#21798F;" data-color="#21798F"></span>
    </span>
    <br/>
    <p style="color:black;">
    The site map shows an overview of the contents of each page
                                            </p>
     
    <img src="images/siteMap6.webp" loading="lazy" width="45%" style="margin: 0 20px 0 10%;" />
    <img src="images/oceanSite.gif" loading="lazy" width="24%" height="400px" />
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Ocean Themed Mobile Portfolio</b></h2>
        <p>"Dive into Inspired Creation" Drives the connection with the ocean like
                                                in the logmark/combination logo. This also taps into exploration of
                                                inspiration. Conveying that I would like to invite potential clients to
                                                be involved in the creation process together exploring the possibilities.</p>
        <br/>
        <h3><b>Brand story</b></h3>
        <p>The brand was centers around translating ideas into tangible works of art/programmes,
                                                harmonizing the richness of my imagination with the aspirations of prospective clients,
                                                hoping to encourage individuals to delve into the profound depths of their own souls,
                                                the brand embrace the limitless possibilities like those offered by the very idea of the
                                                an ocean.</p>
        <br/>

        </div>

         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Scoot App Prototype(Team) (View on <a href="https://xd.adobe.com/view/43600389-f966-4211-99b3-96cc4f03de3b-1633/" aria-label='see on adobe xd' target="_blank">Adobe XD</a> | <a href="file/SIA AppC 2023 Student Challenge (Scoot) - Digital Transaction Onboard.pdf" target="_blank" download>Download Info Kit</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/scootApp.webp" loading="lazy" width="50%" style="margin-right:20px;" />
    <img src="images/teamLogo.webp" loading="lazy" width="25%" height="20%" style="margin-top:20px;" />
  </div>
  <p><h4><b>Members involve in this team project:</b></h4><a href="https://github.com/BlackNet13">Yvonne(Me)</a>, <a href="https://github.com/chavonne-kek">Chavonne</a>, <a href="https://github.com/ShouKang49">Shou Kang</a>, <a href="https://github.com/masedryer">Edry</a> <span class="credit">(*click on names to bring you to their github page)</span></p>

                                            <p>Made out of 4 people, drawing inspiration from how most tech logos are
                                                round our logo takes on a circular shape which can also
                                                show how we might wish to be smooth in the processes
                                                we uptake. the font chosen is sans serif as we wish to give
                                                a formal impression to others. <br><br>The depictions of gear and
                                                the uprising vertical lines can be seen as wires or
                                                the mechanics in a system. Our tag line from code to reality, perfectly
                                                describes us, as we as tech designers do bring the code’s
                                                functionality, as what is seen as intangible to tangible results. <br><br>
                                                In this particular case although there are no code to be implemented, we have
                                                crafted the prototype to fulfill the case study's goals.</p>
        <br/>
        <hr/><br/>
  <div>
    <p style="margin-top:10px; color:black;">
     The colors are mostly according to what was use within scoot itself, mainly the yellow and the black, fonts we used are as shown below.
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#FFE900;" data-color="#FFE900"></span>
      <span class="colorBox" style="background:#ADADAD;" data-color="#ADADAD"></span>
      <span class="colorBox" style="background:#EEEEEE;" data-color="#EEEEEE"></span>
      <span class="colorBox" style="background:#1F201E;" data-color="#1F201E"></span>
      <span class="colorBox" style="background:#000000;" data-color="#000000"></span>
    </span>
    <br/>

    <img src="images/font7.webp" width="45%" loading="lazy" style="margin-left:30%;" />
    <br/>
    <br/><hr/>
     <p style="color:black;">
    <h4>This is the challenge that this team assignment was based on:</h4>
                                            </p>
    <img src="images/appChallenge.webp" loading="lazy" width="65%" style="margin-right:20px;" />

    <p style="color:black;">
    <h4>Our team's focus was on this aspect of the challenge(*you can download the info kit at the top of this section):</h4>
                                            </p>
    <img src="images/ourFocus.webp" loading="lazy" width="75%" />

    <h4><b>Case study's Goal</b></h4>

                                            <ul class="itemList">
                                                <li><b>End Goal:  higher in flight sales</b></li>
                                                <li>built in product ordering</li>
                                                <li>real time inventory management</li>
                                                <li>crew notification of seat's requiring attention</li>
                                                <li>purchase fulfillment(receiving order, preparing order,delivering order)</li>
                                            </ul>

    <br/><hr/>
    <h4><b>Survey Summary & Competitor Analysis</b></h4>

                                            <img src="images/competitor1.webp" loading="lazy" style="width:90%;"/>
                                            <br><br>

                                            <img src="images/competitor2.webp"  loading="lazy" style="width:90%;"/>
                                            <br><br>

                                            <img src="images/surveySummary.webp" loading="lazy"  style="width:90%;"/>
                                            <br><br>

  <br/><hr/>
   <h4><b>The solution</b></h4>
                                            <ul class="itemList">
                                                <li>Has both the interface for cabin crew and customers</li>
                                                <li>Provide in-flight entertainment(for customers)</li>
                                                <li>Allow for instant feedback for stock level for items (for cabin crew)</li>
                                                <li>provides instant notifications of customer’s requests(for cabin crew)</li>
                                                <li>Gives more payment options*</li>
                                                <li>Provide ability to toggle between languages*</li>

                                            </ul>
                                            <img src="images/scoot.gif" loading="lazy" width="25%" style="margin-left:35%;" />
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Scoot App Prototype [Team]</b></h2>
        <p>This was a team assignment, done in a team of 4 based of a real challenge which has already
                                                stopped accepting submission at the time that we were assign this.</p>
        <br/>
        <h3><b>Survey Result Analysis</b></h3>
        <p>Although movies were the most chosen option but because due to the Scoot restricting to
                                                provide free movies therefore we defaulted to try and improve the game page for their scoot hub.
                                                <br><br>Also as you can see from the survey summary: there were some who uses the existing scoothub and
                                                thought that it was hard to navigate around it, therefore we actually make the design with this in mind,
                                                with the use of hamburger menu and easy to read menu buttons, we hope to minimize as much issues regarding this as possible.
                                                <br><br>We also opted to design this as a native app as this will ensure that some information are retained or offline functionality(games) can still be performed,
                                                in case the internet is down or that the passenger did not purchase the scoot's wifi access. To make the app more competitive with other airlines,
                                                we make sure to target areas which were highlighted in the survey and the competitor's analysis.</p>
        
        
        
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Covid 19 Poster</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/covid19Poster.webp" loading="lazy" width="55%" style="margin-left:5%;" />
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Covid 19 Campaign Poster</b></h2>
        <p>This work was done for covid 19 from a stance of a campaign poster.
                                                As there wasn't much limitations, nor a complete write up. Here it is.
                                                I choose to include this as it can be counted as one of the first of
                                                many works from when I return to school with design and tech in mind.</p>
        </div>

    </div>`;

    case 'codeBtn':
      return `<div style="
      overflow-y: auto;
      padding: 0; margin:10px;
      height: 75vh;
    ">
      <h2>Code</h2>
      <p>Here are my coding works</p>
      <br>
      <div class="clearfix">
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Slumberous Cat Portfolio (View on <a href="https://xd.adobe.com/view/b0c518a9-94a2-4a8f-af14-0f3c48e16f74-e596/" target="_blank">Adobe XD (Initial)</a> |
                                                <a href="https://xd.adobe.com/view/3228059d-ceb6-4e9e-98ae-fb910de6069d-677b/" target="_blank">Adobe XD(Final)</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/2023_2024.gif" width="35%" height="40%" style="margin-right:20px; margin-top:50px;" />
    <img src="images/diff0.webp" width="45%" height="30%" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
      The initial colors were generated by an adobe XD plugin call Dopely colors using their color and image function as shown on the left hand side below. The final design and colors were chosen out of the ones created as it was the
                                                most appealing to me and amongst the people (lecturers,friends and schoolmates) I had ask. Above on the right are the many different designs and iterations before the final design was chosen. <span style="font-size: 0.8rem;">(*Special thanks to Mr Jason for helping me overcome my design hurdles)</span>
    </p>
    <img src="images/color0.webp" loading="lazy" width="40%" style="margin-left:20%;" /><br/><br/>
    <span style="justify-content:center; display:flex; margin-top:10px;">
    <b>Intial</b>
     <span class="colorBox" style="background:#F0EDE6;" data-color="#F0EDE6"></span>
      <span class="colorBox" style="background:#4D3060;" data-color="#4D3060"></span>
      <span class="colorBox" style="background:#CCBAAC;" data-color="#CCBAAC"></span>
      <span class="colorBox" style="background:#FFFFFF;" data-color="#FFFFFF"></span>
      <span class="colorBox" style="background:#000000;" data-color="#000000"></span> 
      <span style="font-size: 40px; padding:20px; margin-left:20px; margin-top:-10px;"> | </span>
      <b>Final</b>
      <span class="colorBox" style="background:#000000;" data-color="#000000"></span>
      <span class="colorBox" style="background:#FFFFFF;" data-color="#FFFFFF"></span>
      <span class="colorBox" style="background:#F7B6B6;" data-color="#F7B6B6"></span>
    </span>
    <br/>
    <p style="color:black;">
    <h2><b>Other Details</b></h2>
     <h6><b>Development Roadmap</b></h6>
                                            <ul class="itemList">
                                                <li>Base of webpage: home, about, portfolio, contact, including socials /</li>
                                                <li>Navigation Page indicators /</li>
                                                <li>Resume Download Link & Contact form functionality /</li>
                                                <li>Transition between pages /</li>
                                                <li>Portfolio page functionality /</li>
                                                <li>Portfolio Content /</li>
                                                <li>Optimization tweaks based on Google's <a href="https://pagespeed.web.dev/">PageSpeed Insights</a></li>
                                                <hr/>
                                                As of 16/9/2023: (*first entry is for mobile, second is for desktop)<br/><br/>
                                                <i>Home:</i><br/>
                                                <img src="images/homePg_16_9_2023.webp" loading="lazy" style="width:70%;"/><br/>
                                                <img src="images/homePg_16_9_2023_desk.webp" loading="lazy" style="width:70%;"/><br/><br/>
                                                <i>About:</i><br/>
                                                <img src="images/aboutPg_16_9_2023.webp" loading="lazy" style="width:70%;"/><br/>
                                                <img src="images/aboutPg_16_9_2023_desk.webp" loading="lazy" style="width:70%;"/><br/><br/>
                                                <i>Portfolio</i><br/>
                                                <img src="images/portfolioPg_2_9_2025.webp" loading="lazy" style="width:70%;"/><br/>
                                                <img src="images/portfolioPg_2_9_2025_desk.webp" loading="lazy" style="width:70%;"/><br/><br/>
                                                <i>Contact:</i><br/>
                                                <img src="images/contactPg_16_9_2023.webp" loading="lazy" style="width:70%;"/><br/>
                                                <img src="images/contactPg_16_9_2023_desk.webp" loading="lazy" style="width:70%;"/><br/><br/>

                                            </ul>
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Slumberous Cat</b></h2>
         <p>“Creative Design and Code”<br><br>

                                                The word cat and the word slumberous together makes basically a sleepy cat,
                                                this is to convey my self identity of being adventurous and curious while simultaneously
                                                poking fun at my constant fatigue spells that happen but I work with it.
                                                The tagline tells whoever visits the portfolio site what I am working with: Design and Code.
                                            </p><br/>
        <h3><b>Brand Story</b></h3>
        <p>The brand centers around exploring the possible designs or code solutions with the client.
                                                As well as showing that I can independently do my own research and gather my own
                                                requirements to do the projects given. The brand would embrace the adventurous and flexible side of a cat.</p>
        </div>


        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Movies Review Website</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/movieReview.webp" loading="lazy" width="50%" style="margin-right:20px;" />
    <img src="images/siteMap8.webp" loading="lazy" width="35%" height="30%" />
  </div>
  <div>
   <p style="margin-top:10px; color:black;">
      The color scheme is a blue shade to bring about a calm feeling.
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
    <span class="colorBox" style="background:#12122e;" data-color="#12122E"></span>
    <span class="colorBox" style="background:#ffffff;" data-color="#FFFFFF"></span>
    <span class="colorBox" style="background:#2a7daa;" data-color="#2A7DAA"></span>
    <span class="colorBox" style="background:#182122;" data-color="#182122"></span>
    </span>
    <br/>
  <p style="color:black;">
  <h2><b>The website</b></h2>
    The website allows registered users to logged their reviews for the movies shown from the mysql database. Users can edit
                                                and delete reviews that they have written. Non registered users can view the webpage and it's contents but cannot add reviews.
                                                <b>*the images shown below are taken on a wider screen different from the image on the display screen.</b>
                                            </p>
   
     <ul class='itemList'>
                                                <li>
                                                    <i>Home page</i><br/>
                                                    <img src="images/movieReviewHome.webp" loading="lazy"  style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/movieReviewHome2.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/movieReviewHome3.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>
                                                <li>
                                                    <i>Login & SignUp</i><br/>
                                                    <img src="images/movieReviewLogin.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/movieReviewSignUp.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>
                                                <li>
                                                    <i>Logged In & Logged Out</i><br/>
                                                    <img src="images/movieReviewLoggedIn.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/movieReviewLoggedOut.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>
                                                <li>
                                                    <i>Movies Page</i><br/>
                                                    <img src="images/movieReviewMovie.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>
                                                <li>
                                                    <i>Movie Info Page</i><br/>
                                                    <img src="images/movieReviewInfo.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>
                                                <li>
                                                    <i>Review Page</i><br/>
                                                    <img src="images/movieReviewReview.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/movieReviewReview2.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>

                                                <li>
                                                    <i>Search Function</i><br/>
                                                    <img src="images/searchFunction.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                    <img src="images/searchFunction2.webp" loading="lazy" style="width:80%;"/>
                                                    <br><br>
                                                </li>

                                                <li>
                                                    <i>Mobile friendly (Bootstrap 5)</i><br/>
                                                    <img src="images/mobileView1.webp" loading="lazy" style="width:40%;"/>
                                                    <br><br>
                                                    <img src="images/mobileView2.webp" loading="lazy" style="width:40%;"/>
                                                    <br><br>
                                                    <img src="images/mobileView3.webp" loading="lazy" style="width:40%;"/>
                                                    <br><br>
                                                    <img src="images/mobileView4.webp" loading="lazy" style="width:40%;"/>
                                                    <br><br>
                                                    <img src="images/mobileView5.webp" loading="lazy" style="width:40%;"/>
                                                    <br><br>
                                                </li>

                                                <li>
                                                    <i>Genre Drop Filter (& it's issues)</i><br/>
                                                    <img src="images/movieReviewGenreDD.webp" loading="lazy" style="width:90%;"/>
                                                    <br><br>
                                                    <img src="images/genreError.webp" loading="lazy" style="width:60%;"/>
                                                    <br><br>
                                                    <img src="images/genreError2.webp" loading="lazy" style="width:90%;"/>
                                                    <br><br>
                                                    <p>If you take note the second image(full genres) and the
                                                        third image(search result) that shows, you can see that
                                                        filtered result although correct, does not contain the full
                                                        list of genres for the movie.<br><br>Before I end this post,
                                                        the area which I felt could be done better was the full reload
                                                        that happens for when the user login in order for the web page
                                                        to detect the changes and reflect the users name and also change
                                                        the login link to log out, at the time when I was doing this project
                                                        I have yet to learn how or even if it is possible to load just certain
                                                        parts of the website, so yes this is the part which I felt I could have
                                                        done better.</p>
                                                </li>

                                            </ul>
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Movies Review Website</b></h2>
        <p>This was a PHP website that utilizes mysql, and is coded with the use of the NetBeans IDE and XAMPP control panel,
                                                I have not found a way to host this website live. So for now I will only be providing screentshots for this entry.
                                                The project spans a few months during the school term, looking back there were some things I could do better and I
                                                found issues as well.</p>
        <br/>
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>CCA Registration System (View on <a href="https://github.com/BlackNet13/C206_CaseStudy" aria-label='see on github' target="_blank">github</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/login.webp" loading="lazy" width="30%" height="20%" style="margin-right:20px;" />
    <img src="images/UCD.webp" loading="lazy" width="40%" height="40%" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
      We were provided a project description for this and have to ensure our system has CRUD
                                                functionality except for update which was written in documentation as the PBI for sprint
                                                2. <br><br>We are also expected to produce the relevant burndown chart, use case diagram, user
                                                stories and documentation required in an agile project. Additionally we also expected
                                                to implement Junit test cases and refactoring.<br/>

                                            <h2><b>Skills/Tools Used</b></h2>
                                            Java, Eclipse, Github for version control, project cloning and merging.<br/>
      
      <h2><b>Features</b></h2>

                                            The features we needed to implement in sprint 1 includes:

                                            <ul class='itemList'>
                                                <li>
                                                    (Role: Admin)<br>
                                                    · Add a new user<br>
                                                    · View all users<br>
                                                    · Delete an existing user<br><br>
                                                </li>
                                                <li>
                                                    (Role: Teacher)<br>
                                                    · Add a new activity / Add a new time slot<br>
                                                    · View all activities / View all time slots<br>
                                                    · Delete an existing activity / Delete an existing time slot<br>
                                                    · View all registrations / View all approval status<br>
                                                    · Add a new approval status<br>
                                                    · Delete an existing registration / Delete an existing approval status<br>
                                                    · Add a new attendance<br>
                                                    · View all attendance<br>
                                                    · Delete an existing attendance<br><br>
                                                </li>
                                                <li>
                                                    (Role: Student)<br>
                                                    · Add a new registration<br>
                                                    · View all activities / View all time slots<br>
                                                    · View all registrations / View all approval status<br>
                                                    · View all attendance<br>
                                                </li>
                                            </ul>
    </p>
    

    <p style="color:black;">
   <h2><b>Other details</b></h2>

                                            <img src="images/UCD.webp" loading="lazy" style="width:40%;"/>
                                            <br><br>

                                            <img src="images/burnDown.webp" loading="lazy" style="width:60%;"/>
                                            <br><br>

                                            <img src="images/login.webp" loading="lazy" style="width:50%;"/>
                                            <br><br>

                                            <img src="images/admin.webp" loading="lazy" style="width:50%;"/>
                                            <br><br>

                                            <img src="images/teacher.webp" loading="lazy" style="width:50%;"/>
                                            <br><br>

                                            <img src="images/student.webp" loading="lazy" style="width:50%;"/>
                                            <br><br>


                                            <h2><b>Lessons Learned</b></h2>
                                            <ul class='itemList'>
                                                <li>
                                                    It was a good idea to establish the flow of the system before beginning
                                                    a group project, I implemented it through the code itself so that members
                                                    could see it the first thing they get into the main code body.<br><br>
                                                </li>
                                                <li>
                                                    Discord pinning function works very well to keep our shared files for documentation
                                                    always available for any team member to access them when needed.<br><br>
                                                </li>
                                                <li>
                                                    Some merge errors when working as a team are better fixed when in person as the error
                                                    consist of code being undone or overwritten by some of the undesired code, I believe
                                                    the difficulty was due to this being our first ever agile project.<br><br>
                                                </li>
                                                <li>
                                                    Junit was tough as when we first implemented the main code, the code was built more
                                                    for user input and thus when doing up the junit we had to modify the code so that
                                                    it have a workaround that can work with both the user input and the junit itself.<br><br>
                                                </li>
                                                <li>
                                                    Reading other members code and understanding it is very important in order for some
                                                    parts of the code to work alongside with other parts of the code<br>
                                                </li>

                                            </ul>
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>CCA Registration System Java Programme (Team)</b></h2>
        <p>This project is suppose to emulate an agile project up to the end of sprint 1.</p>
        <br/>
        <h3><b>Project Task</b></h3>
        <p>Create a system on eclipse that allows 3 different type of users to perform functions
                                                relating to CCA activity registration.</p>
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Patient/Ward Management System (View on <a href="https://github.com/BlackNet13/ward_Management" aria-label='see on github' target="_blank">github</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/main.webp" loading="lazy" width="50%" height="30%" style="margin-left:0;" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
     I was provided the skeleton base with the base loop for the options without any functionality, 
                                                I was also provided some details to include like some mock patient's details and also ward information.<br/>

                                            <h2><b>Skills/Tools Used</b></h2>
                                           Java, Eclipse, Github for version control.<br/>
      
      <h2><b>Features</b></h2>

                                           The features in the final system produced are:

                                            <ol class='itemList'>
                                                <li>View all Ward Info</li>                    
                                                <li>Display Patient List[Extra: added a display for the amount patient owed and have paid]</li>                  
                                                <li>Admit Patient<br>
                                                    - user does this by inputing patient's IC's first four digits,name, ward, bed,date warded, will reject if bed is occupied already/or does not exist(bug found: system does not display proper error msg for bed does not exist)</li>                         
                                                <li>Discharge Patient<br>
                                                    - user does this by inputing patient's IC and Name that matches and exist in the system records,date discharged, system will kick visitors off from visiting and (extra)calculate charges</li>      
                                                <li>Remove Patient<br>
                                                    - user does this by inputing patient's IC and Name and confirming that they want to delete the patient's records(will not delete if patient have not been discharged and paid their dues fully)</li>
                                                <li>Register Visit<br>
                                                    - user does this by inputing patient's IC and Name, number of visitors(cannot exceed max visitors includes existing visitors), visitor's IC and Name(if existing records exist, will be prompted if changes need to be made or continue with existing records.)</li>                        
                                                <li>End Visit<br>
                                                    - user does this by inputing patient's IC and Name along side with the amount of visitor's ending their visit and their IC and Names</li>                          
                                                <li>Display Ward Overview</li>        
                                                <li>Visitor List</li>                
                                                <li>Payment Related[Extra]
                                                    <ul> 
                                                        <li>View Patient's Payables<br>
                                                            - user does this by inputing patient's IC and Name that have existing payment owing</li>
                                                        <li>Make Payment<br>
                                                            - user does this by inputing patient's IC and Name and amount being paid(shows what is the remaining payment owed)</li>
                                                        <li>Overwrite Debt<br>
                                                            - user does this by inputing patient's IC and Name and confirming to overwrite the debt 
                                                            of patient(clears the amount of owing, wont count as patient paying their debt but counts as a bad debt)</li>
                                                        <li>Overview</li>
                                                    </ul>
                                                        
                                                </li>

                                            </ol>
    </p>
    

    <p style="color:black;">
   <h2><b>Other details</b></h2>

                                            <img src="images/main.webp" loading="lazy" style="width:60%;"/>
                                            <br><br>

                                            <img src="images/wardInfo.webp" loading="lazy" style="width:60%;"/>
                                            <br><br>

                                            <img src="images/patientList.webp" loading="lazy" style="width:80%;"/>
                                            <br><br>

                                            <img src="images/wardOverview.webp" loading="lazy" style="width:70%;"/>
                                            <br><br>

                                            <img src="images/visitorList.webp" loading="lazy" style="width:70%;"/>
                                            <br><br>
                                            
                                            <img src="images/paymentOverview.webp" loading="lazy" style="width:70%;"/>
                                            <br><br>


                                            <h2><b>Lessons Learned</b></h2>
                                             <ul class='itemList'>
                                                <li>
                                                    It was a good experience to comment each section so that you know which section of the code is for what.<br><br>
                                                </li>
                                                <li>
                                                    It was also a good experience to experiment and add new features as I was allowed free range on the design and the add on functionality <br><br>
                                                </li>
                                            </ul>
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Patient/Ward Management System</b></h2>
        <p>Create a system on eclipse that allows that user to view all ward/patient information, 
                                                admit/discharge/remove patient, register and end visits, I have added payment related functions too.</p>
        <br/>
        </div>

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Movie List App (View on <a href="https://github.com/BlackNet13/moreMoviesLesson12" aria-label='see on github' target="_blank">github</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/app9.webp" loading="lazy" width="50%" height="30%" style="margin-left:0;" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
     The project spans across 2 lessons and has the following tasks:

                                            <ul class='itemList'>
                                                <li>
                                                    create an app that can store data for movies
                                                </li>
                                                <li>
                                                    add dialog box for deletion and cancellation
                                                </li>
                                            </ul><br/>

                                            <h2><b>Skills/Tools Used</b></h2>
                                           Java, Android Studio, Illustrator(creation of the splash screen icons),
                                                <a href="https://www.android-arsenal.com/details/1/7959#!description" target="_blank">Android Arsenal-Material Dialog</a><br/>
      
      <h2><b>Features</b></h2>

                                            <ul class='itemList'>
                                                <li>
                                                    Record movie details and store them locally using SQLite <br><br>
                                                </li>
                                                <li>
                                                    Retrieve and display image from the internet based on the link stored(Enhancement)<br><br>
                                                </li>
                                                <li>
                                                    Allow user to filter out the movie stored in the list based on the Rating<br><br>
                                                </li>
                                                <li>
                                                    Selecting the movie item will allow user to edit/delete the record for that item<br><br>
                                                </li>
                                            </ul>
    </p>
    

    <p style="color:black;">
   <h2><b>Other details</b></h2>

                                           Splash Screen(Enhancement) | User Input, Takes in image links(Enhancement)<br/>
                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/093e3deb-7b80-4790-94a4-23d7dff55d3c" loading="lazy" height ="500">
                                            
                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/6c6a8ac1-04aa-4c7d-a92f-1c3d2b5812ef" loading="lazy" height = "500"><br><br>

                                            Show Movie List, Display Movie Image(Enhancement) |  Filter based on rating<br/>
                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/bdbcb1d1-9155-47fa-839b-3ccc1334fd88" loading="lazy" height ="500">

                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/8e007375-ee52-41d9-a628-d487f905ec66" loading="lazy" height = "500"><br><br>

                                            On selecting of movie list item brings you to the edit page | Confirmation screen for deletion<br/>
                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/fce22497-a207-4d31-9152-e608d583e5ba" loading="lazy" height = "500">

                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/880428b1-f0b8-474e-93d8-f686e6e8922f" loading="lazy" height = "500"><br><br>

                                            Confirmation screen for cancellation<br/>
                                            <img src="https://github.com/BlackNet13/moreMoviesLesson12/assets/123053395/4126fde0-4bb6-4e48-b1a0-1dea68658394" loading="lazy" height = "500"><br><br>


                                            <h2><b>Lessons Learned</b></h2>
                                              <p>It was my first time dealing with dialog boxes but our lecturer mention
                                                that we can try and implement custom material dialog boxes from android arsenal
                                                if we wanted to challenge ourselves, so I give it a shot.<br><br> It was a small struggle
                                                at first to implement it but I manage to overcome it by patiently studying the
                                                documentation for the android arsenal dialog box. Another which I learn from
                                                doing this project was doing the splash screen that has a simple animation.</p>
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Movie List Android App</b></h2>
        <p>This was one of the notable projects that has CRUD in it.
                                                There was also quite abit of enhancement done to the project.</p>
        <br/>
        </div>

    </div>`;

    case 'otherWrkBtn1':
      return `<div style="
      overflow-y: auto;
      padding: 0; margin:10px;
      height: 75vh;
    ">
      <h2>Others</h2>
      <p>Here are my other works</p>
      <br>
      <div class="clearfix">
        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Diners Website Design (View on <a href="https://xd.adobe.com/view/b0b34507-7a51-4013-9ac6-eb8e2a6f7c48-e5e0/" aria-label='see on adobe xd' target="_blank">Adobe XD</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/web1.webp" width="40%" style="margin-right:20px;" />
    <img src="images/siteMap1.webp" width="45%" />
  </div>
  <div>
    <p style="margin-top:10px; color:black;">
      The color scheme is split complementary which consist of blue and green to reflect
      the freshness the brand aims to provide, the orange and yellow gives touches of
      warmth, enthusiasm to the visual identity
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#009688;" data-color="#009688"></span>
    <span class="colorBox" style="background:#FF9800;" data-color="#FF9800"></span>
    <span class="colorBox" style="background:#FFC107;" data-color="#FFC107"></span>
    <span class="colorBox" style="background:#153243;" data-color="#153243"></span>
    <span class="colorBox" style="background:#284B63;" data-color="#284B63"></span>
    </span>
    <br/>
    <p style="color:black;">
    The typography chosen appeals to their target audience which consist of
                                                mostly women therefore a cursive style can frame the brand as something
                                                more delicate and feminine. There are errors at the time of creating the gif with the cart page as shown below
                                            </p>
    <img src="images/typography1.webp" width="45%" style="margin-right:20px;" />
    <img src="images/Diners.gif" width="45%" />
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>Diners</b></h2>
        <p>"Healthy meals made easier" is the tagline for the placeholder brand call Diners, the image seen is what the customer's of this brand will see on the website when they first enter.</p>
        <br/>
        <h3><b>Brand Story</b></h3>
        <p>This placeholder brand was build around providing nourishing healthy options to the common public. Their menu ranges from bento boxes that consist of lean proteins, vibrant vegetables that are paired with rice or soba, to acai bowls and kombucha drinks. They source their ingredients from local and foreign farms.</p>
        </div>


        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>'Gucci' Magazine Spread</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/mag2.webp" width="45%" style="margin-right:20px;" />
    <img src="images/moodboard2.webp" width="55%" />
  </div>
  <div>
  <p style="color:black;">
    During the research, the mood board is primarily focus on how other
                                                photographers capture a certain look and what the end goal of the
                                                magazine spread should carry in it's looks.
                                            </p>
    <p style="margin-top:10px; color:black;">
      The color scheme makes use of grey scale and color to make the subject pop
    </p>
    <span style="justify-content:center; display:flex; margin-top:10px;">
     <span class="colorBox" style="background:#3F5A3D;" data-color="#3F5A3D"></span>
    <span class="colorBox" style="background:#FF9800;" data-color="#FF9800"></span>
    <span class="colorBox" style="background:#4E554E;" data-color="#4E554E"></span>
    <span class="colorBox" style="background:#153243;" data-color="#153243"></span>
    <span class="colorBox" style="background:#D3B59E;" data-color="#D3B59E"></span>
    </span>
    <br/>
    
    
  </div>
  </div> 


        <div class="box4" style="background-color:#ccc;">
        <h2><b>'Gucci' Magazine</b></h2>
        <p>"This is a mockup of a fashion magazine spread but it has no real
                                                relation to the actual brand GUCCI except for the look of the
                                                Gucci name.</p>
        <br/>
        <h3><b>Other details</b></h3>
        <p>The focus is on minimalistic design to give it a posh look. Lesser words more
                                                focus on the overall feeling of the design. The fake overlay of color lighting
                                                make it look like it is done in a photoshoot, the overlaid shadow adds to the
                                                realism of the surroundings.</p>
        </div>

    </div>`;

    default:
      return `<p>No content found for this section.</p>`;
  }
}


