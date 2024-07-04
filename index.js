const picturesWrapperEl = document.querySelector("div.pictures-wrapper");
const arrowLeftEl = picturesWrapperEl.querySelector("img.arrow.left");
const arrowRightEl = picturesWrapperEl.querySelector("img.arrow.right");
const picturesShowWrapperEl = picturesWrapperEl.querySelector(
  ".pictures-show-wrapper"
);
const pictureShowEls = picturesShowWrapperEl.querySelectorAll("img.show");
const dotsWrapperEl = document.querySelector("div.dots-wrapper");

const intervalIdStorage = [];
const firstImageEl = pictureShowEls[0];
const lastImageEl = pictureShowEls[pictureShowEls.length - 1];
let activeDotIndex = 0;
const time = 3000;

dotsHandler(pictureShowEls);
const dotEls = document.querySelectorAll("div.dots-wrapper div.circle");

for (let i = 0; i < dotEls.length; i++) {
  dotEls[i].addEventListener("click", function (e) {
    stopSlideshow();
    dotEls.forEach((dot) => {
      dot.classList.remove("active");
    });
    pictureShowEls.forEach((picture) => {
      picture.classList.remove("central_image");
      picture.classList.add("invisible");
    });
    activeDotIndex = i;
    dotEls[i].classList.add("active");
    pictureShowEls[i].classList.add("central_image");
    pictureShowEls[i].classList.remove("invisible");
    endlessSlideshow();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  dotEls[0].classList.add("active");
  endlessSlideshow(pictureShowEls);
});

arrowRightEl.addEventListener("click", function (e) {
  stopSlideshow();
  showOneImage();
  endlessSlideshow();
});

arrowLeftEl.addEventListener("click", function (e) {
  stopSlideshow();
  pictureShowEls[activeDotIndex].classList.add("invisible");
  pictureShowEls[activeDotIndex].classList.remove("central_image");
  dotEls[activeDotIndex].classList.remove("active");
  if (activeDotIndex >= 1) {
    pictureShowEls[activeDotIndex - 1].classList.add("central_image");
    pictureShowEls[activeDotIndex - 1].classList.remove("invisible");
    activeDotIndex -= 1;
  } else {
    lastImageEl.classList.add("central_image");
    lastImageEl.classList.remove("invisible");
    activeDotIndex = pictureShowEls.length - 1;
  }
  dotEls[activeDotIndex].classList.add("active");
  endlessSlideshow();
});

function showOneImage() {
  const currentImageEl = document.querySelector("img.central_image");

  if (currentImageEl !== lastImageEl) {
    currentImageEl.classList.remove("central_image");
    currentImageEl.classList.add("invisible");
    currentImageEl.nextElementSibling.classList.add("central_image");
    currentImageEl.nextElementSibling.classList.remove("invisible");
    dotEls[activeDotIndex].classList.remove("active");
    dotEls[activeDotIndex + 1].classList.add("active");
    activeDotIndex += 1;
  } else {
    currentImageEl.classList.remove("central_image");
    currentImageEl.classList.add("invisible");
    firstImageEl.classList.add("central_image");
    firstImageEl.classList.remove("invisible");
    dotEls[pictureShowEls.length - 1].classList.remove("active");
    dotEls[0].classList.add("active");
    activeDotIndex = 0;
  }
}

function endlessSlideshow() {
  const intervalId = setInterval(showOneImage, time);
  intervalIdStorage.splice(0, 1);
  intervalIdStorage.push(intervalId);
}

function stopSlideshow() {
  clearInterval(intervalIdStorage[0]);
}

function dotsHandler(array) {
  for (let i = 0; i < array.length; i++) {
    newDot = document.createElement("div");
    newDot.classList.add("circle");
    dotsWrapperEl.append(newDot);
  }
}
