/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener('DOMContentLoaded', function (event) {


    var logoLink = document.getElementById("logoLink");

    logoLink.addEventListener('click', function (event) {
        event.preventDefault();
        var href = "index.html";
        showTransitionBars(href);
    });



    window.goTo = function (event) {
        event.preventDefault(); // Prevent the default link behavior
        var href = event.target.getAttribute('href'); // Get the href attribute value

        // Hide the body content with an opacity transition
        document.getElementById("hero").style.transition = 'opacity 0.5s ease-in-out';
        document.getElementById("hero").style.opacity = 0;
        document.getElementById("transitionHolder").style.display = 'block';

        // Delay the navigation after the opacity transition completes
        setTimeout(function () {
            showTransitionBars(href); // Show the transition bars after opacity transition
        }, 500);
    };


    // Show the body content with an opacity transition when the page loads
    document.getElementById("hero").style.transition = 'opacity 0.5s ease-in-out';
    document.getElementById("hero").style.opacity = 1;


// Add click event listeners to all <a> elements
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            // Prevent the default link behavior and then trigger the transition bars animation
            event.preventDefault();
            window.goTo(event); // Call the goTo function
        });
    }

    function showTransitionBars(href) {
        const transitionBars = document.querySelectorAll('.transition-bars');

        // Loop through each transition bar and show them with a delay
        transitionBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.display = 'block'; // Set display to 'block'
            }, index * 800); // Delay each bar by 800 milliseconds
        });

        // Calculate the total duration of all bars
        const totalDuration = transitionBars.length * 800;

        // Simulate a delay before navigating to the specified href
        setTimeout(() => {
            window.location.href = href;
        }, totalDuration);
    }




});

/*-------------*/

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("col-md-4");
    if (c == "all") {
        c = "";
    }
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1)
            w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("subNavBox");
var btns = btnContainer.getElementsByClassName("subNav");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

/*---------------*/
/*var contents = document.getElementsByClassName("content");
 var modal = document.getElementById("myModal");
 var body = document.body;
 var span = document.getElementsByClassName("close")[0];
 var showModal = function () {
 modal.style.display = "block";
 body.classList.add('modal-open'); 
 };
 for (var i = 0; i < contents.length; i++) {
 contents[i].addEventListener('click', showModal, false);
 }
 
 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
 modal.style.display = "none";
 body.classList.remove('modal-open');
 };
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
 if (event.target == modal) {
 modal.style.display = "none";
 body.classList.remove('modal-open');
 }
 };*/

function toggleModal(modal, open) {
    modal.style.display = open ? "block" : "none";
    document.body.classList.toggle('modal-open', open);
}


// Function to handle clicks outside the modal
function outBoundaryClick(event, modal) {
    if (event.target === modal) {
        toggleModal(modal, false);
    }
}


// Select all elements with the data-modal attribute
const buttons = document.querySelectorAll('[data-modal]');

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        toggleModal(modal, true);
    });
});


// Select all elements with the class "close"
const spans = document.querySelectorAll('.close');

spans.forEach(span => {
    span.addEventListener("click", () => {
        const modalId = span.closest('.modal').getAttribute('id');
        const modal = document.getElementById(modalId);
        toggleModal(modal, false);
    });
});

window.addEventListener("click", (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        outBoundaryClick(event, modal);
    });
});







