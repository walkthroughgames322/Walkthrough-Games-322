document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
    
    // Add active class to current page nav link
    highlightCurrentPage();
    
    // Initialize cheat system
    initCheats();
    
    // Add search functionality if on cheats page
    if (document.querySelector('.cheats-container')) {
        initSearch();
    }
    
    // Initialize game cards if on games page
    if (document.querySelector('.game-card')) {
        initGameCards();
    }
    
    // Add back to top button
    initBackToTop();
});

function initPage() {
    // Add loading animation
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

function initCheats() {
    // Hide all cheat texts initially
    const allCheats = document.querySelectorAll('.cheat-text');
    allCheats.forEach(section => section.style.display = 'none');
    
    // Show the first cheat by default if on cheats page
    const firstCheat = document.querySelector('.cheat-text');
    if (firstCheat) {
        firstCheat.style.display = 'block';
        const firstBtn = document.querySelector(`.cheat-btn[onclick*="${firstCheat.id}"]`);
        if (firstBtn) firstBtn.classList.add('active');
    }
}

function showText(id) {
    // Hide all cheat text sections and remove active class
    const allCheats = document.querySelectorAll('.cheat-text');
    allCheats.forEach(section => section.style.display = 'none');
    
    const allBtns = document.querySelectorAll('.cheat-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show the selected cheat section and add active class
    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = 'block';
        const activeBtn = document.querySelector(`.cheat-btn[onclick*="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Smooth scroll to the content
        selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search cheats...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    const cheatsContainer = document.querySelector('.cheats-container');
    if (cheatsContainer) {
        cheatsContainer.prepend(searchContainer);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const buttons = document.querySelectorAll('.cheat-btn');
            
            buttons.forEach(button => {
                const buttonText = button.textContent.toLowerCase();
                if (buttonText.includes(searchTerm)) {
                    button.style.display = 'block';
                } else {
                    button.style.display = 'none';
                }
            });
        });
    }
}

function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button or link
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // Add animation to download buttons
    const downloadButtons = document.querySelectorAll('.game-card .btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner"></span> Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
                this.classList.add('downloaded');
                showToast('Download completed successfully!', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.classList.remove('downloaded');
                }, 3000);
            }, 1500);
        });
    });
}

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
