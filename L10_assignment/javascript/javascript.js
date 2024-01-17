document.addEventListener("DOMContentLoaded", function () {
  // Initialize Tippy.js for each SVG element

  tippy("#pt1", {
    content:
      '<p><b>Bedok Polyclinic</b><i class="float">Tel: 6343 1121</i><br>11 Bedok North Street 1 Heartbeat@Bedok #02-01, #03-01, Singapore 469662<br></p>',
    allowHTML: true,
  });

  tippy("#pt2", {
    content:
      '<p><b>Bukit Batok Polyclinic</b><i class="float">Tel: 6343 1122</i><br>50 Bukit Batok West Avenue 3, Singapore 659164<br></p>',
    allowHTML: true,
  });

  tippy("#pt3", {
    content:
      '<p><b>Bukit Merah Polyclinic</b><i class="float">Tel: 6343 1123</i><br>162 Bukit Merah Central Level 4, Singapore 150163<br></p>',
    allowHTML: true,
  });

  tippy("#pt4", {
    content:
      '<p><b>Choa Chu Kang Polyclinic</b><i class="float">Tel: 6343 1124</i><br>2 Teck Whye Crescent, Singapore 688846<br></p>',
    allowHTML: true,
  });

  tippy("#pt5", {
    content:
      '<p><b>Clementi Polyclinic</b><i class="float">Tel: 6343 1125</i><br>451 Clementi Avenue 3, Singapore 120451<br></p>',
    allowHTML: true,
  });
  tippy("#pt6", {
    content:
      '<p><b>Geylang Polyclinic</b><i class="float">Tel: 6343 1126</i><br>21 Geylang East Central, Singapore 389707<br></p>',
    allowHTML: true,
  });
  tippy("#pt7", {
    content:
      '<p><b>Hougang Polyclinic</b><i class="float">Tel: 6765 1121</i><br>89 Hougang Avenue 4, Singapore 538829<br></p>',
    allowHTML: true,
  });
  tippy("#pt8", {
    content:
      '<p><b>Jurong Polyclinic</b><i class="float">Tel: 6765 1122</i><br>190 Jurong East Avenue 1, Singapore 609788<br></p>',
    allowHTML: true,
  });
  tippy("#pt9", {
    content:
      '<p><b>Marine Parade Polyclinic</b><i class="float">Tel: 6765 1123</i><br>80 Marine Parade Central, Singapore 440080<br></p>',
    allowHTML: true,
  });
  tippy("#pt10", {
    content:
      '<p><b>Outram Polyclinic</b><i class="float">Tel: 6765 1124</i><br>3 Second Hospital Avenue, #02-00 Health Promotion Board Building, Singapore 168937<br></p>',
    allowHTML: true,
  });
  tippy("#pt11", {
    content:
      '<p><b>Pasir Ris Polyclinic</b><i class="float">Tel: 6765 1125</i><br>1 Pasir Ris Drive 4, Singapore 519457<br></p>',
    allowHTML: true,
  });
  tippy("#pt12", {
    content:
      '<p><b>Pioneer Polyclinic</b><i class="float">Tel: 6765 1126</i><br>26 Jurong West Street 61, Singapore 648201<br></p>',
    allowHTML: true,
  });
});

$(document).ready(function () {
  $("#fullpage").fullpage({
    sectionsColor: ["#03A9F4", "#2ECC71", "#00BCD4"],
    navigation: true,
    navigationPosition: "right",
    anchors: ["section1", "section2", "section3"],
    afterLoad: function (origin, destination, direction) {
      if (destination.index === 0) {
        const items = document.querySelectorAll(".itemStagger li");
        items.forEach((item) => {
          item.style.opacity = 0;
        });

        anime({
          targets: items,
          opacity: 1,
          duration: 500,
          translateX: -10,
          delay: anime.stagger(600),
          easing: "easeInOutQuad",
        });
      } else if (destination.index === 1) {
        const items2 = document.querySelectorAll(".itemStagger li");
        items2.forEach((item) => {
          item.style.opacity = 0;
        });

        anime({
          targets: items2,
          opacity: 1,
          duration: 500,
          translateX: -10,
          delay: anime.stagger(600),
          easing: "easeInOutQuad",
        });
      }
    },
  });

  var title = document.getElementById("title");

  // Wrap each character in a span
  title.innerHTML = title.innerText
    .split("")
    .map(function (char) {
      return "<span>" + char + "</span>";
    })
    .join("");

  // Use anime.js for the animation
  anime.timeline({ loop: false }).add({
    targets: "#title span",
    translateY: ["50px", 0],
    opacity: [0, 1],
    easing: "easeInOutQuad",
    delay: function (el, i) {
      return i * 50;
    },
  });

  const counter1 = document.getElementById("counter1");
  const counter2 = document.getElementById("counter2");
  const counter3 = document.getElementById("counter3");

  const targetNumber1 = 257510;
  const targetNumber2 = 1365;
  const targetNumber3 = 678;

  anime({
    targets: counter1,
    innerHTML: [0, targetNumber1],
    round: 1, // Round numbers to whole integers
    easing: "linear", // Use linear easing for a consistent counting speed
    duration: 3000, // Adjust the duration (in milliseconds) for the counting animation
  });

  anime({
    targets: counter2,
    innerHTML: [0, targetNumber2],
    round: 1, // Round numbers to whole integers
    easing: "linear", // Use linear easing for a consistent counting speed
    duration: 3000, // Adjust the duration (in milliseconds) for the counting animation
  });

  anime({
    targets: counter3,
    innerHTML: [0, targetNumber3],
    round: 1, // Round numbers to whole integers
    easing: "linear", // Use linear easing for a consistent counting speed
    duration: 3000, // Adjust the duration (in milliseconds) for the counting animation
  });

  /*-table-*/
  $("#tbl").DataTable({
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, "All"],
    ],
    responsive: true,
    buttons: ["colvis"],
  });

  /*chart-*/

  const labels = [
    "1 Dec 2021",
    "2 Dec 2021",
    "3 Dec 2021",
    "4 Dec 2021",
    "5 Dec 2021",
    "6 Dec 2021",
    "7 Dec 2021",
    "8 Dec 2021",
    "9 Dec 2021",
    "10 Dec 2021",
    "11 Dec 2021",
    "12 Dec 2021",
    "13 Dec 2021",
    "14 Dec 2021",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "No of cases",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(50, 99, 132)",
          "rgb(54, 60, 100)",
        ],
        borderColor: "rgb(255, 99, 132)",
        data: [
          1134, 1056, 986, 771, 756, 721, 654, 742, 689, 512, 455, 376, 244,
          103,
        ],
        responsive: true,
      },
    ],
  };

  const config = { type: "bar", data: data };

  const chart = new Chart(document.getElementById("chart"), config);
});

document.addEventListener("DOMContentLoaded", function () {
  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var container = d3.select("#visualization-container");

  container.style("display", "flex").style("flex-wrap", "wrap"); // Set flex-wrap property here

  container
    .selectAll(".human-figure")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "human-figure")
    .style("width", "100px")
    .style("height", "100px")
    .style("opacity", 0) // Set initial opacity to 0
    .html(function (d, i) {
      var svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-standing" viewBox="0 0 16 16">
              <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0"/>
          </svg>`;

      var fillColor = i === 9 ? "red" : "blue"; // i is zero-based index
      svgContent = svgContent.replace(
        'fill="currentColor"',
        'fill="' + fillColor + '"'
      );

      return svgContent;
    })
    .style("margin-right", function (d, i) {
      return i % 4 !== 3 ? "20px" : "0"; // Add margin to all figures except the last one in each row
    })
    .append("br"); // Append a <br> after each figure

  // Use anime.js for the fade-in animation
  anime.timeline({ loop: false }).add({
    targets: ".human-figure",
    opacity: 1,
    duration: 1000,
    delay: anime.stagger(100, { start: 200 }), // Adjust the delay for the desired stagger effect
  });
});
