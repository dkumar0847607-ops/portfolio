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


// Contact form handler
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const msgEl = form.querySelector('.form-msg');
  const submitBtn = form.querySelector('.send');

  function setMessage(text, type = 'info') {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.style.color = type === 'error' ? '#ff8a8a' : '#a7fffb';
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.value = loading ? 'Sending...' : 'Submit';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      setMessage('Please fill the required fields.', 'error');
      return;
    }

    //  email regex
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setMessage('Please enter a valid email.', 'error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Send as JSON for cleaner payload
      const payload = {
        name,
        email,
        subject: (formData.get('subject') || '').toString().trim(),
        message
      };

      const resp = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (resp.ok) {
        setMessage('Thanks! Your message was sent.');
        form.reset();
      } else {
        // Try to read error from Formspree
        let err = 'Something went wrong. Please try again later.';
        try {
          const data = await resp.json();
          if (data && data.errors && data.errors.length) {
            err = data.errors.map(e => e.message).join(', ');
          }
        } catch (_) {}
        setMessage(err, 'error');
      }
    } catch (error) {
      setMessage('Network error. Please check connection and retry.', 'error');
    } finally {
      setLoading(false);
    }
  });
})();
