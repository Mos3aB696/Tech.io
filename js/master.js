/** Start User Options */
// Check If There's Color On Local Storge Or Not
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Remove Active Class From All Lis
  document.querySelectorAll(".color-list li").forEach((ele) => {
    ele.classList.remove("active");
    // Add Active Class On Current Color On Local Storage
    if (mainColor == ele.dataset.color) {
      ele.classList.add("active");
    }
  });
}

// Setting Changes
document.querySelector(".toggle-setting .icon").onclick = function () {
  // Toggle Spin Class On Icon
  this.classList.toggle("fa-spin");
  // Toggle open Class On Setting-box
  document.querySelector(".setting-box").classList.toggle("open");
};
// Color Changes
let colorLis = document.querySelectorAll(".color-list li");
colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Change Color On root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove Active Class Form All Lis And Add It To Target Element
    handleActive(e);
  });
});
// Control Randomize
let randomImg = true;
let backgroundInterval;

// Check If There's Random Option In Local Storage Or Not
let randomBackground = localStorage.getItem("random_background");

if (randomBackground !== null) {
  // Typeof randomBackground Is String !!!!!!!
  if (randomBackground === "true") {
    randomImg = true;
  } else {
    randomImg = false;
  }

  // Make Loop On All Options
  document.querySelectorAll(".random-container span").forEach((ele) => {
    // Remove Active Class From All Spans
    ele.classList.remove("active");
    if (randomBackground == ele.dataset.background) {
      ele.classList.add("active");
    }
  });
}
// Random Background
let randomBackgroundSpan = document.querySelectorAll(".random-container span");
randomBackgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove Active Class From All And Add It On The Target Element
    handleActive(e);
    // Check Dataset And Trigger randomizImgs Function
    if (e.target.dataset.background === "true") {
      randomImg = true;
      randomizeImgs();
    } else {
      randomImg = false;
      clearInterval(backgroundInterval);
    }
    // Set Random Image In Local Storage
    localStorage.setItem("random_background", e.target.dataset.background);
  });
});
// Show Bullets
let spanBullets = document.querySelectorAll(".show-container span");
let theBullets = document.querySelector(".nav-bullets");
let shwoBullets = localStorage.getItem("show_bullets");
if (shwoBullets !== null) {
  spanBullets.forEach((span) => {
    span.classList.remove("active");
  });
  if (shwoBullets === "block") {
    theBullets.style.display = "block";
    document.querySelector(".show-container .yes").classList.add("active");
  } else {
    theBullets.style.display = "none";
    document.querySelector(".show-container .no").classList.add("active");
  }
}

spanBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    if (e.target.dataset.display == "yes") {
      theBullets.style.display = "block";
      localStorage.setItem("show_bullets", "block");
    } else {
      theBullets.style.display = "none";
      localStorage.setItem("show_bullets", "none");
    }
    // Remove Class Active From All Spans And Add It For The Target Element
    handleActive(e);
  });
});
// Reset Options
document.querySelector(".reset-button").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
/** End User Options */
/** Start Nav Bullets */
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // Go To The Sections
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
/** End Nav Bullets */
/** Start toggle-menu */
let toggleMenu = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");
toggleMenu.onclick = function (e) {
  //Propagation means bubbling up to parent elements or capturing down to child elements.
  e.stopPropagation();
  this.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
};
// Make Event To Click Out Side Of The Toggle Menu To Close It
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== theLinks) {
    toggleMenu.classList.remove("menu-active");
    theLinks.classList.remove("open");
  }
});
// Stop Propagation From Links
theLinks.onclick = function (e) {
  e.stopPropagation();
};

/** End toggle-menu */
/** Start Landing Page */

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
let imagesArr = [
  "01.jpg",
  "02.jpg",
  "04.jpg",
  "05.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];

function randomizeImgs() {
  if (randomImg === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Image
      let randomImage = Math.floor(Math.random() * imagesArr.length);
      landingPage.style.backgroundImage = ` url(imgs/${imagesArr[randomImage]}) `;
    }, 10000);
  }
}
randomizeImgs();
/** End Landing Page */
/** Start Our Skills */
let aboutSection = document.querySelector(".about-us");
let goUpButton = document.querySelector("a.up");

/** Start Go Up */
let skillSection = document.querySelector(".our-skills");
let theProg = document.querySelectorAll(".progress span");
// onscroll function
window.onscroll = function () {
  if (window.scrollY >= skillSection.offsetTop - 200) {
    theProg.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  if (window.scrollY >= aboutSection.offsetTop - 250) {
    goUpButton.style.display = "block";
  } else {
    goUpButton.style.display = "none";
  }
};
/** End Go Up  */
/** End Our Skills */
/** Start Gallery */
let ourGallery = document.querySelectorAll(".imgs-container img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Popup
    let overlayPopup = document.createElement("div");
    overlayPopup.className = "overlay-popup";
    document.body.appendChild(overlayPopup);
    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    //Check If There's ALT Or Not
    if (img.alt !== "") {
      let imgHeading = document.createElement("h3");
      let headingText = document.createTextNode(img.alt);
      imgHeading.appendChild(headingText);
      // Appending imgHeading On Popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create Image Popup
    let imagePopup = document.createElement("img");
    imagePopup.className = "image-popup";
    // Set Image Source
    imagePopup.src = img.src;
    // Appending imagePopup On popupBox
    popupBox.appendChild(imagePopup);
    // Appending popupBox On Body
    document.body.appendChild(popupBox);
    // Create Close Button
    let closeButton = document.createElement("span");
    let closeContent = document.createTextNode("X");
    closeButton.className = "close-button";
    closeButton.appendChild(closeContent);
    // Appending closeButton On Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Click On Close Button
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".overlay-popup").remove();
  }
});
/** End Gallery */
// handleActive Function
function handleActive(event) {
  // Remove Class Active From All Spans And Add It For The Target Element
  event.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  event.target.classList.add("active");
}
