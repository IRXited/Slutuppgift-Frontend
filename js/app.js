
const pepData = { //Här under är de rubriker och fraser jag har på min sida, har dessa för koden ska ha en intern lista att hämta fraser ifrån
  date: [
    "Du är charmigare än du tror – låt personen få se det. ",
    "Kom ihåg: en dejt är ett samtal, inte en audition.",
    "Du behöver inte vara perfekt, du behöver bara vara dig själv. Det räcker. ",
    "Du är inte här för att imponera, du är här för att connecta.",
    "Om du skrattar och är nyfiken, är du redan en fantastisk dejt." ,
    "Va dig själv, det är den personen hen ska tycka om." ,
    "Du är en bra dejt, det här blir kul!" ,
    "Slappna av och var dig själv." ,
    "Du är här för att ha roligt, inte för att prestera." ,
    "Du ser bra ut och jag är redo." ,
    "Du är intressant för hen också, annars hade hen inte sagt ja till daten."

  ],
  presentation: [
    "Du kan det här bättre än du tror, publiken vill att du ska lyckas. ",
    "Andas lugnt, prata långsamt, du äger rummet.",
    "Det är okej att vara nervös. Mod är att göra det ändå.",
    "Du är den som kan ämnet bäst just nu, lita på det! ",
    "Ett leende i början är halva presentationen klar." ,
    "Du kan ditt material, du är experten i rummet!" ,
    "Andas djupt, tala långsamt och håll ögonkontakt" ,
    "Du har gjort dehär förut, du klarar de!" ,
    "Dra igång din favoritlåt för att tagga till!" ,
    "Även om du gör något fel, fortsätt bara!, ingen kommer att märka det."
  ],
  gym: [
    "Du behöver inte vara bäst, du behöver bara dyka upp. ",
    "Framtida du jublar varje gång du går till gymmet.",
    "Gör det här för din energi, din hjärna och ditt hjärta – inte bara kroppen.",
    "En kort träning är alltid bättre än ingen träning alls.",
    "Tänk inte 'jag måste träna', tänk 'jag får ta hand om min kropp idag'." ,
    "Varje rep räknas, fokusera och fullfölj!" ,
    "Smärtan är tillfällig men styrkan är permanent." ,
    "Du är starkare än du tror, inga genvägar nu." ,
    "Du gör dehär för dig, ingen annan!" ,
    "Idag tar du nytt PB!" ,
  ],
  day: [
    "Du förtjänar en dag där saker känns lite lättare. ",
    "Små steg räcker. Du behöver inte vinna dagen, bara ta nästa steg.",
    "Du är mer kapabel än du känner dig just nu.",
    "Det är okej att vila, okej att skratta och okej att bara vara.",
    "Du har tagit dig igenom 100% av dina tuffa dagar hittills. Det här klarar du också." ,
    "Du sätter tonen för denhär dagen, du är fokuserad och lugn!" ,
    "Du har tid för de som är viktigt, ta en sak i taget!" ,
    "Du är tacksam för denhär dagen och för allt den har att erbjuda." ,
    "Skaka loss till lite go musik, den energin har du förtjänat." ,
    "Se dig själv i spegel och le, skratta högt! Du är kanon!" ,
    "Ingen är som du, du är ju helt fantastiskt!" ,
  ],
  work: [
    "Dina idéer är värdefulla. Våga dela med dig av dem. ",
    "Fokusera på en sak i taget, du bygger framgång bit för bit.",
    "Det är okej att be om hjälp. Det är ett tecken på styrka, inte svaghet. ",
    "Ge dig själv en paus. Hjärtat av innovation är återhämtning.",
    "Kom ihåg varför du började. Varje uppgift tar dig närmare målet." ,
    "Fokusera nu, njut senare. Varje ansträngning leder till restultat." ,
    "Du gör framsteg, inte perfektion. Små steg framåt är också en vinst." ,
    "Du prioriterar de viktigaste just nu, inga distraktioner!" ,
    "Din kunskap är din framtid. Du investerar i dig själv idag." ,
    "Du är kapabel att lösa detta, ta ett djupt andetag!"
  ]
};

// Hjälpfunktion för att välja ett slumpmässigt element från en array. (returnera fraser ifrån min listor)
function getRandomFromArray(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Variabel är skapad för att inte samma fras ska genereras fram 2 ggr i rad - MINSKAR UPPREPNING
let lastPepPhrase = "";

// Denna funktion genererar fram en ny frasv på vald kategori - INTERN HÄMTNING
function getNewPepPhrase(category) {
  let availablePhrases;

  if (category === "any") {
    // Samla alla fraser från alla kategorier. - IF satser för att de beror på vad användaren klickar på
    availablePhrases = Object.values(pepData).flat();
  } else {
    // Hämta fraser för den valda kategorin (|| [] skyddar mot fel).
    availablePhrases = pepData[category] || [];
  }

  if (availablePhrases.length === 0) {
    return "Oops, hittade inga peppfraser i den här kategorin! ";
  }

  // Filtrera bort den senast visade frasen.
  const filteredPhrases = availablePhrases.filter(phrase => phrase !== lastPepPhrase);
  // Välj från de filtrerade fraserna (eller alla om bara en finns kvar).
  const phrasesToChooseFrom = filteredPhrases.length > 0 ? filteredPhrases : availablePhrases;

  const newPepPhrase = getRandomFromArray(phrasesToChooseFrom);
  lastPepPhrase = newPepPhrase; // Uppdatera variabeln.

  return newPepPhrase;
}
 //genererar fram famous quotes ifrån via ett API-anrop
async function fetchApiQuote() {
  // Ändrar URL till Advice Slip API
  const apiUrl = "https://api.adviceslip.com/advice";

  pepCard.classList.add("is-loading"); // Visuell feedback

  try {
    // 1. Anropa API:et
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 2. Konvertera svaret till JSON
    const data = await response.json();

    // 3. HÄMTAR DATA KORREKT: datan ligger i data.slip.advice
    const advice = data.slip.advice;

    // 4. Returnerar det hämtade rådet
    return `"${advice}"`;

  } catch (error) {
    console.error("Fel vid hämtning av API-citat:", error);
    return "Kunde inte hämta externt råd just nu. Kontrollera din internetanslutning!"; //Eventuella error meddelande om de skulle va något strul
  } finally {
    // 5. Tar bort laddningsindikatorn oavsett resultat
    pepCard.classList.remove("is-loading");
  }
}

// Söker igenom den interna fraslistan efter matchande ord (de ord du skrivit)
function searchPepPhrases(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  // Samla alla fraser ifrån alla kategorier
  const allPhrases = Object.values(pepData).flat();

  // Filtrera fraserna som matchar sökordet
  const matchingPhrases = allPhrases.filter(phrase =>
    phrase.toLowerCase().includes(lowerQuery)
  );

  return matchingPhrases;
}


// Hämta DOM-element (HTML-element)
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search"); // NYTT: Sökfältet
const pepButton = document.getElementById("pepButton");
const pepText = document.getElementById("pepText");
const pepCard = document.getElementById("pepCard");
const apiButton = document.getElementById("apiButton"); // NYTT: API-knappen


// EVENTLYSSNARE för den primära "Peppa mig!"-knappen
pepButton.addEventListener("click", function () {

  const searchQuery = searchInput.value;
  let newPepPhrase;

  if (searchQuery) {
    // Förifyllt sökfönster för att ge förslag - Bra UX
    const results = searchPepPhrases(searchQuery);

    if (results.length > 0) {
      newPepPhrase = getRandomFromArray(results);
    } else {
      newPepPhrase = `Hittade tyvärr ingen peppfras med ordet "${searchQuery}". Prova gärna ett annat ord!`; //vad som visas om fras inte finns
    }
    // rensa sökfältet efter sökning för bättre UX
    searchInput.value = "";

  } else {
    // eller använd kategori (Ursprunglig logik)
    const category = categorySelect.value;
    newPepPhrase = getNewPepPhrase(category);
  }

  // Visuell animation (den synkrona logiken behöver ingen is-loading)
  setTimeout(() => {
    pepText.textContent = newPepPhrase;

    // Starta pop-animationen (tar bort och lägger till klassen igen)
    pepCard.classList.remove("pop");
    setTimeout(() => pepCard.classList.add("pop"), 10);
  }, 100);
});


// NY EVENTLYSSNARE för den sekundära "Historisk Pepp"-knappen (API)
apiButton.addEventListener("click", async function () {
  // Använd 'await' för att vänta tills API-anropet är klart
  const newPepPhrase = await fetchApiQuote();

  pepText.textContent = newPepPhrase;

  // Starta pop-animationen
  pepCard.classList.remove("pop");
  setTimeout(() => pepCard.classList.add("pop"), 10);
});
