// Select eyes and pupils
const eyes = document.querySelectorAll(".eye");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Track mouse only when email input is focused
let followMouse = true;

// Mouse movement event
document.addEventListener("mousemove", (event) => {
  if (!followMouse) return; // ignore mouse if password input is focused

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");

    // Eye center coordinates
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    // Angle between eye center and mouse
    const dx = mouseX - eyeCenterX;
    const dy = mouseY - eyeCenterY;

    const radius = 20; // max pupil movement
    const angle = Math.atan2(dy, dx);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Email input focused → pupils follow cursor
emailInput.addEventListener("focus", () => {
  followMouse = true;
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    pupil.style.display = "block"; // show pupils
    pupil.style.transform = "translate(0, 0)";

    // Restore eye shape
    eye.style.height = "80px";
    eye.style.borderRadius = "50%";
  });
});

// Password input focused → eyes look left
passwordInput.addEventListener("focus", () => {
  followMouse = false;

  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    pupil.style.display = "block"; // keep pupils visible

    // Move pupils left
    pupil.style.transform = `translate(-20px, 0)`; // 20px left
  });
});

// Reset when password loses focus
passwordInput.addEventListener("blur", () => {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    pupil.style.display = "block";
    pupil.style.transform = "translate(0, 0)"; // reset to center

    // Restore eye shape
    eye.style.height = "80px";
    eye.style.borderRadius = "50%";
  });
});
