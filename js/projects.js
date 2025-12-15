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
        videoId: "1lg_IvSnKBo",
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

// Modal variables (global scope so functions can access them)
let modal;
let modalClose;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeProjects();
});

function initializeProjects() {
    // Modal functionality
    modal = document.getElementById('projectModal');
    modalClose = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn, .project-view-btn');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Event listeners for opening modal
    if (viewDetailsButtons.length > 0) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const projectId = button.getAttribute('data-project');
                if (projectId) {
                    openModal(projectId);
                } else {
                    console.error('No project ID found on button');
                }
            });
        });
    } else {
        console.warn('No view details buttons found');
    }

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
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Open modal
function openModal(projectId) {
    if (!modal) {
        console.error('Modal not initialized. Make sure DOM is loaded.');
        return;
    }
    
    const project = projectsData[projectId];
    if (!project) {
        console.error(`Project with ID ${projectId} not found in projectsData`);
        return;
    }
    
    console.log('Opening modal for project:', projectId, project.title);
    
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
    
    // Set links (if they exist)
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');
    if (modalLiveLink) modalLiveLink.href = project.liveLink;
    if (modalGithubLink) modalGithubLink.href = project.githubLink;
    
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
            <a href="https://www.youtube.com/watch?v=${project.videoId}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="video-thumbnail-link">
                <img 
                    src="https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg" 
                    alt="Video Thumbnail"
                    style="width: 100%; border-radius: 12px;"
                    onerror="this.src='https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg'"
                >
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <svg width="68" height="48" viewBox="0 0 68 48">
                        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                    </svg>
                </div>
            </a>
        `;
        modalVideoSection.style.display = 'block';
    } else {
        modalVideoSection.style.display = 'none';
    }
    
    // Hide modal action buttons
    const modalActions = document.getElementById('modalActions');
    if (modalActions) {
        modalActions.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    if (modalClose) {
        modalClose.focus();
    }
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
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

