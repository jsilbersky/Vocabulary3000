const categories = [
    // Tvé stávající kategorie
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

const container = document.getElementById("categories");

categories.forEach(category => {
    const section = document.createElement("div");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.textContent = category.name;
    heading.className = "category-heading";
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "topic-grid";

    category.topics.forEach(topic => {
        const tile = document.createElement("button"); // Změna na <button> pro lepší přístupnost
        tile.className = "topic-tile";
        tile.textContent = topic;
        tile.onclick = () => {
            // Přidáme haptickou odezvu při kliknutí na téma
            if (navigator.vibrate) {
                navigator.vibrate(50); // Krátká vibrace 50ms
            }
            window.location.href = `flashcards.html?category=${encodeURIComponent(category.name)}&topic=${encodeURIComponent(topic)}`;
        };
        grid.appendChild(tile);
    });

    section.appendChild(grid);
    container.appendChild(section);
});