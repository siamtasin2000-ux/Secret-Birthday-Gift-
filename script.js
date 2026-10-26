/*
  SECRET BIRTHDAY GIFT — customize this section before publishing.
  Important: this is a fun surprise lock, NOT real security.
  The passcode is visible in this JavaScript file to anyone who views the site source.
*/
const CONFIG = {
  passcode: "2011",             // Change this to your own secret code
  recipientName: "Birthday Star", // Change to the birthday person's name
  personalMessage: "I hope this new chapter brings you happy moments, kind people, brave dreams, and a hundred reasons to smile. Never forget how special you are!",
  allowMusic: false             // Optional: no music file is included by default
};

const lockScreen = document.getElementById("lockScreen");
const giftScreen = document.getElementById("giftScreen");
const passcodeForm = document.getElementById("passcodeForm");
const passcodeInput = document.getElementById("passcode");
const errorMessage = document.getElementById("errorMessage");
const toast = document.getElementById("toast");
let toastTimer;

document.getElementById("recipientName").textContent = CONFIG.recipientName;
document.getElementById("personalMessage").textContent = CONFIG.personalMessage;

function makePlaceholder(emoji, caption) {
  const box = document.createElement("div");
  box.className = "photo-placeholder";
  const inner = document.createElement("div");
  const icon = document.createElement("span");
  icon.textContent = emoji;
  const label = document.createElement("small");
  label.textContent = caption;
  inner.append(icon, document.createElement("br"), label);
  box.append(inner);
  return box;
}
window.makePlaceholder = makePlaceholder;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function launchConfetti(amount = 90) {
  const colors = ["#ff6f9f", "#ffd166", "#8b75c9", "#7bdff2", "#ff9f68", "#a8e6a3"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.3 + Math.random() * 2.4) + "s";
    piece.style.animationDelay = (Math.random() * .8) + "s";
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}

passcodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const entered = passcodeInput.value.trim();
  if (entered === CONFIG.passcode) {
    lockScreen.classList.add("hidden");
    giftScreen.classList.remove("hidden");
    document.title = `Happy Birthday, ${CONFIG.recipientName}! 🎂`;
    launchConfetti(130);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    errorMessage.textContent = "Oops! That's not the secret code. Try again 💗";
    passcodeInput.value = "";
    passcodeInput.focus();
    const mascot = document.getElementById("lockMascot");
    mascot.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" },
       { transform: "translateX(7px)" }, { transform: "translateX(0)" }],
      { duration: 260 }
    );
  }
});

document.getElementById("confettiButton").addEventListener("click", () => {
  launchConfetti(100);
  showToast("Birthday magic incoming! 🎉");
});

document.getElementById("replayButton").addEventListener("click", () => {
  giftScreen.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  passcodeInput.value = "";
  errorMessage.textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Surprise reset. Ready for another round? 🎁");
});

// Browser autoplay rules require a user gesture. Add your own audio file and enable this
// button if you want music. This starter stays silent and does not load external audio.
document.getElementById("musicButton").addEventListener("click", () => {
  showToast("To add music, place a licensed audio file in assets and connect it in script.js 🎵");
});

document.querySelectorAll(".polaroid img").forEach((img) => {
  img.addEventListener("click", () => {
    if (img.naturalWidth > 0) {
      showToast(img.alt + " 💗");
    }
  });
});
