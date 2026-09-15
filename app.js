function toggleAccordion(bodyId, headerEl) {
    const body = document.getElementById(bodyId);
    const toggleIcon = headerEl.querySelector('.acc-toggle');
    if (body.classList.contains('open')) {
        body.classList.remove('open');
        toggleIcon.style.transform = 'rotate(-90deg)';
    } else {
        body.classList.add('open');
        toggleIcon.style.transform = 'rotate(0deg)';
    }
}

function toggleGroup(groupName, isChecked) {
    const children = document.querySelectorAll(`.opt-child-${groupName}`);
    children.forEach(c => c.checked = isChecked);
    checkMaster(groupName); 
}

function checkMaster(groupName) {
    const children = Array.from(document.querySelectorAll(`.opt-child-${groupName}`));
    const master = document.getElementById(`m-opt-${groupName}`);
    
    const checkedCount = children.filter(c => c.checked).length;
    if (checkedCount === 0) { master.checked = false; master.indeterminate = false; } 
    else if (checkedCount === children.length) { master.checked = true; master.indeterminate = false; } 
    else { master.checked = false; master.indeterminate = true; }
}

function toggleAll() {
    const allInputs = document.querySelectorAll('input[id^="opt-"]');
    const checkedCount = Array.from(allInputs).filter(i => i.checked).length;
    const targetState = checkedCount < (allInputs.length / 2); 
    allInputs.forEach(i => i.checked = targetState);
    checkMaster('fr'); checkMaster('monde'); checkMaster('cult');
}

function openSettings() { document.getElementById('settings-modal').style.display = 'flex'; }
function closeSettings() { document.getElementById('settings-modal').style.display = 'none'; }
function saveAndCloseSettings() { saveSettings(); closeSettings(); showToast("Matières sauvegardées !", "#10b981", "✅"); }

window.onload = () => { loadSettings(); initSonUI(); refreshDailyInfo(); };

function saveSettings() { 
    const s = { 
        reg: document.getElementById('opt-reg').checked, dep: document.getElementById('opt-dep').checked, vil: document.getElementById('opt-vil').checked, nat: document.getElementById('opt-nat').checked,
        eurPays: document.getElementById('opt-eur-pays').checked, eurCap: document.getElementById('opt-eur-cap').checked, mondePays: document.getElementById('opt-monde-pays').checked, mondeFlg: document.getElementById('opt-monde-flg').checked, mondeCap: document.getElementById('opt-monde-cap').checked,
        pla: document.getElementById('opt-pla').checked, his: document.getElementById('opt-his').checked,
        readSpeed: getReadingSpeed()
    }; 
    localStorage.setItem('LearnSettings_v29', JSON.stringify(s)); 
    refreshDailyInfo();
}
    
function loadSettings() { 
    const saved = localStorage.getItem('LearnSettings_v29') || localStorage.getItem('LearnSettings_v28') || localStorage.getItem('LearnSettings_v27'); 
    if (saved) { 
        const s = JSON.parse(saved); 
        if(s.reg !== undefined) document.getElementById('opt-reg').checked = s.reg; if(s.dep !== undefined) document.getElementById('opt-dep').checked = s.dep; if(s.vil !== undefined) document.getElementById('opt-vil').checked = s.vil; if(s.nat !== undefined) document.getElementById('opt-nat').checked = s.nat;
        if(s.eurPays !== undefined) document.getElementById('opt-eur-pays').checked = s.eurPays; if(s.eurCap !== undefined) document.getElementById('opt-eur-cap').checked = s.eurCap; if(s.mondePays !== undefined) document.getElementById('opt-monde-pays').checked = s.mondePays; if(s.mondeFlg !== undefined) document.getElementById('opt-monde-flg').checked = s.mondeFlg; if(s.mondeCap !== undefined) document.getElementById('opt-monde-cap').checked = s.mondeCap;
        if(s.pla !== undefined) document.getElementById('opt-pla').checked = s.pla; if(s.his !== undefined) document.getElementById('opt-his').checked = s.his; 
        if(s.readSpeed) { const r = document.getElementById('rs-' + s.readSpeed); if(r) r.checked = true; }
    } 
    ['fr', 'monde', 'cult'].forEach(grp => checkMaster(grp));
}

function initTheme() { const isDark = localStorage.getItem('LearnDaily_Dark') === 'true'; if (isDark) document.body.setAttribute('data-theme', 'dark'); updateThemeIcon(); }
function toggleTheme() { const isDark = document.body.getAttribute('data-theme') === 'dark'; if (isDark) { document.body.removeAttribute('data-theme'); localStorage.setItem('LearnDaily_Dark', 'false'); } else { document.body.setAttribute('data-theme', 'dark'); localStorage.setItem('LearnDaily_Dark', 'true'); } updateThemeIcon(); }
function updateThemeIcon() { const isDark = document.body.getAttribute('data-theme') === 'dark'; document.getElementById('theme-btn').innerText = isDark ? "☀️" : "🌙"; document.getElementById('meta-theme-color').setAttribute('content', isDark ? "#0f172a" : "#4361ee"); }
initTheme();

let deferredPrompt;
const manifestData = { "name": "LearnDaily Atlas", "short_name": "LearnDaily", "start_url": window.location.href, "display": "standalone", "background_color": "#f4f7f9", "theme_color": "#4361ee", "icons": [{"src": "https://placehold.co/512x512/4361ee/ffffff?text=LD", "sizes": "512x512", "type": "image/png"}] };
const manifestBlob = new Blob([JSON.stringify(manifestData)], {type: 'application/manifest+json'}); document.getElementById('manifest-placeholder').setAttribute('href', URL.createObjectURL(manifestBlob));

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; 
const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (!isPWA) { 
    if (isIOS) { 
        document.getElementById('pwa-btn').style.display = 'block';
        document.getElementById('pwa-btn').onclick = () => showToast("Appuie sur 'Partager' 📤 puis 'Sur l'écran d'accueil' ➕", "#4361ee", "📱");
    } else { 
        window.addEventListener('beforeinstallprompt', (e) => { 
            e.preventDefault(); 
            deferredPrompt = e; 
            document.getElementById('pwa-btn').style.display = 'block'; 
        }); 
    } 
}

function installerPWA() { 
    if(deferredPrompt) { 
        deferredPrompt.prompt(); 
        deferredPrompt.userChoice.then((res) => { 
            if(res.outcome === 'accepted') document.getElementById('pwa-btn').style.display = 'none'; 
            deferredPrompt = null; 
        }); 
    } 
}

// Variables Globales pour la Carte et la Heatmap
let db = [], session = [], current = null, isWaiting = true, gameMode = 'daily', customQuestionType = 'locate';
let lives = 3, isEndless = false; let zoomHandler, svgElement, mapGroup;
let userXP = parseInt(localStorage.getItem('LearnV28_XP') || 0);
let timerInterval = null; let timeLeft = 60; let isChronoMode = false;
let sessionErreurs = 0, sessionBonnes = 0, sessionTotal = 0, chronoBonnes = 0;   // pour les étoiles, les trophées et le défi
let session0Ids = [];   // les questions de la partie, telles quelles, pour pouvoir la repartager
let etapeEnCours = 0, tourEnCours = 'france', defiRecu = null;

let geoFRDep = null, geoFRReg = null, geoWorld = null;
let currentHeatmapMode = 'dep';
const projFRHeatmap = d3.geoConicConformal().center([2.45, 46.2]).scale(2800).translate([250, 260]); 
const pathFRHeatmap = d3.geoPath().projection(projFRHeatmap);
const projWorldHeatmap = d3.geoMercator().scale(80).translate([250, 320]);
const pathWorldHeatmap = d3.geoPath().projection(projWorldHeatmap);

function fetchWithTimeout(promise, ms = 6000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Timeout réseau')), ms);
        promise.then(val => { clearTimeout(timer); resolve(val); }).catch(err => { clearTimeout(timer); reject(err); });
    });
}

function preloadImage(url) { 
    return new Promise((resolve) => { 
        const img = new Image(); 
        let timer = setTimeout(() => { resolve("https://placehold.co/600x400/10b981/ffffff?text=Image+Introuvable"); }, 3000);
        img.onload = () => { clearTimeout(timer); resolve(url); }; 
        img.onerror = () => { clearTimeout(timer); resolve(`https://placehold.co/600x400/10b981/ffffff?text=Erreur`); }; 
        img.src = url; 
    }); 
}

function safeSetText(id, text) { const el = document.getElementById(id); if (el) el.innerText = text; }
    
function showToast(m, c="#1e293b", icon="🔔") { 
    const t = document.getElementById('toast'); document.getElementById('toast-msg').innerHTML = m; 
    t.style.background = c; t.querySelector('span').innerText = icon; t.classList.add('show'); 
    setTimeout(()=>t.classList.remove('show'), 3000); 
}
    
function switchTab(tabId) { clearPendingNext(); document.querySelectorAll('.view').forEach(v => v.classList.remove('active')); document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')); if(tabId === 'home') { document.getElementById('v-home').classList.add('active'); document.getElementById('nav-home').classList.add('active'); refreshDailyInfo(); } else if (tabId === 'stats') { document.getElementById('v-stats').classList.add('active'); document.getElementById('nav-stats').classList.add('active'); calculerEtAfficherStats(); } }
function effacerDB() { if(confirm("Effacer vos XP et votre progression ?")) { localStorage.clear(); location.reload(); } }

function updateXPUI() {
    let level = Math.floor(Math.sqrt(userXP / 50)) + 1; let currentLevelXP = Math.pow(level - 1, 2) * 50; let nextLevelXP = Math.pow(level, 2) * 50; let progressPct = ((userXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    safeSetText('lvl-badge', level); safeSetText('lvl-text', level); safeSetText('xp-text', `${userXP}/${nextLevelXP} XP`); document.getElementById('xp-bar').style.width = `${progressPct}%`;
}

function addXP(amount) {
    let oldLevel = Math.floor(Math.sqrt(userXP / 50)) + 1; 
    userXP += amount; 
    localStorage.setItem('LearnV28_XP', userXP);
    
    const today = new Date().toISOString().split('T')[0];
    let history = JSON.parse(localStorage.getItem('LearnV28_History') || '{}');
    history[today] = (history[today] || 0) + amount;
    localStorage.setItem('LearnV28_History', JSON.stringify(history));

    let newLevel = Math.floor(Math.sqrt(userXP / 50)) + 1; 
    updateXPUI(); 
    safeSetText('score-val', `${userXP}`);
    
    const floater = document.getElementById('xp-float'); 
    floater.innerText = `+${amount} XP`; 
    floater.style.animation = 'none'; 
    void floater.offsetWidth; 
    floater.style.animation = 'floatUp 1s ease forwards';
    
    if(newLevel > oldLevel) { 
        sonFanfare();
        shootConfetti();
        setTimeout(() => { showToast(`NIVEAU ${newLevel} ATTEINT ! 🎉`, "#8b5cf6", "⭐"); }, 500); 
    }
}

function shootConfetti() {
    const colors = ['#4361ee', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];
    for (let i = 0; i < 60; i++) {
        let conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        conf.style.animationDelay = Math.random() * 0.2 + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 4000); 
    }
}

// --- Les sources de données, avec un miroir chacune ---
// Si GitHub est lent ou bloqué, on retente sur le CDN jsDelivr, qui sert
// exactement les mêmes fichiers.
const URLS_DEP = [
    "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson",
    "https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements-version-simplifiee.geojson"
];
const URLS_REG = [
    "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson",
    "https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/regions-version-simplifiee.geojson"
];
const URLS_MONDE = [
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
    "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson"
];

let carteChargee = false, zoomPret = false;

// Essaie chaque miroir à son tour. Ne lève jamais : renvoie null si tout échoue.
async function chargerJSON(urls, ms) {
    for (const url of urls) {
        try { const data = await fetchWithTimeout(d3.json(url), ms); if (data) return data; }
        catch (e) { /* miroir suivant */ }
    }
    return null;
}

// Les pays : d'abord la version complète (frontières, superficie...),
// sinon la version minimale. Renvoie [] si l'API ne répond pas.
async function chargerPays(ms) {
    for (const url of [URL_PAYS, URL_PAYS_MINIMAL]) {
        try {
            const res = await fetchWithTimeout(fetch(url), ms);
            const data = await res.json();
            if (Array.isArray(data) && data.length) return data;
        } catch (e) { /* on tente la suivante */ }
    }
    return [];
}

function preparerSVG() {
    if (zoomPret) return;
    svgElement = d3.select("#svg-carte"); mapGroup = d3.select("#map-group");
    zoomHandler = d3.zoom().scaleExtent([1, 30]).on("zoom", (e) => mapGroup.attr("transform", e.transform));
    svgElement.call(zoomHandler);
    svgElement.on("dblclick.zoom", null);
    svgElement.on("dblclick", () => { svgElement.transition().duration(500).call(zoomHandler.transform, d3.zoomIdentity); });
    zoomPret = true;
}

async function loadDataAndMap() {
    if (carteChargee) return true;   // on ne recharge que si la dernière tentative a échoué

    if (typeof d3 === 'undefined') { showToast("Outils en cours de téléchargement (réseau lent).", "#f59e0b", "⏳"); return false; }

    preparerSVG();
    safeSetText('q-target', "Chargement de la carte…");
    safeSetText('q-question', "Quelques secondes, le temps de récupérer les cartes.");

    const projFR = d3.geoConicConformal().center([2.45, 46.2]).scale(2800).translate([250, 260]); const pathFR = d3.geoPath().projection(projFR);
    const projWorld = d3.geoMercator().scale(80).translate([250, 320]); const pathWorld = d3.geoPath().projection(projWorld);

    // Chaque source est chargée pour elle-même : le monde qui traîne ne doit
    // plus faire tomber la carte de France avec lui.
    const [geojsonDep, geojsonReg, worldGeojson, apiData] = await Promise.all([
        chargerJSON(URLS_DEP, 15000),
        chargerJSON(URLS_REG, 15000),
        chargerJSON(URLS_MONDE, 15000),
        chargerPays(15000)
    ]);

    // On repart toujours d'une carte vierge : on peut arriver ici après un échec
    d3.selectAll("#g-regions, #g-departements, #g-regions-outlines, #g-world, #g-nature, #g-villes").selectAll("*").remove();
    db = [...DATA_VILLES, ...DATA_NATURE, ...DATA_PLANTES, ...DATA_HISTOIRE];

    if (!geojsonDep || !geojsonReg) {
        // Sans le fond de carte, il n'y a pas de jeu : on le dit, et on
        // laisse la porte ouverte à une nouvelle tentative.
        showToast("Carte indisponible : vérifie ta connexion, puis retente.", "#f43f5e", "📡");
        safeSetText('q-target', "Carte indisponible");
        safeSetText('q-question', "Vérifie ta connexion et relance : l'appli réessaiera.");
        return false;
    }

    geoFRDep = geojsonDep; geoFRReg = geojsonReg;

    let unlockedDeps = JSON.parse(localStorage.getItem('LearnV28_UnlockedDeps') || JSON.stringify(STARTER_DEPS));
    let dbReg = geojsonReg.features.map(f => ({ id: "geo_reg_" + f.properties.code, code: f.properties.code, domaine: "geographie", type: "reg", nom: f.properties.nom }));
    let dbDep = geojsonDep.features.map(f => ({ id: "geo_dep_" + f.properties.code, code: f.properties.code, domaine: "geographie", type: "dep", nom: f.properties.nom, reg: DEP_REGIONS[f.properties.code] || f.properties.nom, unlocked: unlockedDeps.includes(f.properties.code) }));
    db = [...db, ...dbReg, ...dbDep];

    d3.select("#g-regions").selectAll("path").data(geojsonReg.features).enter().append("path").attr("d", pathFR).attr("class", "region").attr("id", d => "geo_reg_" + d.properties.code).on("click", function() { handleMapClick(this, this.id); });
    d3.select("#g-departements").selectAll("path").data(geojsonDep.features).enter().append("path").attr("d", pathFR).attr("class", "departement").attr("id", d => "geo_dep_" + d.properties.code).on("click", function() { handleMapClick(this, this.id); });
    d3.select("#g-regions-outlines").selectAll("path").data(geojsonReg.features).enter().append("path").attr("d", pathFR).attr("class", "region-outline");

    // Le monde est un bonus : s'il manque, la France se joue quand même
    if (worldGeojson && apiData.length) {
        geoWorld = worldGeojson;
        construireInfosMonde(apiData);
        apiData.forEach(c => {
            const info = WORLD_INFO[c.cca3]; if(!info) return;
            let dom = c.region === "Europe" ? "europe" : "monde";
            let hasSvg = worldGeojson.features.some(f => f.id === c.cca3);
            db.push({ id: "fl_" + c.cca3, domaine: dom, type: "flag", nom: info.nom, image: c.flags.svg, contexte: info.zone, zone: info.zone, sr: info.sousRegion });
            if(info.capitale) db.push({ id: "cap_" + c.cca3, domaine: dom, type: "cap", nom: info.capitale, contexte: `Capitale : ${info.nom}`, pays: info.nom, zone: info.zone, sr: info.sousRegion });
            if(hasSvg) db.push({ id: "w_" + c.cca3, domaine: dom, type: "country", nom: info.nom, contexte: info.zone, zone: info.zone, sr: info.sousRegion });
        });
        d3.select("#g-world").selectAll("path").data(worldGeojson.features).enter().append("path").attr("d", pathWorld).attr("class", "pays-monde").attr("id", d => "w_" + d.id).on("click", function(e, d) { handleMapClick(this, "w_" + d.id); });
    } else {
        showToast("Les données du monde n'ont pas répondu : la France reste jouable.", "#f59e0b", "🌍");
    }

    const lineFleuve = d3.line().x(d => projFR(d)[0]).y(d => projFR(d)[1]).curve(d3.curveCatmullRom);
    const lineMassif = d3.line().x(d => projFR(d)[0]).y(d => projFR(d)[1]).curve(d3.curveCatmullRomClosed);

    let n = d3.select("#g-nature").selectAll("g").data(DATA_NATURE).enter().append("g").attr("id", d => d.id).attr("class", "nature-element").on("click", function(e, d) { handleMapClick(this, d.id); });
    n.filter(d => d.typeNat === "massif").append("path").attr("d", d => lineMassif(d.coordsPath)).attr("class", "massif-path");
    n.filter(d => d.typeNat === "fleuve").append("path").attr("d", d => lineFleuve(d.coordsPath)).style("fill", "none").style("stroke", "transparent").style("stroke-width", "25px");
    n.filter(d => d.typeNat === "fleuve").append("path").attr("d", d => lineFleuve(d.coordsPath)).attr("class", "fleuve-path");

    let v = d3.select("#g-villes").selectAll("g").data(DATA_VILLES).enter().append("g");

    // 1. LE POINT VISIBLE (En dessous)
    v.append("circle")
        .attr("cx", d => projFR(d.coords)[0])
        .attr("cy", d => projFR(d.coords)[1])
        .attr("r", 3.5)
        .attr("class", "ville-point")
        .attr("id", d => d.id)
        .style("pointer-events", "none"); // Le point ne bloque pas le clic

    // 2. LA HITBOX (Par-dessus, capte le clic)
    v.append("circle")
        .attr("cx", d => projFR(d.coords)[0])
        .attr("cy", d => projFR(d.coords)[1])
        .attr("r", 10) // Taille ajustée (plus précis)
        .attr("class", "ville-hitbox")
        .attr("id", d => "hit_" + d.id)
        .style("fill", "transparent") // Totalement invisible
        .style("cursor", "pointer")
        .on("click", function(e, d) {
            e.stopPropagation();
            handleMapClick(document.getElementById(d.id), d.id);
        });

    let saved = localStorage.getItem('LearnV28_Master') || localStorage.getItem('LearnV27_Master');
    if (saved) {
        let savedDB = JSON.parse(saved);
        db = db.map(item => { let s = savedDB.find(x => x.id === item.id); return s ? {...item, rep: s.rep, next: s.next, failCount: s.failCount} : {...item, failCount: 0}; });
    } else {
        db = db.map(item => ({...item, failCount: item.failCount || 0}));
    }

    carteChargee = true;
    refreshDailyInfo(); updateXPUI(); calculerEtAfficherStats();
    return true;
}

function refreshDailyInfo() {
    safeSetText('home-streak', texteSerie());
    rafraichirTour();
    afficherDefiRecu();
    if(db.length === 0) return;
    let revs = db.filter(i => i.next && i.next <= new Date().toISOString().split('T')[0] && i.rep > 0).length;
    safeSetText('daily-info', `${revs} révisions en attente aujourd'hui.`);
    let sickCards = db.filter(i => i.rep === 0 && i.next);
    document.getElementById('infirmary-card').style.display = sickCards.length > 0 ? 'block' : 'none';
    if(sickCards.length > 0) safeSetText('infirmary-info', `${sickCards.length} cartes ont besoin d'une piqûre.`);
}

function calculerEtAfficherStats() {
    if(db.length === 0) return;
    const getPct = (doms, total) => { let connus = db.filter(i => doms.includes(i.domaine) && i.rep > 0).length; return Math.round((connus / total) * 100) || 0; };
    
    let pctGeo = getPct(['geographie'], 169);
    let pctMon = getPct(['europe', 'monde'], 750); 
    let pctPla = getPct(['botanique'], 20);
    let pctHis = getPct(['histoire'], 23);
    let pctCult = Math.round((pctPla + pctHis)/2) || 0;

    document.querySelectorAll('.stat-badge-fr').forEach(el => el.innerText = pctGeo + '%');
    document.querySelectorAll('.stat-badge-monde').forEach(el => el.innerText = pctMon + '%');
    document.querySelectorAll('.stat-badge-cult').forEach(el => el.innerText = pctCult + '%');

    safeSetText('pct-geo', pctGeo + '%'); document.getElementById('bar-geo').style.width = pctGeo + '%';
    safeSetText('pct-mon', pctMon + '%'); document.getElementById('bar-mon').style.width = pctMon + '%';
    safeSetText('pct-pla', pctPla + '%'); document.getElementById('bar-pla').style.width = pctPla + '%';
    safeSetText('pct-his', pctHis + '%'); document.getElementById('bar-his').style.width = pctHis + '%';

    let sortedFails = [...db].filter(i => i.failCount > 0).sort((a, b) => b.failCount - a.failCount).slice(0, 3);
    document.getElementById('top-fails-list').innerHTML = sortedFails.length > 0 ? sortedFails.map((f, i) => `<div class="fail-item"><span>${i+1}. ${f.nom}</span><span class="fail-count">${f.failCount} erreurs</span></div>`).join('') : "Parfait ! Aucune erreur enregistrée.";

    let history = JSON.parse(localStorage.getItem('LearnV28_History') || '{}');
    let chartHtml = '';
    let maxXP = 100; 
    
    for(let i=6; i>=0; i--) {
        let d = new Date(); d.setDate(d.getDate() - i);
        let dateStr = d.toISOString().split('T')[0];
        let xp = history[dateStr] || 0;
        if(xp > maxXP) maxXP = xp;
    }

    const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    for(let i=6; i>=0; i--) {
        let d = new Date(); d.setDate(d.getDate() - i);
        let dateStr = d.toISOString().split('T')[0];
        let xp = history[dateStr] || 0;
        let heightPct = Math.max(4, (xp / maxXP) * 100); 
        let isToday = i === 0; 
        
        chartHtml += `
            <div class="day-col" style="${isToday ? 'opacity: 1; transform: scale(1.05);' : 'opacity: 0.7;'}">
                <span class="day-xp">${xp > 0 ? xp : ''}</span>
                <div class="bar-wrapper"><div class="bar-fill" style="height: ${heightPct}%;"></div></div>
                <span class="day-label" style="${isToday ? 'color: var(--primary); font-weight: 800;' : ''}">${jours[d.getDay()]}</span>
            </div>
        `;
    }
    const chartContainer = document.getElementById('activity-chart');
    if(chartContainer) chartContainer.innerHTML = chartHtml;

    afficherTrophees();

    // Appel au nouveau système d'affichage dynamique de la carte de chaleur
    drawHeatmap();
}

function changeHeatmap(mode) {
    currentHeatmapMode = mode;
    drawHeatmap();
}

function drawHeatmap() {
    const heatmapSvg = d3.select("#heatmap-svg");
    heatmapSvg.selectAll("*").remove(); 
    
    let geoData, pathGenerator, typeFilter;
    
    if (currentHeatmapMode === 'dep' && geoFRDep) { geoData = geoFRDep.features; pathGenerator = pathFRHeatmap; typeFilter = 'dep'; } 
    else if (currentHeatmapMode === 'reg' && geoFRReg) { geoData = geoFRReg.features; pathGenerator = pathFRHeatmap; typeFilter = 'reg'; } 
    else if (currentHeatmapMode === 'monde' && geoWorld) { geoData = geoWorld.features; pathGenerator = pathWorldHeatmap; typeFilter = 'country'; } 
    else { return; } 

    heatmapSvg.selectAll("path")
        .data(geoData)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("class", "heatmap-path")
        .style("fill", d => {
            let codeToMatch = currentHeatmapMode === 'monde' ? "w_" + d.id : d.properties.code;
            let item = db.find(i => i.type === typeFilter && (i.code === codeToMatch || i.id === codeToMatch));
            
            if(!item || (!item.rep && !item.failCount)) return "var(--map-fill)"; 
            if(item.failCount > 0) return item.failCount >= 3 ? "#e11d48" : "#fb7185"; 
            if(item.rep > 0) return item.rep >= 3 ? "#10b981" : "#6ee7b7"; 
            return "var(--map-fill)";
        })
        .on("click", function(e, d) {
            let codeToMatch = currentHeatmapMode === 'monde' ? "w_" + d.id : d.properties.code;
            let item = db.find(i => i.type === typeFilter && (i.code === codeToMatch || i.id === codeToMatch));
            let nom = item ? item.nom : (d.properties && d.properties.nom ? d.properties.nom : "Zone inconnue");
            
            if(!item || (!item.rep && !item.failCount)) return showToast(`<b>${nom}</b><br>Zone inexplorée`, "var(--muted)", "🗺️");
            if(item.failCount > 0) showToast(`<b>${nom}</b><br>🚨 À revoir : ${item.failCount} erreurs !`, "#e11d48", "🚨");
            else if(item.rep > 0) showToast(`<b>${nom}</b><br>✅ Maîtrisé (${item.rep} succès)`, "#10b981", "✅");
        });
}

function quitGame() { clearInterval(timerInterval); clearPendingNext(); switchTab('home'); }

async function launchGame(mode) {
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('v-game').classList.add('active');
    if(mode === 'atlas') document.getElementById('nav-atlas').classList.add('active');
    
    let isLoaded = await loadDataAndMap(); 
    if(!isLoaded) { switchTab('home'); return; } 

    gameMode = mode; lives = 3; isEndless = false; isChronoMode = false; safeSetText('score-val', `${userXP}`);
    sessionErreurs = 0; sessionBonnes = 0; chronoBonnes = 0;
    document.getElementById('timer-ui').style.display = 'none'; clearInterval(timerInterval); clearPendingNext();

    d3.selectAll(".departement").classed("dep-locked", false).classed("dep-unlocked", false);

    let pool = [];
    if(mode === 'atlas') {
        safeSetText('game-title', "MON ATLAS (POKÉDEX)"); safeSetText('q-target', "Explore tes terres !"); safeSetText('q-question', "Les zones grisées sont à débloquer en jouant."); safeSetText('q-counter', "");
        document.querySelectorAll('.interface-wrapper').forEach(el => el.style.display = 'none');
        document.getElementById('interface-carte').style.display = 'flex'; d3.select("#g-world").style("display", "none"); d3.select("#g-france").style("display", "block");
        
        let unlockedDeps = JSON.parse(localStorage.getItem('LearnV28_UnlockedDeps') || JSON.stringify(STARTER_DEPS));
        d3.selectAll(".departement").each(function(d) {
            let code = d.properties.code;
            if(unlockedDeps.includes(code)) { d3.select(this).classed("dep-unlocked", true).classed("dep-locked", false); } 
            else { d3.select(this).classed("dep-locked", true).classed("dep-unlocked", false); }
        });
        if(svgElement) svgElement.transition().duration(500).call(zoomHandler.transform, d3.zoomIdentity);
        isWaiting = false; return;
    }
    else if(mode === 'tour') {
        const e = etapesDu(tourEnCours)[etapeEnCours];
        safeSetText('game-title', `ÉTAPE ${etapeEnCours + 1} · ${e.court.toUpperCase()} ${e.emo}`);
        pool = poolEtape(tourEnCours, e).sort(() => Math.random() - 0.5).slice(0, 8);
        if(pool.length === 0) { showToast("Cette étape n'a pas de questions : il manque les données du monde.", "#f59e0b", "📡"); switchTab('home'); return; }
    }
    else if(mode === 'defi') {
        safeSetText('game-title', "LE DÉFI 🎯");
        lives = -1;   // pas de game over : les deux joueurs doivent voir les mêmes questions
        pool = defiRecu.q.map(id => db.find(i => i.id === id)).filter(Boolean);
        if(pool.length === 0) { showToast("Ce défi ne correspond à aucune question connue.", "#f43f5e", "🤷"); switchTab('home'); return; }
    }
    else if(mode === 'infirmary') {
        safeSetText('game-title', "L'INFIRMERIE 🚑"); pool = db.filter(i => i.rep === 0 && i.next);
        if(pool.length === 0) { showToast("Tout le monde est soigné !", "#10b981", "✨"); switchTab('home'); return; }
        pool = pool.sort(() => Math.random() - 0.5);
    }
    else if(mode === 'daily' || mode === 'custom' || mode === 'revision') {
        if(mode === 'daily') safeSetText('game-title', "MISSION DU JOUR");
        if(mode === 'custom') { safeSetText('game-title', "QUIZ LIBRE"); customQuestionType = document.querySelector('input[name="mode"]:checked').value; }
        if(mode === 'revision') { safeSetText('game-title', "VISITE GUIDÉE 🧭"); customQuestionType = 'identify'; }

        let basePool = poolMatieres();

        if(basePool.length === 0) { showToast("Cochez au moins une matière dans les réglages !"); switchTab('home'); return; }

        if (mode === 'daily') {
            const today = new Date().toISOString().split('T')[0];
            let poolIds = basePool.map(p => p.id);
            let revs = db.filter(i => i.next && i.next <= today && i.rep > 0 && poolIds.includes(i.id)); 
            let newsPool = db.filter(i => !i.next && poolIds.includes(i.id));
            let news = newsPool.sort(()=>Math.random()-0.5).slice(0, 4);
            pool = [...revs, ...news].sort(()=>Math.random()-0.5);
            if(pool.length === 0) { showToast("Plus rien à réviser ici aujourd'hui !", "#10b981", "✨"); switchTab('home'); return; }
        } else if (mode === 'custom' || mode === 'revision') {
            if (mode === 'revision') {
                isEndless = true; lives = -1; pool = basePool.sort(()=>Math.random()-0.5);
            } else {
                let lenMode = document.querySelector('input[name="l-mode"]:checked').value;
                if(lenMode === '10') { pool = basePool.sort(()=>Math.random()-0.5).slice(0, 10); } 
                else { 
                    isEndless = true; pool = basePool.sort(()=>Math.random()-0.5); lives = (lenMode === 'survie') ? 3 : -1; 
                    if (lenMode === 'chrono') {
                        isChronoMode = true; lives = -1; timeLeft = 60; chronoBonnes = 0;
                        document.getElementById('timer-ui').style.display = 'flex'; safeSetText('timer-val', timeLeft);
                        timerInterval = setInterval(() => {
                            timeLeft--; if (timeLeft <= 0) { timeLeft = 0; clearInterval(timerInterval); endGameChrono(); }
                            safeSetText('timer-val', timeLeft);
                        }, 1000);
                    }
                }
            }
        }
    }

    sessionTotal = pool.length;
    session0Ids = pool.map(s => s.id);
    session = pool.map(s => {
        let selectedMode = customQuestionType === 'mix' ? (Math.random() > 0.5 ? 'locate' : 'identify') : customQuestionType;
        let panache = ['daily', 'infirmary', 'tour'].includes(gameMode);
        let dynMode = (s.domaine === 'geographie' || s.type === 'country') ? (panache ? (Math.random() > 0.5 ? 'locate' : 'identify') : selectedMode) : 'identify';
        // Dans un défi, le mode est tiré du nom de la question : les deux
        // joueurs tombent forcément sur la même chose.
        if (gameMode === 'defi') dynMode = (s.domaine === 'geographie' || s.type === 'country')
            ? ([...s.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 2 ? 'locate' : 'identify') : 'identify';
        
        if (gameMode === 'revision') dynMode = 'identify';

        if (s.type === 'vil' && dynMode === 'locate' && Math.random() > 0.7 && gameMode !== 'revision' && gameMode !== 'defi') {
            let crossType = Math.random() > 0.5 ? 'dep' : 'reg';
            let targetName = crossType === 'dep' ? s.dep : s.reg;
            let targetObj = db.find(i => i.type === crossType && i.nom === targetName);
            if (targetObj) { return { ...targetObj, fail: false, niveau: 2, dynMode: 'locate', isCross: true, customMsg: `🎲 Générateur :\nOù est ${crossType === 'dep' ? 'le département' : 'la région'} de ${s.nom} ?` }; }
        }
        return { ...s, fail: false, niveau: 2, dynMode: dynMode };
    });

    askQuestion();
}

function endGameChrono() {
    safeSetText('q-target', "Temps Écoulé ! ⏱️"); safeSetText('q-question', "Bien joué champion.");
    document.getElementById('flashcard-ui').style.display = 'none'; safeSetText('q-counter', "");
    showToast("Session Chrono terminée !", "#f59e0b", "🔥"); setTimeout(() => switchTab('home'), 2500);
}

function askQuestion() {
    if (svgElement) { svgElement.interrupt(); }
    clearPendingNext();

    if(lives > 0) safeSetText('lives-ui', "❤️".repeat(lives)); else if (lives === -1) safeSetText('lives-ui', "♾️"); else safeSetText('lives-ui', "💀");
    d3.select("#target-pointer").attr("display", "none");
    document.getElementById('btn-next').style.display = 'none';

    if (session.length === 0) {
        if (!isChronoMode) {
            safeSetText('q-target', "Terminé ! 🎉"); 
            safeSetText('q-question', gameMode === 'revision' ? "Fin de la visite." : "Excellent travail."); 
            document.getElementById('flashcard-ui').style.display = 'none'; 
            safeSetText('q-counter', "");
            
            if (gameMode === 'tour') { terminerEtape(); }
            else if (gameMode === 'defi') { terminerDefi(); }
            else if (gameMode !== 'revision') {
                showToast("Session validée ! +20 XP Bonus", "#8b5cf6", "⭐"); addXP(20);
                if (gameMode === 'infirmary') poserFlag('infirmerie');
                if (gameMode === 'custom' && sessionTotal >= 5) {
                    localStorage.setItem('LearnV28_DernierDefi', JSON.stringify({ ids: session0Ids, score: sessionBonnes, total: sessionTotal }));
                }
            }
            else { showToast("Visite terminée !", "#10b981", "✨"); }

            if (gameMode !== 'revision' && sessionErreurs === 0 && sessionTotal >= 5) poserFlag('sansfaute');
            if (gameMode !== 'revision') verifierTrophees();

            setTimeout(() => switchTab('home'), gameMode === 'tour' || gameMode === 'defi' ? 3500 : 2000);
            return;
        } else {
            let basePool = db.filter(i => i.domaine === 'geographie' || i.domaine === 'europe' || i.domaine === 'monde');
            if(basePool.length === 0) basePool = db.filter(i => i.type === 'vil' || i.type === 'nature');
            session = basePool.sort(()=>Math.random()-0.5).map(s => { return { ...s, fail: false, niveau: 2, dynMode: 'identify' }; });
        }
    }

    current = isEndless ? session[Math.floor(Math.random()*session.length)] : session.shift();
    if(!current) return;

    // --- LOGIQUE FOCUS ---
    // Le sélecteur "focus-zone" n'existe pas (ou plus) dans la page : sans ce garde-fou,
    // le Quiz Libre plantait dès la première question.
    const focusZone = document.getElementById('focus-zone');
    if(gameMode === 'custom' && focusZone && focusZone.value !== 'all' && !current.hasZoomedFocus) {
        current.hasZoomedFocus = true; 
        const regionTarget = db.find(i => i.type === 'reg' && i.nom === focusZone.value);
        if(regionTarget) {
            setTimeout(() => {
                const node = d3.select("#" + regionTarget.id).node();
                if(node) {
                    const bbox = node.getBBox();
                    const scale = Math.max(2, Math.min(6, 180 / Math.max(bbox.width, bbox.height)));
                    svgElement.transition().duration(2000).call(zoomHandler.transform, d3.zoomIdentity.translate(250, 250).scale(scale).translate(-(bbox.x + bbox.width/2), -(bbox.y + bbox.height/2)));
                }
            }, 500);
        }
    }

    const panel = document.getElementById('question-panel');
    panel.classList.remove('combo-mode', 'cross-mode');
    if(current.isCombo) panel.classList.add('combo-mode');
    if(current.isCross) panel.classList.add('cross-mode');

    safeSetText('q-counter', isEndless ? "" : `Reste: ${session.length + 1}`);
    document.getElementById('q-hierarchy').style.display = 'none'; 
    document.getElementById('q-mnemo').style.display = 'none'; 
    
    d3.selectAll(".region, .departement, .ville-point, .pays-monde").classed("succes", false).classed("erreur", false).classed("highlight", false).classed("highlight-vil", false).classed("focus-target", false).style("fill", "");
    d3.selectAll(".nature-element").classed("succes", false).classed("erreur", false).classed("highlight", false);
    
    document.getElementById('interface-carte').classList.remove('mode-focus');
    document.querySelectorAll('.interface-wrapper').forEach(el => el.style.display = 'none');

    if (current.type === 'pla' || current.type === 'flag') {
        safeSetText('q-target', "Chargement..."); 
        document.getElementById('interface-image').style.display = 'flex';
        preloadImage(current.image).then(safeUrl => { 
            document.getElementById('botany-img').src = safeUrl; 
            safeSetText('q-target', current.type === 'flag' ? "Quel est ce pays ?" : "Quelle est cette plante ?"); 
            safeSetText('q-question', gameMode === 'revision' ? "Observe attentivement." : "Observe l'image..."); 
            showFlashUI(); 
        });
    } 
    else if (current.type === 'his' || current.type === 'cap') {
        document.getElementById('interface-texte').style.display = 'flex'; 
        safeSetText('q-target', current.type === 'cap' ? "Capitale" : "Frise Chronologique"); 
        safeSetText('q-question', current.type === 'cap' ? current.contexte : "À quel événement correspond cette date ?"); 
        safeSetText('txt-date', current.type === 'cap' ? "🏛️" : current.nom); 
        safeSetText('text-prompt', current.type === 'cap' ? current.contexte : "Que s'est-il passé ?"); 
        // La frise chronologique n'a rien à faire sur une question de capitale
        document.getElementById('timeline-ui').style.display = current.type === 'his' ? 'flex' : 'none';
        document.querySelectorAll('.t-period').forEach(el => el.classList.remove('active'));
        if(current.periode !== undefined) document.getElementById('tp-' + current.periode).classList.add('active');
        showFlashUI();
    }
    else {
        document.getElementById('interface-carte').style.display = 'flex';
        
        if (current.type === 'country') { d3.select("#g-world").style("display", "block"); d3.select("#g-france").style("display", "none"); } 
        else { d3.select("#g-world").style("display", "none"); d3.select("#g-france").style("display", "block"); }

        if(current.dynMode === 'locate') {
            let titleText = current.nom;
            if(current.isCombo) titleText = current.comboMsg;
            if(current.isCross) titleText = current.customMsg;
            // comboMsg contient du <b> et des retours à la ligne : innerText
            // les affichait en toutes lettres.
            document.getElementById('q-target').innerHTML = titleText.replace(/\n/g, '<br>'); 
            document.getElementById('flashcard-ui').style.display = 'none';
            document.getElementById('interface-carte').className = "interface-wrapper active mode-locate-" + current.type;
            if(current.niveau === 1 && !isChronoMode) {
                safeSetText('q-question', "Aide : Cherche parmi les éléments visibles !"); 
                document.getElementById('interface-carte').classList.add('mode-focus'); 
                d3.select("#" + current.id).classed("focus-target", true);
            } else { 
                safeSetText('q-question', current.isCombo ? "Clique sur la carte" : "Trouve ce lieu sur la carte"); 
            }
            isWaiting = false; 
        } else {
            safeSetText('q-target', gameMode === 'revision' ? current.nom : "Quel est ce lieu ?"); 
            safeSetText('q-question', gameMode === 'revision' ? "Zone mise en évidence :" : "Regarde la zone indiquée");
            document.getElementById('interface-carte').className = "interface-wrapper active mode-identify-" + current.type;
            showFlashUI();
        }

        setTimeout(() => {
            const targetId = "#" + current.id;
            const targetPath = d3.select(targetId);
            let node = targetPath.node();
            
            if (current.dynMode === 'identify') {
                if(current.type === 'vil') {
                    d3.select("#g-villes").selectAll(".ville-point").style("opacity", 0.1);
                    d3.select("#" + current.id).style("opacity", 1).classed(gameMode === 'revision' ? "succes" : "highlight-vil", true);
                    node = d3.select("#hit_" + current.id).node(); 
                } else if (current.type === 'nature') {
                    d3.select("#" + current.id).classed(gameMode === 'revision' ? "succes" : "highlight", true); 
                } else {
                    d3.select("#" + current.id).classed(gameMode === 'revision' ? "succes" : "highlight", true);
                    if (!isChronoMode && gameMode !== 'revision') {
                        d3.select("#" + current.id).transition().duration(200).style("fill", "#f43f5e").transition().duration(200).style("fill", "#10b981").transition().duration(200).style("fill", "");
                    }
                }
            }

            if (node && svgElement) {
                let bbox;
                try {
                    bbox = node.getBBox();
                    if (bbox.x === 0 && bbox.y === 0) {
                        const rect = node.getBoundingClientRect();
                        const svgRect = document.getElementById('svg-carte').getBoundingClientRect();
                        bbox = { x: (rect.left - svgRect.left), y: (rect.top - svgRect.top), width: rect.width, height: rect.height };
                    }
                } catch(e) { bbox = {x:250, y:250, width:50, height:50}; }

                let cx = bbox.x + bbox.width / 2;
                let cy = bbox.y + bbox.height / 2;
                let scale = 1;

                if (current.dynMode === 'identify') {
                    const baseScale = (current.domaine === 'europe' || current.type === 'country') ? 140 : 180;
                    scale = Math.max(2, Math.min(18, baseScale / Math.max(bbox.width, bbox.height)));
                } else {
                    scale = (current.domaine === 'europe' || current.type === 'country') ? 3.5 : 1.2;
                    if(current.domaine === 'europe' || current.type === 'country') { cx = 265; cy = 245; }
                }

                svgElement.transition().duration(2500).ease(d3.easeCubicInOut)
                    .call(zoomHandler.transform, d3.zoomIdentity.translate(250, 250).scale(scale).translate(-cx, -cy));

                if (current.dynMode === 'identify' && current.type !== 'vil') {
                    d3.select("#target-pointer")
                        .attr("transform", `translate(${cx}, ${cy}) scale(${1.2/scale})`)
                        .attr("display", "block");
                }
            }
        }, 200);
    }
}

function showFlashUI() { 
    document.getElementById('flashcard-ui').style.display = 'flex'; 
    
    if (gameMode === 'revision') {
        document.getElementById('btn-reveal').style.display = 'none'; 
        document.getElementById('eval-ui').style.display = 'none'; 
        document.getElementById('btn-next').style.display = 'block'; 
        safeSetText('q-target', current.nom); 
        if(current.type === 'his' || current.type === 'cap') safeSetText('text-prompt', current.contexte); 
        afficherContexte(current); 
    } else {
        document.getElementById('btn-reveal').style.display = 'block'; 
        document.getElementById('eval-ui').style.display = 'none'; 
        document.getElementById('btn-next').style.display = 'none'; 
    }
    isWaiting = true; 
}

function revealAnswer() { 
    d3.select("#g-villes").selectAll(".ville-point").style("opacity", 1);
    safeSetText('q-target', current.nom); 
    if(current.type === 'his') safeSetText('text-prompt', current.contexte); 
    afficherContexte(current); 
    document.getElementById('btn-reveal').style.display = 'none'; 
    document.getElementById('eval-ui').style.display = 'flex'; 
}

function evaluateAnswer(isGood) {
    if(isChronoMode && timeLeft <= 0) return; 

    document.getElementById('eval-ui').style.display = 'none';
    document.getElementById('btn-reveal').style.display = 'none';

    d3.select("#g-villes").selectAll(".ville-point").style("opacity", 1);
    let itemDB = db.find(i => i.id === current.id);
    
    if(isGood) {
        let gain = gameMode === 'infirmary' ? 15 : (current.niveau === 1 ? 5 : 10); 
        if(current.isCombo) gain *= 2; 
        current.isCombo ? sonCombo() : sonJuste();
        if(!current.fail && !current.isCombo && !current.isCross) sessionBonnes++;
        if(current.isCombo) poserFlag('combo');
        if(isChronoMode) { chronoBonnes++; if(chronoBonnes >= 10) poserFlag('chrono10'); }
        addXP(gain);
        
        if(current.domaine === 'geographie' || current.type === 'country') {
            d3.select("#" + current.id).classed("highlight", false).classed("highlight-vil", false).classed("succes", true);
        }

        if (current.dynMode === 'locate') {
            if (current.type === 'vil' && !current.isCombo && !current.isCross && gameMode !== 'defi' && Math.random() > 0.6) {
                let depObj = db.find(i => i.type === 'dep' && i.nom === current.dep);
                if (depObj) {
                    let comboDep = { ...depObj, isCombo: true, comboMsg: `⚡ Bien joué pour <b>${current.nom}</b> !\nTrouve son département :`, refReg: current.reg, fail: false, niveau: 2, dynMode: 'locate' };
                    session.unshift(comboDep);
                }
            } 
            else if (current.isCombo && current.type === 'dep') {
                let regObj = db.find(i => i.type === 'reg' && i.nom === current.refReg);
                if (regObj) {
                    let comboReg = { ...regObj, isCombo: true, comboMsg: `🔥 C'était bien <b>${current.nom}</b> !\nEt la région ?`, fail: false, niveau: 2, dynMode: 'locate' };
                    session.unshift(comboReg);
                }
            }
        }

        if (current.type === 'dep' && current.dynMode === 'locate') {
            let voisins = DEP_NEIGHBORS[current.code] || [];
            if (voisins.length > 0) {
                let nomsVoisins = voisins.map(vCode => { let d = db.find(i => i.type === 'dep' && i.code === vCode); return d ? d.nom : vCode; }).join(' • ');
                setTimeout(() => { showToast(`📍 Autour : ${nomsVoisins}`, "#3b82f6", "🧭"); }, 1500); 

                voisins.forEach(vCode => {
                    d3.select("#geo_dep_" + vCode).transition().duration(300).style("fill", "#60a5fa").transition().delay(2000).duration(800).style("fill", "");
                });

                let unlockedDeps = JSON.parse(localStorage.getItem('LearnV28_UnlockedDeps') || JSON.stringify(STARTER_DEPS));
                let savedDB = false;
                voisins.forEach(vCode => {
                    if (!unlockedDeps.includes(vCode)) {
                        unlockedDeps.push(vCode); savedDB = true;
                        let depToUnlock = db.find(i => i.type === 'dep' && i.code === vCode);
                        if(depToUnlock) depToUnlock.unlocked = true;
                    }
                });
                if(savedDB) localStorage.setItem('LearnV28_UnlockedDeps', JSON.stringify(unlockedDeps));
            }
        }

        if (!isEndless) {
            if (current.niveau === 1) { 
                current.niveau = 2; session.push(current); 
                showToast("Bien ! Sans aide maintenant.", "#f59e0b", "👀"); 
            } else {
                if (!current.fail && (gameMode === 'daily' || gameMode === 'infirmary')) {
                    if(itemDB) {
                        itemDB.rep = (itemDB.rep || 0) + 1; 
                        let gap = itemDB.rep === 1 ? 1 : (itemDB.rep === 2 ? 6 : Math.round(itemDB.rep * 2.5)); 
                        let d = new Date(); d.setDate(d.getDate() + gap); 
                        itemDB.next = d.toISOString().split('T')[0];
                        localStorage.setItem('LearnV28_Master', JSON.stringify(db));
                    }
                }
                if(window.navigator.vibrate) window.navigator.vibrate(50); 
                showToast(`C'était bien <b>${current.nom}</b> ! ✔️`, "#10b981", "✅");
            }
        } else { 
            if(window.navigator.vibrate) window.navigator.vibrate(50); 
            if(!isChronoMode) showToast(`Bravo ! C'était <b>${current.nom}</b> !`, "#10b981", "✅"); 
        }
        scheduleNextQuestion(isChronoMode ? 350 : 1600); 
    } else { 
        handleError(); 
    }
}

function handleError() {
    sonFaux();
    sessionErreurs++;
    if(window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]);
    d3.select("#g-villes").selectAll(".ville-point").style("opacity", 1);
    
    if (isChronoMode) {
        timeLeft = Math.max(0, timeLeft - 3); safeSetText('timer-val', timeLeft);
        showToast("-3 Secondes !", "#f43f5e", "⏱️"); scheduleNextQuestion(800); return;
    }

    if(lives > 0) { lives--; if(lives === 0) { alert("Game Over !"); return switchTab('home'); } }
    
    current.fail = true; 
    let itemDB = db.find(i => i.id === current.id); 
    if(itemDB) itemDB.failCount = (itemDB.failCount || 0) + 1;
    
    if(gameMode === 'daily' || gameMode === 'infirmary') { 
        if(itemDB) { itemDB.rep = 0; itemDB.next = new Date().toISOString().split('T')[0]; } 
    }
    
    if(!isEndless) { current.niveau = 1; session.push(current); } 
    
    showToast("Raté ! Elle reviendra.", "#f43f5e", "❌"); 
    localStorage.setItem('LearnV28_Master', JSON.stringify(db)); 
    scheduleNextQuestion(2000);
}

function handleMapClick(elHTML, idClique) {
    if(gameMode === 'atlas') { let item = db.find(i => i.id === idClique); if(item) { safeSetText('q-target', item.nom); safeSetText('q-question', ""); afficherContexte(item); } return; }
    if (isWaiting || current.dynMode !== 'locate') return; 
    isWaiting = true;
    
    if (idClique === current.id) { 
        elHTML.classList.add('succes'); afficherContexte(current); evaluateAnswer(true); 
    } else { 
        if (current.type === 'dep') {
            let clickedCode = idClique.replace("geo_dep_", "");
            let voisins = DEP_NEIGHBORS[current.code] || [];
            if (voisins.includes(clickedCode)) {
                d3.select(elHTML).transition().duration(200).style("fill", "#f59e0b").transition().delay(800).style("fill", "");
                let clickedItem = db.find(i => i.id === idClique);
                let nomClique = clickedItem ? clickedItem.nom : "ce département";
                showToast(`Presque ! Tu as touché <b>${nomClique}</b>.<br>C'est juste à côté !`, "#f59e0b", "🧭");
                isWaiting = false; 
                return; 
            }
        }
        elHTML.classList.add('erreur'); document.getElementById(current.id).classList.add('succes'); afficherContexte(current); evaluateAnswer(false); 
    }
}

function afficherContexte(item) {
    const hier = document.getElementById('q-hierarchy'); 
    if (item.type === 'pla') { safeSetText('q-hierarchy', `🌿 Famille : ${item.famille || 'Inconnue'}`); hier.style.display = 'block'; } 
    else if (item.type === 'nature') { safeSetText('q-hierarchy', `💡 ${item.anecdote}`); hier.style.display = 'block'; } 
    else if (item.type === 'his') { safeSetText('q-hierarchy', `📜 Événement validé !`); hier.style.display = 'none'; } 
    else if (item.type === 'vil') { safeSetText('q-hierarchy', `📍 ${item.nom}  >  🌍 ${item.reg || '?'}`); hier.style.display = 'block'; } 
    else if (item.type === 'dep') { safeSetText('q-hierarchy', `🧩 ${item.nom} (${item.code})  >  🌍 ${item.reg || '?'}`); hier.style.display = 'block'; } 
    else if (item.type === 'cap') { safeSetText('q-hierarchy', `🏛️ ${item.nom}  >  🌍 ${item.pays || '?'}${item.zone ? ' (' + item.zone + ')' : ''}`); hier.style.display = 'block'; } 
    else if (item.type === 'flag' || item.type === 'country') { safeSetText('q-hierarchy', `🌍 ${item.contexte}`); hier.style.display = 'block'; } 
    else { hier.style.display = 'none'; }
    afficherMnemo(item);
}
// ============================================================
//   LES MOYENS MNÉMOTECHNIQUES
//   On ne montre une astuce QUE s'il en existe une vraie.
//   Rien à inventer : pas d'astuce = rien ne s'affiche.
// ============================================================

function normKey(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
}

let MNEMO_REG_INDEX = null;
function getMnemoRegion(nom) {
    if (!MNEMO_REG_INDEX) {
        MNEMO_REG_INDEX = {};
        Object.keys(MNEMO_REGIONS).forEach(k => { MNEMO_REG_INDEX[normKey(k)] = MNEMO_REGIONS[k]; });
    }
    return MNEMO_REG_INDEX[normKey(nom)] || null;
}

// Le classement des n° de départements : 2A et 2B se glissent entre 19 et 21
function depRank(code) {
    if (code === "2A") return 19.1;
    if (code === "2B") return 19.2;
    return parseInt(code, 10);
}

// Pour un département, l'astuce se calcule : le n° vient de l'ordre alphabétique de 1790.
// Les exceptions (Corse, Paris, petite couronne, Belfort...) ont leur texte dans MNEMO_DEPS.
function getMnemoDep(item) {
    if (MNEMO_DEPS[item.code]) return MNEMO_DEPS[item.code];

    const deps = db.filter(i => i.type === 'dep' && i.code).sort((a, b) => depRank(a.code) - depRank(b.code));
    const idx = deps.findIndex(d => d.code === item.code);
    if (idx === -1) return null;

    const prev = deps[idx - 1], next = deps[idx + 1];
    let suite = "";
    if (prev) suite += `${prev.code} ${prev.nom} → `;
    suite += `${item.code} ${item.nom}`;
    if (next) suite += ` → ${next.code} ${next.nom}`;

    return `Les n° suivent l'ordre alphabétique des noms de 1790 (sans compter les Haut-, Bas- ou Deux-) : ${suite}.`;
}

function getMnemo(item) {
    if (!item) return null;
    const iso = (item.id || "").split("_").pop(); // cap_FRA, fl_FRA, w_FRA

    switch (item.type) {
        case 'dep':     return getMnemoDep(item);
        case 'reg':     return getMnemoRegion(item.nom);
        case 'vil':     return MNEMO_VILLES[item.id] || null;
        case 'nature':  return MNEMO_NATURE[item.id] || null;
        case 'his':     return MNEMO_HISTOIRE[item.id] || null;
        case 'pla':     return MNEMO_PLANTES[item.id] || MNEMO_FAMILLES[item.famille] || null;
        case 'cap':     return MNEMO_CAPITALES[iso] || getMnemoCapitaleAuto(iso);
        case 'flag':    return MNEMO_DRAPEAUX[iso] || null;
        case 'country': return MNEMO_PAYS[iso] || getMnemoPaysAuto(iso);
    }
    return null;
}

function afficherMnemo(item) {
    const box = document.getElementById('q-mnemo');
    if (!box) return;
    const astuce = getMnemo(item);
    if (astuce) {
        box.innerHTML = `<b>🧠 Astuce :</b> ${astuce}`;
        box.style.display = 'block';
    } else {
        box.innerHTML = "";
        box.style.display = 'none';
    }
}

// ============================================================
//   LE MONDE : on garde sous la main les infos de chaque pays
//   (voisins, enclavement, superficie, sous-région). C'est ce qui
//   permet de CALCULER une astuce vraie pour n'importe quel pays,
//   sans rien inventer.
// ============================================================

const CHAMPS_PAYS = "name,cca3,region,subregion,flags,capital,translations,borders,landlocked,area";
const URL_PAYS = "https://restcountries.com/v3.1/all?fields=" + CHAMPS_PAYS;
const URL_PAYS_MINIMAL = "https://restcountries.com/v3.1/all?fields=name,cca3,region,flags,capital,translations";

let WORLD_INFO = {};

function construireInfosMonde(apiData) {
    WORLD_INFO = {};
    apiData.forEach(c => {
        if (!c || !c.cca3) return;
        WORLD_INFO[c.cca3] = {
            nom: c.translations?.fra?.common || c.name?.common || c.cca3,
            capitale: CAPITALES_FR[c.cca3] || (c.capital && c.capital[0]) || "",
            region: c.region || "",
            sousRegion: c.subregion || c.region || "",
            zone: ZONES_FR[c.subregion] || ZONES_FR[c.region] || c.subregion || c.region || "",
            voisinsConnus: Array.isArray(c.borders),
            voisins: c.borders || [],
            enclave: !!c.landlocked,
            superficie: c.area || 0
        };
    });

    // Le classement par superficie sert aux astuces "l'un des plus grands pays"
    Object.keys(WORLD_INFO)
        .filter(iso => WORLD_INFO[iso].region !== "Antarctic" && WORLD_INFO[iso].superficie > 0)
        .sort((a, b) => WORLD_INFO[b].superficie - WORLD_INFO[a].superficie)
        .slice(0, 10)
        .forEach(iso => { WORLD_INFO[iso].geant = true; });
}

function listeFR(noms) {
    if (noms.length === 1) return noms[0];
    return noms.slice(0, -1).join(", ") + " et " + noms[noms.length - 1];
}

// On ne nomme que les voisins qu'on sait nommer en français : afficher
// un code brut comme "DEU" ne servirait à personne.
function nomsVoisins(info) {
    return info.voisins.map(code => WORLD_INFO[code] && WORLD_INFO[code].nom).filter(Boolean);
}

function superficieFR(km2) {
    if (km2 < 1) return "moins de 1 km²";
    return Math.round(km2).toLocaleString('fr-FR') + " km²";
}

// Astuce calculée pour un pays : ses voisins le situent sur la carte
// bien mieux qu'une phrase inventée. Tout vient des vraies frontières.
function getMnemoPaysAuto(iso) {
    const info = WORLD_INFO[iso];
    if (!info) return null;

    const v = nomsVoisins(info);
    const bouts = [];

    if (!info.voisinsConnus) { /* frontières inconnues : on ne dit rien à leur sujet */ }
    else if (info.enclave && v.length === 1) bouts.push(`Le repère parfait : un pays enclavé dans un seul autre, ${v[0]}, qui l'entoure complètement.`);
    else if (info.voisins.length === 0) bouts.push("Aucune frontière terrestre : c'est une île (ou un archipel), entourée d'eau de tous les côtés.");
    else if (v.length === 1 && info.voisins.length === 1) bouts.push(`Un seul voisin : ${v[0]}. Repère ce pays sur la carte, le tien est juste à côté.`);
    else if (v.length === 0) { /* on ne sait nommer aucun voisin : on ne raconte rien */ }
    else if (info.enclave) bouts.push(`Pas un mètre de côte. Ses voisins : ${listeFR(v.slice(0, 4))}.`);
    else if (v.length <= 4) bouts.push(`Ses voisins : ${listeFR(v)}.`);
    else bouts.push(`Il touche ${v.length} pays, dont : ${listeFR(v.slice(0, 3))}.`);

    if (info.geant) bouts.push("C'est aussi l'un des 10 plus grands pays du monde.");
    else if (info.superficie > 0 && info.superficie < 500) bouts.push(`Et c'est un tout petit pays : ${superficieFR(info.superficie)}.`);

    return bouts.length ? bouts.join(" ") : null;
}

// Astuce calculée pour une capitale : le cas le plus fréquent et le plus
// logique, c'est quand le pays et sa capitale portent le même nom.
function getMnemoCapitaleAuto(iso) {
    const info = WORLD_INFO[iso];
    if (!info || !info.capitale) return null;

    const pays = normKey(info.nom), cap = normKey(info.capitale);
    const commun = prefixeCommun(pays, cap);
    if (commun >= 4) {
        return cap === pays
            ? `Le plus simple qui soit : la capitale porte exactement le nom du pays.`
            : `Même racine : ${info.nom} → ${info.capitale}. Le pays et sa capitale portent le même nom.`;
    }
    return null;
}

function prefixeCommun(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
}

// ============================================================
//   LE TEMPS DE LECTURE
//   Avant : on enchaînait après 1,6 s, impossible de lire quoi que ce soit.
//   Maintenant : le délai s'adapte au texte affiché, une barre montre
//   le temps restant, on peut mettre en pause en touchant le texte
//   ou passer tout de suite avec "Suivant".
// ============================================================

let readTick = null, readTimer = null, readLeft = 0, readTotal = 0, readPaused = false;

function getReadingSpeed() {
    const el = document.querySelector('input[name="read-speed"]:checked');
    return el ? el.value : 'normal';
}

function clearPendingNext() {
    if (readTick) { clearInterval(readTick); readTick = null; }
    if (readTimer) { clearTimeout(readTimer); readTimer = null; }
    readPaused = false;
    const zone = document.getElementById('read-zone');
    if (zone) zone.style.display = 'none';
    const fill = document.getElementById('read-fill');
    if (fill) fill.classList.remove('paused');
}

function texteVisible(id) {
    const el = document.getElementById(id);
    return (el && el.style.display !== 'none') ? (el.innerText || "") : "";
}

// Plus il y a à lire, plus on laisse de temps (plafonné à 15 s)
function computeReadingTime(base) {
    const nbChars = (texteVisible('q-hierarchy') + texteVisible('q-mnemo')).length;
    const parChar = getReadingSpeed() === 'fast' ? 22 : 55;
    return Math.min(15000, base + nbChars * parChar);
}

function scheduleNextQuestion(base) {
    clearPendingNext();

    const zone = document.getElementById('read-zone');
    // Mode chrono : on garde le rythme, chaque seconde compte
    if (isChronoMode || !zone) { readTimer = setTimeout(askQuestion, base); return; }

    const fill = document.getElementById('read-fill');
    const track = document.getElementById('read-track');
    const hint = document.getElementById('read-hint');
    zone.style.display = 'flex';

    if (getReadingSpeed() === 'manual') {
        track.style.display = 'none';
        hint.innerText = "Prends ton temps 🙂";
        return;
    }

    track.style.display = 'block';
    hint.innerText = "👆 Touche le texte pour mettre en pause";
    readTotal = computeReadingTime(base);
    readLeft = readTotal;
    fill.style.width = "100%";

    readTick = setInterval(() => {
        if (readPaused) return;
        readLeft -= 50;
        fill.style.width = Math.max(0, (readLeft / readTotal) * 100) + "%";
        if (readLeft <= 0) { clearPendingNext(); askQuestion(); }
    }, 50);
}

function toggleReadingPause() {
    if (!readTick) return;
    readPaused = !readPaused;
    const fill = document.getElementById('read-fill');
    const hint = document.getElementById('read-hint');
    if (fill) fill.classList.toggle('paused', readPaused);
    if (hint) hint.innerText = readPaused ? "⏸️ En pause — Suivant quand tu veux" : "👆 Touche le texte pour mettre en pause";
}

function goToNextQuestion() { clearPendingNext(); askQuestion(); }

// ============================================================
//   LE SON
//   Tout est fabriqué à la volée avec WebAudio : aucun fichier à
//   héberger, aucun téléchargement, ça marche hors ligne.
// ============================================================

let audioCtx = null;
let sonActif = localStorage.getItem('LearnV28_Son') !== 'false';

function initSonUI() {
    const b = document.getElementById('sound-btn');
    if (b) b.innerText = sonActif ? "🔊" : "🔇";
}

function toggleSon() {
    sonActif = !sonActif;
    localStorage.setItem('LearnV28_Son', sonActif);
    initSonUI();
    if (sonActif) sonJuste();
}

// notes = [[fréquence en Hz, départ en s, durée en s], ...]
function jouer(notes, type = "sine", volume = 0.14) {
    if (!sonActif) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") audioCtx.resume();
        notes.forEach(([freq, debut, duree]) => {
            const o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.type = type; o.frequency.value = freq;
            const t = audioCtx.currentTime + debut;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(volume, t + 0.012);
            g.gain.exponentialRampToValueAtTime(0.001, t + duree);
            o.connect(g); g.connect(audioCtx.destination);
            o.start(t); o.stop(t + duree + 0.02);
        });
    } catch (e) { /* pas de son disponible : tant pis, le jeu continue */ }
}

function sonJuste()   { jouer([[660, 0, 0.12], [880, 0.09, 0.18]]); }
function sonCombo()   { jouer([[660, 0, 0.1], [880, 0.08, 0.1], [1174, 0.16, 0.26]]); }
function sonFaux()    { jouer([[220, 0, 0.18], [165, 0.12, 0.28]], "triangle", 0.11); }
function sonFanfare() { jouer([[523, 0, 0.14], [659, 0.12, 0.14], [784, 0.24, 0.14], [1046, 0.36, 0.42]]); }
function sonEtoile()  { jouer([[784, 0, 0.1], [988, 0.08, 0.1], [1318, 0.16, 0.3]]); }

// ============================================================
//   LA SÉRIE DE JOURS
//   L'historique quotidien d'XP existait déjà : la flamme se
//   déduit, il n'y a rien de plus à stocker.
// ============================================================

function jourISO(d) { return d.toISOString().split('T')[0]; }

function calculerSerie() {
    const history = JSON.parse(localStorage.getItem('LearnV28_History') || '{}');
    let d = new Date();
    // Rien aujourd'hui ? La série tient encore si on a joué hier.
    if (!history[jourISO(d)]) d.setDate(d.getDate() - 1);
    let serie = 0;
    while (history[jourISO(d)] > 0) { serie++; d.setDate(d.getDate() - 1); }
    return serie;
}

function meilleureSerie() {
    const jours = Object.keys(JSON.parse(localStorage.getItem('LearnV28_History') || '{}')).sort();
    let best = 0, courante = 0, precedent = null;
    jours.forEach(j => {
        const veille = new Date(j); veille.setDate(veille.getDate() - 1);
        courante = (precedent === jourISO(veille)) ? courante + 1 : 1;
        best = Math.max(best, courante);
        precedent = j;
    });
    return best;
}

function texteSerie() {
    const s = calculerSerie(), best = meilleureSerie();
    if (s === 0) return "Mon Atlas Personnel";
    const jour = s > 1 ? "jours" : "jour";
    return `🔥 ${s} ${jour} d'affilée` + (best > s ? ` · record ${best}` : " · c'est ton record !");
}

// ============================================================
//   LES TROPHÉES
// ============================================================

function lireFlags() { return JSON.parse(localStorage.getItem('LearnV28_Flags') || '{}'); }
function poserFlag(nom) { const f = lireFlags(); if (!f[nom]) { f[nom] = true; localStorage.setItem('LearnV28_Flags', JSON.stringify(f)); } }

function trophesObtenus() {
    const f = lireFlags(), obtenus = [];
    const maitrises = t => db.filter(i => i.type === t && i.rep > 0).length;
    const niveau = Math.floor(Math.sqrt(userXP / 50)) + 1;
    const serie = calculerSerie();
    const etapesFaites = Object.values(lireTours()).reduce((n, t) => n + Object.keys(t).length, 0);
    const boucle = id => Object.keys(lireTour(id)).length === TOURS[id].etapes.length;

    const tests = {
        debut: userXP >= 50, niv5: niveau >= 5, niv10: niveau >= 10,
        serie3: serie >= 3, serie7: serie >= 7, serie30: serie >= 30,
        sansfaute: !!f.sansfaute, combo: !!f.combo, chrono10: !!f.chrono10, infirmerie: !!f.infirmerie,
        dep50: maitrises('dep') >= 50, depAll: maitrises('dep') >= 96,
        vil20: maitrises('vil') >= 20, pays50: maitrises('country') >= 50,
        cap30: maitrises('cap') >= 30, flg30: maitrises('flag') >= 30,
        plantes: maitrises('pla') >= 20, histoire: maitrises('his') >= 23,
        etape1: etapesFaites >= 1, tour: boucle('france'), maillot: etoilesTotales('france') >= TOURS.france.etapes.length * 3,
        europe: boucle('europe'), monde: boucle('monde'), capitour: boucle('capitales')
    };
    TROPHEES.forEach(t => { if (tests[t.id]) obtenus.push(t.id); });
    return obtenus;
}

// Annonce les trophées tout juste décrochés (appelé en fin de session)
function verifierTrophees() {
    const obtenus = trophesObtenus();
    const connus = JSON.parse(localStorage.getItem('LearnV28_Trophees') || '[]');
    const nouveaux = obtenus.filter(id => !connus.includes(id));
    localStorage.setItem('LearnV28_Trophees', JSON.stringify(obtenus));
    nouveaux.forEach((id, i) => {
        const t = TROPHEES.find(x => x.id === id);
        setTimeout(() => { sonEtoile(); shootConfetti(); showToast(`Trophée débloqué : <b>${t.nom}</b>`, "#8b5cf6", t.emo); }, 600 + i * 1800);
    });
    return nouveaux;
}

function afficherTrophees() {
    const grille = document.getElementById('trophy-grid');
    if (!grille) return;
    const obtenus = trophesObtenus();
    safeSetText('trophy-count', `${obtenus.length}/${TROPHEES.length}`);
    const serie = calculerSerie();
    safeSetText('trophy-streak', serie > 0 ? `🔥 Série en cours : ${serie} j · record ${meilleureSerie()} j` : "Joue aujourd'hui pour lancer ta série 🔥");
    // On passe par l'identifiant : les descriptions contiennent des
    // apostrophes, qui casseraient un onclick écrit en toutes lettres.
    grille.innerHTML = TROPHEES.map(t => {
        const ok = obtenus.includes(t.id);
        return `<div class="trophy ${ok ? 'gagne' : ''}" onclick="detailTrophee('${t.id}')">
                    <span class="trophy-emo">${t.emo}</span><span class="trophy-nom">${t.nom}</span>
                </div>`;
    }).join('');
}

function detailTrophee(id) {
    const t = TROPHEES.find(x => x.id === id);
    if (!t) return;
    const gagne = trophesObtenus().includes(id);
    showToast(`<b>${t.nom}</b><br>${t.desc}` + (gagne ? " ✅" : ""), gagne ? "#8b5cf6" : "#64748b", t.emo);
}

// ============================================================
//   LE TOUR DE FRANCE (le parcours)
//   Une étape = une région. On ne pioche que dans son territoire,
//   et les étoiles dépendent du nombre de fautes.
// ============================================================

let tourActif = localStorage.getItem('LearnV28_TourActif') || 'france';
if (!TOURS[tourActif]) tourActif = 'france';

// Ancien format : {"Bretagne": 2, ...} = les étoiles du Tour de France.
// On l'enveloppe une fois pour toutes dans le nouveau format par parcours.
function lireTours() {
    const brut = JSON.parse(localStorage.getItem('LearnV28_Tour') || '{}');
    const cles = Object.keys(brut);
    if (cles.length && !cles.some(k => TOURS[k])) return { france: brut };
    return brut;
}
function lireTour(id) { return lireTours()[id || tourActif] || {}; }

function ecrireEtoiles(id, cle, etoiles) {
    const tous = lireTours();
    tous[id] = tous[id] || {};
    tous[id][cle] = Math.max(tous[id][cle] || 0, etoiles);
    localStorage.setItem('LearnV28_Tour', JSON.stringify(tous));
}

function changerTour(id) {
    if (!TOURS[id]) return;
    tourActif = id;
    localStorage.setItem('LearnV28_TourActif', id);
    rafraichirTour();
}

function etapesDu(id) { return TOURS[id].etapes; }

function etapeCourante(id) {
    id = id || tourActif;
    const fait = lireTour(id), etapes = etapesDu(id);
    const i = etapes.findIndex(e => !fait[e.cle] && !etapeVide(id, e));
    return i === -1 ? etapes.length - 1 : i;
}

// Une étape sans aucune question (sous-région absente des données, ou
// monde non chargé) ne doit jamais bloquer la suite du parcours.
function etapeVide(id, etape) { return db.length > 0 && poolEtape(id, etape).length === 0; }

function etapeOuverte(id, i) {
    if (i === 0) return true;
    const precedente = etapesDu(id)[i - 1];
    return !!lireTour(id)[precedente.cle] || etapeVide(id, precedente);
}

function etoilesTotales(id) { return Object.values(lireTour(id)).reduce((a, b) => a + b, 0); }
function etoilesTexte(n) { return "⭐".repeat(n) + "☆".repeat(3 - n); }

function rafraichirTour() {
    const tour = TOURS[tourActif], etapes = tour.etapes, fait = lireTour();
    const courante = etapeCourante(), e = etapes[courante];
    const fini = Object.keys(fait).length === etapes.length;

    const onglets = document.getElementById('tour-tabs');
    if (onglets) {
        onglets.innerHTML = Object.keys(TOURS).map(id =>
            `<button class="tour-tab ${id === tourActif ? 'actif' : ''}" onclick="changerTour('${id}')">${TOURS[id].onglet}</button>`).join('');
        // Sur petit écran la ligne déborde : on ramène l'onglet choisi devant
        const actif = onglets.querySelector('.actif');
        if (actif) onglets.scrollLeft = Math.max(0, actif.offsetLeft - 8);
    }

    safeSetText('tour-nom', tour.nom + " " + tour.emo);
    safeSetText('tour-count', `⭐ ${etoilesTotales()}/${etapes.length * 3}`);
    safeSetText('tour-info', fini ? "Parcours bouclé ! Rejoue une étape pour décrocher les étoiles qui manquent."
                                  : `Étape ${courante + 1}/${etapes.length} · ${e.court}`);
    safeSetText('tour-titre', fini ? "🏁 Bravo, tu as fait le tour." : `${e.emo} ${e.titre}`);
    safeSetText('tour-btn', fini ? "Rejouer une étape" : "Prendre le départ");

    const bande = document.getElementById('tour-strip');
    if (bande) {
        bande.innerHTML = etapes.map((et, i) => {
            const etoiles = fait[et.cle] || 0;
            const ouverte = etapeOuverte(tourActif, i);
            const classe = etoiles ? "faite" : (i === courante ? "courante" : (ouverte ? "" : "fermee"));
            return `<div class="etape ${classe}" onclick="lancerEtape(${i})">
                        <span class="etape-num">${ouverte || etoiles ? et.emo : "🔒"}</span>
                        <span class="etape-nom">${et.court}</span>
                        <span class="etape-etoiles">${etoiles ? etoilesTexte(etoiles) : "☆☆☆"}</span>
                    </div>`;
        }).join('');
        const active = bande.querySelector('.courante') || bande.querySelector('.etape');
        if (active) bande.scrollLeft = Math.max(0, active.offsetLeft - 90);
    }
}

// Le contenu d'une étape : en France on suit les régions, ailleurs on
// suit la sous-région renvoyée par l'API.
function poolEtape(id, etape) {
    const tour = TOURS[id];
    if (id === 'france') {
        return db.filter(i =>
            (i.type === 'reg' && i.nom === etape.cle) ||
            (i.type === 'dep' && DEP_REGIONS[i.code] === etape.cle) ||
            (i.type === 'vil' && i.reg === etape.cle));
    }
    return db.filter(i => tour.types.includes(i.type) && etape.sr && etape.sr.includes(i.sr));
}

async function lancerEtape(index) {
    const etapes = etapesDu(tourActif);
    if (!etapeOuverte(tourActif, index)) {
        return showToast(`Termine d'abord l'étape ${index} : <b>${etapes[index - 1].court}</b>`, "#f59e0b", "🔒");
    }
    etapeEnCours = index; tourEnCours = tourActif;
    await launchGame('tour');
}

function lancerEtapeCourante() { lancerEtape(etapeCourante()); }

// Fin d'étape : les étoiles, et en France le déblocage des départements
function terminerEtape() {
    const e = etapesDu(tourEnCours)[etapeEnCours];
    const etoiles = sessionErreurs === 0 ? 3 : (sessionErreurs === 1 ? 2 : 1);
    ecrireEtoiles(tourEnCours, e.cle, etoiles);

    let bonus = "";
    if (tourEnCours === 'france') {
        let unlocked = JSON.parse(localStorage.getItem('LearnV28_UnlockedDeps') || JSON.stringify(STARTER_DEPS));
        Object.keys(DEP_REGIONS).filter(code => DEP_REGIONS[code] === e.cle).forEach(code => {
            if (!unlocked.includes(code)) unlocked.push(code);
            const d = db.find(i => i.type === 'dep' && i.code === code); if (d) d.unlocked = true;
        });
        localStorage.setItem('LearnV28_UnlockedDeps', JSON.stringify(unlocked));
        bonus = "<br>Ses départements rejoignent ton Atlas.";
    }

    safeSetText('q-target', `${e.emo} Étape gagnée !`);
    safeSetText('q-question', `${e.court} · ${etoilesTexte(etoiles)}`);
    sonFanfare(); shootConfetti();
    showToast(`<b>${e.court}</b> ${etoilesTexte(etoiles)}${bonus}`, "#10b981", e.emo);
    addXP(30);
}

// ============================================================
//   LE DÉFI PARTAGEABLE
//   Tout tient dans le lien : les 10 questions et le score à
//   battre. Aucun serveur, aucun compte.
// ============================================================

function encoderDefi(obj) { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
function decoderDefi(txt) { try { return JSON.parse(decodeURIComponent(escape(atob(txt)))); } catch (e) { return null; } }

function lireDefiURL() {
    const h = location.hash || "";
    if (!h.startsWith('#defi=')) return null;
    const d = decoderDefi(h.slice(6));
    return (d && Array.isArray(d.q) && d.q.length) ? d : null;
}

function lienDefi(ids, score, total) {
    return location.origin + location.pathname + "#defi=" + encoderDefi({ q: ids, s: score, t: total });
}

async function partagerDefi(ids, score, total) {
    if (!ids) {
        const dernier = JSON.parse(localStorage.getItem('LearnV28_DernierDefi') || 'null');
        if (dernier) { ids = dernier.ids; score = dernier.score; total = dernier.total; }
        else {
            if (!await loadDataAndMap()) return;
            const pool = poolMatieres();
            if (!pool.length) return showToast("Coche au moins une matière dans les réglages !", "#f59e0b", "⚙️");
            ids = pool.sort(() => Math.random() - 0.5).slice(0, 10).map(i => i.id);
            score = -1; total = ids.length;
        }
    }
    const url = lienDefi(ids, score, total);
    const texte = score >= 0 ? `Je fais ${score}/${total} sur ce défi. Tu fais mieux ?` : "Je te défie sur 10 questions !";
    try {
        if (navigator.share) { await navigator.share({ title: "Défi LearnDaily", text: texte, url }); return; }
        await navigator.clipboard.writeText(url);
        showToast("Lien copié ! Envoie-le à qui tu veux 🎯", "#8b5cf6", "🔗");
    } catch (e) {
        if (e && e.name === 'AbortError') return;   // partage annulé par l'utilisateur
        prompt("Copie ce lien et envoie-le :", url);
    }
}

function afficherDefiRecu() {
    defiRecu = lireDefiURL();
    const carte = document.getElementById('defi-card');
    if (!carte) return;
    carte.style.display = defiRecu ? 'block' : 'none';
    if (defiRecu) {
        safeSetText('defi-info', defiRecu.s >= 0
            ? `${defiRecu.q.length} questions · score à battre : ${defiRecu.s}/${defiRecu.t}`
            : `${defiRecu.q.length} questions, les mêmes pour vous deux.`);
    }
}

function terminerDefi() {
    const total = sessionTotal, score = sessionBonnes;
    const aBattre = defiRecu && defiRecu.s >= 0 ? defiRecu.s : null;
    let msg = `Ton score : <b>${score}/${total}</b>`;
    if (aBattre !== null) msg += score > aBattre ? " — tu gagnes ! 🏆" : (score === aBattre ? " — égalité !" : ` — raté, il fallait battre ${aBattre}.`);
    safeSetText('q-target', `${score}/${total}`);
    safeSetText('q-question', aBattre !== null ? (score > aBattre ? "Défi remporté ! 🏆" : "Défi relevé.") : "Défi terminé.");
    showToast(msg, score > (aBattre ?? -1) ? "#10b981" : "#8b5cf6", "🎯");
    if (score > (aBattre ?? -1)) { sonFanfare(); shootConfetti(); }
    localStorage.setItem('LearnV28_DernierDefi', JSON.stringify({ ids: defiRecu.q, score, total }));
    location.hash = "";
    defiRecu = null;
}

// Les matières cochées dans les réglages, au même endroit pour le Quiz
// Libre et pour le défi.
function poolMatieres() {
    const coche = id => document.getElementById(id).checked;
    let pool = [];
    if(coche('opt-reg')) pool = pool.concat(db.filter(i => i.type === 'reg'));
    if(coche('opt-dep')) pool = pool.concat(db.filter(i => i.type === 'dep' && i.unlocked));
    if(coche('opt-vil')) pool = pool.concat(db.filter(i => i.type === 'vil'));
    if(coche('opt-nat')) pool = pool.concat(db.filter(i => i.type === 'nature'));
    if(coche('opt-eur-pays')) pool = pool.concat(db.filter(i => i.type === 'country' && i.domaine === 'europe'));
    if(coche('opt-eur-cap')) pool = pool.concat(db.filter(i => i.type === 'cap' && i.domaine === 'europe'));
    if(coche('opt-monde-pays')) pool = pool.concat(db.filter(i => i.type === 'country' && i.domaine === 'monde'));
    if(coche('opt-monde-flg')) pool = pool.concat(db.filter(i => i.type === 'flag' && i.domaine === 'monde'));
    if(coche('opt-monde-cap')) pool = pool.concat(db.filter(i => i.type === 'cap' && i.domaine === 'monde'));
    if(coche('opt-pla')) pool = pool.concat(db.filter(i => i.type === 'pla'));
    if(coche('opt-his')) pool = pool.concat(db.filter(i => i.type === 'his'));
    return pool;
}

async function lancerDefi() { if (!defiRecu) return; await launchGame('defi'); }
