const card = document.getElementById("card");
const cardFrontContent = document.getElementById("card-front-content");
const cardBackContent = document = document.getElementById("card-back-content");
const rememberBtn = document.getElementById("remember");
const dontRememberBtn = document.getElementById("dontRemember");
const pronounceBtn = document.getElementById("pronounce");
const backToHomeBtn = document.getElementById("backToHome");

let words = [];
let currentIndex = 0;
let showingEnglish = true;
let isAnimating = false; // Proměnná pro kontrolu, zda probíhá animace odchodu/příchodu karty

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const topic = params.get("topic");

// Pomocná funkce pro blokování/odblokování tlačítek
function setButtonsDisabled(disabled) {
    rememberBtn.disabled = disabled;
    dontRememberBtn.disabled = disabled;
    pronounceBtn.disabled = disabled;
    backToHomeBtn.disabled = disabled; // Můžeme zablokovat i tlačítko zpět, pokud chceme plnou blokaci
}

// Načtení slovníku z JSON souboru
if (!category || !topic) {
    cardFrontContent.textContent = "Chyba: Chybí parametry kategorie nebo tématu v URL. Ujistěte se, že odkaz obsahuje jak `category`, tak `topic`.";
    cardBackContent.textContent = "";
    setButtonsDisabled(true); // Použijeme pomocnou funkci
    console.error("Missing 'category' or 'topic' parameter in URL.");
} else {
    fetch("data/vocabulary.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} (Soubor 'vocabulary.json' nenalezen nebo je problém s přístupem).`);
            }
            return response.json();
        })
        .then(data => {
            if (data[category] && data[category][topic]) {
                words = data[category][topic];
            } else {
                words = [];
                console.warn(`Žádná slova nenalezena pro kategorii: "${category}" a téma: "${topic}". Zkontrolujte shodu názvů v JSONu a v URL.`);
            }

            if (words.length === 0) {
                cardFrontContent.textContent = `Žádná slova pro téma: "${topic}" v kategorii: "${category}".`;
                cardBackContent.textContent = "";
                setButtonsDisabled(true); // Použijeme pomocnou funkci
                return;
            }

            words = words.map(word => ({ ...word, repeat: 1 }));
            shuffleWords();
            showCard();
        })
        .catch(error => {
            console.error("Chyba při načítání slovníku:", error);
            cardFrontContent.textContent = `Chyba při načítání slovníku: ${error.message}.`;
            cardBackContent.textContent = "";
            setButtonsDisabled(true); // Použijeme pomocnou funkci
        });
}

// --- Funkce pro správu kartiček ---

// Funkce pro promíchání slov (včetně opakování)
function shuffleWords() {
    words = words.flatMap(word => Array(word.repeat).fill(word));
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
}

// Funkce pro zobrazení aktuální kartičky s animací příchodu
function showCard() {
    if (words.length === 0) {
        cardFrontContent.textContent = "Všechna slova jsou označena jako zapamatovaná! Dobrá práce!";
        cardBackContent.textContent = "";
        card.classList.add('finished-message');
        setButtonsDisabled(true);
        return;
    }

    // Před zobrazením nové karty: Resetujeme všechny animační třídy a stav!
    card.classList.remove('flipped', 'card-flip-out', 'card-flip-in', 'card-remember', 'card-dont-remember', 'finished-message');
    card.classList.add('card-initial'); // Přidáme 'card-initial' pro reset výchozí pozice a opacity: 0
    
    showingEnglish = true; // Zajišťujeme, že karta je vždy na anglické straně na začátku
    
    setButtonsDisabled(true); // Zablokujeme tlačítka na začátku animace příchodu nové karty

    const currentWord = words[currentIndex];
    const sentence = currentWord.sentence ? `<div class='sentence'>${currentWord.sentence}</div>` : "";

    // Nastavíme obsah přední a zadní strany
    cardFrontContent.innerHTML = `${currentWord.english}${sentence}`;
    cardBackContent.innerHTML = `${currentWord.czech || "(chybí překlad)"}`;
    
    // Timeout je důležitý pro to, aby prohlížeč stihl aplikovat 'card-initial'
    // a teprve pak spustit 'card-flip-in' animaci.
    setTimeout(() => {
        card.classList.remove('card-initial'); 
        card.classList.add('card-flip-in'); 

        // Posluchač pro konec animace příchodu (card-flip-in)
        // Používáme `{ once: true }`, aby se posluchač automaticky odstranil po prvním spuštění
        card.addEventListener('transitionend', function handleTransitionEnd(event) {
            if ((event.propertyName === 'transform' || event.propertyName === 'opacity') && card.classList.contains('card-flip-in')) {
                card.classList.remove('card-flip-in'); 
                isAnimating = false; 
                setButtonsDisabled(false); 
                pronounceBtn.disabled = !showingEnglish; 
            }
        }, { once: true });
    }, 50); 
}

// Posluchač události pro otočení kartičky při kliknutí
card.addEventListener("click", () => {
    if (words.length === 0 || isAnimating) return;
    
    card.classList.toggle('flipped'); 
    showingEnglish = !showingEnglish; 
    pronounceBtn.disabled = !showingEnglish; 
});


// Tlačítko "Pamatuji": odstraní slovo a zobrazí další.
rememberBtn.addEventListener("click", () => {
    if (isAnimating) return; 
    
    isAnimating = true; 
    setButtonsDisabled(true); 
    if (navigator.vibrate) navigator.vibrate(50); 

    card.classList.remove('flipped'); 
    showingEnglish = true; 
    
    card.classList.add('card-remember'); 

    // Proměnná pro ukládání ID timeoutu, abychom ho mohli zrušit
    let transitionTimeoutId = null;

    // Posluchač pro konec animace odchodu
    const handleRememberTransitionEnd = function(event) {
        if (event.propertyName === 'transform' && card.classList.contains('card-remember')) {
            clearTimeout(transitionTimeoutId); // Zrušíme fallback timeout
            card.removeEventListener('transitionend', handleRememberTransitionEnd); // Odstraníme posluchač

            words.splice(currentIndex, 1); 
            if (currentIndex >= words.length) { 
                currentIndex = 0; 
            }
            
            card.classList.remove('card-remember'); 
            showCard(); 
        }
    };

    card.addEventListener('transitionend', handleRememberTransitionEnd);

    // Nastavíme fallback timeout (doba trvání animace + malá rezerva)
    // Animace 'card-remember' má 0.3s, takže 400ms by mělo být bezpečné
    transitionTimeoutId = setTimeout(() => {
        card.removeEventListener('transitionend', handleRememberTransitionEnd); // Odstraníme posluchač, pokud se transitionend nespustil
        if (isAnimating) { // Zkontrolujeme, zda isAnimating je stále true
            console.warn("Fallback: Transitionend for 'remember' did not fire. Forcing next card.");
            words.splice(currentIndex, 1); 
            if (currentIndex >= words.length) { 
                currentIndex = 0; 
            }
            card.classList.remove('card-remember'); 
            showCard(); 
        }
    }, 400); 
});

// Tlačítko "Nepamatuji": zvýší prioritu slova a promíchá pole.
dontRememberBtn.addEventListener("click", () => {
    if (isAnimating) return; 
    
    isAnimating = true; 
    setButtonsDisabled(true); 
    if (navigator.vibrate) navigator.vibrate([100, 30, 100]); 

    card.classList.remove('flipped'); 
    showingEnglish = true; 

    card.classList.add('card-dont-remember'); 

    // Proměnná pro ukládání ID timeoutu, abychom ho mohli zrušit
    let transitionTimeoutId = null;

    // Posluchač pro konec animace odchodu
    const handleDontRememberTransitionEnd = function(event) {
        if (event.propertyName === 'transform' && card.classList.contains('card-dont-remember')) {
            clearTimeout(transitionTimeoutId); // Zrušíme fallback timeout
            card.removeEventListener('transitionend', handleDontRememberTransitionEnd); // Odstraníme posluchač

            const word = words[currentIndex];
            word.repeat += 1; 
            shuffleWords(); 
            currentIndex = 0; 

            card.classList.remove('card-dont-remember');
            showCard(); 
        }
    };

    card.addEventListener('transitionend', handleDontRememberTransitionEnd);

    // Nastavíme fallback timeout (doba trvání animace + malá rezerva)
    // Animace 'card-dont-remember' má 0.3s, takže 400ms by mělo být bezpečné
    transitionTimeoutId = setTimeout(() => {
        card.removeEventListener('transitionend', handleDontRememberTransitionEnd); // Odstraníme posluchač
        if (isAnimating) { // Zkontrolujeme, zda isAnimating je stále true
            console.warn("Fallback: Transitionend for 'dontRemember' did not fire. Forcing next card.");
            const word = words[currentIndex];
            word.repeat += 1; 
            shuffleWords(); 
            currentIndex = 0; 
            card.classList.remove('card-dont-remember');
            showCard(); 
        }
    }, 400);
});

// Tlačítko pro výslovnost anglického slova a věty.
pronounceBtn.addEventListener("click", () => {
    if (showingEnglish && words[currentIndex]) {
        if (navigator.vibrate) navigator.vibrate(30); 
        const currentWord = words[currentIndex];
        const sentenceText = currentWord.sentence || ""; 
        const utterance = new SpeechSynthesisUtterance(`${currentWord.english}. ${sentenceText}`);
        utterance.lang = "en-US"; 
        speechSynthesis.speak(utterance); 
    }
});

// Tlačítko "Hlavní stránka": vrátí uživatele na index.html.
backToHomeBtn.addEventListener("click", () => {
    if (navigator.vibrate) navigator.vibrate(50); 
    window.location.href = "index.html"; 
});