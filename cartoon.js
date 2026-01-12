// Select cartoon and eyes
const cartoon = document.querySelector('.cartoon');
const eyes = document.querySelectorAll(".eye");
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

let followMouse = true; // Track if pupils follow the mouse
const pupilMaxMove = 15; // max distance pupil can move inside eye

// Pupils follow mouse when allowed
document.addEventListener("mousemove", (event) => {
  if (!followMouse) return;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = mouseX - eyeCenterX;
    const dy = mouseY - eyeCenterY;

    const angle = Math.atan2(dy, dx);
    const x = pupilMaxMove * Math.cos(angle);
    const y = pupilMaxMove * Math.sin(angle);

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Function to reset pupils to center
function resetPupils() {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    pupil.style.transform = "translate(0, 0)";
  });
}

// Input focus → stop animations + adjust pupils
function handleFocus(isEmail) {
  followMouse = isEmail; // pupils follow only if email input
  cartoon.classList.add('stop-running'); // stops body, arms, legs
  cartoon.classList.toggle('email-focused', isEmail);
  cartoon.classList.toggle('password-focused', !isEmail);

  if (!isEmail) {
    // password → pupils look left
    eyes.forEach((eye) => {
      const pupil = eye.querySelector(".pupil");
      pupil.style.transform = `translate(-${pupilMaxMove}px, 0)`;
    });
  } else {
    // email → reset pupils
    resetPupils();
  }
}

// Input blur → resume animations + reset pupils
function handleBlur() {
  cartoon.classList.remove('stop-running', 'email-focused', 'password-focused');
  resetPupils();
}

// Email input
emailInput.addEventListener("focus", () => handleFocus(true));
emailInput.addEventListener("blur", handleBlur);

// Password input
passwordInput.addEventListener("focus", () => handleFocus(false));
passwordInput.addEventListener("blur", handleBlur);
