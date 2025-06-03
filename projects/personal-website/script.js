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

async function loadSkills() {
    const response = await fetch('./assets/skills.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const skills = await response.json();
    displaySkills(skills);
}

// load skills
function displaySkills(skills) {
  const container = document.getElementById('skills-container');
  
  const staticHeading = container.querySelector('h1');
  container.innerHTML = staticHeading ? staticHeading.outerHTML : '';
  
  container.innerHTML += `<div class="skills-grid"></div>`;
  const grid = container.querySelector('.skills-grid');
  
  for (const [category, items] of Object.entries(skills)) {
    const formattedCategory = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    card.innerHTML = `
      <h3>${formattedCategory}</h3>
      <div class="skill-items">
        ${items.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
      </div>
    `;
    
    grid.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', loadSkills);