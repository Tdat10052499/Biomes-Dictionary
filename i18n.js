// Bilingual Language Switcher Logic (English and Vietnamese)
const translations = {
    vi: {
        // Navigation
        nav_home: "Trang chủ",
        nav_dictionary: "Từ điển sinh quyển",
        nav_about: "Về chúng tôi",
        
        // Footer
        footer_desc: "Dự án sa bàn giáo dục 3D tương tác giới thiệu 4 sinh quyển chính của Trái Đất. Được chế tác hoàn toàn từ rác thải sinh hoạt tái chế nhằm nâng cao nhận thức bảo vệ môi trường và khuyến khích tái chế sáng tạo.",
        footer_academic: "Môn học: Con người & Môi trường | Lớp: 253_72HMAN10043_12 | Giảng viên: Cô Võ Thị Minh Hoàng",
        footer_explore: "Khám phá sinh quyển",
        footer_quick: "Liên kết nhanh",
        footer_copyright: "Bản quyền thuộc về Biosphere Journey.",
        footer_back_to_top: "Trở lại đầu trang",
        
        // Home Page
        hero_badge: "🎓 Dự Án Sa Bàn Giáo Dục",
        hero_title: "Biosphere Journey",
        hero_desc: "Khám phá sa bàn giáo dục 3D tương tác giới thiệu 4 sinh quyển lớn của Trái Đất. Được làm 100% từ rác thải tái chế gia đình như chai nhựa, bìa các-tông, túi nilon — dự án nhằm nâng cao ý thức bảo vệ môi trường, tôn vinh vẻ đẹp đa dạng sinh thái và tiềm năng tái chế sáng tạo.",
        hero_btn_explore: "Khám phá Sinh quyển",
        hero_btn_team: "Đội ngũ Phát triển",
        hero_visual_overlay: "Sa bàn tái chế 3D",
        
        bento_badge: "Vùng Sinh Thái",
        bento_title: "Khám phá các Sinh quyển",
        bento_subtitle: "Khám phá các đặc trưng riêng biệt, động thực vật và vật liệu tái chế của 4 sinh quyển chính trên Trái Đất.",
        
        bento_ocean_title: "Sinh quyển Đại dương",
        bento_ocean_desc: "Hòa mình vào dòng hải lưu túi nilon và rạn san hô làm từ chai nhựa rực rỡ.",
        bento_ocean_explore: "Khám phá Sinh quyển →",
        
        bento_forest_title: "Sinh quyển Rừng",
        bento_forest_desc: "Hành trình qua các tầng tán bằng bìa các-tông và thảm thực vật giấy nhiều lớp.",
        bento_forest_explore: "Khám phá Sinh quyển →",
        
        bento_desert_title: "Sinh quyển Sa mạc",
        bento_desert_desc: "Chiêm ngưỡng cồn cát túi nilon vàng và những cây xương rồng từ nắp chai nhựa.",
        bento_desert_explore: "Khám phá Sinh quyển →",
        
        bento_tundra_title: "Sinh quyển Đài nguyên",
        bento_tundra_desc: "Dạo bước giữa những dòng sông băng xốp trắng và thảm tuyết bông mềm mại.",
        bento_tundra_explore: "Khám phá Sinh quyển →",
        
        team_badge: "Đội Ngũ",
        team_title: "Đội Ngũ Phát Triển",
        cta_btn: "Xem chi tiết về dự án & Môn học →",
        
        // About Page
        about_badge: "Bối cảnh dự án",
        about_title: "Trường Đại học Văn Lang",
        about_title_sub: "Môn học Con người & Môi trường",
        about_instructor: "Giảng viên hướng dẫn: Cô Võ Thị Minh Hoàng",
        about_desc: "Dự án \"Biosphere Journey\" được thực hiện trong khuôn khổ môn học Human and Environment tại Trường Đại học Văn Lang. Thông qua dự án này, chúng tôi áp dụng các kiến thức cốt lõi về phát triển bền vững (Sustainable Development), biến đổi khí hậu (Climate Change), tăng trưởng xanh (Green Growth) và kinh tế tuần hoàn (Circular Economy) vào thực tiễn. Quá trình làm sa bàn tái chế không chỉ giúp nhóm rèn luyện tư duy phản biện, kỹ năng làm việc nhóm mà còn lan tỏa ý thức bảo vệ môi trường đến cộng đồng.",
        
        team_behind_badge: "Phía sau dự án",
        team_behind_title: "Thành Viên Nhóm",
        team_behind_subtitle: "Gặp gỡ những người sáng tạo và ủng hộ kiến thức môi trường thông qua tái chế sáng tạo.",
        
        process_badge: "Quy trình thực hiện",
        process_title: "Quá Trình Thực Hiện Sản Phẩm",
        process_subtitle: "Hành trình biến rác thải tái chế thành các mô hình sa bàn sinh quyển.",
        
        // Biome Detail pages
        back_to_dictionary: "Trở lại từ điển",
        infobox_title: "Thông tin sa bàn",
        fact_area: "Diện tích",
        fact_rainfall: "Lượng mưa",
        fact_climate: "Khí hậu",
        fact_carbon: "Lưu trữ carbon",
        fact_recycled: "Vật liệu tái chế",
        listen_podcast: "🎧 Nghe Podcast Sinh quyển",
        wiki_headline: "Thông tin từ Wikipedia",
        
        // Track list names
        track_forest: "Thích nghi sinh thái rừng nhiệt đới",
        track_desert: "Thích nghi cảnh quan hoang mạc",
        track_ocean: "Bảo tồn sinh vật biển",
        track_tundra: "Biến đổi khí hậu vùng đài nguyên"
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_dictionary: "Biomes dictionary",
        nav_about: "About us",
        
        // Footer
        footer_desc: "An interactive 3D educational diorama showcasing Earth's 4 major biomes. Handcrafted entirely from household recycled waste to raise environmental awareness and promote creative upcycling.",
        footer_academic: "Course: Human and Environment | Class: 253_72HMAN10043_12 | Lecturer: Dr. Võ Thị Minh Hoàng",
        footer_explore: "Explore Biomes",
        footer_quick: "Quick Links",
        footer_copyright: "© 2026 Biosphere Journey. All rights reserved.",
        footer_back_to_top: "Back to Top",
        
        // Home Page
        hero_badge: "🎓 Educational Diorama Project",
        hero_title: "Biosphere Journey",
        hero_desc: "Explore an interactive, 3D educational diorama showcasing Earth's four major biomes. Crafted 100% from household recycled waste—such as plastic bottles, cardboard, and nylon bags—this project raises awareness about environmental protection, highlighting the beauty of ecological diversity and the potential of creative upcycling.",
        hero_btn_explore: "Explore Biomes",
        hero_btn_team: "Meet the Team",
        hero_visual_overlay: "3D Recycled Diorama",
        
        bento_badge: "Ecological Zones",
        bento_title: "Explore the Biomes",
        bento_subtitle: "Discover the distinct characteristics, flora, fauna, and recycled materials of Earth's 4 major biomes.",
        
        bento_ocean_title: "Ocean Biome",
        bento_ocean_desc: "Dive into nylon bag currents and vibrant plastic bottle coral reefs.",
        bento_ocean_explore: "Explore Biome →",
        
        bento_forest_title: "Forest Biome",
        bento_forest_desc: "Journey through cardboard canopies and layered paper foliage.",
        bento_forest_explore: "Explore Biome →",
        
        bento_desert_title: "Desert Biome",
        bento_desert_desc: "Navigate styrofoam dunes and towering plastic bottle cacti.",
        bento_desert_explore: "Explore Biome →",
        
        bento_tundra_title: "Tundra Biome",
        bento_tundra_desc: "Walk among styrofoam glaciers and soft cotton ice sheets.",
        bento_tundra_explore: "Explore Biome →",
        
        team_badge: "The Team",
        team_title: "Development Team",
        cta_btn: "View details about project & course →",
        
        // About Page
        about_badge: "Project Background",
        about_title: "Van Lang University",
        about_title_sub: "Human & Environment Course",
        about_instructor: "Lecturer: Dr. Vo Thi Minh Hoang",
        about_desc: "The \"Biosphere Journey\" project was developed within the framework of the Human and Environment course at Van Lang University. Through this project, we apply core concepts of Sustainable Development, Climate Change, Green Growth, and Circular Economy into practice. Handcrafting these recycled dioramas not only helps us practice critical thinking and team collaboration but also extends environmental awareness to our local community.",
        
        team_behind_badge: "Behind the Project",
        team_behind_title: "Thành Viên Nhóm",
        team_behind_subtitle: "Meet the visionaries, creators, and advocates driving environmental literacy through upcycling.",
        
        process_badge: "How It's Made",
        process_title: "Product Making Process",
        process_subtitle: "The journey of turning household recycled waste into biosphere diorama models.",
        
        // Biome Detail pages
        back_to_dictionary: "Back to Dictionary",
        infobox_title: "Diorama Info",
        fact_area: "Area",
        fact_rainfall: "Rainfall",
        fact_climate: "Climate",
        fact_carbon: "Carbon Storage",
        fact_recycled: "Recycled Materials",
        listen_podcast: "🎧 Listen to the Podcast",
        wiki_headline: "Information from Wikipedia",
        
        // Track list names
        track_forest: "Tropical Forest Ecological Adaptations",
        track_desert: "Arid Landscape Adaptations",
        track_ocean: "Marine Biodiversity Conservation",
        track_tundra: "Tundra Climate Change Threats"
    }
};

// Global Helpers for Wikipedia API Translation
window.getWikiLanguage = function() {
    return localStorage.getItem('site_lang') || 'vi';
};

window.getTranslatedTopic = function(englishTopic) {
    const lang = window.getWikiLanguage();
    if (lang === 'vi') {
        const viMap = {
            'Forest': 'Rừng',
            'Ocean': 'Đại dương',
            'Desert': 'Hoang mạc',
            'Tundra': 'Đài nguyên'
        };
        return viMap[englishTopic] || englishTopic;
    }
    return englishTopic;
};

// Update active states on Language Toggle elements
function updateToggleButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Function to translate the page content based on site_lang
function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}

// Global Set Language Function
window.setLanguage = function(lang) {
    localStorage.setItem('site_lang', lang);
    updateToggleButtons(lang);
    translatePage(lang);
    
    // Dispatch custom event for page-specific code (like Wikipedia API calls or script.js) to re-trigger
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
};

// DOM Init
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site_lang') || 'vi';
    window.setLanguage(savedLang);

    // Event Delegation for switcher clicks
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            const lang = btn.getAttribute('data-lang');
            if (lang) {
                window.setLanguage(lang);
            }
        }
    });
});
