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
            // Attach shadow root to isolate Wikipedia content and styles
            let shadow = wikiContent.shadowRoot;
            if (!shadow) {
                shadow = wikiContent.attachShadow({ mode: 'open' });
            }

            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${topic}&format=json&origin=*&disableeditsection=true`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.parse && data.parse.text && data.parse.text['*']) {
                const shadowStyle = `
                    <style>
                        * {
                            box-sizing: border-box !important;
                            max-width: 100% !important;
                        }
                        img, figure, .thumb, .thumbinner, .tright, .tleft {
                            width: var(--wiki-img-width, 100%) !important;
                            max-width: var(--wiki-img-max-width, 100%) !important;
                            height: auto !important;
                            float: var(--wiki-img-float, none) !important;
                            margin: var(--wiki-img-margin, 15px auto) !important;
                            object-fit: contain;
                        }
                        table, .infobox {
                            display: var(--wiki-infobox-display, block) !important;
                            width: var(--wiki-infobox-width, 100%) !important;
                            float: var(--wiki-infobox-float, none) !important;
                            clear: var(--wiki-infobox-clear, none) !important;
                            margin: var(--wiki-infobox-margin, 20px 0) !important;
                            overflow-x: auto !important;
                            -webkit-overflow-scrolling: touch;
                            white-space: nowrap;
                        }
                        .navbox, .ambox, .metadata, .editsection, .noprint, .magnify {
                            display: none !important; /* Hide Wikipedia junk */
                        }
                        p, li {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                            line-height: var(--wiki-text-line-height, 1.6);
                            font-size: var(--wiki-text-font-size, 16px);
                            white-space: normal;
                            color: #2b3a2e; /* matches --text-primary */
                        }
                        a {
                            color: #7a927c; /* matches --color-sage-dark */
                            text-decoration: underline;
                        }
                        h2 {
                            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                            font-size: 1.75rem;
                            color: #2c4230; /* matches --color-forest-dark */
                            margin: 2.25rem 0 1rem 0;
                            border-bottom: 2px solid #c3d3c4; /* matches --color-sage */
                            padding-bottom: 0.35rem;
                        }
                        h3 {
                            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                            font-size: 1.35rem;
                            color: #2c4230; /* matches --color-forest-dark */
                            margin: 1.75rem 0 0.75rem 0;
                        }
                    </style>
                `;
                shadow.innerHTML = shadowStyle + data.parse.text['*'];
            } else {
                shadow.innerHTML = `<p>No information found for "${topic}".</p>`;
            }
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
            const shadow = wikiContent.shadowRoot || wikiContent.attachShadow({ mode: 'open' });
            shadow.innerHTML = `<p style="color: #a28b75; font-weight: 500;">Failed to load biome details from Wikipedia. Please check your internet connection and try again.</p>`;
        }
    }

    if (wikiContent) {
        const pageName = window.location.pathname.split('/').pop().replace('.html', '');
        if (pageName !== 'forest-mobile' && pageName !== 'forest-desktop' && pageName !== 'desert-mobile' && pageName !== 'desert-desktop' && pageName !== 'ocean-mobile' && pageName !== 'ocean-desktop' && pageName !== 'tundra-mobile' && pageName !== 'tundra-desktop') {
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
    }
});
