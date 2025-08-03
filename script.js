
/* HOME PAGE ------------------------------------------------------ */
let words = document.querySelectorAll(".word");

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    // Animate current word letters out
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    // Hide all words before showing the next one
    words.forEach(w => w.style.opacity = "0");

    // Show next word
    nextWord.style.opacity = "1";

    // Animate next word letters in
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

/* ABOUT PAGE --------------------------------------- */

const faders = document.querySelectorAll('.card, .about-text, .about-heading');

const appearOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('fade-in');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => {
  el.classList.add('fade-init'); // Initial state
  appearOnScroll.observe(el);
});

// SERVICES SECTION SCROLL REVEAL ------------------------------------- //
const serviceBoxes = document.querySelectorAll('.service-box');

const revealOnScroll = () => {
  serviceBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (boxTop < windowHeight - 50) {
      box.classList.add('reveal');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.service-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  boxes.forEach(box => observer.observe(box));
});

// Example toggle function
function toggleDarkMode() {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// SKILLS PAGE -------------------------------------------------- // 
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circular-bar");

  circles.forEach((bar) => {
    const value = bar.getAttribute("data-percent");
    const circle = bar.querySelectorAll("circle")[1];
    const offset = 314 - (314 * value) / 100;
    circle.style.strokeDashoffset = offset;
  });
});

// Portfolio PAGE -------------------------------------------------//
const filterButtons = document.querySelectorAll('.filter-buttons .btn');
const portfolioItems = document.querySelectorAll('.port-box');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(box => {
      const category = box.dataset.category;
      if (filter === 'all' || category.includes(filter)) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// --- Smooth scroll with offset ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const offset = 100; // Adjust based on nav height
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


// Contact PAGE -------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable submit button temporarily
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "Sending...";
    status.style.color = "#ffc107";

    // Simulated sending
    setTimeout(() => {
      status.textContent = "✅ Thank you! Your message has been sent.";
      status.style.color = "#28a745";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }, 1500);
  });
});
