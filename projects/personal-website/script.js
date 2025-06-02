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
  
  container.innerHTML += `<h3>Web Development and Deployment</h3><ul>${skills.web_dev.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
  
  container.innerHTML += `<h3>Programming Languages</h3><ul>${skills.programming.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
  
  container.innerHTML += `<h3>Data Science</h3><ul>${skills.data_science.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
  
  container.innerHTML += `<h3>Artificial Intelligence</h3><ul>${skills.ai.map(skill => `<li>${skill}</li>`).join('')}</ul>`;

  container.innerHTML += `<h3>Tools</h3><ul>${skills.tools.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
}

document.addEventListener('DOMContentLoaded', loadSkills);