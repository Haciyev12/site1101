// Projects Page Functionality

// Project data (can be expanded with more projects)
const projectsData = {
    1: {
        title: "Project 1",
        description: "A responsive web application built with HTML, CSS, and JavaScript that demonstrates modern web development practices. This project showcases clean, maintainable code structure and implements best practices for user experience and accessibility. The application features a modern design with smooth animations and responsive layouts that work seamlessly across all devices.",
        image: "../images/project1-16-9.svg",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
        features: [
            "Fully responsive design",
            "Modern UI/UX principles",
            "Accessible components",
            "Clean code structure",
            "Cross-browser compatibility"
        ],
        liveLink: "#",
        githubLink: "#"
    }
};

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Modal functionality
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const viewDetailsButtons = document.querySelectorAll('.view-details-btn, .project-view-btn');

// Open modal
function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    // Populate modal with project data
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = `${project.title} Screenshot`;
    
    // Set description
    const modalDescription = document.getElementById('modalDescription');
    modalDescription.textContent = project.description;
    
    // Set tags
    const modalTags = document.getElementById('modalTags');
    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });
    
    // Set features
    const modalFeatures = document.getElementById('modalFeatures');
    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });
    
    // Set links
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modalClose.focus();
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for opening modal
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        openModal(projectId);
    });
});

// Close modal events
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking overlay
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Trap focus within modal
const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

