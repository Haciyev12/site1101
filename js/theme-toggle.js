// Dark/Light Mode Toggle Functionality

(function() {
    'use strict';

    // Theme state management
    const ThemeManager = {
        // Get saved theme or default to light
        getTheme: function() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        },

        // Set theme
        setTheme: function(theme) {
            const html = document.documentElement;
            const body = document.body;
            
            if (theme === 'dark') {
                html.classList.add('dark-mode');
                body.classList.add('dark-mode');
            } else {
                html.classList.remove('dark-mode');
                body.classList.remove('dark-mode');
            }
            
            localStorage.setItem('theme', theme);
            this.updateToggleButton(theme);
        },

        // Update toggle button icon
        updateToggleButton: function(theme) {
            const toggleBtn = document.getElementById('themeToggle');
            if (!toggleBtn) return;

            const sunIcon = toggleBtn.querySelector('.fa-sun');
            const moonIcon = toggleBtn.querySelector('.fa-moon');

            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
                toggleBtn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
                toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            }
        },

        // Toggle between themes
        toggle: function() {
            const currentTheme = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        },

        // Initialize theme on page load
        init: function() {
            const theme = this.getTheme();
            this.setTheme(theme);

            // Listen for system theme changes (only if user hasn't set preference)
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    // Only auto-switch if user hasn't manually set a preference
                    if (!localStorage.getItem('theme')) {
                        this.setTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }
        }
    };

    // Initialize theme when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ThemeManager.init();
        });
    } else {
        ThemeManager.init();
    }

    // Export toggle function for button onclick
    window.toggleTheme = function() {
        ThemeManager.toggle();
    };

    // Make ThemeManager available globally for debugging
    window.ThemeManager = ThemeManager;
})();

