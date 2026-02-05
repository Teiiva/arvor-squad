// Enregistrement du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

// --- DONNÉES SIMULÉES (Backlog Sprint 1 & 4) ---
const eventsData = [
    { id: 1, title: "Opération Port de Co", location: "Brest", date: "Samedi 24 Jan • 14h", participants: 42, image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Plage du Moulin Blanc", location: "Brest", date: "Dimanche 25 Jan • 10h", participants: 128, image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Nettoyage Pointe Minou", location: "Plouzané", date: "Samedi 31 Jan • 09h", participants: 15, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Rocher de l'Impératrice", location: "Plougastel", date: "Dimanche 01 Fév • 14h", participants: 34, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Cale du Passage", location: "Le Relecq", date: "Mercredi 04 Fév • 17h", participants: 8, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800" },
];

const leadersData = [
    { rank: 1, name: "Enzo_TheCleaner", xp: "12,450 XP", badge: "🔱 Poséidon" },
    { rank: 2, name: "Sarah_Brest", xp: "9,200 XP", badge: "🌊 Gardien" },
    { rank: 3, name: "Teiva_Dev", xp: "8,850 XP", badge: "⚓ Capitaine" },
    { rank: 4, name: "Lancelot_Back", xp: "7,100 XP", badge: "🦀 Crabe" },
];

// --- RENDU DOM ---

// Fonction d'affichage des cartes (Sprint 1 & 2)
const eventsContainer = document.getElementById('event-grid');

function renderEvents(filter = 'all') {
    eventsContainer.innerHTML = ''; // Clear existing
    
    const filtered = filter === 'all' 
        ? eventsData 
        : eventsData.filter(e => e.location.includes(filter));

    filtered.forEach(event => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-xl overflow-hidden flex flex-col group cursor-pointer';
        card.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <div class="absolute top-4 right-4 bg-black/70 backdrop-blur text-white text-xs font-space px-3 py-1 rounded-full border border-teal-500/30">
                    ${event.participants} inscrits
                </div>
                <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <span class="text-teal-400 text-xs font-bold font-space uppercase tracking-widest mb-2 block">${event.location}</span>
                    <h3 class="text-2xl font-syne font-bold text-white mb-1 group-hover:text-teal-400 transition">${event.title}</h3>
                    <p class="text-gray-400 font-space text-sm">${event.date}</p>
                </div>
                <button class="mt-6 w-full py-3 border border-zinc-600 rounded text-sm font-space uppercase hover:bg-teal-400 hover:text-black hover:border-teal-400 transition font-bold">
                    Rejoindre
                </button>
            </div>
        `;
        eventsContainer.appendChild(card);
    });

    // Ré-animer les nouvelles cartes
    gsap.from(".glass-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
}

// Fonction d'affichage du Hall of Fame (Sprint 4)
const rankingContainer = document.getElementById('leaderboard');
leadersData.forEach(user => {
    const row = document.createElement('div');
    row.className = 'rank-row flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 rounded-lg';
    row.innerHTML = `
        <div class="flex items-center gap-6">
            <span class="text-4xl font-syne font-bold ${user.rank === 1 ? 'text-yellow-400' : 'text-gray-600'}">#${user.rank}</span>
            <div>
                <h4 class="text-xl font-bold font-syne text-white">${user.name}</h4>
                <span class="text-xs font-space text-teal-400 uppercase border border-teal-400/30 px-2 py-0.5 rounded">${user.badge}</span>
            </div>
        </div>
        <div class="font-space font-bold text-gray-300">${user.xp}</div>
    `;
    rankingContainer.appendChild(row);
});

// Initial Render
renderEvents();

// Gestion des Filtres (Sprint 2)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Style updates
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-teal-400/10', 'text-teal-400', 'border-teal-400');
            b.classList.add('border-zinc-700');
        });
        e.target.classList.remove('border-zinc-700');
        e.target.classList.add('bg-teal-400/10', 'text-teal-400', 'border-teal-400');
        
        // Logic
        renderEvents(e.target.dataset.filter);
    });
});


// --- ANIMATIONS GSAP (Le côté "Ultra-Moderne") ---

// 1. Hero Title Parallax
gsap.to(".hero-title", {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    y: 200,
    opacity: 0
});

// 2. Compteurs (Impact Gauge - Sprint 4)
gsap.from(".counter-anim", {
    scrollTrigger: {
        trigger: "#trash-counter",
        start: "top 80%",
    },
    textContent: 0,
    duration: 2,
    ease: "power1.out",
    snap: { textContent: 1 },
    stagger: 0.2,
    onUpdate: function() {
        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
    }
});

// Pour la démo, on force les valeurs finales
document.getElementById('trash-counter').textContent = "842";
document.getElementById('user-counter').textContent = "1,204";


// 3. Hall of Fame slide in
gsap.from(".rank-row", {
    scrollTrigger: {
        trigger: "#ranking",
        start: "top 70%",
    },
    x: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)"
});