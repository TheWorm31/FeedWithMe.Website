// Initialize Lucide icons
lucide.createIcons();

// Initialize International Phone Input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: 'auto',
        geoIpLookup: function(callback) {
            fetch('https://ipapi.co/json/')
                .then(function(res) { return res.json(); })
                .then(function(data) { callback(data.country_code); })
                .catch(function() { callback('us'); });
        },
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.16/build/js/utils.js',
        preferredCountries: ['us', 'gb', 'it', 'fr', 'de', 'es'],
        separateDialCode: true,
        autoPlaceholder: 'aggressive'
    });
}

// AOS Initialization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Header scroll effect
const header = document.getElementById('main-header');
window.onscroll = function() {
    if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.storageKey = 'feedwithme_cookie_consent';
        this.init();
    }

    init() {
        // Check if user has already made a choice
        const consent = this.getConsent();
        if (!consent) {
            this.showBanner();
        }

        this.bindEvents();
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    bindEvents() {
        // Cookie banner buttons
        document.getElementById('cookie-accept-btn')?.addEventListener('click', () => {
            this.acceptAll();
        });

        document.getElementById('cookie-decline-btn')?.addEventListener('click', () => {
            this.declineAll();
        });

        document.getElementById('cookie-preferences-btn')?.addEventListener('click', () => {
            this.showPreferencesModal();
        });

        // Privacy policy link in banner
        document.getElementById('privacy-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPrivacyModal();
        });

        // Footer links
        document.getElementById('footer-privacy-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPrivacyModal();
        });

        document.getElementById('footer-terms-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showTermsModal();
        });

        // Modal close buttons
        document.getElementById('close-preferences-modal')?.addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        document.getElementById('close-privacy-modal')?.addEventListener('click', () => {
            this.hidePrivacyModal();
        });

        document.getElementById('close-terms-modal')?.addEventListener('click', () => {
            this.hideTermsModal();
        });

        // Preferences modal buttons
        document.getElementById('save-preferences-btn')?.addEventListener('click', () => {
            this.savePreferences();
        });

        document.getElementById('accept-all-preferences-btn')?.addEventListener('click', () => {
            this.acceptAll();
        });

        // Close modals when clicking outside
        document.getElementById('cookie-preferences-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-preferences-modal') {
                this.hidePreferencesModal();
            }
        });

        document.getElementById('privacy-policy-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'privacy-policy-modal') {
                this.hidePrivacyModal();
            }
        });

        document.getElementById('terms-service-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'terms-service-modal') {
                this.hideTermsModal();
            }
        });
    }

    acceptAll() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        this.setConsent(consent);
        this.hideBanner();
        this.hidePreferencesModal();
        this.loadAnalytics();
        this.loadMarketing();
    }

    declineAll() {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        this.setConsent(consent);
        this.hideBanner();
        this.hidePreferencesModal();
    }

    savePreferences() {
        const analytics = document.getElementById('analytics-cookies')?.checked || false;
        const marketing = document.getElementById('marketing-cookies')?.checked || false;
        
        const consent = {
            essential: true,
            analytics: analytics,
            marketing: marketing,
            timestamp: new Date().toISOString()
        };
        
        this.setConsent(consent);
        this.hideBanner();
        this.hidePreferencesModal();
        
        if (analytics) this.loadAnalytics();
        if (marketing) this.loadMarketing();
    }

    showPreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.style.display = 'flex';
            // Set current preferences
            const consent = this.getConsent();
            if (consent) {
                document.getElementById('analytics-cookies').checked = consent.analytics;
                document.getElementById('marketing-cookies').checked = consent.marketing;
            }
        }
    }

    hidePreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showPrivacyModal() {
        const modal = document.getElementById('privacy-policy-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hidePrivacyModal() {
        const modal = document.getElementById('privacy-policy-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showTermsModal() {
        const modal = document.getElementById('terms-service-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideTermsModal() {
        const modal = document.getElementById('terms-service-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    setConsent(consent) {
        localStorage.setItem(this.storageKey, JSON.stringify(consent));
    }

    getConsent() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    loadAnalytics() {
        // Placeholder for analytics loading (Google Analytics, etc.)
        console.log('Analytics cookies accepted - loading analytics...');
        // Example: gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }

    loadMarketing() {
        // Placeholder for marketing cookies loading
        console.log('Marketing cookies accepted - loading marketing...');
        // Example: gtag('consent', 'update', { 'ad_storage': 'granted' });
    }
}

// Language Management System
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {
            en: {
                // Navigation
                'nav.features': 'Features',
                'nav.how-it-works': 'How It Works',
                'nav.pricing': 'Pricing',
                'nav.team': 'Team',
                'nav.get-access': 'Get Early Access',
                
                // Hero Section
                'hero.title': 'What You Eat Is Who You Are',
                'hero.subtitle': 'Share it. Live it better. Do it with respect.',
                'hero.description': 'Discover a smarter way to eat with your AI-powered recipe companion, and revolutionize your relationship with food forever.',
                'hero.cta': 'Get Early Access',
                
                // Problem Section
                'problem.title': 'End Your Daily Food Dilemma',
                'problem.subtitle': 'In a busy world, building a healthy, conscious, and sustainable relationship with food is harder than ever. We get it.',
                'problem.overload.title': 'App Overload, Zero Clarity',
                'problem.overload.desc': 'Juggling separate apps for calories, recipes, and shopping lists is a mess. You need one integrated hub for everything food.',
                'problem.generic.title': 'Generic Plans, No Inclusivity',
                'problem.generic.desc': 'Your unique dietary needs—whether for health, culture, or ethics—deserve more than a one-size-fits-all approach.',
                'problem.wasteful.title': 'Wasteful Habits, Wasted Money',
                'problem.wasteful.desc': 'Food waste starts at home. Without the right tools to plan and manage your pantry, you\'re throwing away good food and money.',
                
                // Solution Section
                'solution.title': 'The All-in-One Smart Food App',
                'solution.subtitle': 'FeedWithMe is your integrated food ecosystem. We simplify meal management, celebrate your unique diet, and empower you to waste less.',
                'solution.all-in-one.title': 'All In One',
                'solution.all-in-one.desc': 'Recipes, nutrition, and planning in one seamless interface.',
                'solution.personalization.title': 'Personalization',
                'solution.personalization.desc': 'Adapts to your tastes, allergies, and ethical or religious diets.',
                'solution.waste.title': 'Waste Reduction',
                'solution.waste.desc': 'Smart suggestions to use up ingredients and leftovers.',
                'solution.eco.title': 'Eco-Conscious',
                'solution.eco.desc': 'Learn the environmental impact of your meals.',
                'solution.community.title': 'Community',
                'solution.community.desc': 'Connect, share, and get inspired with a vibrant community of food lovers.',
                
                // Features Section
                'features.title': 'Powerful Features for Your Food Journey',
                'features.subtitle': 'We\'ve packed FeedWithMe with intuitive tools to make your food journey effortless and inspiring.',
                'features.personalized.title': 'Personalized Recipes',
                'features.personalized.desc': 'Get recipes tailored to your health goals, tastes, and dietary needs.',
                'features.ai.title': 'AI Ingredient Recognition',
                'features.ai.desc': 'Snap a photo of your ingredients and let our AI create a recipe for you.',
                'features.social.title': 'Social Community',
                'features.social.desc': 'Share your culinary creations and exchange tips in a supportive community.',
                'features.progress.title': 'Progress Tracking',
                'features.progress.desc': 'Monitor your well-being, track your nutrition, and celebrate your achievements.',
                'features.wearable.title': 'Wearable Integration',
                'features.wearable.desc': 'Sync with your smart watch to connect your activity to your nutrition plan.',
                'features.shopping.title': 'Smart Shopping List',
                'features.shopping.desc': 'Automatically generate your shopping list and never forget an item again.',
                
                // How It Works Section
                'how-it-works.title': 'Get Started in 3 Simple Steps',
                'how-it-works.subtitle': 'Transforming your diet has never been easier.',
                'how-it-works.step1.title': 'Snap Your Ingredients',
                'how-it-works.step1.desc': 'Use your camera to instantly recognize the food you have. No more guessing what\'s for dinner.',
                'how-it-works.step2.title': 'Get AI-Powered Recipes',
                'how-it-works.step2.desc': 'Our AI crafts personalized recipes based on your ingredients, goals, and preferences.',
                'how-it-works.step3.title': 'Track, Share & Enjoy',
                'how-it-works.step3.desc': 'Log your meals, monitor your progress, and share your culinary journey with the community.',
                
                // Technology Section
                'tech.title': 'Powered by Intelligent Technology',
                'tech.subtitle': 'We use cutting-edge AI to make your experience deeply personal, intuitive, and effective.',
                'tech.ml.title': 'Advanced Machine Learning',
                'tech.ml.desc': 'Algorithms that learn your preferences to provide smarter, more personalized suggestions over time.',
                'tech.visual.title': 'Visual Recognition',
                'tech.visual.desc': 'Identify ingredients with your camera and get instant, creative recipe ideas.',
                'tech.environmental.title': 'Environmental Impact Analysis',
                'tech.environmental.desc': 'Automatically measure the sustainability of your recipes and get tips for greener alternatives.',
                
                // Pricing Section
                'pricing.title': 'Choose Your Plan',
                'pricing.subtitle': 'Start for free and upgrade when you\'re ready for the full experience.',
                'pricing.free.title': 'Free Tier',
                'pricing.free.subtitle': 'Perfect for getting started on your food journey.',
                'pricing.free.price': '$0',
                'pricing.free.period': '/month',
                'pricing.free.basic': 'Basic Recipe Access',
                'pricing.free.nutrition': 'Nutritional Tracking',
                'pricing.free.community': 'Community Access',
                'pricing.free.leftovers': 'Manual Leftover Management',
                'pricing.free.cta': 'Get Started',
                'pricing.pro.title': 'Pro Tier',
                'pricing.pro.subtitle': 'Unlock the full power of AI for a smarter diet.',
                'pricing.pro.price': '$9.99',
                'pricing.pro.period': '/month',
                'pricing.pro.popular': 'Most Popular',
                'pricing.pro.everything': 'Everything in Free, plus:',
                'pricing.pro.ai': 'AI Ingredient Recognition',
                'pricing.pro.advanced': 'Advanced Meal Plans',
                'pricing.pro.exclusive': 'Exclusive Content & Challenges',
                'pricing.pro.cta': 'Go Pro',
                
                // Testimonials Section
                'testimonials.title': 'Loved by Foodies Like You',
                'testimonials.subtitle': 'Don\'t just take our word for it. Here\'s what our early users are saying.',
                'testimonials.jessica': 'FeedWithMe has completely changed how I cook. I\'m wasting less food and discovering amazing new recipes with ingredients I already have!',
                'testimonials.mark': 'As someone with specific dietary needs, the personalization is a game-changer. The AI actually understands my restrictions and makes my life so much easier.',
                'testimonials.sarah': 'Finally, an app that brings everything together. The community features are fantastic for inspiration. Highly recommended!',
                
                // Team Section
                'team.title': 'Meet the Innovators',
                'team.subtitle': 'The passionate team dedicated to bringing FeedWithMe to your kitchen.',
                
                // FAQ Section
                'faq.title': 'Frequently Asked Questions',
                'faq.diets.question': 'Is FeedWithMe suitable for specific diets like vegan, keto, or gluten-free?',
                'faq.diets.answer': 'Absolutely! FeedWithMe is designed for high personalization. You can specify any dietary requirements, including vegan, keto, gluten-free, halal, kosher, and various allergies. Our AI will then tailor all recipe suggestions to fit your unique needs.',
                'faq.ai.question': 'How does the AI ingredient recognition work?',
                'faq.ai.answer': 'Our AI uses advanced visual recognition technology. Simply take a photo of your ingredients—whether they\'re on your countertop or in your fridge—and the app will identify them and suggest delicious recipes you can make right away. This feature is part of our Pro Tier.',
                'faq.nutrition.question': 'Can I use the app to track my nutritional intake?',
                'faq.nutrition.answer': 'Yes, both our Free and Pro tiers include nutritional tracking. You can easily log your meals to monitor your intake of calories, macros (protein, carbs, fat), and micronutrients to stay on top of your health goals.',
                'faq.availability.question': 'When will the app be available?',
                'faq.availability.answer': 'We are working hard to launch soon! Sign up for our newsletter to get early access and be the first to know when we go live on the App Store and Google Play.',
                
                        // Footer Section
                        'footer.title': 'Ready to Transform Your Diet?',
                        'footer.subtitle': 'Be the first to know. Join our newsletter for early access, exclusive updates, and special content.',
                        'footer.email-placeholder': 'Enter your email',
                        'footer.subscribe': 'Subscribe',
                        
                        // Join Us Form
                        'form.title': 'Join Our Journey',
                        'form.subtitle': 'Help us build the future of food. Join our community of early adopters and be part of creating something amazing.',
                        'form.name': 'Your Name',
                        'form.surname': 'Your Surname',
                        'form.email': 'Your Email',
                        'form.phone': 'Your Mobile Number (Optional)',
                        'form.role': 'How would you like to help?',
                        'form.role.beta-tester': 'Beta Tester',
                        'form.role.feedback-provider': 'Provide Feedback',
                        'form.role.early-adopter': 'Early Adopter',
                        'form.role.community-member': 'Community Member',
                        'form.role.other': 'Other',
                        'form.message': 'Tell us about yourself and why you\'re interested in joining FeedWithMe (Optional)',
                        'form.privacy': 'I agree to the Privacy Policy and consent to the processing of my personal data for the purposes of joining the FeedWithMe community and receiving updates about the project.',
                        'form.submit': 'Join Us',
                        'form.success': 'We\'ll keep you updated on our progress and let you know when we\'re ready for testing!',
                'footer.description': 'Your AI-powered recipe companion for a healthier, more sustainable life.',
                'footer.product': 'Product',
                'footer.company': 'Company',
                'footer.about': 'About Us',
                'footer.careers': 'Careers',
                'footer.contact': 'Contact Us',
                'footer.support': 'Support & Legal',
                'footer.copyright': '© 2025 FeedWithMe. All rights reserved.',
                
                // Cookie Consent
                'cookies.title': '🍪 We use cookies to enhance your experience',
                'cookies.description': 'We use cookies to personalize content, analyze our traffic, and improve our services. By continuing to use our site, you consent to our use of cookies.',
                'cookies.learn-more': 'Learn more in our Privacy Policy',
                'cookies.preferences': 'Cookie Preferences',
                'cookies.decline': 'Decline All',
                'cookies.accept': 'Accept All',
                'cookies.essential.title': 'Essential Cookies',
                'cookies.essential.desc': 'Required for basic website functionality',
                'cookies.essential.always': 'Always Active',
                'cookies.essential.info': 'These cookies are necessary for the website to function and cannot be switched off. They include session cookies, security cookies, and accessibility preferences.',
                'cookies.analytics.title': 'Analytics Cookies',
                'cookies.analytics.desc': 'Help us understand how visitors interact with our website',
                'cookies.analytics.info': 'These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve our website and provide better user experience.',
                'cookies.marketing.title': 'Marketing Cookies',
                'cookies.marketing.desc': 'Used to deliver personalized advertisements',
                'cookies.marketing.info': 'These cookies are used to track visitors across websites to display relevant and engaging advertisements. They may also be used to limit the number of times you see an advertisement.',
                'cookies.save': 'Save Preferences',
                'cookies.accept-all': 'Accept All',
                
                // Privacy Policy
                'privacy.title': 'Privacy Policy',
                'privacy.last-updated': 'Last updated: January 2025',
                'privacy.section1.title': '1. Information We Collect',
                'privacy.section1.content': 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, dietary preferences, and recipe data.',
                'privacy.section2.title': '2. How We Use Your Information',
                'privacy.section2.content': 'We use the information we collect to provide, maintain, and improve our services, personalize your experience, communicate with you, and ensure the security of our platform.',
                'privacy.section3.title': '3. Information Sharing',
                'privacy.section3.content': 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.',
                'privacy.section4.title': '4. Data Security',
                'privacy.section4.content': 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                'privacy.section5.title': '5. Your Rights',
                'privacy.section5.content': 'You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us at any time.',
                'privacy.section6.title': '6. Contact Us',
                'privacy.section6.content': 'If you have any questions about this Privacy Policy, please contact us at',
                
                // Terms of Service
                'terms.title': 'Terms of Service',
                'terms.last-updated': 'Last updated: January 2025',
                'terms.section1.title': '1. Acceptance of Terms',
                'terms.section1.content': 'By accessing and using FeedWithMe, you accept and agree to be bound by the terms and provision of this agreement.',
                'terms.section2.title': '2. Use License',
                'terms.section2.content': 'Permission is granted to temporarily download one copy of FeedWithMe for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
                'terms.section3.title': '3. User Accounts',
                'terms.section3.content': 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding your account credentials.',
                'terms.section4.title': '4. Prohibited Uses',
                'terms.section4.content': 'You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts, or to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.',
                'terms.section5.title': '5. Content Responsibility',
                'terms.section5.content': 'You are responsible for the content you share on our platform. We reserve the right to remove content that violates our community guidelines or terms of service.',
                'terms.section6.title': '6. Service Availability',
                'terms.section6.content': 'We strive to maintain service availability but do not guarantee uninterrupted access. We may modify or discontinue the service at any time.',
                'terms.section7.title': '7. Limitation of Liability',
                'terms.section7.content': 'In no event shall FeedWithMe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.',
                'terms.section8.title': '8. Contact Information',
                'terms.section8.content': 'If you have any questions about these Terms of Service, please contact us at'
            },
            it: {
                // Navigation
                'nav.features': 'Funzionalità',
                'nav.how-it-works': 'Come Funziona',
                'nav.pricing': 'Prezzi',
                'nav.team': 'Team',
                'nav.get-access': 'Ottieni Accesso Anticipato',
                
                // Hero Section
                'hero.title': 'Quello Che Mangi È Chi Sei',
                'hero.subtitle': 'Condividilo. Vivilo meglio. Fallo con rispetto.',
                'hero.description': 'Scopri un modo più intelligente di mangiare con il tuo compagno di ricette alimentato dall\'IA, e rivoluziona per sempre il tuo rapporto con il cibo.',
                'hero.cta': 'Ottieni Accesso Anticipato',
                
                // Problem Section
                'problem.title': 'Metti Fine al Tuo Dilemma Alimentare Quotidiano',
                'problem.subtitle': 'In un mondo frenetico, costruire una relazione sana, consapevole e sostenibile con il cibo è più difficile che mai. Lo capiamo.',
                'problem.overload.title': 'Sovraccarico di App, Zero Chiarezza',
                'problem.overload.desc': 'Giocolare con app separate per calorie, ricette e liste della spesa è un disastro. Hai bisogno di un hub integrato per tutto ciò che riguarda il cibo.',
                'problem.generic.title': 'Piani Generici, Nessuna Inclusività',
                'problem.generic.desc': 'Le tue esigenze dietetiche uniche—che siano per salute, cultura o etica—meritano più di un approccio unico per tutti.',
                'problem.wasteful.title': 'Abitudini Sprecone, Soldi Sprecati',
                'problem.wasteful.desc': 'Lo spreco alimentare inizia a casa. Senza gli strumenti giusti per pianificare e gestire la tua dispensa, stai buttando via buon cibo e soldi.',
                
                // Solution Section
                'solution.title': 'L\'App Alimentare Intelligente Tutto-in-Uno',
                'solution.subtitle': 'FeedWithMe è il tuo ecosistema alimentare integrato. Semplifichiamo la gestione dei pasti, celebriamo la tua dieta unica e ti permettiamo di sprecare meno.',
                'solution.all-in-one.title': 'Tutto In Uno',
                'solution.all-in-one.desc': 'Ricette, nutrizione e pianificazione in un\'interfaccia senza soluzione di continuità.',
                'solution.personalization.title': 'Personalizzazione',
                'solution.personalization.desc': 'Si adatta ai tuoi gusti, allergie e diete etiche o religiose.',
                'solution.waste.title': 'Riduzione Sprechi',
                'solution.waste.desc': 'Suggerimenti intelligenti per utilizzare ingredienti e avanzi.',
                'solution.eco.title': 'Eco-Consapevole',
                'solution.eco.desc': 'Scopri l\'impatto ambientale dei tuoi pasti.',
                'solution.community.title': 'Comunità',
                'solution.community.desc': 'Connettiti, condividi e lasciati ispirare da una vivace comunità di amanti del cibo.',
                
                // Features Section
                'features.title': 'Funzionalità Potenti per il Tuo Percorso Alimentare',
                'features.subtitle': 'Abbiamo riempito FeedWithMe di strumenti intuitivi per rendere il tuo percorso alimentare senza sforzo e stimolante.',
                'features.personalized.title': 'Ricette Personalizzate',
                'features.personalized.desc': 'Ottieni ricette su misura per i tuoi obiettivi di salute, gusti ed esigenze dietetiche.',
                'features.ai.title': 'Riconoscimento Ingredienti IA',
                'features.ai.desc': 'Scatta una foto dei tuoi ingredienti e lascia che la nostra IA crei una ricetta per te.',
                'features.social.title': 'Comunità Sociale',
                'features.social.desc': 'Condividi le tue creazioni culinarie e scambia consigli in una comunità di supporto.',
                'features.progress.title': 'Monitoraggio Progressi',
                'features.progress.desc': 'Monitora il tuo benessere, traccia la tua nutrizione e celebra i tuoi successi.',
                'features.wearable.title': 'Integrazione Dispositivi',
                'features.wearable.desc': 'Sincronizza con il tuo smartwatch per collegare la tua attività al tuo piano nutrizionale.',
                'features.shopping.title': 'Lista Spesa Intelligente',
                'features.shopping.desc': 'Genera automaticamente la tua lista della spesa e non dimenticare mai più un articolo.',
                
                // How It Works Section
                'how-it-works.title': 'Inizia in 3 Semplici Passaggi',
                'how-it-works.subtitle': 'Trasformare la tua dieta non è mai stato così facile.',
                'how-it-works.step1.title': 'Scatta i Tuoi Ingredienti',
                'how-it-works.step1.desc': 'Usa la tua fotocamera per riconoscere istantaneamente il cibo che hai. Non più indovinare cosa cucinare per cena.',
                'how-it-works.step2.title': 'Ottieni Ricette Alimentate dall\'IA',
                'how-it-works.step2.desc': 'La nostra IA crea ricette personalizzate basate sui tuoi ingredienti, obiettivi e preferenze.',
                'how-it-works.step3.title': 'Traccia, Condividi e Goditi',
                'how-it-works.step3.desc': 'Registra i tuoi pasti, monitora i tuoi progressi e condividi il tuo percorso culinario con la comunità.',
                
                // Technology Section
                'tech.title': 'Alimentato da Tecnologia Intelligente',
                'tech.subtitle': 'Usiamo IA all\'avanguardia per rendere la tua esperienza profondamente personale, intuitiva ed efficace.',
                'tech.ml.title': 'Machine Learning Avanzato',
                'tech.ml.desc': 'Algoritmi che imparano le tue preferenze per fornire suggerimenti più intelligenti e personalizzati nel tempo.',
                'tech.visual.title': 'Riconoscimento Visivo',
                'tech.visual.desc': 'Identifica gli ingredienti con la tua fotocamera e ottieni idee di ricette creative istantanee.',
                'tech.environmental.title': 'Analisi Impatto Ambientale',
                'tech.environmental.desc': 'Misura automaticamente la sostenibilità delle tue ricette e ottieni consigli per alternative più verdi.',
                
                // Pricing Section
                'pricing.title': 'Scegli il Tuo Piano',
                'pricing.subtitle': 'Inizia gratuitamente e aggiorna quando sei pronto per l\'esperienza completa.',
                'pricing.free.title': 'Piano Gratuito',
                'pricing.free.subtitle': 'Perfetto per iniziare il tuo percorso alimentare.',
                'pricing.free.price': '€0',
                'pricing.free.period': '/mese',
                'pricing.free.basic': 'Accesso Ricette Base',
                'pricing.free.nutrition': 'Monitoraggio Nutrizionale',
                'pricing.free.community': 'Accesso Comunità',
                'pricing.free.leftovers': 'Gestione Manuale Avanzi',
                'pricing.free.cta': 'Inizia',
                'pricing.pro.title': 'Piano Pro',
                'pricing.pro.subtitle': 'Sblocca tutto il potere dell\'IA per una dieta più intelligente.',
                'pricing.pro.price': '€9,99',
                'pricing.pro.period': '/mese',
                'pricing.pro.popular': 'Più Popolare',
                'pricing.pro.everything': 'Tutto del Gratuito, più:',
                'pricing.pro.ai': 'Riconoscimento Ingredienti IA',
                'pricing.pro.advanced': 'Piani Pasti Avanzati',
                'pricing.pro.exclusive': 'Contenuti e Sfide Esclusivi',
                'pricing.pro.cta': 'Diventa Pro',
                
                // Testimonials Section
                'testimonials.title': 'Amato da Gourmet Come Te',
                'testimonials.subtitle': 'Non credere solo alle nostre parole. Ecco cosa dicono i nostri primi utenti.',
                'testimonials.jessica': 'FeedWithMe ha completamente cambiato il modo in cui cucino. Spreco meno cibo e scopro ricette incredibili con ingredienti che ho già!',
                'testimonials.mark': 'Come qualcuno con esigenze dietetiche specifiche, la personalizzazione è rivoluzionaria. L\'IA capisce davvero le mie restrizioni e mi rende la vita molto più facile.',
                'testimonials.sarah': 'Finalmente, un\'app che mette tutto insieme. Le funzionalità della comunità sono fantastiche per l\'ispirazione. Altamente raccomandato!',
                
                // Team Section
                'team.title': 'Incontra gli Innovatori',
                'team.subtitle': 'Il team appassionato dedicato a portare FeedWithMe nella tua cucina.',
                
                // FAQ Section
                'faq.title': 'Domande Frequenti',
                'faq.diets.question': 'FeedWithMe è adatto per diete specifiche come vegana, keto o senza glutine?',
                'faq.diets.answer': 'Assolutamente! FeedWithMe è progettato per alta personalizzazione. Puoi specificare qualsiasi requisito dietetico, inclusi vegano, keto, senza glutine, halal, kosher e varie allergie. La nostra IA adatterà quindi tutti i suggerimenti di ricette per adattarsi alle tue esigenze uniche.',
                'faq.ai.question': 'Come funziona il riconoscimento ingredienti IA?',
                'faq.ai.answer': 'La nostra IA utilizza tecnologia di riconoscimento visivo avanzata. Basta scattare una foto dei tuoi ingredienti—che siano sul tuo bancone o nel tuo frigo—e l\'app li identificherà e suggerirà deliziose ricette che puoi preparare subito. Questa funzionalità fa parte del nostro Piano Pro.',
                'faq.nutrition.question': 'Posso usare l\'app per tracciare il mio apporto nutrizionale?',
                'faq.nutrition.answer': 'Sì, sia il nostro piano Gratuito che Pro includono il monitoraggio nutrizionale. Puoi facilmente registrare i tuoi pasti per monitorare il tuo apporto di calorie, macro (proteine, carboidrati, grassi) e micronutrienti per rimanere in cima ai tuoi obiettivi di salute.',
                'faq.availability.question': 'Quando sarà disponibile l\'app?',
                'faq.availability.answer': 'Stiamo lavorando sodo per lanciare presto! Iscriviti alla nostra newsletter per ottenere accesso anticipato ed essere il primo a sapere quando andiamo live su App Store e Google Play.',
                
                        // Footer Section
                        'footer.title': 'Pronto a Trasformare la Tua Dieta?',
                        'footer.subtitle': 'Sii il primo a sapere. Unisciti alla nostra newsletter per accesso anticipato, aggiornamenti esclusivi e contenuti speciali.',
                        'footer.email-placeholder': 'Inserisci la tua email',
                        'footer.subscribe': 'Iscriviti',
                        
                        // Join Us Form
                        'form.title': 'Unisciti al Nostro Viaggio',
                        'form.subtitle': 'Aiutaci a costruire il futuro del cibo. Unisciti alla nostra comunità di early adopter e fai parte della creazione di qualcosa di straordinario.',
                        'form.name': 'Il Tuo Nome',
                        'form.surname': 'Il Tuo Cognome',
                        'form.email': 'La Tua Email',
                        'form.phone': 'Il Tuo Numero di Cellulare (Opzionale)',
                        'form.role': 'Come vorresti aiutarci?',
                        'form.role.beta-tester': 'Beta Tester',
                        'form.role.feedback-provider': 'Fornire Feedback',
                        'form.role.early-adopter': 'Early Adopter',
                        'form.role.community-member': 'Membro della Comunità',
                        'form.role.other': 'Altro',
                        'form.message': 'Raccontaci di te e perché sei interessato a unirti a FeedWithMe (Opzionale)',
                        'form.privacy': 'Accetto l\'Informativa sulla Privacy e consenso al trattamento dei miei dati personali per gli scopi di unirsi alla comunità FeedWithMe e ricevere aggiornamenti sul progetto.',
                        'form.submit': 'Unisciti a Noi',
                        'form.success': 'Ti terremo aggiornato sui nostri progressi e ti faremo sapere quando saremo pronti per i test!',
                'footer.description': 'Il tuo compagno di ricette alimentato dall\'IA per una vita più sana e sostenibile.',
                'footer.product': 'Prodotto',
                'footer.company': 'Azienda',
                'footer.about': 'Chi Siamo',
                'footer.careers': 'Carriere',
                'footer.contact': 'Contattaci',
                'footer.support': 'Supporto e Legale',
                'footer.copyright': '© 2025 FeedWithMe. Tutti i diritti riservati.',
                
                // Cookie Consent
                'cookies.title': '🍪 Utilizziamo i cookie per migliorare la tua esperienza',
                'cookies.description': 'Utilizziamo i cookie per personalizzare i contenuti, analizzare il nostro traffico e migliorare i nostri servizi. Continuando a utilizzare il nostro sito, acconsenti al nostro uso dei cookie.',
                'cookies.learn-more': 'Scopri di più nella nostra Informativa sulla Privacy',
                'cookies.preferences': 'Preferenze Cookie',
                'cookies.decline': 'Rifiuta Tutto',
                'cookies.accept': 'Accetta Tutto',
                'cookies.essential.title': 'Cookie Essenziali',
                'cookies.essential.desc': 'Necessari per la funzionalità base del sito web',
                'cookies.essential.always': 'Sempre Attivi',
                'cookies.essential.info': 'Questi cookie sono necessari per il funzionamento del sito web e non possono essere disattivati. Includono cookie di sessione, cookie di sicurezza e preferenze di accessibilità.',
                'cookies.analytics.title': 'Cookie Analytics',
                'cookies.analytics.desc': 'Ci aiutano a capire come i visitatori interagiscono con il nostro sito web',
                'cookies.analytics.info': 'Questi cookie raccolgono informazioni su come i visitatori utilizzano il nostro sito web, come quali pagine vengono visitate più spesso. Questo ci aiuta a migliorare il nostro sito web e fornire una migliore esperienza utente.',
                'cookies.marketing.title': 'Cookie Marketing',
                'cookies.marketing.desc': 'Utilizzati per fornire pubblicità personalizzate',
                'cookies.marketing.info': 'Questi cookie sono utilizzati per tracciare i visitatori attraverso i siti web per visualizzare pubblicità pertinenti e coinvolgenti. Possono anche essere utilizzati per limitare il numero di volte che vedi una pubblicità.',
                'cookies.save': 'Salva Preferenze',
                'cookies.accept-all': 'Accetta Tutto',
                
                // Privacy Policy
                'privacy.title': 'Informativa sulla Privacy',
                'privacy.last-updated': 'Ultimo aggiornamento: Gennaio 2025',
                'privacy.section1.title': '1. Informazioni che Raccogliamo',
                'privacy.section1.content': 'Raccogliamo informazioni che ci fornisci direttamente, come quando crei un account, utilizzi i nostri servizi o ci contatti per supporto. Questo può includere il tuo nome, indirizzo email, preferenze dietetiche e dati delle ricette.',
                'privacy.section2.title': '2. Come Utilizziamo le Tue Informazioni',
                'privacy.section2.content': 'Utilizziamo le informazioni che raccogliamo per fornire, mantenere e migliorare i nostri servizi, personalizzare la tua esperienza, comunicare con te e garantire la sicurezza della nostra piattaforma.',
                'privacy.section3.title': '3. Condivisione delle Informazioni',
                'privacy.section3.content': 'Non vendiamo, scambiamo o trasferiamo altrimenti le tue informazioni personali a terze parti senza il tuo consenso, eccetto come descritto in questa politica o come richiesto dalla legge.',
                'privacy.section4.title': '4. Sicurezza dei Dati',
                'privacy.section4.content': 'Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali contro accesso non autorizzato, alterazione, divulgazione o distruzione.',
                'privacy.section5.title': '5. I Tuoi Diritti',
                'privacy.section5.content': 'Hai il diritto di accedere, aggiornare o eliminare le tue informazioni personali. Puoi anche rinunciare a determinate comunicazioni da parte nostra in qualsiasi momento.',
                'privacy.section6.title': '6. Contattaci',
                'privacy.section6.content': 'Se hai domande su questa Informativa sulla Privacy, contattaci a',
                
                // Terms of Service
                'terms.title': 'Termini di Servizio',
                'terms.last-updated': 'Ultimo aggiornamento: Gennaio 2025',
                'terms.section1.title': '1. Accettazione dei Termini',
                'terms.section1.content': 'Accedendo e utilizzando FeedWithMe, accetti e acconsenti di essere vincolato dai termini e dalle disposizioni di questo accordo.',
                'terms.section2.title': '2. Licenza d\'Uso',
                'terms.section2.content': 'È concessa l\'autorizzazione per scaricare temporaneamente una copia di FeedWithMe per visualizzazione personale e non commerciale transitoria. Questa è la concessione di una licenza, non un trasferimento di titolo.',
                'terms.section3.title': '3. Account Utente',
                'terms.section3.content': 'Quando crei un account con noi, devi fornire informazioni accurate, complete e aggiornate in ogni momento. Sei responsabile della protezione delle credenziali del tuo account.',
                'terms.section4.title': '4. Usi Vietati',
                'terms.section4.content': 'Non puoi utilizzare il nostro servizio per alcuno scopo illegale o per sollecitare altri a compiere atti illegali, o per violare qualsiasi regolamento internazionale, federale, provinciale o statale, regole, leggi o ordinanze locali.',
                'terms.section5.title': '5. Responsabilità del Contenuto',
                'terms.section5.content': 'Sei responsabile del contenuto che condividi sulla nostra piattaforma. Ci riserviamo il diritto di rimuovere contenuti che violano le nostre linee guida della comunità o i termini di servizio.',
                'terms.section6.title': '6. Disponibilità del Servizio',
                'terms.section6.content': 'Ci sforziamo di mantenere la disponibilità del servizio ma non garantiamo accesso ininterrotto. Possiamo modificare o interrompere il servizio in qualsiasi momento.',
                'terms.section7.title': '7. Limitazione di Responsabilità',
                'terms.section7.content': 'In nessun caso FeedWithMe, né i suoi direttori, dipendenti, partner, agenti, fornitori o affiliati, saranno responsabili per danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dal tuo uso del servizio.',
                'terms.section8.title': '8. Informazioni di Contatto',
                'terms.section8.content': 'Se hai domande su questi Termini di Servizio, contattaci a'
            }
        };
        this.init();
    }

    init() {
        this.updateLanguageDisplay();
        this.translatePage();
        this.bindEvents();
    }

    bindEvents() {
        // Language selector events are handled by Alpine.js and onclick attributes
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        this.updateLanguageDisplay();
        this.translatePage();
    }

    updateLanguageDisplay() {
        const currentLangElement = document.getElementById('current-language');
        if (currentLangElement) {
            currentLangElement.textContent = this.currentLanguage.toUpperCase();
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage][key];
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'email') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getStoredLanguage() {
        return localStorage.getItem('feedwithme_language');
    }

    setStoredLanguage(lang) {
        localStorage.setItem('feedwithme_language', lang);
    }
}

// Global function for language switching
window.changeLanguage = function(lang) {
    if (window.languageManager) {
        window.languageManager.changeLanguage(lang);
    }
};

// Form submission handler
class FormHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.submitButton = document.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        // Set the language field based on current language
        const languageField = document.getElementById('language-field');
        if (languageField && window.languageManager) {
            languageField.value = window.languageManager.currentLanguage;
        }
        
        // Disable submit button and show loading state
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Sending...';
        
        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = {
                name: formData.get('name'),
                surname: formData.get('surname'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                role: formData.get('role'),
                message: formData.get('message'),
                privacy: formData.get('privacy')
            };

            // Submit to Netlify function
            const response = await fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccess();
                this.form.reset();
                // Reset phone input if using international phone input
                if (window.intlTelInput) {
                    const phoneInput = document.getElementById('phone');
                    if (phoneInput && phoneInput.intlTelInput) {
                        phoneInput.intlTelInput.destroy();
                        phoneInput.value = '';
                        // Reinitialize
                        window.intlTelInput(phoneInput, {
                            initialCountry: 'auto',
                            geoIpLookup: function(callback) {
                                fetch('https://ipapi.co/json/')
                                    .then(function(res) { return res.json(); })
                                    .then(function(data) { callback(data.country_code); })
                                    .catch(function() { callback('us'); });
                            },
                            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.16/build/js/utils.js',
                            preferredCountries: ['us', 'gb', 'it', 'fr', 'de', 'es'],
                            separateDialCode: true,
                            autoPlaceholder: 'aggressive'
                        });
                    }
                }
            } else {
                this.showError(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Network error. Please check your connection and try again.');
        } finally {
            // Re-enable submit button
            this.submitButton.disabled = false;
            this.submitButton.textContent = window.languageManager?.currentLanguage === 'it' ? 'Unisciti a Noi' : 'Join Us';
        }
    }

    showSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
        successDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>${window.languageManager?.currentLanguage === 'it' ? 'Grazie! Ti terremo aggiornato sui nostri progressi.' : 'Thank you! We\'ll keep you updated on our progress.'}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    showError(message) {
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
        errorDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize cookie consent, language manager, and form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
    window.languageManager = new LanguageManager();
    new FormHandler();
});
