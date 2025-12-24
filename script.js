// PARTICLES (HERO ONLY)
particlesJS("particles-js", {
    particles: {
        number: { value: 60 },
        color: { value: "#39ffb6" },
        size: { value: 2 },
        move: { speed: 0.8 },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#2cff9a",
            opacity: 0.2
        }
    }
});
// SCROLL FADE-IN
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("fade-in");
    observer.observe(sec);
});
const canvas = document.getElementById("loki-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Strand {
  constructor(x) {
    this.x = x;
    this.y = Math.random() * canvas.height;
    this.speed = 0.6 + Math.random() * 1.2;
    this.width = 1 + Math.random() * 2;
    this.phase = Math.random() * Math.PI * 2;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,255,150,0.35)`;
    ctx.lineWidth = this.width;

    let y = this.y;
    for (let i = 0; i < canvas.height; i += 20) {
      const offset = Math.sin(this.phase + i * 0.02) * 15;
      ctx.lineTo(this.x + offset, y + i);
    }
    ctx.stroke();

    this.phase += 0.02;
    this.y -= this.speed;
    if (this.y < -canvas.height) this.y = canvas.height;
  }
}

const strands = [];
for (let i = 0; i < 40; i++) {
  strands.push(new Strand(Math.random() * canvas.width));
}

function animate() {
 ctx.fillStyle = "rgba(0, 0, 0, 0.12)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  strands.forEach(s => s.draw());
  requestAnimationFrame(animate);
}

animate();

// CINEMATIC PROJECT REVEAL
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

projectCards.forEach(card => projectObserver.observe(card));
const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("userReviews");

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviewsContainer.innerHTML = "";
  reviews.forEach(r => {
    reviewsContainer.innerHTML += `
      <div class="user-review-card">
        <h4>${r.name}</h4>
        <p>${r.review}</p>
      </div>
    `;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const review = document.getElementById("review").value;

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ name, review });

  localStorage.setItem("reviews", JSON.stringify(reviews));
  form.reset();
  loadReviews();
});

loadReviews();

