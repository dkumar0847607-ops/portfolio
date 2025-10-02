gsap.fromTo(
    ".loading-page, .ctnr",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.5,
    }
  );
  
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
var typed = new Typed(".text",{
    Strings: ["Frontend Developer" , "Web Developer" , "Youtube"],
    typeSpeed: 100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});





  // document.addEventListener("DOMContentLoaded", () => {
  //   const radials = document.querySelectorAll(".radial-bar");

  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         const bar = entry.target;
  //         const circle = bar.querySelector(".progress");
  //         const text = bar.querySelector(".percentage");

  //         const percent = +bar.dataset.percentage;
  //         const radius = circle.r.baseVal.value;
  //         const circumference = 2 * Math.PI * radius;
  //         const offset = circumference - (percent / 100) * circumference;

  //         circle.style.strokeDasharray = circumference;
  //         circle.style.strokeDashoffset = circumference;

  //         // Animate stroke
  //         setTimeout(() => {
  //           circle.style.transition = 'stroke-dashoffset 1.5s ease';
  //           circle.style.strokeDashoffset = offset;
  //         }, 100);

  //         // Animate percentage counter
  //         let count = 0;
  //         const duration = 1000; // ms
  //         const step = Math.ceil(duration / percent);

  //         const counter = setInterval(() => {
  //           if (count <= percent) {
  //             text.innerText = `${count}%`;
  //             count++;
  //           } else {
  //             clearInterval(counter);
  //           }
  //         }, step);

  //         observer.unobserve(bar);
  //       }
  //     });
  //   }, {
  //     threshold: 0.4,
  //   });

  //   radials.forEach(bar => observer.observe(bar));
  // });




// technical skill

const radialBars = document.querySelectorAll('.radial-bar');

function animateSingleBar(bar) {
  const circle = bar.querySelector('.progress');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(100, +bar.dataset.percentage || 0));
  const offset = circumference - (percent / 100) * circumference;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  // trigger transition
  setTimeout(() => {
    circle.style.transition = 'stroke-dashoffset 1.2s ease-out';
    circle.style.strokeDashoffset = offset;
  }, 80);

  // animate numeric counter inside .percentage
  const pctEl = bar.querySelector('.percentage');
  if (pctEl) {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(progress * percent);
      pctEl.textContent = `${current}%`;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}

// Observe each radial bar individually so each animates when scrolled into view
const barsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSingleBar(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

radialBars.forEach(bar => barsObserver.observe(bar));
