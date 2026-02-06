// Enregistrement du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

// --- DONNÉES SIMULÉES (Backlog Sprint 1 & 4) ---
const eventsData = [
    { 
        id: 1, 
        title: "Opération Port de Commerce", 
        location: "Brest", 
        date: "Samedi 14 Fev • 14h", 
        participants: 42, 
        image: src= "port_de_commerce.jpg",
        description: "Nettoyage complet du Port de Commerce. Équipement fourni sur place. Gants, pinces et sacs biodégradables seront distribués. Convient aux débutants comme aux experts. RDV devant la capitainerie.",
        pollution: "Élevée",
        lat: 48.384232,
        lng: -4.471259,
        difficulty: "Facile",
        duration: "2h"
    },
    { 
        id: 2, 
        title: "Plage du Moulin Blanc", 
        location: "Brest", 
        date: "Dimanche 22 Fev • 10h", 
        participants: 128, 
        image: src= "plage_du_moulin_blanc.jpg",
        description: "Grande collecte sur la plage du Moulin Blanc. Animations et goûter offert aux participants. Événement familial avec ateliers de sensibilisation. Partenariat avec la ville de Brest.",
        pollution: "Moyenne",
        lat: 48.397518 ,
        lng: -4.428804,
        difficulty: "Facile",
        duration: "3h"
    },
    { 
        id: 3, 
        title: "Nettoyage Pointe Minou", 
        location: "Plouzané", 
        date: "Mercredi 25 Fev • 18h", 
        participants: 15, 
        image: src= "pointe_du_minou.jpg",
        description: "Nettoyage des rochers à la Pointe Minou. Prévoir des chaussures adaptées. Accès délicat, recommandé aux personnes en bonne condition physique. Vue magnifique sur le phare.",
        pollution: "Faible",
        lat: 48.336757 ,
        lng: -4.614697,
        difficulty: "Difficile",
        duration: "4h"
    },
    { 
        id: 4, 
        title: "Rocher de l'Impératrice", 
        location: "Plougastel", 
        date: "Dimanche 01 Mar • 14h", 
        participants: 34, 
        image: src= "rocher.jpg",
        description: "Collecte autour du célèbre Rocher de l'Impératrice. Vue imprenable garantie. Focus sur les microplastiques. Matériel fourni, prévoir de l'eau et une collation.",
        pollution: "Moyenne",
        lat: 48.388932 ,
        lng: -4.375883,
        difficulty: "Moyenne",
        duration: "2h30"
    },
    { 
        id: 5, 
        title: "Cale du Passage", 
        location: "Le Relecq", 
        date: "Mercredi 11 Mar • 17h", 
        participants: 8, 
        image: src= "cale.jpg",
        description: "Petite collecte en semaine pour les locaux. Ambiance conviviale. Parfait pour une première expérience. Après-midi suivi d'un pot convivial.",
        pollution: "Faible",
        lat: 48.396412 ,
        lng: -4.383953,
        difficulty: "Facile",
        duration: "1h30"
    },
    { 
        id: 6, 
        title: "Anse de Bertheaume", 
        location: "Plougonvelin", 
        date: "Samedi 21 Mar • 11h", 
        participants: 23, 
        image: src= "anse.jpg",
        description: "Nettoyage de l'Anse de Bertheaume, site naturel protégé. Encadrement par un garde du littoral. Collecte spécifique des filets de pêche.",
        pollution: "Moyenne",
        lat: 48.337006 ,
        lng: -4.697326,
        difficulty: "Moyenne",
        duration: "3h"
    }
];

const leadersData = [
    { rank: 1, name: "Enzo_TheCleaner", xp: "12,450 XP", badge: "🔱 Poséidon" },
    { rank: 2, name: "Sarah_Brest", xp: "9,200 XP", badge: "🌊 Gardien" },
    { rank: 3, name: "Teiva_Dev", xp: "8,850 XP", badge: "⚓ Capitaine" },
    { rank: 4, name: "Lancelot_Back", xp: "7,100 XP", badge: "🦀 Crabe" },
    { rank: 5, name: "Mathieu_Eco", xp: "6,800 XP", badge: "🐚 Coquillage" },
    { rank: 6, name: "Diane_Green", xp: "5,950 XP", badge: "🌿 Algues" },
];

// Variables globales
// Variables globales
// Variables globales
// Variables globales
let map = null;
let markers = [];
let currentFilter = 'all'; // <-- AJOUTER CETTE LIGNE
let zoomControlAdded = false;
let customIcon = null;
let markersLayer = L.layerGroup();
const mapLoading = document.getElementById('map-loading');

// --- RENDU DOM ---

// Fonction d'affichage des cartes (Sprint 1 & 2)
// Variables globales
const eventsContainer = document.getElementById('event-grid');
const rankingContainer = document.getElementById('leaderboard'); // <-- AJOUTE CETTE LIGNE

function renderEvents(filter = 'all') {
    currentFilter = filter;
    eventsContainer.innerHTML = ''; // Clear existing
    
    const filtered = filter === 'all' 
        ? eventsData 
        : eventsData.filter(e => {
            // Gestion spéciale pour "Le Relecq" qui est affiché différemment dans les données
            if (filter === "Le Relecq") {
                return e.location === "Le Relecq";
            }
            return e.location === filter;
        });

    if (filtered.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="w-20 h-20 mx-auto mb-6 text-teal-400 opacity-50">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <p class="text-gray-400 font-space text-lg mb-2">Aucune mission trouvée pour "${filter}"</p>
                <p class="text-gray-500 font-space text-sm mb-6">Essayez un autre filtre</p>
                <button class="px-6 py-3 bg-teal-400/10 border border-teal-400/30 text-teal-400 rounded-full hover:bg-teal-400 hover:text-black transition font-space text-sm font-bold view-all-btn">
                    Voir toutes les missions
                </button>
            </div>
        `;
        
        document.querySelector('.view-all-btn').addEventListener('click', () => {
            renderEvents('all');
            // Gestion des Filtres (Sprint 2) - Version corrigée
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // CORRECTION MAJEURE ICI : Utiliser currentTarget au lieu de target
                    const btnClicked = e.currentTarget; 
                    const filter = btnClicked.dataset.filter;
                    
                    // Mise à jour du style des boutons
                    document.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active', 'bg-teal-400/10', 'text-teal-400', 'border-teal-400');
                        b.classList.add('border-zinc-700', 'hover:border-teal-400');
                    });

                    // Appliquer le style au bouton cliqué
                    btnClicked.classList.add('active', 'bg-teal-400/10', 'text-teal-400', 'border-teal-400');
                    btnClicked.classList.remove('border-zinc-700', 'hover:border-teal-400');
                    
                    // Logique de filtrage
                    renderEvents(filter);
                    
                    // Si en vue carte, filtrer les marqueurs
                    if (map && document.getElementById('view-toggle').checked) {
                        filterMapMarkers(filter);
                    }
                });
            });
        });
        return;
    }

    filtered.forEach(event => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Calcul des points
        const points = calculatePoints(event.difficulty, event.pollution);
        
        card.innerHTML = `
            <div class="h-56 overflow-hidden relative">
                <!-- Badge de participants (existant) -->
                <div class="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs font-space px-3 py-1.5 rounded-full border border-teal-500/50 z-10 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                    </svg>
                    ${event.participants}
                </div>
                
                <!-- NOUVEAU : Badge de points par participant -->
                
                <!-- Badges de pollution et difficulté -->
                <div class="absolute bottom-4 left-4 right-4 flex items-center gap-2 z-10">
                    <!-- Pollution -->
                    <span class="text-xs font-space px-3 py-1.5 rounded-full ${getPollutionColor(event.pollution)} backdrop-blur-sm border border-opacity-30 flex items-center gap-1.5 min-w-[70px] justify-center">
                        <span class="w-1.5 h-1.5 rounded-full ${event.pollution === 'Élevée' ? 'bg-red-400' : event.pollution === 'Moyenne' ? 'bg-yellow-400' : 'bg-green-400'}"></span>
                        ${event.pollution}
                    </span>
                    
                    <!-- Difficulté -->
                    <span class="text-xs font-space px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-gray-300 ${getDifficultyBorder(event.difficulty)} flex items-center gap-1.5 min-w-[70px] justify-center">
                        <span class="w-1.5 h-1.5 rounded-full ${event.difficulty === 'Facile' ? 'bg-teal-400' : event.difficulty === 'Moyenne' ? 'bg-yellow-400' : 'bg-red-400'}"></span>
                        ${event.difficulty}
                    </span>
                    
                    <!-- Points (remplit l'espace restant) -->
                    <div class="flex-1 flex justify-end">
                        <div class="bg-gradient-to-r from-cyan-500 to-teal-400 backdrop-blur-sm text-black text-xs font-bold font-space px-3 py-1.5 rounded-full border border-cyan-300/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] flex items-center gap-1.5 points-badge">
                            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                            <span>${points} XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Image de l'événement -->
                <img src="${event.image}" alt="${event.title}" 
                     class="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                     loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70"></div>
            </div>
            
            <!-- Contenu de la carte -->
            <div class="p-6 flex-grow flex flex-col justify-between bg-zinc-900/30 backdrop-blur-sm">
                <div>
                    <!-- Localisation -->
                    <span class="text-teal-400 text-xs font-bold font-space uppercase tracking-widest mb-3 block flex items-center gap-2">
                        <span class="w-2 h-2 bg-teal-400 rounded-full"></span>
                        ${event.location}
                    </span>
                    
                    <!-- Titre -->
                    <h3 class="text-2xl font-syne font-bold text-white mb-3 group-hover:text-teal-400 transition duration-300">${event.title}</h3>
                    
                    <!-- Date et durée -->
                    <div class="flex items-center gap-2 text-gray-400 font-space text-sm mb-4">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${event.date}</span>
                        <span class="mx-2">•</span>
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>${event.duration}</span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-300 font-space text-sm leading-relaxed line-clamp-2 mb-2">
                        ${event.description.substring(0, 100)}...
                    </p>
                    
                </div>
                
                <!-- Bouton Plus d'infos -->
                <button class="mt-6 w-full py-3.5 bg-teal-400/10 border border-teal-400/30 text-teal-400 rounded-xl text-sm font-space uppercase hover:bg-teal-400 hover:text-black hover:border-teal-400 transition-all duration-300 font-bold view-details-btn hover-lift flex items-center justify-center gap-2 group/btn" 
                        data-id="${event.id}">
                    <span class="group-hover/btn:translate-x-1 transition-transform">Plus d'infos</span>
                    <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </button>
            </div>
        `;
        
        eventsContainer.appendChild(card);
        
        // Animation d'apparition
        setTimeout(() => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: Math.random() * 0.2
            });
        }, 100);
    });

    // Ajouter les événements aux boutons "Plus d'infos"
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(e.currentTarget.dataset.id);
            showMissionDetails(id);
        });
    });

    // Clique sur toute la carte pour ouvrir les détails
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-details-btn') && 
                !e.target.closest('.view-details-btn')) {
                const btn = this.querySelector('.view-details-btn');
                if (btn) {
                    const id = parseInt(btn.dataset.id);
                    showMissionDetails(id);
                }
            }
        });
    });
}

// Fonction pour obtenir la couleur de bordure en fonction de la difficulté
function getDifficultyBorder(difficulty) {
    switch(difficulty) {
        case 'Facile': return 'border border-teal-400/40';
        case 'Moyenne': return 'border border-yellow-400/40';
        case 'Difficile': return 'border border-red-400/40';
        default: return 'border border-gray-700/50';
    }
}

// Fonction pour obtenir la couleur en fonction du niveau de pollution
function getPollutionColor(pollution) {
    switch(pollution) {
        case 'Élevée': return 'bg-red-500/20 text-red-400 border-red-500/40';
        case 'Moyenne': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
        case 'Faible': return 'bg-green-500/20 text-green-400 border-green-500/40';
        default: return 'bg-zinc-800 text-gray-400';
    }
}

// Fonction d'affichage du Hall of Fame (Sprint 4)
function renderLeaderboard() {
    rankingContainer.innerHTML = ''; // Clear existing
    
    leadersData.forEach((user, index) => {
        const row = document.createElement('div');
        row.className = 'rank-row flex items-center justify-between p-6 border border-zinc-800 bg-zinc-900/30 rounded-xl mb-3 hover:bg-zinc-800/30 transition-all duration-300';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        row.innerHTML = `
            <div class="flex items-center gap-6">
                <div class="relative">
                    <span class="text-5xl font-syne font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : user.rank === 3 ? 'text-amber-600' : 'text-gray-600'}">
                        #${user.rank}
                    </span>
                    ${user.rank <= 3 ? `
                        <div class="absolute -top-2 -right-2 text-xl">
                            ${user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
                        </div>
                    ` : ''}
                </div>
                <div>
                    <h4 class="text-xl font-bold font-syne text-white mb-1">${user.name}</h4>
                    <span class="inline-block text-xs font-space text-teal-400 uppercase border border-teal-400/30 px-3 py-1 rounded-full bg-teal-400/10">
                        ${user.badge}
                    </span>
                </div>
            </div>
            <div class="font-space font-bold text-white text-2xl">${user.xp}</div>
        `;
        rankingContainer.appendChild(row);
        
        // Animation d'apparition
        setTimeout(() => {
            gsap.to(row, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out"
            });
        }, 100);
    });
}

// Initial Render
renderEvents();
renderLeaderboard();

// Gestion des Filtres (Sprint 2)
// Gestion des Filtres (Sprint 2)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // CORRECTION MAJEURE ICI : Utiliser currentTarget au lieu de target
        // currentTarget assure qu'on récupère toujours le bouton, même si on clique sur le texte
        const btnClicked = e.currentTarget; 
        const filter = btnClicked.dataset.filter;
        
        // Mise à jour du style des boutons
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-teal-400/10', 'text-teal-400', 'border-teal-400');
            b.classList.add('border-zinc-700', 'hover:border-teal-400');
        });

        // Appliquer le style au bouton cliqué (btnClicked)
        btnClicked.classList.add('active', 'bg-teal-400/10', 'text-teal-400', 'border-teal-400');
        btnClicked.classList.remove('border-zinc-700', 'hover:border-teal-400');
        
        // Logique de filtrage
        renderEvents(filter);
        
        // Si en vue carte, filtrer les marqueurs
        if (map && document.getElementById('view-toggle').checked) {
            filterMapMarkers(filter);
        }
    });
});

// --- GESTION DU SWITCH VUE TUILE/CARTE ---
const viewToggle = document.getElementById('view-toggle');
const tileView = document.getElementById('tile-view');
const mapView = document.getElementById('map-view');

viewToggle.addEventListener('change', function() {
    if (this.checked) {
        tileView.classList.add('hidden');
        mapView.classList.remove('hidden');
        
        if (!map) {
            initMap();
        } else {
            // Appliquer le filtre actuel sur la carte
            filterMapMarkers(currentFilter);
            
            // Redimensionner la carte
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        }
    } else {
        tileView.classList.remove('hidden');
        mapView.classList.add('hidden');
    }
});

// --- GESTION UNIQUE DES FILTRES ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        
        // Style visuel des boutons
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-teal-400/20', 'text-teal-400');
            b.classList.add('bg-zinc-800/50', 'text-gray-300');
        });
        e.currentTarget.classList.add('active', 'bg-teal-400/20', 'text-teal-400');

        renderEvents(filter);
        if (map) filterMapMarkers(filter);
    });
});

// --- INITIALISATION DE LA CARTE LEAFLET ---
function initMap() {
    // 1. Initialiser la carte si elle n'existe pas déjà
    if (map) return; 

    map = L.map('missions-map', {
        zoomControl: false
    }).setView([48.3871, -4.4888], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Ajouter le groupe de marqueurs à la carte
    markersLayer.addTo(map);

    // 2. Premier affichage des marqueurs (tous)
    updateMapMarkers(eventsData);

    // Zoom personnalisé
    if (!zoomControlAdded) {
        L.control.zoom({ position: 'topright' }).addTo(map);
        zoomControlAdded = true;
    }
    
    // Animation de chargement
    setTimeout(() => {
        gsap.to("#map-loading", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => document.getElementById('map-loading').style.display = 'none'
        });
    }, 800);
}

function updateMapMarkers(filteredEvents) {
    // On vide les marqueurs actuels
    markersLayer.clearLayers();

    const customIcon = L.divIcon({
        html: `<div class="w-12 h-12 bg-teal-500/90 backdrop-blur-sm border-2 border-white/80 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
                  <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                  </div>
               </div>`,
        className: 'custom-marker',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24]
    });

    filteredEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lng], { icon: customIcon });
        
        // Tooltip léger pour l'aperçu au survol
        marker.bindTooltip(`
            <div class="min-w-[120px] text-center">
                <strong class="text-sm font-syne">${event.title}</strong><br>
                <span class="text-xs text-gray-300">${event.location}</span>
            </div>
        `, {
            direction: 'top',
            offset: [0, -15],
            className: 'custom-tooltip',
            opacity: 0.9
        });
        
        // Popup principale avec toutes les infos
        const popupContent = `
            <div class="popup-content min-w-[280px] max-w-[300px] p-0">
                <div class="relative">
                    <div class="h-32 overflow-hidden rounded-t-lg">
                        <img src="${event.image}" alt="${event.title}" 
                             class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-space px-2 py-1 rounded-full border border-teal-500/50 flex items-center gap-1">
                        
                    </div>
                </div>
                
                <div class="p-4 bg-zinc-900">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-teal-400 text-xs font-bold font-space uppercase tracking-wider">
                            ${event.location}
                        </span>
                        <span class="text-xs text-gray-400">•</span>
                        <span class="text-xs text-gray-400">${event.date}</span>
                    </div>
                    
                    <h3 class="font-bold text-lg text-white mb-3 font-syne leading-tight">${event.title}</h3>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="text-xs font-medium px-2.5 py-1 rounded-full ${getPollutionColor(event.pollution)}">
                            ${event.pollution}
                        </span>
                        <span class="text-xs text-gray-300 bg-zinc-800 px-2.5 py-1 rounded-full ${getDifficultyBorder(event.difficulty)}">
                            ${event.difficulty}
                        </span>
                        <span class="text-xs text-gray-300 bg-zinc-800 px-2.5 py-1 rounded-full">
                            ${event.duration}
                        </span>
                    </div>
                    
                    <p class="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                        ${event.description.substring(0, 80)}...
                    </p>
                    
                    <button onclick="showMissionDetails(${event.id})" 
                            class="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-all duration-300 font-space hover:shadow-lg hover:shadow-teal-500/20">
                        Voir les détails complets
                    </button>
                </div>
            </div>
        `;
        
        // Créer la popup une seule fois et l'attacher au marqueur
        marker._popup = L.popup({
            maxWidth: 320,
            minWidth: 280,
            className: 'custom-popup',
            autoPanPadding: [20, 20],
            closeButton: true
        }).setContent(popupContent);
        
        // Événement pour ouvrir la popup au clic
        marker.on('click', function(e) {
            // Fermer les autres popups d'abord
            markersLayer.eachLayer(function(layer) {
                if (layer !== marker && layer._popup) {
                    map.closePopup(layer._popup);
                }
            });
            
            // Ouvrir la popup du marqueur cliqué
            marker._popup.setLatLng(e.latlng);
            map.openPopup(marker._popup);
            
            // Prévenir la propagation pour éviter d'autres événements
            L.DomEvent.stopPropagation(e);
        });

        marker.addTo(markersLayer);
        
        // Stocker l'ID de l'événement sur le marqueur
        marker._eventId = event.id;
    });

    // Optionnel : Ajuster la vue pour voir tous les marqueurs filtrés
    if (filteredEvents.length > 0) {
        const group = new L.featureGroup(markersLayer.getLayers());
        map.fitBounds(group.getBounds().pad(0.2));
    }
}

function filterMapMarkers(filter) {
    if (!map) return;
    
    const filtered = filter === 'all' 
        ? eventsData 
        : eventsData.filter(e => {
            if (filter === "Le Relecq") {
                return e.location === "Le Relecq";
            }
            return e.location === filter;
        });
    
    updateMapMarkers(filtered);
}

// --- POPUP DE DÉTAILS DE MISSION ---
const missionPopup = document.getElementById('mission-popup');
const closePopupBtn = document.getElementById('close-popup');

function showMissionDetails(id) {
    const mission = eventsData.find(m => m.id === id);
    if (!mission) return;
    
    // Remplir les données du popup
    document.getElementById('popup-location').textContent = mission.location;
    document.getElementById('popup-title').textContent = mission.title;
    document.getElementById('popup-date').textContent = mission.date;
    document.getElementById('popup-image').src = mission.image;
    document.getElementById('popup-participants').textContent = mission.participants + ' personnes';
    document.getElementById('popup-pollution').textContent = mission.pollution;
    
    // Ajouter des informations supplémentaires
    const descriptionElement = document.getElementById('popup-description');
    descriptionElement.innerHTML = `
        <p class="mb-6 text-gray-300 font-space leading-relaxed">${mission.description}</p>
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 ${getDifficultyBorder(mission.difficulty)}">
                <p class="text-gray-400 text-xs font-space uppercase mb-2">Difficulté</p>
                <p class="font-bold text-white text-xl font-syne">${mission.difficulty}</p>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                <p class="text-gray-400 text-xs font-space uppercase mb-2">Durée</p>
                <p class="font-bold text-white text-xl font-syne">${mission.duration}</p>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                <p class="text-gray-400 text-xs font-space uppercase mb-2">Type</p>
                <p class="font-bold text-white text-xl font-syne">Collecte ${mission.pollution.toLowerCase()}</p>
            </div>
            <div class="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                <p class="text-gray-400 text-xs font-space uppercase mb-2">Équipement</p>
                <p class="font-bold text-white text-xl font-syne">Fourni</p>
            </div>
        </div>
    `;
    
    // Afficher le popup
    missionPopup.classList.remove('hidden');
    missionPopup.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
    
    // Animer l'apparition
    gsap.from(missionPopup, {
        opacity: 0,
        duration: 0.3
    });
    
    // Si en vue carte, recentrer sur le marqueur
    if (map && viewToggle.checked) {
        const marker = markers.find(m => m._eventId === id);
        if (marker) {
            map.setView([mission.lat, mission.lng], 14);
            marker.openPopup();
        }
    }
}

// Fermer le popup
closePopupBtn.addEventListener('click', function() {
    closeMissionPopup();
});

// Fermer le popup en cliquant à l'extérieur
missionPopup.addEventListener('click', function(e) {
    if (e.target === this) {
        closeMissionPopup();
    }
});

// Fonction pour fermer le popup
function closeMissionPopup() {
    missionPopup.classList.remove('flex');
    missionPopup.classList.add('hidden');
    document.body.style.overflow = ''; // Réactiver le scroll
}

// Fermer avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && missionPopup.classList.contains('flex')) {
        closeMissionPopup();
    }
});







// Gestion Menu Mobile
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Navbar Scroll Effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'py-3');
        navbar.classList.remove('py-4', 'mix-blend-difference');
    } else {
        navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'py-3');
        navbar.classList.add('py-4');
        // Optionnel : remettre mix-blend-difference si le fond est clair, sinon retirer
    }
});

// --- FONCTIONS POUR LA SECTION IMPACT DYNAMIQUE ---

// Données dynamiques pour la section Impact
const impactData = {
    totalTrash: 1842, // kg
    totalUsers: 1204,
    totalMissions: 147,
    trashToday: 42, // kg collectés aujourd'hui
    newUsers: 8, // nouveaux utilisateurs cette semaine
    missionsThisWeek: 3,
    
    // Données de progression
    progress: {
        plastic: { value: 642, percentage: 75 },
        fishingNets: { value: 198, percentage: 45 },
        glassMetal: { value: 312, percentage: 60 }
    },
    
    // Équivalences environnementales
    equivalences: {
        marineLife: 1250,
        coastline: 8.5, // km
        recyclingRate: 92 // %
    }
};

// Fonction pour animer les compteurs de la section Impact
function animateImpactCounters() {
    // Animer chaque compteur avec un délai différent
    gsap.to("#trash-counter", {
        scrollTrigger: {
            trigger: "#impact",
            start: "top 70%",
        },
        innerHTML: impactData.totalTrash,
        duration: 2.5,
        snap: { innerHTML: 1 },
        onUpdate: function() {
            this.targets()[0].innerHTML = Math.floor(this.targets()[0].innerHTML);
        }
    });

    gsap.to("#user-counter", {
        scrollTrigger: {
            trigger: "#impact",
            start: "top 70%",
        },
        innerHTML: impactData.totalUsers,
        duration: 2.5,
        delay: 0.2,
        snap: { innerHTML: 1 },
        onUpdate: function() {
            this.targets()[0].innerHTML = Math.floor(this.targets()[0].innerHTML);
        }
    });

    gsap.to("#missions-counter", {
        scrollTrigger: {
            trigger: "#impact",
            start: "top 70%",
        },
        innerHTML: impactData.totalMissions,
        duration: 2.5,
        delay: 0.4,
        snap: { innerHTML: 1 },
        onUpdate: function() {
            this.targets()[0].innerHTML = Math.floor(this.targets()[0].innerHTML);
        }
    });

    // Mettre à jour les sous-statistiques
    document.getElementById('trash-today').textContent = `+${impactData.trashToday}`;
    document.getElementById('new-users').textContent = `+${impactData.newUsers}`;
    document.getElementById('missions-week').textContent = impactData.missionsThisWeek;

    // Animation des barres de progression
    gsap.from(".progress-bar", {
        scrollTrigger: {
            trigger: "#impact",
            start: "top 60%",
        },
        width: "0%",
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.5
    });
}

// Fonction pour simuler des mises à jour en temps réel (optionnel)
function simulateRealTimeUpdates() {
    // Simuler des augmentations aléatoires toutes les 30 secondes
    setInterval(() => {
        // Augmenter légèrement les déchets collectés aujourd'hui
        impactData.trashToday += Math.floor(Math.random() * 3) + 1;
        document.getElementById('trash-today').textContent = `+${impactData.trashToday}`;
        
        // Augmenter le total des déchets
        impactData.totalTrash += 1;
        document.getElementById('trash-counter').textContent = impactData.totalTrash;
        
        // Simuler l'arrivée occasionnelle d'un nouveau nettoyeur
        if (Math.random() > 0.7) {
            impactData.newUsers += 1;
            impactData.totalUsers += 1;
            document.getElementById('new-users').textContent = `+${impactData.newUsers}`;
            document.getElementById('user-counter').textContent = impactData.totalUsers;
            
            // Animation d'apparition du nouveau nombre
            gsap.fromTo("#new-users", 
                { scale: 1.5, color: "#ffffff" },
                { scale: 1, color: "#2dd4bf", duration: 0.5 }
            );
        }
    }, 30000); // Toutes les 30 secondes
}

// Initialiser la section Impact
function initImpactSection() {
    // Mettre à jour les valeurs initiales
    document.getElementById('trash-counter').textContent = impactData.totalTrash;
    document.getElementById('user-counter').textContent = impactData.totalUsers;
    document.getElementById('missions-counter').textContent = impactData.totalMissions;
    
    // Configurer les animations
    animateImpactCounters();
    
    // Démarrer les mises à jour en temps réel (optionnel)
    simulateRealTimeUpdates();
    
    // Animation d'entrée des cartes
    // Dans la fonction initImpactSection()

}

// Appeler l'initialisation au chargement
window.addEventListener('load', function() {
   initNavigation();
    initImpactSection();
});

// Fonction pour calculer les points par participant
function calculatePoints(difficulty, pollution) {
    let basePoints = 0;
    
    // Points selon la difficulté
    switch(difficulty) {
        case 'Facile': basePoints = 50; break;
        case 'Moyenne': basePoints = 100; break;
        case 'Difficile': basePoints = 200; break;
        default: basePoints = 50;
    }
    
    // Multiplicateur selon la pollution
    switch(pollution) {
        case 'Faible': return basePoints;
        case 'Moyenne': return basePoints * 1.5;
        case 'Élevée': return basePoints * 2;
        default: return basePoints;
    }
}

// --- NAVIGATION ACTIVE ---
function updateActiveNav() {
    const sections = ['impact', 'events', 'ranking'];
    const navLinks = document.querySelectorAll('.nav-link');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    // Trouver la section visible
    let currentSection = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            // Vérifier si l'élément est visible (au moins 50% dans la vue)
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                currentSection = section;
            }
        }
    });
    
    // Mettre à jour les liens de navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Mettre à jour les indicateurs
    indicatorDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.target === currentSection) {
            dot.classList.add('active');
        }
    });
    
    // Mettre à jour la navbar
    const navbar = document.getElementById('navbar');
    if (currentSection) {
        navbar.classList.add('active-section');
    } else {
        navbar.classList.remove('active-section');
    }
}

// Fonction pour montrer l'indicateur de section
function showSectionIndicator() {
    const indicator = document.getElementById('section-indicator');
    if (window.scrollY > 300) {
        indicator.classList.add('visible');
    } else {
        indicator.classList.remove('visible');
    }
}

// Gestion des clics sur les indicateurs
function setupIndicatorClicks() {
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = dot.dataset.target;
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Navigation fluide
function setupSmoothNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Animation fluide
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80,
                        autoKill: false
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Dans la fonction d'initialisation principale
function initNavigation() {
    updateActiveNav(); // Initial update
    showSectionIndicator(); // Initial state
    
    // Événements
    window.addEventListener('scroll', () => {
        updateActiveNav();
        showSectionIndicator();
    });
    
    setupIndicatorClicks();
    setupSmoothNavigation();
    
    // Rafraîchir tous les 100ms pendant le scroll pour une meilleure réactivité
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 100);
    });
}

// Appeler l'initialisation

document.addEventListener('DOMContentLoaded', initNavigation);
