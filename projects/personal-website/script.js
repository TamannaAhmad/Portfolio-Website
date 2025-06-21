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

// Set active navigation item
function setActiveNav(element) {
    // Remove active class from all navigation items
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    element.classList.add('active');
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("navbar-toggle");
        sidebar.classList.remove("open");
        toggleBtn.classList.remove("change");
    }
}

// Load skills from JSON file
async function loadSkills() {
    try {
        // Try to fetch from JSON file first
        const response = await fetch('assets/skills.json');
        if (response.ok) {
            const skillsData = await response.json();
            displaySkills(skillsData);
        } else {
            throw new Error('JSON file not found');
        }
    } catch (error) {
        console.log('Using embedded skills data due to:', error.message);
        // Fallback to embedded skills data
        const embeddedSkillsData = {
            "languages": ["Python", "SQL", "C", "Java"],
            "ML / data science": ["Pandas", "NumPy", "XGBoost", "Random Forest", "PyTorch", "TensorFlow", "OpenCV"],
            "NLP": ["spaCy", "NLTK", "Text Extraction (Regex)"],
            "web development & deployment": ["HTML5", "CSS", "Flask", "Streamlit", "Netlify", "MongoDB", "MySQL"],
            "visualisation": ["Matplotlib", "PowerBI", "Tableau"],
            "tools": ["Git", "GitHub", "Jupyter", "Figma", "Canva", "Twilio"]
        };
        displaySkills(embeddedSkillsData);
    }
}

// Display skills in the grid
function displaySkills(skillsData) {
    const skillsGrid = document.getElementById('skills-grid');
    
    // Clear existing content
    skillsGrid.innerHTML = '';
    
    // Iterate through each skill category
    Object.entries(skillsData).forEach(([category, skills]) => {
        // Create skill card
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        // Create category title
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        skillCard.appendChild(categoryTitle);
        
        // Create skills list
        const skillsList = document.createElement('div');
        skillsList.className = 'skill-items';
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });
        
        skillCard.appendChild(skillsList);
        skillsGrid.appendChild(skillCard);
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Load skills when the page loads
    loadSkills();
});

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