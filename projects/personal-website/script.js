// Toggle navigation function
function toggleNav() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("navbar-toggle");
    const main = document.getElementById("main");
    
    toggleBtn.classList.toggle("change");
    
    if (window.innerWidth <= 768) {
        if (sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
        } else {
            sidebar.classList.add("open");
        }
    }
}

// Set initial state based on screen size
window.addEventListener('load', function() {
    adjustLayout();
});

// Handle window resize
window.addEventListener('resize', function() {
    adjustLayout();
});

// Adjust layout based on screen width
function adjustLayout() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const toggleBtn = document.getElementById("navbar-toggle");
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove("open");
        toggleBtn.classList.remove("change");
    } else {
        // Make sure sidebar is closed on small screens initially
        sidebar.classList.remove("open");
    }
}