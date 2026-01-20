/**
 * PM Portfolio - Main JavaScript
 * Handles navigation, scroll behavior, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const pagesContainer = document.getElementById('pagesContainer');
    const navDots = document.querySelectorAll('.nav-dot');
    const pages = document.querySelectorAll('.page');
    const scrollIndicator = document.getElementById('scrollIndicator');

    /**
     * Update active navigation dot based on scroll position
     */
    function updateActiveDot() {
        const scrollPosition = pagesContainer.scrollTop;
        const pageHeight = window.innerHeight;
        const currentPage = Math.round(scrollPosition / pageHeight);

        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });

        // Hide scroll indicator after first page
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', currentPage > 0);
        }
    }

    /**
     * Scroll to a specific page
     * @param {number} pageIndex - Index of the page to scroll to
     */
    function scrollToPage(pageIndex) {
        if (pages[pageIndex]) {
            pages[pageIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Get current page index
     * @returns {number} Current page index
     */
    function getCurrentPage() {
        return Math.round(pagesContainer.scrollTop / window.innerHeight);
    }

    // Navigation dot click handlers
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const pageIndex = parseInt(dot.dataset.page);
            scrollToPage(pageIndex);
        });
    });

    // Scroll event listener
    pagesContainer.addEventListener('scroll', updateActiveDot);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentPage = getCurrentPage();
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentPage < pages.length - 1) {
                scrollToPage(currentPage + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentPage > 0) {
                scrollToPage(currentPage - 1);
            }
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToPage(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToPage(pages.length - 1);
        }
    });

    // Initialize
    updateActiveDot();
});
