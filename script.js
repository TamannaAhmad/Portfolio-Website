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
        categoryTitle.textContent = category.replace(/_/g, ' ').replace(/\//g, ' / ').toUpperCase();
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

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('assets/projects.json');
        if (response.ok) {
            const projectsData = await response.json();
            displayProjects(projectsData);
        } else {
            throw new Error('JSON file not found');
        }
    } catch (error) {
        console.error('Could not load projects:', error.message);
    }
}

// Display projects in the gallery
function displayProjects(projectsData) {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Title
        const title = document.createElement('h2');
        title.textContent = project.title;
        card.appendChild(title);

        // Image
        const img = document.createElement('img');
        img.src = project.image;
        card.appendChild(img);

        // Description
        const desc = document.createElement('p');
        desc.className = 'project-description';
        desc.innerHTML = project.description.replace(/\n/g, '<br>');
        card.appendChild(desc);

        // Features
        if (project.features && project.features.length) {
            const featuresDiv = document.createElement('div');
            featuresDiv.className = 'project-features';
            const featuresTitle = document.createElement('h3');
            featuresTitle.textContent = 'Features:';
            featuresDiv.appendChild(featuresTitle);
            const ul = document.createElement('ul');
            project.features.forEach(f => {
                const li = document.createElement('li');
                li.textContent = f;
                ul.appendChild(li);
            });
            featuresDiv.appendChild(ul);
            card.appendChild(featuresDiv);
        }

        // Tech Stack
        if (project.tech_stack && project.tech_stack.length) {
            const techDiv = document.createElement('div');
            techDiv.className = 'tech-stack';
            const techTitle = document.createElement('h3');
            techTitle.textContent = 'Tech Stack:';
            techDiv.appendChild(techTitle);
            const iconsDiv = document.createElement('div');
            iconsDiv.className = 'tech-icons';
            project.tech_stack.forEach(icon => {
                const img = document.createElement('img');
                img.src = icon.src;
                img.alt = icon.alt;
                img.className = 'tech-icon';
                img.title = icon.title;
                iconsDiv.appendChild(img);
            });
            techDiv.appendChild(iconsDiv);
            card.appendChild(techDiv);
        }

        // Links
        if (project.links && project.links.length) {
            const linksDiv = document.createElement('div');
            linksDiv.className = 'project-links';
            project.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.className = link.class;
                a.target = '_blank';
                if (link.icon) {
                    const i = document.createElement('i');
                    i.className = link.icon;
                    a.appendChild(i);
                    a.appendChild(document.createTextNode(' '));
                }
                a.appendChild(document.createTextNode(link.text));
                linksDiv.appendChild(a);
            });
            card.appendChild(linksDiv);
        }

        projectsContainer.appendChild(card);
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
    loadProjects();
});

let currentProjectIndex = 0;

function showProject(index) {
    const gallery = document.querySelector('.projects-gallery');
    const projectsContainer = document.querySelector('.projects-container');
    const projects = document.querySelectorAll('.project-card');

    if (!projects.length) return;

    // Loop aroud the projects
    if (index >= projects.length) {
        currentProjectIndex = 0;
    } else if (index < 0) {
        currentProjectIndex = projects.length - 1;
    } else {
        currentProjectIndex = index;
    }

    const activeCard = projects[currentProjectIndex];
    const cardWidth = activeCard.offsetWidth;
    const galleryWidth = gallery.offsetWidth;

    // Calculate the offset required to center the active card
    const offset = activeCard.offsetLeft + (cardWidth / 2) - (galleryWidth / 2);

    projectsContainer.style.transform = `translateX(-${offset}px)`;

    // Update active class
    projects.forEach(card => card.classList.remove('active-project'));
    activeCard.classList.add('active-project');
}

function changeProject(direction) {
    showProject(currentProjectIndex + direction);
}

function setupSwipe() {
    const projectsContainer = document.querySelector('.projects-container');
    let touchStartX = 0;
    let touchEndX = 0;

    projectsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    projectsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swiped left
            changeProject(1);
        }

        if (touchEndX > touchStartX + 50) { // Swiped right
            changeProject(-1);
        }
    }
}

// Set initial state based on screen size
window.addEventListener('load', function() {
    adjustLayout();
    showProject(currentProjectIndex);
    setupSwipe();
});

// Handle window resize
window.addEventListener('resize', function() {
    adjustLayout();
    showProject(currentProjectIndex); // Recalculate on resize
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