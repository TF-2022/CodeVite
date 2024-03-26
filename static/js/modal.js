document.addEventListener("DOMContentLoaded", function() {
    var modalToggles = document.querySelectorAll('[data-toggle="cvt-modal"]');
    modalToggles.forEach(function(toggle) {
        toggle.addEventListener("click", function() {
            var modalId = this.getAttribute("data-target");
            var modal = document.querySelector(modalId);
            modal.style.display = "block";
        
        var input = modal.querySelector(".cvt-modal-body input");
        if (input) {
            input.focus();
            input.select();
        }
        });
    });
    var closeButtons = document.querySelectorAll(".cvt-modal .cvt-close");
    closeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var modal = this.closest(".cvt-modal");
            if (modal.hasAttribute('data-cvt-no-dismiss-on-backdrop')) {
                window.history.back();
            } else {
                modal.style.display = "none";
            }
        });
    });

    var dismissButtons = document.querySelectorAll("[data-cvt-dismiss='modal']");
    dismissButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            this.closest(".cvt-modal").style.display = "none";
        });
    });
    
    var modalCloseButtons = document.querySelectorAll("[data-close-modal]");
    modalCloseButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var modal = this.closest(".cvt-modal");
            modal.style.display = "none";
        });
    });
    
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("cvt-modal")) {
            if (!event.target.hasAttribute('data-cvt-no-dismiss-on-backdrop')) {
                event.target.style.display = "none";
            }
        }
    });
});
