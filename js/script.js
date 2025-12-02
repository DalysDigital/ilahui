const defaultConfig = {
    store_name: "ILAHUI",
    hero_title: "Your Korean Lifestyle Destination",
    hero_subtitle: "Discover curated stationery, beauty, home decor & more in the heart of Shillong",
    about_title: "About ILAHUI",
    about_text: "ILAHUI Shillong is your premier Korean-inspired lifestyle store in Meghalaya...",
    contact_phone: "+91 98765 43210",
    contact_email: "hello@ilahui-shillong.in",
    store_address: "Shillong, Meghalaya",
    // Colors
    background_gradient_start: "#ffffff",
    background_gradient_mid: "#f8f9fa",
    background_gradient_end: "#f1f3f5",
    text_color: "#333333",
    font_family: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
    font_size: 16
};

// Config Change Handler (For CMS/SDK updates)
async function onConfigChange(config) {
    const storeName = config.store_name || defaultConfig.store_name;
    const heroTitle = config.hero_title || defaultConfig.hero_title;
    const heroSubtitle = config.hero_subtitle || defaultConfig.hero_subtitle;
    
    // Update elements if they exist on the current page
    if(document.getElementById('nav-logo')) document.getElementById('nav-logo').textContent = storeName;
    if(document.getElementById('hero-title')) document.getElementById('hero-title').textContent = heroTitle;
    if(document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').textContent = heroSubtitle;
    if(document.getElementById('about-title')) document.getElementById('about-title').textContent = config.about_title;
    if(document.getElementById('about-text')) document.getElementById('about-text').textContent = config.about_text;
    
    // Update Global Colors
    const bgStart = config.background_gradient_start || defaultConfig.background_gradient_start;
    const bgMid = config.background_gradient_mid || defaultConfig.background_gradient_mid;
    const bgEnd = config.background_gradient_end || defaultConfig.background_gradient_end;
    
    document.body.style.background = `linear-gradient(135deg, ${bgStart} 0%, ${bgMid} 50%, ${bgEnd} 100%)`;
    document.body.style.color = config.text_color || defaultConfig.text_color;
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_gradient_start || defaultConfig.background_gradient_start,
                set: (value) => {
                    config.background_gradient_start = value;
                    if(window.elementSdk) window.elementSdk.setConfig({ background_gradient_start: value });
                }
            }
        ],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                if(window.elementSdk) window.elementSdk.setConfig({ font_family: value });
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["store_name", config.store_name || defaultConfig.store_name],
        ["hero_title", config.hero_title || defaultConfig.hero_title]
    ]);
}

// NOTE: Scroll auto-hide logic has been removed to keep the header sticky.

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}