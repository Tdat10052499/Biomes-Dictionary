# Biosphere Journey

Welcome to **Biosphere Journey**, an interactive educational web encyclopedia showcasing the diversity of Earth's ecosystems. This project bridges digital learning with physical design, using an interactive digital interface to highlight a 3D physical square diorama made entirely from household recycled waste.

---

## 🌟 Vision & Objectives

At its core, **Biosphere Journey** is a message of environmental protection, resourcefulness, and ecological literacy:
- **Ecological Education**: Provide an interactive platform for students and educators to study Earth's 5 major biomes: Aquatic, Tropical Forest, Desert, Grassland, and Tundra.
- **Creative Upcycling**: Demonstrate that stunning, complex educational models (like a 3D diorama of our planet's biomes) can be constructed 100% out of common household trash (e.g., plastic bottles, crumpled nylon bags, styrofoam, cardboard).
- **Environmental Advocacy**: Raise awareness about human impact on biomes and inspire learners to rethink waste through creative reuse.

---

## 🚀 Key Features

- **Wikipedia-Inspired Layout**: Clean, structured layout with:
  - A left navigation sidebar for quick navigation between biomes.
  - A center main content area detailing the biome's ecology, climate, flora, fauna, and upcycling build log.
  - A right-aligned infobox compiling quick facts and the list of recycled materials used to represent that biome in the physical model.
- **Dynamic Biome Theming**: The application transitions its aesthetics seamlessly. Light/dark modes and accent pastel gradients shift automatically based on the selected biome (e.g., cool deep blues for Aquatic, lush greens for Tropical Forest, sandy warm yellows for Desert).
- **Sticky Podcast Player**: An audio guide anchored at the bottom of the screen, allowing users to listen to narrated scientific journeys through each biome as they browse.
- **Interactive Learning Tools**:
  - **Flashcards**: Active-recall cards containing quick trivia, ecosystem dynamics, and environmental threats.
  - **Image Hotspots**: Clickable nodes on photos/illustrations of the physical diorama detailing which recycled waste material was used for each section (e.g., nylon bag clouds, plastic bottle trees).

---

## 🛠️ Tech Stack & Philosophy

Following the **"Antigravity"** philosophy of zero-dependency, high-performance, and lightweight web development, this project is built entirely on:
- **HTML5**: Semantic tags to ensure readability, structure, and accessibility.
- **CSS3**: Vanilla stylesheets featuring CSS Variables (`:root`) for layout, dark/light modes, and dynamic biome-specific transitions.
- **Vanilla JavaScript**: Pure JS (ES6+) for direct DOM manipulation, event listener handling, state management, and interaction logic. No build steps, no packaging tools, no external frameworks.

---

## 📂 Directory Structure

```text
Biosphere-Journey/
│
├── .agents/                 # Workspace customizations and rules
├── assets/                  # Media assets (audio, illustrations, photos)
│   ├── audio/               # Biome podcast guide recordings
│   └── images/              # Diorama photos, biome visuals, hotspots
│
├── css/
│   ├── main.css             # Main layout, sidebar, player & global variables
│   └── themes.css           # Dynamic biome theme modifiers
│
├── js/
│   ├── app.js               # Core app logic (biome switching, dark mode)
│   ├── player.js            # Podcast audio player controller
│   └── interactive.js       # Flashcards and hotspot logic
│
├── index.html               # Main entrypoint webpage
├── project.rule             # Workspace coding rules and guidelines
└── README.md                # Project documentation
```