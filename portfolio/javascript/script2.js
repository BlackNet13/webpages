AFRAME.registerComponent('link-handler', {
  init: function () {
    this.el.addEventListener('click', () => {
      // Try to find any child entity with an ID (text or otherwise)
      const targetE1 = this.el.querySelector('[id]');

      if (!targetE1) {
        console.warn('No target with ID found inside:', this.el);
        return;
      }

      const id = targetE1.id;

      switch (id) {
        case 'txt':
          resetRoom();
          break;
        case 'resume':
          openModal();
          console.log('Resume button clicked');
          
          break;
        case 'go-to-about':
          rotateRoom(90);
          break;
        default:
          console.log('No action defined for:', id);
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

      function updateLights(yRot) {
  // Normalize rotation to 0-360
  yRot = (yRot + 360) % 360;

  // Get your lights
  const light = document.getElementById('light');
  let color = '#2c7ac1'; // Default color 
  let targetEl = '.rm1';


  // Depending on the cube rotation, enable the light for the facing side, #2c7ac1 red, pink, green
  if (yRot >= 315 || yRot < 45) {
    color = '#2c7ac1'; // Default color
    targetEl = document.querySelector('.rm1');
    startSlideshow();
  } else if (yRot >= 45 && yRot < 135) {
   color = 'green'; 
    targetEl = document.querySelector('.rm4');
    stopSlideshow();
  } else if (yRot >= 135 && yRot < 225) {
    color = 'red'; 
    targetEl = document.querySelector('.rm3');
    stopSlideshow();
  } else if (yRot >= 225 && yRot < 315) {
    color = 'pink';
    targetEl = document.querySelector('.rm2');
    stopSlideshow();
  }

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

function openModal() {
    document.getElementById('pdfModal').style.display = 'flex';
    // Lazy load PDF only when modal is opened
    if (!document.getElementById('pdfIframe')) {
      const iframe = document.createElement('iframe');
      iframe.id = 'pdfIframe';
      iframe.src = 'file/Yvonne_Resume_V25.pdf#toolbar=0&navpanes=0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      document.getElementById('pdfContainer').appendChild(iframe);
    }
  }

  function closeModal() {
    document.getElementById('pdfModal').style.display = 'none';
    // Optional: remove iframe to free memory
    // document.getElementById('pdfContainer').innerHTML = '';
  }