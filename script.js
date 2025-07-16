// script.js

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsNav = document.querySelector(".carousel-nav");

  let currentIndex = 0;
  let autoSlideInterval;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsNav.querySelectorAll(".carousel-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function moveToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function slideNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function slidePrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideNext, 5000);
  }

  nextBtn.addEventListener("click", () => {
    slideNext();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    slidePrev();
    resetAutoSlide();
  });

  dotsNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("carousel-dot")) {
      const index = Array.from(dotsNav.children).indexOf(e.target);
      moveToSlide(index);
      resetAutoSlide();
    }
  });

  // Setup dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  });

  // Initial setup
  updateCarousel();
  autoSlideInterval = setInterval(slideNext, 5000);

  // Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });
  });
  
  //fetch for form
  const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    data: {
      name: formData.get("data[name]"),
      email: formData.get("data[email]"),
      message: formData.get("data[message]"),
    },
  };

  fetch("/.netlify/functions/submit-form", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})

    .then((response) => {
      if (response.ok) {
        window.location.href = "thankyou.html";
      } else {
        alert("There was a problem submitting your message. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error. Please try again later.");
    });
});

});
