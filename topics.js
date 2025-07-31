const type = localStorage.getItem("practiceType");
const topicsContainer = document.getElementById("topics");
const heading = document.getElementById("heading");

// Název typu přeložený do češtiny
const typeNames = {
  vocabulary: "Slovíčka",
  phrases: "Fráze",
  chunks: "Chunks",
  collocations: "Kolokace",
  phrasal_verbs: "Frazová slovesa",
  idioms: "Idiomy"
};

const vocabularyCategories = [
    {
        "name": "Lidé a vztahy",
        "topics": [
            "Rodina a vztahy",
            "Přátelé a sociální interakce",
            "Povolání a role",
            "Děti a dospělí",
            "Osobní informace a identita"
        ]
    },
    {
        "name": "Tělo a zdraví",
        "topics": [
            "Části těla",
            "Nemoci a zranění",
            "U lékaře a léčba",
            "Zdravý životní styl a cvičení",
            "Péče o tělo"
        ]
    },
    {
        "name": "Pocity a osobnost",
        "topics": [
            "Základní emoce",
            "Popis povahy a vlastností",
            "Mentální stavy a myšlení",
            "Reakce a chování"
        ]
    },
    {
        "name": "Domov a bydlení",
        "topics": [
            "Místnosti a prostory",
            "Nábytek a vybavení",
            "Běžné domácí předměty",
            "Typy obydlí",
            "Domácí činnosti"
        ]
    },
    {
        "name": "Jídlo a pití",
        "topics": [
            "Ovoce a zelenina",
            "Druhy jídel a pokrmy",
            "Nápoje",
            "Vaření a kuchyňské potřeby",
            "V restauraci a stravování",
            "Chuť a příprava"
        ]
    },
    {
        "name": "Každodenní život a činnosti",
        "topics": [
            "Denní rutina",
            "Domácí práce a úkoly",
            "Volný čas a zábava",
            "Osobní návyky a zvyky",
            "Spánek a odpočinek"
        ]
    },
    {
        "name": "Oblečení a móda",
        "topics": [
            "Druhy oblečení",
            "Obuv a doplňky",
            "Popis oblečení (materiály, barvy, styl)",
            "Oblékání a svlékání"
        ]
    },
    {
        "name": "Práce a zaměstnání",
        "topics": [
            "Povolání a profese",
            "Pracoviště a prostředí",
            "Pracovní činnosti a úkoly",
            "Hledání práce a kariéra",
            "Mzda a finance v práci"
        ]
    },
    {
        "name": "Škola a vzdělání",
        "topics": [
            "Školní předměty",
            "Typy škol a institucí",
            "Studium a učení",
            "Zkoušky a hodnocení",
            "Učební pomůcky a vybavení"
        ]
    },
    {
        "name": "Cestování a doprava",
        "topics": [
            "Dovolená a rekreace",
            "Ubytování",
            "Cestovní prostředky",
            "Orientační body a směry",
            "Na letišti a nádraží",
            "Typy cestování"
        ]
    },
    {
        "name": "Nakupování a peníze",
        "topics": [
            "Obchody a nákupní místa",
            "Proces nakupování",
            "Ceny a platby",
            "Měna a finance",
            "Slevy a nabídky"
        ]
    },
    {
        "name": "Čas, čísla a data",
        "topics": [
            "Dny, měsíce a roční období",
            "Určení času",
            "Čísla a množství",
            "Kalendář a události",
            "Frekvence a trvání"
        ]
    },
    {
        "name": "Počasí a příroda",
        "topics": [
            "Počasí a jevy",
            "Krajina a terén",
            "Přírodní prostředí a ekologie",
            "Rostliny a stromy",
            "Zvířata (obecně)"
        ]
    },
    {
        "name": "Technologie a média",
        "topics": [
            "Počítače a software",
            "Internet a online aktivity",
            "Telefonování a mobilní zařízení",
            "Sociální média a komunikace",
            "Média a zábava (TV, rádio, tisk)"
        ]
    },
    {
        "name": "Komunikace a jazyk",
        "topics": [
            "Základní konverzace a pozdravy",
            "Ptát se a odpovídat",
            "Popisování a vyprávění",
            "Jazyky a slova",
            "Psaní a čtení"
        ]
    },
    {
        "name": "Společnost, politika a právo",
        "topics": [
            "Společenské struktury a skupiny",
            "Zákony a pravidla",
            "Práva a povinnosti",
            "Vláda a politika",
            "Kriminalita a trest"
        ]
    },
    {
        "name": "Věda a životní prostředí",
        "topics": [
            "Vědecké obory a výzkum",
            "Vědci a objevy",
            "Ekologie a ochrana přírody",
            "Planeta Země a vesmír",
            "Energie a zdroje"
        ]
    },
    {
        "name": "Kultura, umění a zábava",
        "topics": [
            "Hudba a nástroje",
            "Filmy a televize",
            "Knihy a literatura",
            "Divadlo a představení",
            "Kulturní události a tradice",
            "Umění a tvorba"
        ]
    },
    {
        "name": "Sport a volný čas",
        "topics": [
            "Sportovní disciplíny",
            "Sportovní vybavení",
            "Fyzické aktivity",
            "Koníčky a zájmy",
            "Soutěže a výsledky"
        ]
    },
    {
        "name": "Budovy a místa",
        "topics": [
            "Město a městská doprava",
            "Venkov a vesnice",
            "Veřejné budovy a instituce",
            "Historické památky a zajímavosti",
            "Geografická místa a orientace"
        ]
    },
    {
        "name": "Abstraktní pojmy a myšlenky",
        "topics": [
            "Koncepce a ideje",
            "Pocity a vlastnosti (obecné)",
            "Charakteristiky a kvality",
            "Stav a podmínky",
            "Míry a množství (obecné)",
            "Prvky a součásti"
        ]
    },
    {
        "name": "Funkční slova a výrazy",
        "topics": [
            "Základní slovesa (nejpoužívanější)",
            "Slovesa začátku a konce",
            "Slovesa pohybu a změny",
            "Slovesa komunikace a myšlení",
            "Slovesa interakce a vztahů",
            "Slovesa tvorby a ničení",
            "Slovesa transakcí a vlastnictví",
            "Slovesa stavu a procesu",
            "Slovesa správy a organizace",
            "Slovesa vnímání a smyslů",
            "Ostatní akční slovesa",
            "Popis vzhledu a fyzických vlastností (přídavná jména)",
            "Popis kvality a hodnocení (přídavná jména)",
            "Popis vztahů a spojitostí (přídavná jména)",
            "Popis abstraktních konceptů (přídavná jména)",
            "Způsobová příslovce",
            "Místní příslovce",
            "Časová příslovce",
            "Mírová a intenzitní příslovce",
            "Příslovce postoje a komentáře",
            "Spojovací příslovce",
            "Předložky",
            "Spojky",
            "Zájmena a determinanty",
            "Krátké výrazy a citoslovce"
        ]
    }
];

const idiomsCategories = [
  {
    name: "Idiomy",
    topics: [
      "Práce a byznys",
      "Každodenní konverzace",
      "Vztahy a emoce",
      "Problémy a řešení",
      "Rozhodování a názory",
      "Čas a plánování",
      "Škola a studium",
      "Peníze a finance",
      "Popis osob a chování",
      "Situace a události",
      "Nečekané situace a náhody",
      "Vyjádření souhlasu a nesouhlasu",
      "Humor a nadsázka",  
    ]
  }
];

const phrasalVerbsCategories = [
  {
    name: "Frázová slovesa",
    topics: [
      "Oblečení",
      "Jídlo a vaření",
      "Cestování",
      "Nákupy",
      "Peníze",
      "Volný čas a zábava",
      "Přátelství",
      "Rodina",
      "Emoce a pocity",
      "Škola a studium",
      "Práce",
      "Komunikace a média",
      "Technika a internet",
      "Domácnost",
      "Tělo a zdraví",
      "Zaměstnání a kariéra",
      "Každodenní aktivity",
      "Osobní růst a změna",
      "Rozhodování a názory",
      "Problémy a řešení",
      "Čas a plánování",
      "Vztahy",
      "Příroda a prostředí",
      "Doprava",
      "Sport"
    ]
  }
];

// Funkce pro zobrazení kategorií
function renderTopics(type) {
  let categories = [];

  switch (type) {
    case "vocabulary":
      categories = vocabularyCategories;
      break;
    case "idioms":
      categories = idiomsCategories;
      break;
    case "phrasal_verbs":
      categories = phrasalVerbsCategories;
      break;
    // Můžeš přidat další typy později
    default:
      topicsContainer.innerHTML = `<p>Zatím nemáme témata pro tento typ obsahu.</p>`;
      return;
  }

  heading.textContent = `Procvičuješ: ${typeNames[type] || type}`;

  topicsContainer.innerHTML = ""; // Smazat předchozí obsah

  categories.forEach(category => {
    const section = document.createElement("div");
    section.className = "category-section";

    const h2 = document.createElement("h2");
    h2.textContent = category.name;
    section.appendChild(h2);

    const grid = document.createElement("div");
    grid.className = "topic-grid";

    category.topics.forEach(topic => {
      const button = document.createElement("button");
      button.className = "topic-tile";
      button.textContent = topic;
      button.onclick = () => {
        if (navigator.vibrate) navigator.vibrate(50);
        localStorage.setItem("practiceTopic", topic);
        localStorage.setItem("practiceCategory", category.name);
        window.location.href = "flashcards.html";
      };
      grid.appendChild(button);
    });

    section.appendChild(grid);
    topicsContainer.appendChild(section);
  });
}

// Pokud je typ neznámý nebo chybí – přesměrování zpět
if (!type) {
  window.location.href = "index.html";
} else {
  renderTopics(type);
}