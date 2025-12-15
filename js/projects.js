// Projects Page Functionality

// Project data (can be expanded with more projects)
const projectsData = {
    1: {
        title: "Project 1",
        description: "This team project for SITE 1101: Principles of Information Systems required students to construct and test basic logic gates (NOT, AND, and OR) using transistors and other electronic components. The project demonstrates hands-on understanding of fundamental digital logic circuits and their practical implementation.",
        image: "../images/and gate.jpeg",
        tags: ["Electronics", "Digital Logic", "Circuit Design", "Hardware"],
        features: [
            "Constructed NOT, AND, and OR logic gates",
            "Hands-on circuit assembly with transistors",
            "Practical testing and validation",
            "Understanding of digital logic fundamentals",
            "Team collaboration and documentation"
        ],
        gallery: [
            {
                src: "../images/and gate.jpeg",
                alt: "AND Gate Circuit"
            },
            {
                src: "../images/Or gate.jpeg",
                alt: "Or gate Circuit"
            },
            {
                src: "../images/not gate.jpeg",
                alt: "Not gate Circuit"
            }
        ],
        videoId: "1lg_IvSnKBo&t=2s", // Placeholder YouTube video ID
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
    
    // Populate gallery
    const galleryGrid = document.getElementById('galleryGrid');
    const modalGallery = document.getElementById('modalGallery');
    if (project.gallery && project.gallery.length > 0) {
        galleryGrid.innerHTML = '';
        project.gallery.forEach((img, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt || `${project.title} Image ${index + 1}`;
            imgElement.className = 'gallery-image';
            imgElement.loading = 'lazy';
            
            // Handle image loading
            imgElement.addEventListener('load', () => {
                imgElement.classList.add('loaded');
            });
            
            imgElement.addEventListener('error', () => {
                imgElement.src = '../images/not gate.jpeg'; // Fallback placeholder
                imgElement.alt = 'Image not available';
            });
            
            // Add click handler for lightbox effect
            galleryItem.addEventListener('click', () => {
                openLightbox(img.src, img.alt, project.gallery, index);
            });
            
            // Add keyboard support
            galleryItem.setAttribute('tabindex', '0');
            galleryItem.setAttribute('role', 'button');
            galleryItem.setAttribute('aria-label', `View ${img.alt} in lightbox`);
            galleryItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img.src, img.alt, project.gallery, index);
                }
            });
            
            galleryItem.appendChild(imgElement);
            galleryGrid.appendChild(galleryItem);
        });
        modalGallery.style.display = 'block';
    } else {
        modalGallery.style.display = 'none';
    }
    
    // Populate YouTube video
    const videoWrapper = document.getElementById('videoWrapper');
    const modalVideoSection = document.getElementById('modalVideoSection');
    if (project.videoId) {
        videoWrapper.innerHTML = `
            <iframe 
                src="https://www.youtube.com/watch?v=1lg_IvSnKBo&t=2s" 
                title="Project Demo Video"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="youtube-iframe"
                loading="lazy">
            </iframe>
        `;
        modalVideoSection.style.display = 'block';
    } else {
        modalVideoSection.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modalClose.focus();
}

// Lightbox functionality for gallery images
function openLightbox(src, alt, images, currentIndex) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">
            <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-prev" aria-label="Previous image">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="lightbox-next" aria-label="Next image">
            <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}" class="lightbox-image">
            <p class="lightbox-caption">${alt}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    let currentImgIndex = currentIndex;
    
    function updateLightboxImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentImgIndex = index;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        lightboxCaption.textContent = images[index].alt;
    }
    
    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
    });
    
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        updateLightboxImage(currentImgIndex - 1);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        updateLightboxImage(currentImgIndex + 1);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function lightboxKeyHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
            document.removeEventListener('keydown', lightboxKeyHandler);
        } else if (e.key === 'ArrowLeft') {
            updateLightboxImage(currentImgIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateLightboxImage(currentImgIndex + 1);
        }
    });
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

