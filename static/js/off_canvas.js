document.addEventListener("DOMContentLoaded", function() {
    const offcanvasTogglers = document.querySelectorAll(".cvt-offcanvas-toggler");
    const offcanvases = document.querySelectorAll(".cvt-offcanvas");
    const overlay = document.querySelector(".cvt-overlay");

    function toggleOffcanvas(offcanvas) {
        const isActive = offcanvas.classList.contains("active");

        offcanvases.forEach(oc => oc.classList.remove("active")); 
        overlay.style.display = isActive ? "none" : "block"; 
        offcanvas.classList.toggle("active", !isActive);
    }

    offcanvasTogglers.forEach(toggler => {
        toggler.addEventListener("click", function() {
            const target = this.getAttribute("data-offcanvas-target");
            const offcanvas = document.querySelector(target);
            toggleOffcanvas(offcanvas);
        });
    });

    overlay.addEventListener("click", function() {
        offcanvases.forEach(offcanvas => offcanvas.classList.remove("active"));
        this.style.display = "none";
    });
    
    offcanvases.forEach(offcanvas => {
        offcanvas.addEventListener("click", function(event) {
            if (event.target.classList.contains("btn-close") || event.target.classList.contains("cvt-close-offcanvas")) {
                this.classList.remove("active");
                overlay.style.display = "none";
            }
        });
    });
});

