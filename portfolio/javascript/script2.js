AFRAME.registerComponent('link-handler', {
  init: function () {
    this.el.addEventListener('click', () => {
      const id = this.el.id;

      if (!id) {
        console.warn('Clicked element has no ID:', this.el);
        return;
      }

      switch (id) {
        case 'txt':
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
    targetEl = document.querySelector('.rm2');
    enabledFlicker = false;
    stopSlideshow();
  }

  document.querySelectorAll('.lght').forEach(light => {
  light.setAttribute('flicker-light', 'enabled', enabledFlicker);
});


   light.setAttribute('light', 'color', color);

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
      return `<h2>Portfolio History</h2><p>This is a history of the portfolio and how it evolved over time...</p>`;
    case 'otherWkBtn':
      return `<h2>Other Content</h2><p>Something else goes here.</p>`;
    default:
      return `<p>No content found for this section.</p>`;
  }
}

