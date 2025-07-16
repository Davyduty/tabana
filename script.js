document.addEventListener('DOMContentLoaded', () => {
    // --- Header Dropdowns ---
    const technologyBtn = document.getElementById('technologyBtn');
    const technologyMenu = document.getElementById('technologyMenu');
    const technologyDropdown = document.getElementById('technologyDropdown');
    const supportBtn = document.getElementById('supportBtn');
    const supportDropdown = document.getElementById('supportDropdown'); // This is the Learn & Support button's parent dropdown

    function closeAllDropdowns() {
        technologyDropdown.classList.remove('active');
        technologyMenu.classList.remove('fade-in');
        supportDropdown.classList.remove('support-active'); // Deactivate Learn & Support button style
        document.getElementById('documentationSidebar').classList.remove('active');
        document.querySelector('.main-content').classList.remove('shifted');
    }

    // Technology Dropdown
    technologyBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from immediately closing
        const isActive = technologyDropdown.classList.toggle('active');
        if (isActive) {
            technologyMenu.classList.add('fade-in');
            supportDropdown.classList.remove('support-active'); // Ensure Learn & Support is not active
            document.getElementById('documentationSidebar').classList.remove('active');
            document.querySelector('.main-content').classList.remove('shifted');
        } else {
            technologyMenu.classList.remove('fade-in');
        }
    });

    // Learn & Support Button (activates sidebar)
    supportBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const sidebar = document.getElementById('documentationSidebar');
        const mainContent = document.querySelector('.main-content');

        const isActive = sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted', isActive);

        if (isActive) {
            sidebar.classList.add('slide-in');
            supportDropdown.classList.add('support-active'); // Activate Learn & Support button style
            technologyDropdown.classList.remove('active'); // Close technology dropdown
            technologyMenu.classList.remove('fade-in');
        } else {
            sidebar.classList.remove('slide-in');
            supportDropdown.classList.remove('support-active'); // Deactivate Learn & Support button style
        }
    });

    // Close dropdowns/sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!technologyDropdown.contains(event.target) && !supportDropdown.contains(event.target) && !document.getElementById('documentationSidebar').contains(event.target)) {
            closeAllDropdowns();
        }
    });

    // --- Documentation Sidebar ---
    const showDocsBtn = document.getElementById('showDocsBtn');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const documentationSidebar = document.getElementById('documentationSidebar');
    const mainContent = document.querySelector('.main-content');

    showDocsBtn.addEventListener('click', () => {
        documentationSidebar.classList.add('active');
        mainContent.classList.add('shifted');
        documentationSidebar.classList.add('slide-in');
        supportDropdown.classList.add('support-active'); // Activate Learn & Support button style
        technologyDropdown.classList.remove('active'); // Close technology dropdown
        technologyMenu.classList.remove('fade-in');
    });

    closeSidebarBtn.addEventListener('click', () => {
        documentationSidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
        documentationSidebar.classList.remove('slide-in');
        supportDropdown.classList.remove('support-active'); // Deactivate Learn & Support button style
    });

    // Documentation Search
    const docSearchInput = document.getElementById('docSearch');
    docSearchInput.addEventListener('keyup', (event) => {
        const query = event.target.value.toLowerCase();
        document.querySelectorAll('.doc-section').forEach(section => {
            const title = section.querySelector('.doc-section-title').textContent.toLowerCase();
            const items = Array.from(section.querySelectorAll('.doc-item'));
            let sectionMatches = false;

            items.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(query)) {
                    item.style.display = 'block';
                    sectionMatches = true;
                } else {
                    item.style.display = 'none';
                }
            });

            if (title.includes(query) || sectionMatches) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // --- Support Card Expand/Collapse ---
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.support-card');
            const cardId = button.dataset.target;
            const expandedContent = document.getElementById(`${cardId}-content`);
            const getStartedBtn = card.querySelector('.get-started-btn');
            const arrowIcon = button.querySelector('i');

            if (card.classList.contains('expanded')) {
                // Collapse
                card.classList.remove('expanded');
                expandedContent.classList.remove('active');
                getStartedBtn.style.display = 'none';
                button.innerHTML = `Read more <i class="fas fa-arrow-right"></i>`;
                arrowIcon.style.transform = 'translateX(0)';
            } else {
                // Collapse any other expanded cards first
                document.querySelectorAll('.support-card.expanded').forEach(expandedCard => {
                    expandedCard.classList.remove('expanded');
                    expandedCard.querySelector('.expanded-content').classList.remove('active');
                    expandedCard.querySelector('.get-started-btn').style.display = 'none';
                    const prevReadMoreBtn = expandedCard.querySelector('.read-more-btn');
                    const prevArrowIcon = prevReadMoreBtn.querySelector('i');
                    prevReadMoreBtn.innerHTML = `${prevReadMoreBtn.dataset.target === 'premium' ? 'Learn more' : 'Read more'} <i class="fas fa-arrow-right"></i>`;
                    prevArrowIcon.style.transform = 'translateX(0)';
                });

                // Expand current card
                card.classList.add('expanded');
                expandedContent.classList.add('active');
                getStartedBtn.style.display = 'block';
                button.innerHTML = `Show less <i class="fas fa-times"></i>`;
                arrowIcon.style.transform = 'rotate(90deg)';
            }
        });
    });
});
