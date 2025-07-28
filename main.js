function loadCategories(practiceType) {
  const dataFile = `data/${practiceType}.json`;

  fetch(dataFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Soubor ${dataFile} nebyl nalezen.`);
      }
      return response.json();
    })
    .then(data => {
      renderCategories(data);
      enableBackToHomeButton();
    })
    .catch(error => {
      console.error('Chyba při načítání dat:', error);
      document.getElementById("categories").innerHTML = `<p>Data se nepodařilo načíst.</p>`;
    });
}

// Zobrazí kategorie a témata
function renderCategories(data) {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  Object.entries(data).forEach(([categoryName, topics]) => {
    const section = document.createElement("div");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.textContent = categoryName;
    heading.className = "category-heading";
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "topic-grid";

    Object.keys(topics).forEach(topic => {
      const tile = document.createElement("button");
      tile.className = "topic-tile";
      tile.textContent = topic;
      tile.onclick = () => {
        if (navigator.vibrate) navigator.vibrate(50);
        localStorage.setItem('practiceTopic', topic);
        localStorage.setItem('practiceCategory', categoryName);
        window.location.href = 'flashcards.html';
      };
      grid.appendChild(tile);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Tlačítko zpět
function enableBackToHomeButton() {
  const backBar = document.getElementById('back-bar');
  const backBtn = document.getElementById('backToHome');
  if (backBar && backBtn) {
    backBar.style.display = 'flex';
    backBtn.onclick = () => {
      localStorage.removeItem('practiceType');
      localStorage.removeItem('practiceTopic');
      localStorage.removeItem('practiceCategory');
      window.location.href = 'index.html';
    };
  }
}
