document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when mobile menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // INTERSECTION OBSERVER (Scroll-reveal animations)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing to prevent repeat triggers during browsing
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ==========================================================================
    const cleanPath = (path) => path.replace(/\.html$/, '').split('/').pop() || 'index';
    const currentPath = cleanPath(window.location.pathname);
    
    navLinks.forEach(link => {
        const linkPath = cleanPath(link.getAttribute('href') || '');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ==========================================================================
    // STICKY PODCAST PLAYER LOGIC
    // ==========================================================================
    const playBtn = document.getElementById('podcast-play-btn');
    const trackSelect = document.getElementById('podcast-track-select');
    const audioEl = document.getElementById('podcast-audio');
    const playerTrackText = document.querySelector('.player-track');

    const tracks = {
        ocean: { name: 'Oceanic Journeys Audio Guide', src: 'assets/audio/ocean.mp3' },
        forest: { name: 'Tropical Canopy Explorations', src: 'assets/audio/forest.mp3' },
        desert: { name: 'Desert Survival Audio Guide', src: 'assets/audio/desert.mp3' },
        grassland: { name: 'Sustaining the Open Grasslands', src: 'assets/audio/grassland.mp3' },
        tundra: { name: 'Tundra Cold Wilderness Walk', src: 'assets/audio/tundra.mp3' }
    };

    if (playBtn && trackSelect && audioEl) {
        let isPlaying = false;

        const updatePlayState = (playing) => {
            isPlaying = playing;
            if (isPlaying) {
                playBtn.innerHTML = '<span>⏸</span>';
                playBtn.setAttribute('aria-label', 'Pause Podcast');
            } else {
                playBtn.innerHTML = '<span>▶</span>';
                playBtn.setAttribute('aria-label', 'Play Podcast');
            }
        };

        playBtn.addEventListener('click', () => {
            if (trackSelect.value === 'none') {
                playerTrackText.textContent = 'Please choose a track first!';
                return;
            }
            if (isPlaying) {
                audioEl.pause();
                updatePlayState(false);
            } else {
                audioEl.play().then(() => {
                    updatePlayState(true);
                }).catch(err => {
                    // Fallback representation if actual audio file is missing
                    playerTrackText.textContent = tracks[trackSelect.value].name + ' (Previewing)';
                    updatePlayState(true);
                });
            }
        });

        trackSelect.addEventListener('change', () => {
            const trackKey = trackSelect.value;
            if (trackKey === 'none') {
                audioEl.src = '';
                playerTrackText.textContent = 'Select a track to begin journey';
                updatePlayState(false);
            } else {
                const track = tracks[trackKey];
                audioEl.src = track.src;
                playerTrackText.textContent = track.name;
                audioEl.play().then(() => {
                    updatePlayState(true);
                }).catch(() => {
                    // Fallback representation
                    playerTrackText.textContent = track.name + ' (Previewing)';
                    updatePlayState(true);
                });
            }
        });
        
        audioEl.addEventListener('ended', () => {
            updatePlayState(false);
        });
    }

    // ==========================================================================
    // WIKIPEDIA CONTENT FETCH (Full Wikipedia Parse API)
    // ==========================================================================
    const wikiContent = document.getElementById('wiki-content');
    
    async function fetchWikipediaData(topic) {
        if (!wikiContent) return;
        try {
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${topic}&format=json&origin=*&disableeditsection=true`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.parse && data.parse.text && data.parse.text['*']) {
                // Parse HTML into a temporary DOM element for sanitization
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.parse.text['*'];

                // 1. Remove Hardcoded Sizes & Inline Styles
                const styledElements = tempDiv.querySelectorAll('img, figure, .thumbinner, table, .tright, .tleft');
                styledElements.forEach(el => {
                    el.removeAttribute('width');
                    el.removeAttribute('height');
                    el.removeAttribute('style');
                });

                // 2. Clean up Wikipedia Junk
                const junkElements = tempDiv.querySelectorAll('.navbox, .ambox, .metadata, .noprint, .editsection, .magnify');
                junkElements.forEach(el => el.remove());

                // 3. Wrap Tables for Horizontal Scrolling
                const tables = tempDiv.querySelectorAll('table');
                tables.forEach(table => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-responsive';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                });

                // 4. Inject Sanitised HTML
                wikiContent.innerHTML = tempDiv.innerHTML;
            } else {
                wikiContent.innerHTML = `<p>No information found for "${topic}".</p>`;
            }
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
            wikiContent.innerHTML = `<p style="color: var(--color-earth-dark); font-weight: 500;">Failed to load biome details from Wikipedia. Please check your internet connection and try again.</p>`;
        }
    }

    if (wikiContent) {
        const pageName = window.location.pathname.split('/').pop().replace('.html', '');
        const topicMap = {
            forest: 'Forest',
            ocean: 'Ocean',
            desert: 'Desert',
            grassland: 'Grassland',
            tundra: 'Tundra'
        };
        const topic = topicMap[pageName] || 'Forest';
        fetchWikipediaData(topic);
    }
});
