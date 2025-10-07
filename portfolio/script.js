// This code uses the Typed.js library to create the typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed(".text-anim", {
        strings: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});