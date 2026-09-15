// --- LE STARTER PACK (Les 12 départements de base) ---
const STARTER_DEPS = ["59", "29", "64", "06", "67", "75", "33", "13", "69", "31", "63", "2A"];

// --- LA CARTE DES VOISINS (Pour le filet de sécurité et le Radar) ---

const DEP_NEIGHBORS = {
    "01":["39","71","69","38","73","74"], "02":["59","80","60","77","51","08"], "03":["18","58","71","42","63","23"], "04":["05","26","84","83","06"], "05":["73","38","26","04"], "06":["04","83"], "07":["42","38","26","84","30","48","43"], "08":["02","51","55"], "09":["31","11","66"], "10":["51","52","21","89","77"], "11":["34","81","31","09","66"], "12":["15","48","34","81","82","46"], "13":["30","84","83"], "14":["50","27","61"], "15":["19","63","43","48","12","46"], "16":["79","86","87","24","17"], "17":["85","79","16","24","33"], "18":["41","45","58","03","23","36"], "19":["23","63","15","46","24","87"], "2A":["2B"], "2B":["2A"], "21":["52","70","39","71","58","89","10"], "22":["29","56","35"], "23":["36","18","03","63","19","87"], "24":["16","87","19","46","47","33","17"], "25":["90","70","39"], "26":["38","05","04","84","07"], "27":["76","60","95","78","28","61","14"], "28":["27","78","91","45","41","72","61"], "29":["22","56"], "30":["07","84","13","34","12","48"], "31":["32","82","81","11","09","65"], "32":["40","47","82","31","65","64"], "33":["17","24","47","40"], "34":["30","13","11","81","12"], "35":["22","56","44","49","53","50"], "36":["37","41","18","23","87","86"], "37":["72","41","36","86","49"], "38":["01","73","05","26","07","42","69"], "39":["70","25","01","71","21"], "40":["33","47","32","64"], "41":["28","45","18","36","37","72"], "42":["71","69","38","07","43","63","03"], "43":["42","07","48","15","63"], "44":["56","35","49","85"], "45":["91","77","89","58","18","41","28"], "46":["19","15","12","82","47","24"], "47":["24","46","82","32","40","33"], "48":["43","07","30","12","15"], "49":["44","35","53","72","37","86","79","85"], "50":["14","61","53","35"], "51":["08","55","52","10","77","02"], "52":["55","88","70","21","10","51"], "53":["50","61","72","49","35"], "54":["57","67","88","55"], "55":["08","51","52","88","54"], "56":["29","22","35","44"], "57":["54","67"], "58":["89","21","71","03","18","45"], "59":["62","02","80"], "60":["80","02","77","95","27","76"], "61":["14","27","28","72","53","50"], "62":["59","80"], "63":["03","42","43","15","19","23"], "64":["40","32","65"], "65":["64","32","31"], "66":["11","09"], "67":["57","54","88","68"], "68":["67","88","90"], "69":["71","01","38","42"], "70":["88","90","25","39","21","52"], "71":["21","39","01","69","42","03","58"], "72":["61","28","41","37","49","53"], "73":["74","01","38","05"], "74":["01","73"], "75":["92","93","94"], "76":["80","60","27"], "77":["60","02","51","10","89","45","91","94","93"], "78":["95","27","28","91","92"], "79":["49","86","16","17","85"], "80":["62","59","02","60","76"], "81":["12","34","11","31","82"], "82":["46","12","81","31","32","47"], "83":["04","06","13"], "84":["26","04","83","13","30","07"], "85":["44","49","79","17"], "86":["37","36","87","16","79","49"], "87":["36","23","19","24","16","86"], "88":["54","67","68","90","70","52","55"], "89":["77","10","21","58","45"], "90":["68","25","70","88"], "91":["78","92","94","77","45","28"], "92":["95","93","75","94","91","78"], "93":["95","77","94","75","92"], "94":["93","77","91","92","75"], "95":["60","77","93","92","78","27"]
};

const DATA_VILLES = [ 
    { id: "v_paris", domaine: "geographie", type: "vil", nom: "Paris", coords: [2.3522, 48.8566], dep: "Paris", reg: "Île-de-France" }, { id: "v_marseille", domaine: "geographie", type: "vil", nom: "Marseille", coords: [5.3698, 43.2965], dep: "Bouches-du-Rhône", reg: "Provence-Alpes-Côte d'Azur" }, { id: "v_lyon", domaine: "geographie", type: "vil", nom: "Lyon", coords: [4.8357, 45.7640], dep: "Rhône", reg: "Auvergne-Rhône-Alpes" }, { id: "v_toulouse", domaine: "geographie", type: "vil", nom: "Toulouse", coords: [1.4442, 43.6047], dep: "Haute-Garonne", reg: "Occitanie" }, { id: "v_nice", domaine: "geographie", type: "vil", nom: "Nice", coords: [7.2620, 43.7102], dep: "Alpes-Maritimes", reg: "Provence-Alpes-Côte d'Azur" }, { id: "v_nantes", domaine: "geographie", type: "vil", nom: "Nantes", coords: [-1.5536, 47.2184], dep: "Loire-Atlantique", reg: "Pays de la Loire" }, { id: "v_montpellier", domaine: "geographie", type: "vil", nom: "Montpellier", coords: [3.8767, 43.6108], dep: "Hérault", reg: "Occitanie" }, { id: "v_strasbourg", domaine: "geographie", type: "vil", nom: "Strasbourg", coords: [7.7521, 48.5734], dep: "Bas-Rhin", reg: "Grand Est" }, { id: "v_bordeaux", domaine: "geographie", type: "vil", nom: "Bordeaux", coords: [-0.5792, 44.8378], dep: "Gironde", reg: "Nouvelle-Aquitaine" }, { id: "v_lille", domaine: "geographie", type: "vil", nom: "Lille", coords: [3.0573, 50.6292], dep: "Nord", reg: "Hauts-de-France" }, { id: "v_rennes", domaine: "geographie", type: "vil", nom: "Rennes", coords: [-1.6778, 48.1173], dep: "Ille-et-Vilaine", reg: "Bretagne" }, { id: "v_reims", domaine: "geographie", type: "vil", nom: "Reims", coords: [4.0317, 49.2583], dep: "Marne", reg: "Grand Est" }, { id: "v_toulon", domaine: "geographie", type: "vil", nom: "Toulon", coords: [5.9305, 43.1242], dep: "Var", reg: "Provence-Alpes-Côte d'Azur" }, { id: "v_stetienne", domaine: "geographie", type: "vil", nom: "Saint-Étienne", coords: [4.3900, 45.4397], dep: "Loire", reg: "Auvergne-Rhône-Alpes" }, { id: "v_lehavre", domaine: "geographie", type: "vil", nom: "Le Havre", coords: [0.1079, 49.4944], dep: "Seine-Maritime", reg: "Normandie" }, { id: "v_grenoble", domaine: "geographie", type: "vil", nom: "Grenoble", coords: [5.7245, 45.1885], dep: "Isère", reg: "Auvergne-Rhône-Alpes" }, { id: "v_dijon", domaine: "geographie", type: "vil", nom: "Dijon", coords: [5.0415, 47.3220], dep: "Côte-d'Or", reg: "Bourgogne-Franche-Comté" }, { id: "v_angers", domaine: "geographie", type: "vil", nom: "Angers", coords: [-0.5516, 47.4784], dep: "Maine-et-Loire", reg: "Pays de la Loire" }, { id: "v_nimes", domaine: "geographie", type: "vil", nom: "Nîmes", coords: [4.3601, 43.8367], dep: "Gard", reg: "Occitanie" }, { id: "v_villeurbanne", domaine: "geographie", type: "vil", nom: "Villeurbanne", coords: [4.8800, 45.7667], dep: "Rhône", reg: "Auvergne-Rhône-Alpes" }, { id: "v_lemans", domaine: "geographie", type: "vil", nom: "Le Mans", coords: [0.1919, 48.0061], dep: "Sarthe", reg: "Pays de la Loire" }, { id: "v_aix", domaine: "geographie", type: "vil", nom: "Aix-en-Provence", coords: [5.4474, 43.5297], dep: "Bouches-du-Rhône", reg: "Provence-Alpes-Côte d'Azur" }, { id: "v_clermont", domaine: "geographie", type: "vil", nom: "Clermont-Ferrand", coords: [3.0870, 45.7772], dep: "Puy-de-Dôme", reg: "Auvergne-Rhône-Alpes" }, { id: "v_brest", domaine: "geographie", type: "vil", nom: "Brest", coords: [-4.4860, 48.3904], dep: "Finistère", reg: "Bretagne" }, { id: "v_tours", domaine: "geographie", type: "vil", nom: "Tours", coords: [0.6848, 47.3941], dep: "Indre-et-Loire", reg: "Centre-Val de Loire" }, { id: "v_amiens", domaine: "geographie", type: "vil", nom: "Amiens", coords: [2.2957, 49.8941], dep: "Somme", reg: "Hauts-de-France" }, { id: "v_limoges", domaine: "geographie", type: "vil", nom: "Limoges", coords: [1.2578, 45.8336], dep: "Haute-Vienne", reg: "Nouvelle-Aquitaine" }, { id: "v_annecy", domaine: "geographie", type: "vil", nom: "Annecy", coords: [6.1294, 45.8992], dep: "Haute-Savoie", reg: "Auvergne-Rhône-Alpes" }, { id: "v_perpignan", domaine: "geographie", type: "vil", nom: "Perpignan", coords: [2.8959, 42.6986], dep: "Pyrénées-Orientales", reg: "Occitanie" }, { id: "v_boulogne", domaine: "geographie", type: "vil", nom: "Boulogne-Billancourt", coords: [2.2390, 48.8351], dep: "Hauts-de-Seine", reg: "Île-de-France" }, { id: "v_metz", domaine: "geographie", type: "vil", nom: "Metz", coords: [6.1757, 49.1193], dep: "Moselle", reg: "Grand Est" }, { id: "v_besancon", domaine: "geographie", type: "vil", nom: "Besançon", coords: [6.0241, 47.2378], dep: "Doubs", reg: "Bourgogne-Franche-Comté" }, { id: "v_orleans", domaine: "geographie", type: "vil", nom: "Orléans", coords: [1.9056, 47.9029], dep: "Loiret", reg: "Centre-Val de Loire" }, { id: "v_argenteuil", domaine: "geographie", type: "vil", nom: "Argenteuil", coords: [2.2474, 48.9479], dep: "Val-d'Oise", reg: "Île-de-France" }, { id: "v_rouen", domaine: "geographie", type: "vil", nom: "Rouen", coords: [1.0999, 49.4432], dep: "Seine-Maritime", reg: "Normandie" }, { id: "v_montreuil", domaine: "geographie", type: "vil", nom: "Montreuil", coords: [2.4432, 48.8624], dep: "Seine-Saint-Denis", reg: "Île-de-France" }, { id: "v_mulhouse", domaine: "geographie", type: "vil", nom: "Mulhouse", coords: [7.3359, 47.7508], dep: "Haut-Rhin", reg: "Grand Est" }, { id: "v_caen", domaine: "geographie", type: "vil", nom: "Caen", coords: [-0.3706, 49.1829], dep: "Calvados", reg: "Normandie" }, { id: "v_nancy", domaine: "geographie", type: "vil", nom: "Nancy", coords: [6.1844, 48.6921], dep: "Meurthe-et-Moselle", reg: "Grand Est" }, { id: "v_roubaix", domaine: "geographie", type: "vil", nom: "Roubaix", coords: [3.1746, 50.6927], dep: "Nord", reg: "Hauts-de-France" }, { id: "v_tourcoing", domaine: "geographie", type: "vil", nom: "Tourcoing", coords: [3.1590, 50.7239], dep: "Nord", reg: "Hauts-de-France" }, { id: "v_nanterre", domaine: "geographie", type: "vil", nom: "Nanterre", coords: [2.2065, 48.8924], dep: "Hauts-de-Seine", reg: "Île-de-France" }, { id: "v_vitry", domaine: "geographie", type: "vil", nom: "Vitry-sur-Seine", coords: [2.3874, 48.7874], dep: "Val-de-Marne", reg: "Île-de-France" }, { id: "v_creteil", domaine: "geographie", type: "vil", nom: "Créteil", coords: [2.4628, 48.7771], dep: "Val-de-Marne", reg: "Île-de-France" }, { id: "v_avignon", domaine: "geographie", type: "vil", nom: "Avignon", coords: [4.8055, 43.9493], dep: "Vaucluse", reg: "Provence-Alpes-Côte d'Azur" }, { id: "v_poitiers", domaine: "geographie", type: "vil", nom: "Poitiers", coords: [0.3404, 46.5802], dep: "Vienne", reg: "Nouvelle-Aquitaine" }, { id: "v_aubervilliers", domaine: "geographie", type: "vil", nom: "Aubervilliers", coords: [2.3828, 48.9131], dep: "Seine-Saint-Denis", reg: "Île-de-France" }, { id: "v_dunkerque", domaine: "geographie", type: "vil", nom: "Dunkerque", coords: [2.3791, 51.0343], dep: "Nord", reg: "Hauts-de-France" }, { id: "v_asnieres", domaine: "geographie", type: "vil", nom: "Asnières", coords: [2.2854, 48.9106], dep: "Hauts-de-Seine", reg: "Île-de-France" }, { id: "v_versailles", domaine: "geographie", type: "vil", nom: "Versailles", coords: [2.1398, 48.8014], dep: "Yvelines", reg: "Île-de-France" }
];

const DATA_NATURE = [
    { id: "n_alpes", domaine: "geographie", type: "nature", nom: "Les Alpes", typeNat: "massif", coordsPath: [[6.0, 44.5], [6.5, 46.0], [7.0, 46.4], [7.5, 45.8], [7.5, 43.8], [7.2, 43.7], [6.2, 44.0]], anecdote: "Le Mont Blanc y culmine à 4809 mètres." }, { id: "n_pyrenees", domaine: "geographie", type: "nature", nom: "Les Pyrénées", typeNat: "massif", coordsPath: [[-1.8, 43.3], [0.0, 42.8], [3.0, 42.4], [3.1, 42.8], [1.0, 43.1], [-1.5, 43.5]], anecdote: "Frontière naturelle avec l'Espagne." }, { id: "n_massif", domaine: "geographie", type: "nature", nom: "Massif Central", typeNat: "massif", coordsPath: [[1.5, 45.0], [2.5, 46.3], [4.5, 46.0], [4.5, 44.2], [3.5, 43.5], [2.0, 43.5]], anecdote: "Composé de volcans éteints." }, { id: "n_jura", domaine: "geographie", type: "nature", nom: "Le Jura", typeNat: "massif", coordsPath: [[5.3, 45.8], [5.8, 46.2], [6.8, 47.4], [7.0, 47.5], [6.5, 46.5], [5.5, 45.5]], anecdote: "Frontière avec la Suisse." }, { id: "n_vosges", domaine: "geographie", type: "nature", nom: "Les Vosges", typeNat: "massif", coordsPath: [[6.8, 47.8], [7.0, 48.0], [7.3, 49.0], [7.6, 49.0], [7.3, 48.0], [6.6, 47.6]], anecdote: "Séparent la Lorraine et l'Alsace." }, { id: "n_loire", domaine: "geographie", type: "nature", nom: "La Loire", typeNat: "fleuve", coordsPath: [[4.2, 44.8], [4.0, 46.0], [3.2, 47.0], [1.9, 47.9], [0.7, 47.4], [-0.5, 47.5], [-1.5, 47.2], [-2.2, 47.3]], anecdote: "Le plus long fleuve de France (1006 km)." }, { id: "n_seine", domaine: "geographie", type: "nature", nom: "La Seine", typeNat: "fleuve", coordsPath: [[4.7, 47.5], [4.0, 48.3], [2.35, 48.85], [1.1, 49.4], [0.1, 49.5]], anecdote: "Traverse Paris et se jette dans la Manche." }, { id: "n_rhone", domaine: "geographie", type: "nature", nom: "Le Rhône", typeNat: "fleuve", coordsPath: [[6.1, 46.2], [4.8, 45.76], [4.9, 44.9], [4.6, 43.4]], anecdote: "Prend sa source dans le glacier du Rhône en Suisse." }, { id: "n_garonne", domaine: "geographie", type: "nature", nom: "La Garonne", typeNat: "fleuve", coordsPath: [[0.8, 42.8], [1.4, 43.6], [0.6, 44.2], [-0.6, 44.8], [-1.0, 45.5]], anecdote: "Prend sa source en Espagne et traverse Toulouse." }, { id: "n_rhin", domaine: "geographie", type: "nature", nom: "Le Rhin", typeNat: "fleuve", coordsPath: [[7.6, 47.6], [7.6, 48.1], [7.8, 48.6], [8.0, 49.0]], anecdote: "Frontière naturelle avec l'Allemagne." }
];

const DATA_PLANTES = [ 
    { id: "p_chene", domaine: "botanique", type: "pla", nom: "Le Chêne", famille: "Fagacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Quercus_robur_2003-08-16.jpg/800px-Quercus_robur_2003-08-16.jpg" }, { id: "p_hetre", domaine: "botanique", type: "pla", nom: "Le Hêtre", famille: "Fagacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Fagus_sylvatica_004.jpg/800px-Fagus_sylvatica_004.jpg" }, { id: "p_bouleau", domaine: "botanique", type: "pla", nom: "Le Bouleau", famille: "Bétulacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Betula_pendula_001.jpg/800px-Betula_pendula_001.jpg" }, { id: "p_platane", domaine: "botanique", type: "pla", nom: "Le Platane", famille: "Platanacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Platanus_occidentalis_leaves_and_fruit.jpg/800px-Platanus_occidentalis_leaves_and_fruit.jpg" }, { id: "p_olivier", domaine: "botanique", type: "pla", nom: "L'Olivier", famille: "Oléacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Olive_tree.jpg/800px-Olive_tree.jpg" }, { id: "p_sapin", domaine: "botanique", type: "pla", nom: "Le Sapin", famille: "Pinacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Abies_alba_skopje.jpg/800px-Abies_alba_skopje.jpg" }, { id: "p_pissenlit", domaine: "botanique", type: "pla", nom: "Le Pissenlit", famille: "Astéracées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg/800px-Taraxacum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-135.jpg" }, { id: "p_coquelicot", domaine: "botanique", type: "pla", nom: "Le Coquelicot", famille: "Papavéracées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Papaver_rhoeas_01.jpg/800px-Papaver_rhoeas_01.jpg" }, { id: "p_marguerite", domaine: "botanique", type: "pla", nom: "La Marguerite", famille: "Astéracées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Leucanthemum_vulgare_2.jpg/800px-Leucanthemum_vulgare_2.jpg" }, { id: "p_tournesol", domaine: "botanique", type: "pla", nom: "Le Tournesol", famille: "Astéracées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/800px-Sunflower_sky_backdrop.jpg" }, { id: "p_muguet", domaine: "botanique", type: "pla", nom: "Le Muguet", famille: "Liliacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Convallaria_majalis_0002.JPG/800px-Convallaria_majalis_0002.JPG" }, { id: "p_tulipe", domaine: "botanique", type: "pla", nom: "La Tulipe", famille: "Liliacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Tulipa_gesneriana_2.jpg/800px-Tulipa_gesneriana_2.jpg" }, { id: "p_lavande", domaine: "botanique", type: "pla", nom: "La Lavande", famille: "Lamiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lavandula_angustifolia_001.jpg/800px-Lavandula_angustifolia_001.jpg" }, { id: "p_thym", domaine: "botanique", type: "pla", nom: "Le Thym", famille: "Lamiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Thymus_vulgaris_002.JPG/800px-Thymus_vulgaris_002.JPG" }, { id: "p_romarin", domaine: "botanique", type: "pla", nom: "Le Romarin", famille: "Lamiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Rosmarinus_officinalis_0003.JPG/800px-Rosmarinus_officinalis_0003.JPG" }, { id: "p_menthe", domaine: "botanique", type: "pla", nom: "La Menthe", famille: "Lamiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mentha_spicata_01.jpg/800px-Mentha_spicata_01.jpg" }, { id: "p_basilic", domaine: "botanique", type: "pla", nom: "Le Basilic", famille: "Lamiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ocimum_basilicum_001.JPG/800px-Ocimum_basilicum_001.JPG" }, { id: "p_ortie", domaine: "botanique", type: "pla", nom: "L'Ortie", famille: "Urticacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Urtica_dioica_002.JPG/800px-Urtica_dioica_002.JPG" }, { id: "p_lierre", domaine: "botanique", type: "pla", nom: "Le Lierre", famille: "Araliacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hedera_helix_001.JPG/800px-Hedera_helix_001.JPG" }, { id: "p_fougère", domaine: "botanique", type: "pla", nom: "La Fougère", famille: "Polypodiacées", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Athyrium_filix-femina.jpg/800px-Athyrium_filix-femina.jpg" }
];

const DATA_HISTOIRE = [
    { id: "h_terre", domaine: "histoire", type: "his", nom: "-4,5 Milliards d'années", contexte: "Formation de la Terre et du Système Solaire.", periode: 0 }, { id: "h_dino", domaine: "histoire", type: "his", nom: "-66 Millions d'années", contexte: "Extinction des dinosaures (Météorite).", periode: 0 }, { id: "h_sapiens", domaine: "histoire", type: "his", nom: "-300 000 ans", contexte: "Apparition d'Homo Sapiens en Afrique.", periode: 1 }, { id: "h_feu", domaine: "histoire", type: "his", nom: "-400 000 ans", contexte: "Maîtrise du feu par Homo Erectus.", periode: 1 }, { id: "h_agri", domaine: "histoire", type: "his", nom: "-10 000 ans", contexte: "Invention de l'agriculture (Révolution néolithique).", periode: 1 }, { id: "h_ecri", domaine: "histoire", type: "his", nom: "-3000 av. J.-C.", contexte: "Invention de l'écriture en Mésopotamie.", periode: 2 }, { id: "h_pyramide", domaine: "histoire", type: "his", nom: "-2500 av. J.-C.", contexte: "Construction de la Grande Pyramide de Gizeh.", periode: 2 }, { id: "h_rome", domaine: "histoire", type: "his", nom: "753 av. J.-C.", contexte: "Fondation mythique de la ville de Rome.", periode: 2 }, { id: "h_alesia", domaine: "histoire", type: "his", nom: "-52 av. J.-C.", contexte: "Vercingétorix dépose les armes à Alésia devant César.", periode: 2 }, { id: "h_chute_rome", domaine: "histoire", type: "his", nom: "476", contexte: "Chute de l'Empire Romain d'Occident.", periode: 3 }, { id: "h_clovis", domaine: "histoire", type: "his", nom: "496", contexte: "Baptême de Clovis, Roi des Francs.", periode: 3 }, { id: "h_charlemagne", domaine: "histoire", type: "his", nom: "25 Décembre 800", contexte: "Sacre de Charlemagne comme Empereur.", periode: 3 }, { id: "h_hastings", domaine: "histoire", type: "his", nom: "1066", contexte: "Guillaume le Conquérant remporte la bataille d'Hastings.", periode: 3 }, { id: "h_guerre100", domaine: "histoire", type: "his", nom: "1453", contexte: "Fin de la Guerre de Cent Ans.", periode: 3 }, { id: "h_colomb", domaine: "histoire", type: "his", nom: "1492", contexte: "Découverte de l'Amérique par Christophe Colomb.", periode: 4 }, { id: "h_imprimerie", domaine: "histoire", type: "his", nom: "1454", contexte: "Gutenberg invente l'imprimerie à caractères mobiles.", periode: 4 }, { id: "h_marignan", domaine: "histoire", type: "his", nom: "1515", contexte: "François Ier remporte la bataille de Marignan.", periode: 4 }, { id: "h_louis14", domaine: "histoire", type: "his", nom: "1661", contexte: "Début du règne personnel de Louis XIV.", periode: 4 }, { id: "h_revo", domaine: "histoire", type: "his", nom: "14 Juillet 1789", contexte: "Prise de la Bastille (Révolution Française).", periode: 5 }, { id: "h_empire", domaine: "histoire", type: "his", nom: "1804", contexte: "Sacre de Napoléon Ier Empereur des Français.", periode: 5 }, { id: "h_ww1", domaine: "histoire", type: "his", nom: "11 Novembre 1918", contexte: "Armistice de la Première Guerre Mondiale.", periode: 5 }, { id: "h_ww2", domaine: "histoire", type: "his", nom: "8 Mai 1945", contexte: "Capitulation de l'Allemagne (Fin de la Seconde Guerre Mondiale).", periode: 5 }, { id: "h_lune", domaine: "histoire", type: "his", nom: "21 Juillet 1969", contexte: "Neil Armstrong pose le premier pas sur la Lune.", periode: 5 }
];
// ============================================================
//   LES RÉGIONS DE CHAQUE DÉPARTEMENT
//   (le GeoJSON ne donne que le code + le nom : on complète ici
//    pour afficher un vrai contexte "département > région")
// ============================================================

const DEP_REGIONS = {
    "01":"Auvergne-Rhône-Alpes", "03":"Auvergne-Rhône-Alpes", "07":"Auvergne-Rhône-Alpes", "15":"Auvergne-Rhône-Alpes", "26":"Auvergne-Rhône-Alpes", "38":"Auvergne-Rhône-Alpes", "42":"Auvergne-Rhône-Alpes", "43":"Auvergne-Rhône-Alpes", "63":"Auvergne-Rhône-Alpes", "69":"Auvergne-Rhône-Alpes", "73":"Auvergne-Rhône-Alpes", "74":"Auvergne-Rhône-Alpes",
    "21":"Bourgogne-Franche-Comté", "25":"Bourgogne-Franche-Comté", "39":"Bourgogne-Franche-Comté", "58":"Bourgogne-Franche-Comté", "70":"Bourgogne-Franche-Comté", "71":"Bourgogne-Franche-Comté", "89":"Bourgogne-Franche-Comté", "90":"Bourgogne-Franche-Comté",
    "22":"Bretagne", "29":"Bretagne", "35":"Bretagne", "56":"Bretagne",
    "18":"Centre-Val de Loire", "28":"Centre-Val de Loire", "36":"Centre-Val de Loire", "37":"Centre-Val de Loire", "41":"Centre-Val de Loire", "45":"Centre-Val de Loire",
    "2A":"Corse", "2B":"Corse",
    "08":"Grand Est", "10":"Grand Est", "51":"Grand Est", "52":"Grand Est", "54":"Grand Est", "55":"Grand Est", "57":"Grand Est", "67":"Grand Est", "68":"Grand Est", "88":"Grand Est",
    "02":"Hauts-de-France", "59":"Hauts-de-France", "60":"Hauts-de-France", "62":"Hauts-de-France", "80":"Hauts-de-France",
    "75":"Île-de-France", "77":"Île-de-France", "78":"Île-de-France", "91":"Île-de-France", "92":"Île-de-France", "93":"Île-de-France", "94":"Île-de-France", "95":"Île-de-France",
    "14":"Normandie", "27":"Normandie", "50":"Normandie", "61":"Normandie", "76":"Normandie",
    "16":"Nouvelle-Aquitaine", "17":"Nouvelle-Aquitaine", "19":"Nouvelle-Aquitaine", "23":"Nouvelle-Aquitaine", "24":"Nouvelle-Aquitaine", "33":"Nouvelle-Aquitaine", "40":"Nouvelle-Aquitaine", "47":"Nouvelle-Aquitaine", "64":"Nouvelle-Aquitaine", "79":"Nouvelle-Aquitaine", "86":"Nouvelle-Aquitaine", "87":"Nouvelle-Aquitaine",
    "09":"Occitanie", "11":"Occitanie", "12":"Occitanie", "30":"Occitanie", "31":"Occitanie", "32":"Occitanie", "34":"Occitanie", "46":"Occitanie", "48":"Occitanie", "65":"Occitanie", "66":"Occitanie", "81":"Occitanie", "82":"Occitanie",
    "44":"Pays de la Loire", "49":"Pays de la Loire", "53":"Pays de la Loire", "72":"Pays de la Loire", "85":"Pays de la Loire",
    "04":"Provence-Alpes-Côte d'Azur", "05":"Provence-Alpes-Côte d'Azur", "06":"Provence-Alpes-Côte d'Azur", "13":"Provence-Alpes-Côte d'Azur", "83":"Provence-Alpes-Côte d'Azur", "84":"Provence-Alpes-Côte d'Azur"
};

// ============================================================
//   LES MOYENS MNÉMOTECHNIQUES
//   Règle du jeu : on n'affiche une astuce QUE quand il existe
//   une vraie logique derrière (une étymologie, une position,
//   un enchaînement de dates...). Pas d'astuce inventée : si le
//   nom n'a aucune logique, on n'affiche rien.
// ============================================================

// --- Départements : les exceptions à la règle alphabétique de 1790 ---
// (pour tous les autres, l'astuce est générée automatiquement, voir getMnemoDep())
const MNEMO_DEPS = {
    "01": "L'Ain porte le n°1 tout simplement parce qu'il est le premier dans l'ordre alphabétique des départements de 1790.",
    "06": "Les Alpes-Maritimes (06) et la Savoie (73/74) n'ont rejoint la France qu'en 1860 : on leur a donné le n° qui allait bien dans l'ordre alphabétique.",
    "73": "Savoie (73) et Haute-Savoie (74) sont françaises depuis 1860 seulement : leurs n° se suivent, la Haute (les sommets et Annecy) au nord, la Savoie au sud.",
    "74": "Savoie (73) et Haute-Savoie (74) sont françaises depuis 1860 seulement : leurs n° se suivent, la Haute (les sommets et Annecy) au nord, la Savoie au sud.",
    "64": "Les trois Pyrénées se suivent d'ouest en est : 64 Atlantiques (l'océan), 65 Hautes (le milieu, le pic du Midi), 66 Orientales (la Méditerranée).",
    "65": "Les trois Pyrénées se suivent d'ouest en est : 64 Atlantiques (l'océan), 65 Hautes (le milieu, le pic du Midi), 66 Orientales (la Méditerranée).",
    "66": "Les trois Pyrénées se suivent d'ouest en est : 64 Atlantiques (l'océan), 65 Hautes (le milieu, le pic du Midi), 66 Orientales (la Méditerranée).",
    "75": "Paris = 75, l'ancien n° du département de la Seine. Les n° 75 à 78 formaient le bloc des Seine : Seine, Seine-Inférieure, Seine-et-Marne, Seine-et-Oise.",
    "76": "La Seine-Maritime s'appelait Seine-Inférieure : voilà pourquoi elle est rangée dans le bloc des Seine (75 à 78) et pas à la lettre M.",
    "77": "La Seine-et-Marne a gardé son n° de 1790. Sa voisine, la Seine-et-Oise (78), est devenue les Yvelines en 1968.",
    "78": "Les Yvelines s'appelaient Seine-et-Oise : d'où leur place entre la Seine-et-Marne (77) et les Deux-Sèvres (79), alors que le nom commence par Y.",
    "79": "Les Deux-Sèvres sont classés à la lettre S (Sèvres), pas à D : voilà pourquoi ils suivent la Seine-et-Oise, devenue les Yvelines (78).",
    "89": "L'Yonne (89) ferme l'ordre alphabétique de 1790. Tout ce qui suit a été créé plus tard : 90 en 1922, puis 91 à 95 en 1968.",
    "90": "Le Territoire de Belfort (90) est le seul bout d'Alsace resté français en 1871 : créé à part, il a pris le n° suivant, hors ordre alphabétique.",
    "91": "Les n° 91 à 95 sont hors alphabet : ils datent de 1968, quand la Seine et la Seine-et-Oise ont été découpées. 91 Essonne = la grande couronne au sud.",
    "92": "La petite couronne tourne autour de Paris dans le sens des aiguilles d'une montre : 92 à l'ouest (Hauts-de-Seine), 93 au nord-est, 94 au sud-est.",
    "93": "La petite couronne tourne autour de Paris dans le sens des aiguilles d'une montre : 92 à l'ouest, 93 au nord-est (Seine-Saint-Denis), 94 au sud-est.",
    "94": "La petite couronne tourne autour de Paris dans le sens des aiguilles d'une montre : 92 à l'ouest, 93 au nord-est, 94 au sud-est (Val-de-Marne).",
    "95": "Val-d'Oise (95) : le nom donne la position, c'est la vallée de l'Oise, au nord-ouest de Paris. Créé en 1968 comme les 91 à 94.",
    "2A": "La Corse était le n°20, coupé en deux en 1976 : 2A Corse-du-Sud (A comme Ajaccio), 2B Haute-Corse (B comme Bastia).",
    "2B": "La Corse était le n°20, coupé en deux en 1976 : 2A Corse-du-Sud (A comme Ajaccio), 2B Haute-Corse (B comme Bastia)."
};

// --- Régions : leur nom est presque toujours une boussole ---
const MNEMO_REGIONS = {
    "Île-de-France": "Une île entourée de rivières : la Seine, la Marne et l'Oise dessinent ses contours autour de Paris.",
    "Hauts-de-France": "Le nom est une boussole : les Hauts, c'est tout en haut de la carte.",
    "Normandie": "Normand vient de Nordmann, l'homme du Nord : les Vikings qui ont remonté la Seine et obtenu ces terres en 911.",
    "Bretagne": "La pointe de l'ouest, peuplée par les Bretons venus de (Grande-)Bretagne : même nom, même peuple, des deux côtés de la Manche.",
    "Pays de la Loire": "Le nom donne la réponse : la portion de Loire juste avant l'océan, celle qui se termine à Nantes.",
    "Centre-Val de Loire": "Au centre de la carte, dans le val (la vallée) de la Loire : c'est la région des châteaux.",
    "Grand Est": "Une boussole encore : tout à l'est. Elle réunit l'Alsace, la Lorraine et la Champagne-Ardenne.",
    "Bourgogne-Franche-Comté": "Franche-Comté = le comté franc, c'est-à-dire libre d'impôts. Elle s'adosse au Jura, la Bourgogne est côté vignes.",
    "Nouvelle-Aquitaine": "Aquitaine vient d'aqua, l'eau : la plus grande région de France, tout le long de l'Atlantique.",
    "Occitanie": "Le pays de la langue d'oc, où l'on disait oc pour dire oui : de Toulouse aux plages de la Méditerranée.",
    "Auvergne-Rhône-Alpes": "Le nom liste le relief d'ouest en est : les volcans d'Auvergne, puis la vallée du Rhône, puis les Alpes.",
    "Provence-Alpes-Côte d'Azur": "PACA, le seul coin de France qui a les Alpes ET la mer, dans le même nom et sur la même carte.",
    "Corse": "La seule région insulaire : l'Île de Beauté. 2A au sud (Ajaccio), 2B au nord (Bastia)."
};

// --- Villes : le lien logique entre la ville et son département ---
const MNEMO_VILLES = {
    "v_paris": "Paris est à la fois une ville et un département (75) : le seul cas en France.",
    "v_marseille": "Marseille garde l'embouchure du Rhône : son département s'appelle les Bouches-du-Rhône (13).",
    "v_lyon": "Lyon est née au confluent du Rhône et de la Saône : son département porte le nom du fleuve, le Rhône (69).",
    "v_toulouse": "La ville rose est sur la Garonne, en amont de Bordeaux : donc la HAUTE-Garonne (31).",
    "v_nice": "Nice, c'est là où les Alpes plongent dans la mer : Alpes-Maritimes (06).",
    "v_nantes": "Nantes, c'est la Loire juste avant l'Atlantique : Loire-Atlantique (44).",
    "v_montpellier": "Montpellier est la capitale de l'Hérault (34), le fleuve qui descend des Cévennes à la mer.",
    "v_strasbourg": "Le Rhin descend du sud vers le nord : Strasbourg est en aval, donc dans le BAS-Rhin (67).",
    "v_bordeaux": "Bordeaux est au bord de la Garonne, juste avant l'estuaire de la Gironde qui donne son nom au département (33).",
    "v_lille": "La ville la plus au nord des grandes villes françaises, dans le département du Nord (59), le plus peuplé de France.",
    "v_rennes": "Rennes est née au confluent de l'Ille et de la Vilaine : les deux rivières donnent le nom du département (35).",
    "v_reims": "Reims, la capitale du champagne, est dans la Marne (51) : champagne et Marne vont ensemble.",
    "v_toulon": "Toulon, le grand port militaire, est dans le Var (83)... alors que la rivière Var, elle, coule dans les Alpes-Maritimes. Un piège classique.",
    "v_stetienne": "Saint-Étienne est dans le département de la Loire (42), au sud de Lyon : le fleuve passe juste à côté, bien avant d'arriver à Nantes.",
    "v_lehavre": "Le Havre veut dire le port : celui de l'embouchure de la Seine, donc Seine-Maritime (76).",
    "v_grenoble": "Grenoble, la capitale des Alpes, est posée sur l'Isère (38) au milieu des montagnes.",
    "v_dijon": "Dijon et sa moutarde sont dans la Côte-d'Or (21) : la côte des grands vins de Bourgogne.",
    "v_angers": "À Angers, la Maine se jette dans la Loire : d'où le Maine-et-Loire (49).",
    "v_nimes": "Nîmes et son pont du Gard : le département s'appelle tout simplement le Gard (30).",
    "v_villeurbanne": "Villeurbanne est collée à Lyon : forcément le même département, le Rhône (69).",
    "v_lemans": "Le Mans et ses 24 Heures sont sur la Sarthe (72).",
    "v_aix": "Aix-en-Provence est la voisine de Marseille : même département, les Bouches-du-Rhône (13).",
    "v_clermont": "Clermont-Ferrand est au pied du puy de Dôme : le volcan donne son nom au département (63).",
    "v_brest": "Brest est tout au bout de la Bretagne : Finistère vient de Finis Terrae, la fin de la terre (29).",
    "v_tours": "Tours est entre l'Indre et la Loire : le département dit exactement où elle se trouve (37).",
    "v_amiens": "Amiens est sur la Somme (80), le fleuve de la bataille de 1916.",
    "v_limoges": "Limoges et sa porcelaine sont sur la Vienne, en amont : donc HAUTE-Vienne (87). Poitiers, en aval, est dans la Vienne (86).",
    "v_annecy": "Annecy et son lac sont au nord de la Savoie, côté Genève : Haute-Savoie (74).",
    "v_perpignan": "Perpignan la catalane est à l'extrémité est des Pyrénées : Pyrénées-Orientales (66).",
    "v_boulogne": "Boulogne-Billancourt est à l'ouest de Paris : la petite couronne commence à l'ouest avec le 92, les Hauts-de-Seine.",
    "v_metz": "Metz est sur la Moselle (57). Nancy, plus au sud, est en Meurthe-et-Moselle (54) : deux rivières, deux départements voisins.",
    "v_besancon": "Besançon est enfermée dans une boucle du Doubs (25) : la rivière fait le tour de la vieille ville.",
    "v_orleans": "Orléans est dans le Loiret (45) : le Loiret est une petite rivière née de la Loire elle-même.",
    "v_argenteuil": "Argenteuil est au nord-ouest de Paris, dans la vallée de l'Oise : Val-d'Oise (95).",
    "v_rouen": "Rouen est sur la Seine, en aval : comme Le Havre, elle est en Seine-Maritime (76).",
    "v_montreuil": "Montreuil est à l'est de Paris, dans le 93 (Seine-Saint-Denis), le département de la petite couronne au nord-est.",
    "v_mulhouse": "Mulhouse est au sud de l'Alsace, en amont sur le Rhin : donc HAUT-Rhin (68), à l'inverse de Strasbourg (Bas-Rhin).",
    "v_caen": "Caen, la ville de Guillaume le Conquérant, est dans le Calvados (14) : comme l'eau-de-vie de pomme normande.",
    "v_nancy": "Nancy est en Meurthe-et-Moselle (54) : deux rivières dans le nom, alors que Metz, plus au nord, n'a que la Moselle (57).",
    "v_roubaix": "Roubaix est collée à Lille : même département, le Nord (59).",
    "v_tourcoing": "Tourcoing est la jumelle de Roubaix, à la frontière belge : Nord (59).",
    "v_nanterre": "Nanterre est le chef-lieu des Hauts-de-Seine (92), le département à l'ouest de Paris (celui de La Défense).",
    "v_vitry": "Vitry-sur-Seine est au sud-est de Paris : Val-de-Marne (94), le département de la vallée de la Marne.",
    "v_creteil": "Créteil est le chef-lieu du Val-de-Marne (94), au sud-est de Paris.",
    "v_avignon": "Avignon, la cité des Papes, est dans le Vaucluse (84) : Vallis Clausa, la vallée fermée de Fontaine-de-Vaucluse.",
    "v_poitiers": "Poitiers est dans la Vienne (86) ; Limoges, en amont sur la même rivière, est en Haute-Vienne (87).",
    "v_aubervilliers": "Aubervilliers est juste au nord de Paris : Seine-Saint-Denis (93).",
    "v_dunkerque": "Dunkerque est le port le plus au nord de France : département du Nord (59). Son nom veut dire l'église des dunes en flamand.",
    "v_asnieres": "Asnières-sur-Seine est dans la boucle de la Seine au nord-ouest de Paris : Hauts-de-Seine (92).",
    "v_versailles": "Versailles, le château de Louis XIV, est le chef-lieu des Yvelines (78), à l'ouest de Paris."
};

// --- Fleuves et massifs ---
const MNEMO_NATURE = {
    "n_loire": "Loire comme LONGUE : c'est le plus long fleuve de France. Elle part du Massif central, monte vers Orléans, puis redescend vers l'ouest en dessinant un grand arc.",
    "n_seine": "Suis la Seine d'amont en aval : Paris, Rouen, Le Havre. Elle finit dans la Manche, et les deux départements qu'elle traverse à la fin portent son nom.",
    "n_rhone": "Le seul grand fleuve français qui descend vers le SUD : il vient des Alpes suisses, passe à Lyon et se jette dans la Méditerranée.",
    "n_garonne": "La Garonne descend des Pyrénées vers l'Atlantique : Toulouse (Haute-Garonne) puis Bordeaux (Gironde), les deux départements racontent son trajet.",
    "n_rhin": "Le Rhin, c'est la frontière avec l'Allemagne, donc tout à l'est. Il coule vers le nord : en amont le Haut-Rhin (Mulhouse), en aval le Bas-Rhin (Strasbourg).",
    "n_alpes": "Les Alpes : les plus HAUTES et les plus à l'est, avec le mont Blanc (4809 m). A comme Altitude.",
    "n_pyrenees": "Les Pyrénées ferment la France au sud-ouest comme une barrière : c'est la frontière avec l'Espagne, de l'Atlantique (Pays basque) à la Méditerranée (Perpignan).",
    "n_massif": "Le nom dit tout : au CENTRE de la carte. C'est le plus vieux relief, usé et arrondi, hérissé de volcans éteints.",
    "n_jura": "Le Jura a donné son nom au Jurassique : c'est le massif calcaire entre les Alpes et les Vosges, le long de la frontière suisse.",
    "n_vosges": "Les Vosges sont le mur à l'ouest de l'Alsace. Leurs sommets arrondis s'appellent des ballons (le Ballon d'Alsace) : Vosges = sommets ronds, Alpes = sommets pointus."
};

// --- Histoire : des dates qui s'accrochent les unes aux autres ---
const MNEMO_HISTOIRE = {
    "h_terre": "4,5 milliards d'années : la Terre a environ un tiers de l'âge de l'Univers (13,8 milliards).",
    "h_dino": "66 millions d'années : retiens le double 6. Les dinosaures disparaissent, et les mammifères prennent la place laissée vide.",
    "h_sapiens": "L'ordre compte plus que le chiffre : Erectus maîtrise le feu (-400 000), PUIS Sapiens apparaît (-300 000). Le feu est plus vieux que nous.",
    "h_feu": "Le feu (-400 000) est plus ancien que Homo Sapiens (-300 000) : quand nous arrivons, la recette existe déjà.",
    "h_agri": "-10 000 : la dernière glaciation se termine. L'homme peut enfin cultiver, donc se poser : l'agriculture crée les villages.",
    "h_ecri": "L'écriture (-3000) est LA frontière : avant, c'est la Préhistoire ; après, l'Histoire. Pas d'écrits, pas d'Histoire.",
    "h_pyramide": "Quand Rome est fondée (-753), la pyramide de Khéops a déjà plus de 1700 ans : l'Égypte est vieille même pour les Romains.",
    "h_rome": "753 avant J.-C. : 7, 5, 3, les chiffres impairs qui descendent. Romulus et Rémus.",
    "h_alesia": "-52 comme les 52 semaines de l'année. César envahit la Gaule en -58, Vercingétorix se rend 6 ans plus tard.",
    "h_chute_rome": "476 : la chute de Rome ouvre le Moyen Âge. Retiens le duo 476 (Rome tombe) / 496 (Clovis baptisé), 20 ans d'écart.",
    "h_clovis": "496 : vingt ans après la chute de Rome (476), Clovis se fait baptiser à Reims. C'est là que commencent les rois de France.",
    "h_charlemagne": "L'an 800, un chiffre bien rond, à Noël : Charlemagne (Carolus Magnus, Charles le Grand) devient le premier empereur d'Occident depuis 476.",
    "h_hastings": "1066 : 10-66. Guillaume, duc de Normandie, traverse la Manche. Toute l'histoire est brodée sur la tapisserie de Bayeux.",
    "h_guerre100": "1453, une seule date pour deux fins : Constantinople tombe ET la guerre de Cent Ans s'achève. C'est la fin du Moyen Âge.",
    "h_colomb": "1492 : 14-92. Colomb cherche les Indes par l'ouest et bute sur l'Amérique. Juste avant Marignan (1515), facile à enchaîner.",
    "h_imprimerie": "L'imprimerie arrive avant l'Amérique : l'Europe apprend à imprimer (milieu du XVe) juste avant de découvrir le Nouveau Monde (1492).",
    "h_marignan": "Le grand classique de l'école : Marignan, 1515. Deux fois quinze, impossible à oublier. François Ier a 20 ans et vient d'être sacré.",
    "h_louis14": "1661 : Mazarin meurt, Louis XIV décide de gouverner seul, sans Premier ministre. Versailles viendra après.",
    "h_revo": "1789 : 1-7-8-9, trois chiffres qui se suivent. Le 14 juillet est resté la fête nationale.",
    "h_empire": "1789 la Révolution, 1804 l'Empire : 15 ans plus tard, le même pays qui a chassé son roi se donne un empereur.",
    "h_ww1": "Les trois 11 : le 11e jour du 11e mois, à 11 heures, en 1918.",
    "h_ww2": "1939 + 6 ans de guerre = 1945. Le 8 mai en Europe, le 2 septembre dans le Pacifique.",
    "h_lune": "1969 : Apollo 11, huit ans après le défi lancé par Kennedy (1961). Retiens 69, l'année où l'homme marche sur la Lune."
};

// --- Botanique : la famille se devine au latin ou à un détail ---
const MNEMO_FAMILLES = {
    "Fagacées": "Fagus = le hêtre en latin. Les Fagacées sont les arbres dont le fruit est logé dans une cupule : le gland du chêne, la faîne du hêtre.",
    "Bétulacées": "Betula = le bouleau. C'est la famille des arbres à chatons souples, typiques des sols pauvres et des pays froids.",
    "Platanacées": "Une famille pour une seule star : le platane, reconnaissable à son écorce qui tombe en plaques.",
    "Oléacées": "Oleum = l'huile. La famille de l'olivier, donc de l'huile d'olive.",
    "Pinacées": "La famille des conifères : des aiguilles et des cônes (les pommes de pin). Sapin, pin, épicéa, mélèze.",
    "Astéracées": "Aster = étoile. Ce qu'on prend pour une fleur est en fait un capitule, des centaines de minuscules fleurs serrées en étoile.",
    "Papavéracées": "Papaver = le pavot. Le coquelicot est un pavot rouge, avec des pétales froissés comme du papier de soie.",
    "Liliacées": "La famille du lys (lilium) : des fleurs à bulbe, avec 6 pétales et des feuilles allongées.",
    "Lamiacées": "Le truc infaillible : roule la tige entre tes doigts, elle est CARRÉE, et la feuille sent bon. Ce sont les aromates : thym, romarin, menthe, basilic, lavande.",
    "Urticacées": "Urtica a donné urticaire : c'est la famille qui pique.",
    "Araliacées": "La famille du lierre : des plantes grimpantes ou en buisson, à feuilles persistantes et à fruits en petites boules.",
    "Polypodiacées": "Poly-pode = beaucoup de pieds. Les fougères n'ont ni fleur ni graine : elles se reproduisent par spores, sous les feuilles."
};

// --- Botanique : quelques plantes ont leur propre astuce ---
const MNEMO_PLANTES = {
    "p_chene": "Chêne = gland, hêtre = faîne : deux Fagacées, deux fruits dans une cupule. Le chêne a des feuilles à lobes arrondis.",
    "p_bouleau": "Le seul arbre à l'écorce blanche qui se décolle en fines bandes de papier.",
    "p_platane": "Son écorce tombe en plaques et forme un camouflage : c'est l'arbre des places de village et des allées.",
    "p_olivier": "Oleum = huile : l'olivier donne l'huile d'olive. Feuilles vert-gris, argentées dessous, pour résister à la sécheresse.",
    "p_sapin": "Sapin : aiguilles plates et cônes DRESSÉS vers le ciel. L'épicéa, lui, laisse pendre ses cônes vers le bas.",
    "p_pissenlit": "Pissenlit = pisse-en-lit : la plante est diurétique. Sa fleur jaune se transforme en boule de graines à souffler.",
    "p_coquelicot": "Papaver = pavot : le coquelicot est le pavot des champs, pétales rouges froissés comme du papier de soie.",
    "p_tournesol": "Tournesol : jeune, son capitule suit vraiment la course du soleil. Adulte, il se fige face à l'est.",
    "p_muguet": "Le muguet du 1er mai : clochettes blanches parfumées... et petites baies rouges toxiques à ne jamais goûter.",
    "p_tulipe": "Tulipe : un bulbe et 6 pétales, comme les lys. C'est elle qui a provoqué la première bulle spéculative de l'histoire, en Hollande en 1637.",
    "p_ortie": "Urtica a donné urticaire : l'ortie pique avec de minuscules poils qui se cassent sur la peau.",
    "p_lierre": "Le lierre s'accroche avec des crampons mais ne pompe rien à l'arbre : ce n'est pas un parasite, juste un passager.",
    "p_fougère": "Ni fleur ni graine : retourne une feuille, tu verras les points bruns (les sores) qui libèrent les spores."
};

// ============================================================
//   LE MONDE (clés = code ISO à 3 lettres, comme dans les id
//   cap_XXX, fl_XXX et w_XXX générés depuis l'API)
// ============================================================

// --- Capitales : surtout les pièges, là où ce n'est PAS la plus grande ville ---
const MNEMO_CAPITALES = {
    "CHE": "Berne, ni Zurich ni Genève : la Suisse a choisi une ville moyenne pour ne froisser personne. Berne = l'ours (Bär) de son blason.",
    "CAN": "Ottawa, ni Toronto ni Montréal : c'est le compromis choisi entre le Canada anglophone et le Canada francophone.",
    "AUS": "Canberra, ni Sydney ni Melbourne : une ville créée de toutes pièces en 1913 pour départager les deux rivales.",
    "USA": "Washington, pas New York. D.C. = District of Columbia, un district neutre créé entre le Nord et le Sud, qui n'appartient à aucun État.",
    "BRA": "Brasilia, ni Rio ni São Paulo : une capitale construite en 1960 en plein centre du pays pour attirer les habitants vers l'intérieur.",
    "TUR": "Ankara, pas Istanbul : Atatürk a déplacé la capitale au centre de l'Anatolie en 1923, loin de l'ancienne Constantinople.",
    "NZL": "Wellington, pas Auckland : elle est au centre du pays, pile entre l'île du Nord et l'île du Sud.",
    "NGA": "Abuja, pas Lagos : capitale déplacée au centre du pays en 1991, pour être à égale distance du nord et du sud.",
    "MAR": "Rabat, pas Casablanca : Casa est la capitale économique, Rabat la capitale politique.",
    "PAK": "Islamabad, pas Karachi : une ville neuve des années 1960, construite au nord près de Rawalpindi.",
    "CIV": "Yamoussoukro est la capitale officielle depuis 1983 (la ville natale du président Houphouët-Boigny), mais Abidjan reste la grande ville.",
    "TZA": "Dodoma, pas Dar es Salaam : la capitale a été déplacée au centre du pays, loin de la côte.",
    "BOL": "La Bolivie a deux capitales : Sucre est la capitale constitutionnelle, La Paz le siège du gouvernement (et la plus haute du monde).",
    "CHN": "Pékin (Beijing) = la capitale du NORD : bei = nord, jing = capitale. Nankin (Nanjing) était la capitale du sud.",
    "JPN": "Tokyo = la capitale de l'EST. Avant, c'était Kyoto : les deux mêmes syllabes, simplement inversées.",
    "ESP": "Madrid est pile au centre de l'Espagne : c'est le kilomètre zéro du pays, toutes les routes en partent en étoile.",
    "VNM": "Hanoï est au nord, pas Hô Chi Minh-Ville (l'ancienne Saïgon) au sud : c'est le Nord qui a gagné la guerre, donc c'est lui qui garde la capitale."
};

// --- Drapeaux : surtout les paires qui se ressemblent ---
const MNEMO_DRAPEAUX = {
    "NLD": "Pays-Bas et Luxembourg : mêmes bandes rouge-blanc-bleu. Le Luxembourg a un bleu plus clair et un drapeau plus allongé.",
    "LUX": "Luxembourg et Pays-Bas : mêmes bandes rouge-blanc-bleu, mais le bleu du Luxembourg est plus CLAIR (bleu ciel).",
    "ROU": "Roumanie et Tchad ont le même bleu-jaune-rouge vertical. Le bleu du Tchad est plus foncé, presque indigo.",
    "TCD": "Tchad et Roumanie sont quasi identiques : le Tchad a le bleu le plus FONCÉ des deux.",
    "IDN": "Indonésie : ROUGE en haut, blanc en bas. La Pologne, c'est l'inverse (blanc en haut). Monaco a le même que l'Indonésie, en plus trapu.",
    "POL": "Pologne : BLANC en haut, rouge en bas. L'Indonésie et Monaco font l'inverse.",
    "MCO": "Monaco a le même drapeau que l'Indonésie (rouge sur blanc), mais plus court et plus large.",
    "IRL": "Irlande : le VERT est côté mât (vert-blanc-orange). La Côte d'Ivoire, c'est l'inverse : orange côté mât.",
    "CIV": "Côte d'Ivoire : l'ORANGE est côté mât. L'Irlande, c'est le miroir : vert côté mât.",
    "RUS": "Le tricolore slave blanc-bleu-rouge SANS blason, c'est la Russie. Avec un blason, c'est la Slovaquie ou la Slovénie.",
    "SVK": "Slovaquie : tricolore slave + blason avec la double croix sur trois collines, placé vers le mât.",
    "SVN": "Slovénie : tricolore slave + blason avec le mont Triglav, la plus haute montagne du pays.",
    "AUT": "Autriche : rouge-blanc-rouge avec trois bandes ÉGALES. La Lettonie a un rouge plus sombre et une bande blanche plus fine.",
    "LVA": "Lettonie : rouge foncé (presque carmin) et bande blanche étroite. L'Autriche est rouge vif avec des bandes égales.",
    "AUS": "Australie : 6 étoiles BLANCHES (dont la grande à 7 branches pour les États). La Nouvelle-Zélande n'en a que 4, et elles sont ROUGES.",
    "NZL": "Nouvelle-Zélande : 4 étoiles ROUGES (la Croix du Sud). L'Australie en a 6, blanches.",
    "DNK": "Toutes les croix nordiques sont décalées vers le mât. Danemark : croix blanche sur rouge, c'est le plus vieux drapeau du monde encore utilisé.",
    "SWE": "Croix nordique jaune sur bleu : les couleurs de la Suède (comme les meubles suédois).",
    "NOR": "Norvège : la croix bleue est posée DANS une croix blanche, sur fond rouge. C'est la seule croix nordique à deux couleurs.",
    "FIN": "Finlande : croix bleue sur blanc. Le bleu des lacs sur la neige, la plus sobre des croix nordiques.",
    "ISL": "Islande : croix rouge dans une croix blanche, sur fond BLEU. C'est la Norvège avec les couleurs inversées.",
    "CHE": "La Suisse et le Vatican sont les deux seuls drapeaux CARRÉS. Croix blanche sur rouge : la Croix-Rouge en a pris l'inverse exact.",
    "NPL": "Le Népal est le seul drapeau non rectangulaire du monde : deux fanions triangulaires superposés, avec la lune et le soleil.",
    "USA": "50 étoiles = les 50 États d'aujourd'hui ; 13 bandes = les 13 colonies du départ.",
    "GBR": "L'Union Jack superpose trois croix : celle d'Angleterre (rouge droite), d'Écosse (blanche en X) et d'Irlande (rouge en X).",
    "CAN": "La feuille d'érable entre deux bandes rouges : le rouge des deux océans, l'érable au milieu, comme le pays.",
    "BRA": "Ordem e Progresso sur un ciel étoilé : les étoiles reproduisent le ciel de Rio le jour de la proclamation de la République.",
    "JPN": "Le disque rouge du soleil levant : le nom même du Japon, Nippon, veut dire origine du soleil.",
    "TUR": "Croissant et étoile rouge et blanc : l'héritage ottoman, repris ensuite par beaucoup de pays musulmans."
};

// --- Pays : formes et positions faciles à retenir ---
const MNEMO_PAYS = {
    "ITA": "La botte ! Talon à l'est (les Pouilles), pointe au sud-ouest (la Calabre) qui shoote dans le ballon : la Sicile.",
    "CHL": "Le pays le plus long et le plus fin du monde : un ruban de 4300 km coincé entre les Andes et le Pacifique.",
    "NOR": "Tout en haut à gauche de l'Europe : une côte déchiquetée par les fjords, posée sur le dos de la Suède.",
    "PRT": "Le Portugal est la bande verticale à gauche de l'Espagne, entièrement tournée vers l'Atlantique.",
    "RUS": "Le plus grand pays du monde : 11 fuseaux horaires. Quand on se lève à Moscou, on se couche déjà au Kamtchatka.",
    "NLD": "Pays-Bas = pays BAS : un quart du territoire est sous le niveau de la mer, gagné sur l'eau avec des digues.",
    "ISL": "L'Islande est l'île isolée en haut de l'Atlantique, entre le Groenland et la Norvège : ne la confonds pas avec l'Irlande, collée à l'Angleterre.",
    "IRL": "L'Irlande est la grande île à GAUCHE de la Grande-Bretagne. L'Islande est bien plus au nord, toute seule.",
    "CHE": "La Suisse est enclavée au centre des Alpes, sans accès à la mer, entourée par la France, l'Allemagne, l'Autriche et l'Italie.",
    "EGY": "L'Égypte est à cheval sur deux continents : le Nil et le désert en Afrique, le Sinaï déjà en Asie, séparés par le canal de Suez.",
    "TUR": "La Turquie enjambe le Bosphore : un pied en Europe (Istanbul), tout le reste en Asie.",
    "IDN": "L'Indonésie est un chapelet de plus de 17 000 îles étalé sur l'équateur, entre l'Asie et l'Australie.",
    "CAN": "Le deuxième plus grand pays du monde, mais presque tous ses habitants vivent dans la bande collée à la frontière des États-Unis."
};

// ============================================================
//   LES ZONES DU MONDE EN FRANÇAIS
//   (l'API renvoie les sous-régions en anglais)
// ============================================================

const ZONES_FR = {
    "Northern Europe": "Europe du Nord", "Western Europe": "Europe de l'Ouest", "Southern Europe": "Europe du Sud",
    "Eastern Europe": "Europe de l'Est", "Central Europe": "Europe centrale", "Southeast Europe": "Europe du Sud-Est",
    "Northern Africa": "Afrique du Nord", "Western Africa": "Afrique de l'Ouest", "Middle Africa": "Afrique centrale",
    "Eastern Africa": "Afrique de l'Est", "Southern Africa": "Afrique australe",
    "Northern America": "Amérique du Nord", "Central America": "Amérique centrale", "South America": "Amérique du Sud", "Caribbean": "Caraïbes",
    "Western Asia": "Moyen-Orient", "Central Asia": "Asie centrale", "Southern Asia": "Asie du Sud",
    "Eastern Asia": "Asie de l'Est", "South-Eastern Asia": "Asie du Sud-Est",
    "Australia and New Zealand": "Australie et Nouvelle-Zélande", "Melanesia": "Mélanésie", "Micronesia": "Micronésie", "Polynesia": "Polynésie",
    "Europe": "Europe", "Asia": "Asie", "Africa": "Afrique", "Americas": "Amériques", "Oceania": "Océanie", "Antarctic": "Antarctique"
};

// ============================================================
//   LES CAPITALES EN FRANÇAIS
//   L'API ne donne que le nom anglais (Brussels, Moscow, Copenhagen...).
//   On corrige uniquement celles qui s'écrivent autrement en français :
//   les autres (Paris, Berlin, Madrid, Ottawa...) sont déjà bonnes.
// ============================================================

const CAPITALES_FR = {
    // Europe
    "AND": "Andorre-la-Vieille", "AUT": "Vienne", "BEL": "Bruxelles", "CYP": "Nicosie", "DNK": "Copenhague",
    "GRC": "Athènes", "MLT": "La Valette", "POL": "Varsovie", "PRT": "Lisbonne", "ROU": "Bucarest",
    "RUS": "Moscou", "SMR": "Saint-Marin", "CHE": "Berne", "UKR": "Kiev", "GBR": "Londres", "VAT": "Cité du Vatican",
    // Asie
    "AFG": "Kaboul", "ARM": "Erevan", "AZE": "Bakou", "BGD": "Dacca", "BTN": "Thimphou", "CHN": "Pékin",
    "GEO": "Tbilissi", "IRN": "Téhéran", "IRQ": "Bagdad", "ISR": "Jérusalem", "KWT": "Koweït", "KGZ": "Bichkek",
    "LBN": "Beyrouth", "MNG": "Oulan-Bator", "NPL": "Katmandou", "OMN": "Mascate", "PHL": "Manille",
    "SAU": "Riyad", "SGP": "Singapour", "KOR": "Séoul", "SYR": "Damas", "TJK": "Douchanbé",
    "TKM": "Achgabat", "ARE": "Abou Dabi", "UZB": "Tachkent", "VNM": "Hanoï",
    // Afrique
    "DZA": "Alger", "EGY": "Le Caire", "ETH": "Addis-Abeba", "SWZ": "Mbabané", "SOM": "Mogadiscio",
    "SSD": "Djouba", "STP": "Sao Tomé",
    // Amériques
    "BRA": "Brasilia", "COL": "Bogota", "CUB": "La Havane", "DOM": "Saint-Domingue", "GTM": "Guatemala",
    "MEX": "Mexico", "PAN": "Panama", "PRY": "Asuncion", "USA": "Washington"
};

// ============================================================
//   LES CAPITALES D'EUROPE
//   Étymologie, position, histoire : à chaque fois un vrai "pourquoi".
//   Quatre d'entre elles sont sur le Danube, trois se suivent du nord
//   au sud dans les pays baltes : ces groupes se retiennent ensemble.
// ============================================================

Object.assign(MNEMO_CAPITALES, {
    // --- Le Danube traverse quatre capitales : aucun autre fleuve au monde n'en fait autant ---
    "AUT": "Vienne est la première des quatre capitales du Danube : Vienne, Bratislava, Budapest, Belgrade, d'amont en aval. Aucun autre fleuve n'en traverse autant.",
    "SVK": "Bratislava est la deuxième capitale du Danube (après Vienne, avant Budapest) : les deux villes sont à 60 km l'une de l'autre, les plus proches d'Europe.",
    "HUN": "Budapest = Buda + Pest, deux villes qui se faisaient face de part et d'autre du Danube et qui ont fusionné en 1873. Buda sur la colline, Pest à plat.",
    "SRB": "Belgrade veut dire la ville blanche, et c'est la dernière des quatre capitales du Danube, là où la Save le rejoint.",

    // --- Les pays baltes, du nord au sud : Estonie, Lettonie, Lituanie ---
    "EST": "Du nord au sud : Tallinn (Estonie), Riga (Lettonie), Vilnius (Lituanie). Tallinn est la plus au nord, juste en face d'Helsinki, et son nom veut dire la ville danoise.",
    "LVA": "Riga est la capitale du milieu des trois baltes (Tallinn au nord, Vilnius au sud) et la plus grande ville de la région.",
    "LTU": "Vilnius est la plus au sud des trois baltes et doit son nom à la rivière Vilnia, comme Tallinn au nord et Riga au centre.",

    // --- Les capitales dont le nom raconte quelque chose ---
    "FRA": "Paris vient des Parisii, le peuple gaulois installé dans l'île de la Cité.",
    "GBR": "Londres vient de Londinium, la ville fondée par les Romains sur la Tamise.",
    "IRL": "Dublin vient du gaélique dubh linn, l'étang noir, la mare sombre où la ville est née.",
    "DNK": "Copenhague vient de Købmandshavn, le port des marchands : le Danemark vit du commerce maritime depuis toujours.",
    "ISL": "Reykjavik veut dire la baie des fumées : les premiers Vikings ont pris la vapeur des sources chaudes pour de la fumée.",
    "POL": "Varsovie vient de la légende du pêcheur Wars et de la sirène Sawa : la sirène est d'ailleurs l'emblème de la ville.",
    "RUS": "Moscou porte le nom de sa rivière, la Moskova. Le Kremlin veut simplement dire la forteresse.",
    "BGR": "Sofia porte le nom de son église Sainte-Sophie : c'est la sagesse (sophia) en grec.",
    "GRC": "Athènes, la ville d'Athéna : la déesse a gagné la ville en offrant l'olivier, et son temple, le Parthénon, domine encore la colline.",
    "MLT": "La Valette porte le nom de Jean de Valette, le grand maître des Chevaliers qui a résisté au siège de 1565.",
    "MNE": "Podgorica veut dire sous la petite colline : la ville est au pied du mont Gorica.",
    "NLD": "Amsterdam = une digue (dam) sur la rivière Amstel (Rotterdam, c'est la même recette sur la Rotte). Mais le gouvernement, lui, siège à La Haye.",
    "BEL": "Bruxelles vient de broek-sel, la maison dans le marais. C'est aussi la capitale de l'Union européenne et le siège de l'OTAN.",
    "LUX": "Le pays, la capitale et la province belge voisine portent le même nom, tiré de Lucilinburhuc : le petit château.",

    // --- Les autres capitales d'Europe ---
    "DEU": "Berlin est à l'est du pays, tout près de la Pologne : c'est ce qui a permis de la couper en deux pendant la guerre froide.",
    "ITA": "Rome est au centre de la botte, sur le Tibre, avec un pays entier dedans : le Vatican.",
    "PRT": "Lisbonne est tout à l'ouest, à l'embouchure du Tage : la capitale la plus à l'ouest du continent européen.",
    "NOR": "Oslo est tout au fond d'un fjord, au sud du pays : la Norvège est si longue que sa capitale est à son extrémité.",
    "SWE": "Stockholm est bâtie sur 14 îles, d'où son nom d'îlot de rondins : on l'appelle la Venise du Nord.",
    "FIN": "Helsinki est sur la côte sud, juste en face de Tallinn : 80 km de mer séparent les deux capitales.",
    "CZE": "Prague est traversée par la Vltava et son pont Charles : c'est la ville aux cent clochers, au cœur exact de l'Europe.",
    "ROU": "Bucarest, sur le Danube ? Non : elle est à 60 km au nord du fleuve. C'est le piège classique des quatre capitales danubiennes.",
    "UKR": "Kiev est sur le Dniepr, le fleuve qui coupe l'Ukraine en deux : rive droite la vieille ville, rive gauche les quartiers modernes.",
    "BLR": "Minsk est au centre exact de la Biélorussie, dont le nom veut dire Russie blanche.",
    "MDA": "Chisinau est coincée entre la Roumanie et l'Ukraine : on y parle roumain, le pays a longtemps fait partie de la Moldavie historique.",
    "HRV": "Zagreb est au nord du pays, loin de la mer : la Croatie a la forme d'un boomerang, et sa capitale est au coude.",
    "SVN": "Ljubljana a un dragon pour emblème (celui du pont des Dragons) et son nom évoque ljubljena, la bien-aimée.",
    "BIH": "Sarajevo, la ville des Jeux olympiques de 1984 et de l'attentat de 1914 qui a déclenché la Première Guerre mondiale.",
    "MKD": "Skopje est la ville natale de Mère Teresa, sur le Vardar, au nord d'un pays sans accès à la mer.",
    "ALB": "Tirana est dominée par une pyramide de béton héritée de la dictature : l'Albanie est juste en face du talon de l'Italie.",
    "XKX": "Pristina est la capitale du plus jeune pays d'Europe : le Kosovo s'est séparé de la Serbie en 2008.",
    "CYP": "Nicosie est la dernière capitale coupée en deux par une frontière : moitié chypriote grecque, moitié chypriote turque.",
    "AND": "Andorre-la-Vieille est la capitale la plus haute d'Europe (1023 m), perchée entre la France et l'Espagne.",
    "LIE": "Vaduz : un village de 5000 habitants avec un château au-dessus, capitale d'un pays coincé entre la Suisse et l'Autriche.",
    "MCO": "Monaco : le pays et la capitale ne font qu'un, sur 2 km² de rocher au bord de la Méditerranée.",
    "SMR": "Saint-Marin : le pays et sa capitale portent le même nom, perchés sur le mont Titano, tout entiers dans l'Italie.",
    "VAT": "La Cité du Vatican EST le pays : le plus petit État du monde, à l'intérieur de Rome."
});

// ============================================================
//   LES CAPITALES DU RESTE DU MONDE
// ============================================================

Object.assign(MNEMO_CAPITALES, {
    // Amériques
    "MEX": "Même racine : Mexique → Mexico. La ville est bâtie sur un lac asséché, à 2240 m d'altitude.",
    "CUB": "La Havane : son port en cul-de-sac, facile à défendre, en a fait la clé de l'empire espagnol d'Amérique.",
    "DOM": "République dominicaine → Saint-Domingue : le pays et sa capitale ont la même racine, Domingo. C'est la plus vieille ville européenne des Amériques (1496).",
    "SLV": "Le pays s'appelle El Salvador, la capitale ajoute juste San : San Salvador.",
    "ARG": "Buenos Aires veut dire les bons airs : les marins espagnols remerciaient la Vierge des bons vents qui les y menait.",
    "URY": "Montevideo, sur le Rio de la Plata, juste en face de Buenos Aires : les deux capitales se font face de part et d'autre de l'estuaire.",
    "CHL": "Santiago est coincée entre les Andes et le Pacifique, au milieu d'un pays long de 4300 km.",
    "PER": "Lima est sur la côte, pas dans les Andes : les Espagnols l'ont fondée face à la mer pour rapatrier l'or, laissant Cuzco, la capitale inca, dans la montagne.",
    "COL": "Bogota est perchée à 2600 m sur un plateau des Andes : l'une des plus hautes capitales du monde.",
    "ECU": "Quito est posée sur l'équateur (à 25 km), à 2850 m : le pays s'appelle d'ailleurs l'Équateur.",
    "VEN": "Caracas est dans une vallée juste derrière la montagne qui la sépare des Caraïbes : la mer est à 15 km, mais invisible.",
    "CRI": "San José, au centre du pays, sur un plateau tempéré : le Costa Rica veut dire la côte riche.",
    "HTI": "Port-au-Prince et Saint-Domingue se partagent la même île, Hispaniola : le français à l'ouest, l'espagnol à l'est.",

    // Afrique
    "EGY": "Le Caire, la plus grande ville d'Afrique, est posée là où le Nil s'ouvre en delta : les pyramides de Gizeh sont dans sa banlieue.",
    "DZA": "Même racine : Algérie → Alger. La ville a donné son nom au pays, et non l'inverse (comme Tunis et la Tunisie).",
    "TUN": "Même racine : Tunisie → Tunis. Carthage, la rivale de Rome, est aujourd'hui une banlieue de la capitale.",
    "SEN": "Dakar est la pointe la plus à l'ouest de tout le continent africain, face à l'île de Gorée.",
    "ETH": "Addis-Abeba veut dire la nouvelle fleur : c'est aussi le siège de l'Union africaine, et la ville n'a que 130 ans.",
    "KEN": "Nairobi est née d'une gare sur la voie ferrée Mombasa-Ouganda : son nom vient du maasaï enkare nyrobi, l'eau froide.",
    "GHA": "Accra est sur le golfe de Guinée, tout près du point zéro : le méridien de Greenwich passe juste à l'est de la ville.",
    "COD": "Kinshasa et Brazzaville sont les deux seules capitales du monde qui se font face : le fleuve Congo les sépare de 3 km.",
    "COG": "Brazzaville porte le nom de l'explorateur Savorgnan de Brazza, et regarde Kinshasa de l'autre côté du fleuve Congo.",
    "CMR": "Yaoundé est au centre du pays, dans les collines ; Douala, plus grande, garde la côte.",
    "MDG": "Antananarivo veut dire la ville des mille : elle est au centre des hautes terres de Madagascar, à 1300 m.",
    "ZAF": "L'Afrique du Sud a trois capitales : Pretoria (le gouvernement), Le Cap (le parlement), Bloemfontein (la justice).",

    // Asie et Moyen-Orient
    "IND": "New Delhi (le quartier administratif de Delhi), pas Bombay : le nom contient New, comme une ville dessinée exprès par les Britanniques.",
    "KOR": "Séoul est à 50 km seulement de la frontière nord-coréenne : une capitale posée juste sous la zone démilitarisée.",
    "PRK": "Pyongyang veut dire le terrain plat : c'est la plus vieille ville de la péninsule coréenne.",
    "THA": "Bangkok porte un nom de cérémonie si long qu'il est entré au livre des records ; les Thaïs l'appellent Krung Thep, la cité des anges.",
    "MMR": "Naypyidaw, pas Rangoun : capitale sortie de terre en 2005, avec des avenues à 20 voies presque vides.",
    "MYS": "Kuala Lumpur veut dire le confluent boueux : la ville est née là où deux rivières se rejoignent.",
    "PHL": "Manille est sur l'île de Luçon, la plus grande des 7000 îles des Philippines.",
    "IDN": "Jakarta s'enfonce dans le sol et dans la mer : c'est pour cela que l'Indonésie construit une nouvelle capitale sur l'île de Bornéo.",
    "NPL": "Katmandou est une vallée entière à 1400 m, au pied de l'Himalaya : l'Everest est à 160 km.",
    "BGD": "Dacca est au cœur du plus grand delta du monde (Gange + Brahmapoutre) : d'où les inondations chaque mousson.",
    "IRN": "Téhéran est adossée aux monts Elbourz enneigés, à 1200 m : le nord de la ville est 700 m plus haut que le sud.",
    "IRQ": "Bagdad est sur le Tigre, au cœur de l'ancienne Mésopotamie, le pays entre les deux fleuves (Tigre et Euphrate).",
    "SYR": "Damas se présente comme la plus vieille capitale habitée sans interruption du monde.",
    "LBN": "Beyrouth est le grand port du Levant, coincé entre la montagne libanaise et la Méditerranée.",
    "ISR": "Jérusalem est la ville sainte des trois religions du Livre : juive, chrétienne et musulmane.",
    "SAU": "Riyad est au centre du désert, pas sur la côte : les deux villes saintes (La Mecque, Médine) sont à l'ouest.",
    "ARE": "Abou Dabi, pas Dubaï : Dubaï est la plus connue, mais c'est Abou Dabi qui a le pétrole et le pouvoir.",
    "KWT": "Le pays et sa capitale portent le même nom : Koweït, au fond du golfe Persique.",
    "QAT": "Doha est posée sur une petite péninsule qui pointe dans le golfe Persique, à côté de l'Arabie saoudite.",
    "MNG": "Oulan-Bator veut dire le héros rouge : c'est la capitale la plus froide du monde, à -25 °C de moyenne en janvier.",
    "KAZ": "Astana veut dire tout simplement la capitale en kazakh : elle a remplacé Almaty en 1997, au centre du pays.",
    "UZB": "Tachkent est la grande ville de la route de la Soie, avec Samarcande et Boukhara juste à côté.",
    "AFG": "Kaboul est dans une vallée à 1800 m, au pied des cols qui mènent au Pakistan : la fameuse passe de Khyber.",
    "SGP": "Singapour : la ville, l'île et le pays ne font qu'un, à la pointe sud de la Malaisie.",

    // Océanie
    "PNG": "Port Moresby est sur la moitié est de la Nouvelle-Guinée : l'autre moitié appartient à l'Indonésie.",
    "FJI": "Suva est sur Viti Levu, la grande île des Fidji, près de la ligne de changement de date."
});

// ============================================================
//   LES FAMILLES DE DRAPEAUX
//   Beaucoup de drapeaux se ressemblent parce qu'ils partagent
//   une histoire : couleurs panafricaines, panarabes, Union Jack,
//   Grande Colombie... Une famille apprise, dix drapeaux retenus.
// ============================================================

Object.assign(MNEMO_DRAPEAUX, {
    // Couleurs panafricaines (vert-jaune-rouge, reprises de l'Éthiopie, jamais colonisée)
    "ETH": "Vert-jaune-rouge : l'Éthiopie, seul pays africain jamais colonisé, a donné ses couleurs à la moitié du continent.",
    "SEN": "Vert-jaune-rouge panafricain, avec une étoile verte au centre : c'est le Sénégal.",
    "MLI": "Vert-jaune-rouge panafricain SANS aucun symbole : trois bandes nues, c'est le Mali.",
    "GIN": "La Guinée, c'est le Mali à l'envers : rouge-jaune-vert au lieu de vert-jaune-rouge.",
    "GHA": "Rouge-jaune-vert avec une étoile noire au milieu : le Ghana, dont l'équipe s'appelle les Black Stars.",
    "CMR": "Vert-rouge-jaune en bandes verticales, une étoile jaune au centre : le Cameroun.",

    // Couleurs panarabes (rouge, blanc, noir, vert)
    "YEM": "Rouge-blanc-noir sans aucun symbole : c'est le Yémen. Les mêmes bandes avec un aigle, c'est l'Égypte.",
    "EGY": "Rouge-blanc-noir panarabe avec l'aigle de Saladin doré au centre : l'Égypte.",
    "SYR": "Rouge-blanc-noir panarabe avec deux étoiles vertes sur la bande blanche : la Syrie.",
    "IRQ": "Rouge-blanc-noir panarabe avec une inscription verte sur la bande blanche : l'Irak.",
    "JOR": "Les couleurs panarabes en triangle rouge côté mât, avec une petite étoile blanche à sept branches : la Jordanie.",

    // L'héritage de la Grande Colombie
    "COL": "Jaune-bleu-rouge, l'héritage de la Grande Colombie : sans rien = Colombie, avec des étoiles = Venezuela, avec un blason = Équateur.",
    "VEN": "Jaune-bleu-rouge de la Grande Colombie, plus un arc d'étoiles blanches : le Venezuela.",
    "ECU": "Jaune-bleu-rouge de la Grande Colombie, plus un blason au condor : l'Équateur. La bande jaune est deux fois plus large.",

    // Les cousins qui trompent tout le monde
    "MEX": "Vert-blanc-rouge comme l'Italie, mais avec un aigle sur un cactus au milieu : c'est le Mexique.",
    "ITA": "Vert-blanc-rouge tout nu : l'Italie. Si un aigle dévore un serpent au centre, c'est le Mexique.",
    "LBR": "Des bandes rouges et blanches avec une étoile dans un carré bleu : le Liberia, fondé par des Américains affranchis, a copié son modèle. Mais une seule étoile.",
    "MYS": "Des bandes rouges et blanches façon États-Unis, mais un croissant et une étoile jaunes dans le coin bleu : la Malaisie.",
    "CHN": "Étoiles jaunes sur fond rouge : une grande et quatre petites = la Chine ; une seule grande = le Viêt Nam.",
    "VNM": "Une seule grande étoile jaune sur fond rouge : le Viêt Nam. La Chine en a cinq.",
    "IND": "Safran-blanc-vert avec une roue bleue au centre (le chakra) : l'Inde. Le Niger a les mêmes bandes avec un disque orange.",
    "NER": "Orange-blanc-vert avec un rond orange au centre : le Niger, à ne pas confondre avec l'Inde et sa roue bleue.",
    "ARG": "Bleu ciel et blanc avec le soleil de Mai au centre : l'Argentine. L'Uruguay a le même soleil, mais dans le coin.",
    "URY": "Neuf bandes bleues et blanches avec le soleil dans le coin : l'Uruguay. En Argentine, le soleil est au milieu.",
    "GRC": "Neuf bandes bleues et blanches : autant que les syllabes de la devise grecque, avec la croix au coin pour l'orthodoxie.",
    "CHL": "Une étoile blanche dans un carré bleu, une bande blanche et une rouge : le Chili.",
    "TUN": "Croissant et étoile ROUGES dans un disque blanc, sur fond rouge : la Tunisie, l'inverse de la Turquie.",
    "PAK": "Vert avec un croissant et une étoile blancs, plus une bande blanche côté mât pour les minorités : le Pakistan.",
    "ZAF": "Le seul drapeau à six couleurs : un Y couché qui symbolise les routes d'un peuple qui se rejoignent.",
    "KOR": "Le cercle rouge et bleu du yin-yang au centre, entouré de quatre trigrammes noirs : la Corée du Sud."
});

// ============================================================
//   QUELQUES PAYS QUI ONT UNE FORME OU UNE POSITION PARLANTE
//   (pour tous les autres, l'astuce est calculée à partir des
//    vraies frontières : voir getMnemoPaysAuto)
// ============================================================

Object.assign(MNEMO_PAYS, {
    "GMB": "La Gambie est un doigt planté dans le Sénégal, le long de son fleuve : le plus petit pays d'Afrique continentale.",
    "VNM": "Le Viêt Nam est un S allongé le long de la mer de Chine : large au nord et au sud, très étroit au milieu.",
    "JPN": "Un arc de quatre grandes îles au large de la Corée : Hokkaido au nord, puis Honshu, Shikoku et Kyushu au sud.",
    "NZL": "Deux grandes îles au sud-est de l'Australie, à 2000 km de tout : île du Nord et île du Sud, tout simplement.",
    "IND": "Un triangle qui pointe vers le sud, avec l'Himalaya comme toit et le Sri Lanka comme goutte sous la pointe.",
    "ESP": "L'Espagne occupe presque toute la péninsule Ibérique, ce carré posé sous les Pyrénées ; le Portugal en prend la bande ouest.",
    "GRC": "La Grèce, c'est une main aux doigts déchirés dans la mer, plus 6000 îles : elle ferme les Balkans au sud.",
    "AUS": "Le seul pays qui occupe un continent entier, avec un désert rouge au centre et toutes les villes sur les bords."
});

// ============================================================
//   LES TROPHÉES
//   Tous se calculent à partir de ce qui est déjà enregistré :
//   pas de nouvelle mécanique à entretenir.
// ============================================================

const TROPHEES = [
    { id: "debut",     emo: "🐣", nom: "Premiers pas",      desc: "Gagner ses 50 premiers XP" },
    { id: "niv5",      emo: "⭐", nom: "Niveau 5",           desc: "Atteindre le niveau 5" },
    { id: "niv10",     emo: "🌟", nom: "Niveau 10",          desc: "Atteindre le niveau 10" },
    { id: "serie3",    emo: "🔥", nom: "Trois jours",        desc: "Jouer 3 jours d'affilée" },
    { id: "serie7",    emo: "🔥", nom: "Une semaine",        desc: "Jouer 7 jours d'affilée" },
    { id: "serie30",   emo: "🏅", nom: "Un mois entier",     desc: "Jouer 30 jours d'affilée" },
    { id: "sansfaute", emo: "🎯", nom: "Sans faute",         desc: "Terminer une session sans aucune erreur" },
    { id: "combo",     emo: "⚡", nom: "Combo",              desc: "Réussir un enchaînement ville → département" },
    { id: "chrono10",  emo: "⏱️", nom: "Contre la montre",   desc: "10 bonnes réponses dans une session chrono" },
    { id: "infirmerie",emo: "🚑", nom: "Infirmerie vidée",   desc: "Soigner toutes les cartes de l'infirmerie" },
    { id: "dep50",     emo: "🧩", nom: "50 départements",    desc: "Maîtriser 50 départements" },
    { id: "depAll",    emo: "🗺️", nom: "Toute la France",    desc: "Maîtriser les 96 départements" },
    { id: "vil20",     emo: "🏙️", nom: "20 villes",          desc: "Maîtriser 20 villes" },
    { id: "pays50",    emo: "🌍", nom: "50 pays",            desc: "Maîtriser 50 pays du monde" },
    { id: "cap30",     emo: "🏛️", nom: "30 capitales",       desc: "Maîtriser 30 capitales" },
    { id: "flg30",     emo: "🚩", nom: "30 drapeaux",        desc: "Maîtriser 30 drapeaux" },
    { id: "plantes",   emo: "🌿", nom: "Botaniste",          desc: "Maîtriser les 20 plantes" },
    { id: "histoire",  emo: "📜", nom: "Historien",          desc: "Maîtriser les 23 dates" },
    { id: "etape1",    emo: "🚴", nom: "Première étape",     desc: "Gagner une étape du Tour de France" },
    { id: "tour",      emo: "🏆", nom: "Tour de France",     desc: "Terminer les 13 étapes du Tour" },
    { id: "maillot",   emo: "💛", nom: "Maillot jaune",      desc: "Décrocher les 39 étoiles du Tour de France" },
    { id: "europe",    emo: "🇪🇺", nom: "Tour d'Europe",       desc: "Terminer les étapes du Tour d'Europe" },
    { id: "monde",     emo: "🌍", nom: "Tour du Monde",        desc: "Terminer les étapes du Tour du Monde" },
    { id: "capitour",  emo: "🏛️", nom: "Tour des Capitales",   desc: "Terminer les étapes du Tour des Capitales" }
];

// ============================================================
//   LE TOUR DE FRANCE
//   13 étapes = 13 régions, dans une vraie boucle géographique,
//   avec l'arrivée à Paris comme le vrai Tour.
// ============================================================

const ETAPES_FRANCE = [
    { cle: "Hauts-de-France",            court: "Nord",        emo: "⛏️", titre: "Le grand départ : terrils, beffrois et mer du Nord." },
    { cle: "Normandie",                  court: "Normandie",   emo: "🐄", titre: "Cap à l'ouest par les plages du Débarquement." },
    { cle: "Bretagne",                   court: "Bretagne",    emo: "🌊", titre: "La pointe de l'Europe, face à l'Atlantique." },
    { cle: "Pays de la Loire",           court: "Loire",       emo: "⛵", titre: "On redescend la Loire jusqu'à l'océan." },
    { cle: "Centre-Val de Loire",        court: "Centre",      emo: "🏰", titre: "Étape de plat entre les châteaux." },
    { cle: "Nouvelle-Aquitaine",         court: "Aquitaine",   emo: "🍷", titre: "La plus grande région, des vignes aux Pyrénées." },
    { cle: "Occitanie",                  court: "Occitanie",   emo: "☀️", titre: "Du pays cathare à la Méditerranée." },
    { cle: "Provence-Alpes-Côte d'Azur", court: "PACA",        emo: "🏖️", titre: "Le seul coin qui a les Alpes ET la mer." },
    { cle: "Corse",                      court: "Corse",       emo: "⛴️", titre: "Transfert en bateau vers l'Île de Beauté." },
    { cle: "Auvergne-Rhône-Alpes",       court: "Alpes",       emo: "⛰️", titre: "L'étape reine : volcans puis haute montagne." },
    { cle: "Bourgogne-Franche-Comté",    court: "Bourgogne",   emo: "🧀", titre: "Entre vignes et Jura, on remonte vers l'est." },
    { cle: "Grand Est",                  court: "Grand Est",   emo: "🥨", titre: "Vosges, Alsace et Champagne avant la dernière ligne droite." },
    { cle: "Île-de-France",              court: "Paris",       emo: "🏁", titre: "Arrivée sur les Champs-Élysées." }
];

// Les étapes hors de France se repèrent à la sous-région renvoyée par
// l'API (en anglais) : c'est la valeur la plus sûre pour filtrer.
const ETAPES_EUROPE = [
    { cle: "eur-ouest",   court: "Ouest",     emo: "🥐", titre: "Départ chez nos voisins immédiats.",            sr: ["Western Europe"] },
    { cle: "eur-nord",    court: "Nord",      emo: "❄️", titre: "Scandinavie, Baltique et îles du Nord.",        sr: ["Northern Europe"] },
    { cle: "eur-sud",     court: "Sud",       emo: "🏛️", titre: "La Méditerranée et ses péninsules.",            sr: ["Southern Europe"] },
    { cle: "eur-centre",  court: "Centre",    emo: "🏰", titre: "Le cœur du continent, entre Rhin et Carpates.", sr: ["Central Europe"] },
    { cle: "eur-balkans", court: "Balkans",   emo: "⛰️", titre: "L'ex-Yougoslavie et ses voisines.",             sr: ["Southeast Europe"] },
    { cle: "eur-est",     court: "Est",       emo: "🪆", titre: "Dernière étape : les grandes plaines de l'Est.", sr: ["Eastern Europe"] }
];

const ETAPES_MONDE = [
    { cle: "m-europe",   court: "Europe",     emo: "🇪🇺", titre: "On commence par le continent qu'on connaît le mieux.", sr: ["Western Europe","Northern Europe","Southern Europe","Central Europe","Southeast Europe","Eastern Europe"] },
    { cle: "m-amnord",   court: "Am. Nord",   emo: "🍁", titre: "Du Canada au Mexique.",                    sr: ["North America","Northern America"] },
    { cle: "m-caraibes", court: "Caraïbes",   emo: "🌴", titre: "Les îles et l'isthme, entre les deux Amériques.", sr: ["Caribbean","Central America"] },
    { cle: "m-amsud",    court: "Am. Sud",    emo: "💃", titre: "Des Andes à l'Amazonie.",                   sr: ["South America"] },
    { cle: "m-afnord",   court: "Afr. Nord",  emo: "🐪", titre: "Le Maghreb et le Sahara.",                  sr: ["Northern Africa"] },
    { cle: "m-afouest",  court: "Afr. Ouest", emo: "🥁", titre: "Du Sénégal au Nigeria.",                    sr: ["Western Africa"] },
    { cle: "m-afcentre", court: "Afr. Est",   emo: "🦁", titre: "Le bassin du Congo et la corne de l'Afrique.", sr: ["Middle Africa","Eastern Africa"] },
    { cle: "m-afsud",    court: "Afr. Sud",   emo: "🦓", titre: "La pointe australe du continent.",          sr: ["Southern Africa"] },
    { cle: "m-moyen",    court: "Moyen-Or.",  emo: "🕌", titre: "Du Bosphore au golfe Persique.",            sr: ["Western Asia"] },
    { cle: "m-asud",     court: "Asie Sud",   emo: "🐘", titre: "Le sous-continent indien et les steppes.",   sr: ["Southern Asia","Central Asia"] },
    { cle: "m-aest",     court: "Asie Est",   emo: "🏯", titre: "De la Chine à l'Indonésie.",                sr: ["Eastern Asia","South-Eastern Asia"] },
    { cle: "m-oceanie",  court: "Océanie",    emo: "🏝️", titre: "Arrivée au bout du monde.",                 sr: ["Australia and New Zealand","Melanesia","Micronesia","Polynesia"] }
];

// Les quatre parcours. Même moteur, même carte d'accueil : seul le
// contenu des étapes change.
const TOURS = {
    france:    { nom: "Le Tour de France",     emo: "🚴", onglet: "🚴 France",    types: ["reg","dep","vil"], etapes: ETAPES_FRANCE },
    europe:    { nom: "Le Tour d'Europe",      emo: "🇪🇺", onglet: "🇪🇺 Europe",   types: ["country","flag"],  etapes: ETAPES_EUROPE },
    monde:     { nom: "Le Tour du Monde",      emo: "🌍", onglet: "🌍 Monde",     types: ["country","flag"],  etapes: ETAPES_MONDE },
    capitales: { nom: "Le Tour des Capitales", emo: "🏛️", onglet: "🏛️ Capitales", types: ["cap"],             etapes: ETAPES_MONDE }
};
