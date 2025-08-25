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
  showDialogue("Click here to view my design works, currently work in progress");
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
  showDialogue("Click here to view my code works, currently work in progress");
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

        <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Auti-learners App Prototype (View on <a href="https://xd.adobe.com/view/7deece64-621a-4427-b895-3aa27bf001f3-28bd/" aria-label='see on adobe xd' target="_blank">Adobe XD</a>)</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/app3.webp" width="40%" style="margin-right:20px;" />
    <img src="images/siteMap3.webp" width="45%" />
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
    
    <img src="images/auti.gif" width="35%" style="margin: 0 35%" />
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
    <img src="images/mag4.webp" width="55%" style="margin-right:20px;" />
    <img src="images/moodboard4.webp" width="45%" />
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
    <img src="images/poster5.webp" width="55%" style="margin-right:20px;" />
    <img src="images/moodboard5.webp" width="45%" />
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
    <img src="images/poster5_big.webp" width="35%" style="margin: 0 35%" />
    
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


         <div style="float:left; height:40px; width:95%; background:orange;"><p style="padding-left:10px;"><b>Ocean Themed Portfolio</b></p></div><br/>

        <div class="box3" style="background-color:#bbb;justify-content:center; margin-top: 1%;">
        <div style="display:flex; justify-content:center; margin-bottom: 20px;">
    <img src="images/mobile6.webp" width="40%" style="margin-right:20px;" />
    <img src="images/type6.webp" width="60%" />
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
     
    <img src="images/siteMap6.webp" width="45%" style="margin: 0 30%" />
    
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
    <img src="images/scootApp.webp" width="50%" style="margin-right:20px;" />
    <img src="images/teamLogo.webp" width="25%" height="20%" style="margin-top:20px;" />
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

    <img src="images/font7.webp" width="45%" style="margin-left:30%;" />
    <br/>
    <br/><hr/>
     <p style="color:black;">
    <h4>This is the challenge that this team assignment was based on:</h4>
                                            </p>
    <img src="images/appChallenge.webp" width="65%" style="margin-right:20px;" />

    <p style="color:black;">
    <h4>Our team's focus was on this aspect of the challenge(*you can download the info kit at the top of this section):</h4>
                                            </p>
    <img src="images/ourFocus.webp" width="75%" />

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
                                            <img src="images/scoot.gif" width="25%" style="margin-left:35%;" />
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
    <img src="images/covid19Poster.webp" width="55%" style="margin-left:5%;" />
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
    default:
      return `<p>No content found for this section.</p>`;
  }
}


