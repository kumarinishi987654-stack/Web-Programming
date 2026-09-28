// ===== 1. BOOK DATA =====
// Each book is an object inside this array. Both pages use this same data.
// Covers come from Open Library (needs internet); if one fails, a placeholder is shown.
const books = [
  {
    id: 1, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction / Adventure",
    year: 1988, isbn: "9780062315007", pages: 208, rating: 4.5, language: "English",
    short: "A young shepherd travels from Spain to Egypt in search of treasure and his destiny.",
    description: "Santiago, a shepherd boy from Andalusia, dreams of a hidden treasure near the Egyptian pyramids. He sets out on a long journey, meeting an alchemist, a merchant and a woman of the desert along the way. Each meeting teaches him to listen to his heart and to read the signs around him.",
    themes: ["Destiny", "Following your dreams", "Self-discovery", "Courage"]
  },
  {
    id: 2, title: "1984", author: "George Orwell", genre: "Dystopian Fiction",
    year: 1949, isbn: "9780451524935", pages: 328, rating: 4.6, language: "English",
    short: "A chilling story of a totalitarian state that watches everything its citizens do.",
    description: "Winston Smith lives in Oceania, where the Party and its leader Big Brother control every part of life, even thought. Working at the Ministry of Truth, he secretly begins to rebel and falls in love with Julia. The novel shows how power, propaganda and surveillance can destroy freedom.",
    themes: ["Surveillance", "Totalitarianism", "Propaganda", "Freedom"]
  },
  {
    id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction",
    year: 1960, isbn: "9780061120084", pages: 336, rating: 4.8, language: "English",
    short: "A young girl learns about justice and prejudice in a small Southern town.",
    description: "Told by Scout Finch, the story follows her father Atticus, a lawyer who defends a Black man falsely accused of a crime in 1930s Alabama. Through the trial and the mystery of their neighbour Boo Radley, Scout and her brother Jem learn about courage, empathy and injustice.",
    themes: ["Racial injustice", "Moral courage", "Childhood", "Empathy"]
  },
  {
    id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance / Classic",
    year: 1813, isbn: "9780141439518", pages: 432, rating: 4.7, language: "English",
    short: "Elizabeth Bennet and Mr. Darcy overcome first impressions in Regency England.",
    description: "Elizabeth Bennet is the second of five sisters whose mother is eager to see them married. When she meets the proud Mr. Darcy, both are quick to judge each other wrongly. As they learn to see past pride and prejudice, the story becomes a witty look at marriage, class and manners.",
    themes: ["Love and marriage", "Social class", "Pride", "Misjudgement"]
  },
  {
    id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic / Fiction",
    year: 1925, isbn: "9780743273565", pages: 180, rating: 4.4, language: "English",
    short: "A mysterious millionaire chases a lost love in the glittering Jazz Age.",
    description: "Narrator Nick Carraway moves next to the wealthy Jay Gatsby on Long Island and watches his extravagant parties. He learns that Gatsby has built his whole life around winning back Daisy Buchanan. The novel explores the American Dream and how money cannot buy the past.",
    themes: ["The American Dream", "Wealth", "Love and loss", "Illusion"]
  },
  {
    id: 6, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy",
    year: 1997, isbn: "9780747532699", pages: 223, rating: 4.7, language: "English",
    short: "An orphan discovers he is a wizard and starts school at Hogwarts.",
    description: "On his eleventh birthday, Harry Potter learns he is a wizard and is invited to Hogwarts School of Witchcraft and Wizardry. There he makes friends with Ron and Hermione and discovers a plot to steal the Philosopher's Stone, which is linked to the dark wizard who killed his parents.",
    themes: ["Friendship", "Good vs evil", "Bravery", "Belonging"]
  },
  {
    id: 7, title: "Atomic Habits", author: "James Clear", genre: "Self-Help",
    year: 2018, isbn: "9780735211292", pages: 320, rating: 4.8, language: "English",
    short: "A practical guide to building good habits and breaking bad ones.",
    description: "James Clear explains that big changes come from small, consistent actions. He presents a simple four-step model of cue, craving, response and reward, and shows how to make good habits obvious, attractive, easy and satisfying. The book is full of real examples and easy tips.",
    themes: ["Habit building", "Self-improvement", "Consistency", "Productivity"]
  },
  {
    id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy / Adventure",
    year: 1937, isbn: "9780547928227", pages: 310, rating: 4.7, language: "English",
    short: "Bilbo Baggins joins a band of dwarves on a quest to reclaim their treasure from a dragon.",
    description: "Bilbo Baggins is a comfortable hobbit who is pulled into an adventure by the wizard Gandalf and thirteen dwarves. Together they travel to the Lonely Mountain to take back treasure guarded by the dragon Smaug. On the way Bilbo finds a magic ring and discovers his own bravery.",
    themes: ["Adventure", "Courage", "Greed", "Personal growth"]
  }
];

// Small SVG picture used if a cover image cannot be loaded
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='450'>" +
  "<rect width='100%' height='100%' fill='#1e2a44'/>" +
  "<text x='50%' y='50%' fill='#f4b942' font-size='28' font-family='Arial' " +
  "text-anchor='middle'>Book Cover</text></svg>"
);

// Builds the cover URL from the ISBN
function coverUrl(book) {
  return "https://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg?default=false";
}

// Builds an <img> tag with alt text and a fallback image
function coverImg(book, cssClass) {
  return `<img class="${cssClass}" src="${coverUrl(book)}"
          alt="Cover of ${book.title} by ${book.author}"
          onerror="this.onerror=null; this.src='${PLACEHOLDER}'">`;
}

// ===== 2. HOME PAGE: show book cards =====
function displayBooks(list) {
  const grid = document.getElementById("bookGrid");
  const noResults = document.getElementById("noResults");
  grid.innerHTML = "";                       // clear old cards

  // Show or hide the "No books found." message
  noResults.hidden = list.length > 0;

  list.forEach(function (book) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="card-img">${coverImg(book, "")}</div>
      <div class="card-body">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <span class="genre">${book.genre}</span>
        <p class="short-desc">${book.short}</p>
        <button class="btn" type="button">View Details</button>
      </div>`;

    // Clicking anywhere on the card (or its button) opens book.html?id=...
    card.addEventListener("click", function () {
      window.location.href = "book.html?id=" + book.id;
    });

    grid.appendChild(card);
  });
}

// ===== 3. SEARCH: filter by title, author or genre =====
function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", function () {
    const term = input.value.trim().toLowerCase();
    const results = books.filter(function (book) {
      return book.title.toLowerCase().includes(term) ||
             book.author.toLowerCase().includes(term) ||
             book.genre.toLowerCase().includes(term);
    });
    displayBooks(results);
  });
}

// ===== 4. DETAILS PAGE: show the selected book =====
function displayBookDetails() {
  const container = document.getElementById("bookDetails");

  // Read ?id=... from the URL (e.g. book.html?id=3 gives "3")
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  // Find the book with the matching id
  const book = books.find(function (b) { return b.id === id; });

  if (!book) {
    container.innerHTML = "<h2>Book not found.</h2><p>Please go back and choose a book from the list.</p>";
    return;
  }

  document.title = "Book Haven | " + book.title;

  const themeItems = book.themes.map(function (t) { return "<li>" + t + "</li>"; }).join("");

  container.innerHTML = `
    <div>${coverImg(book, "details-img")}</div>
    <div>
      <h1>${book.title}</h1>
      <p class="author">by ${book.author}</p>
      <ul class="info-list">
        <li><strong>Genre:</strong> ${book.genre}</li>
        <li><strong>Published:</strong> ${book.year}</li>
        <li><strong>ISBN:</strong> ${book.isbn}</li>
        <li><strong>Pages:</strong> ${book.pages}</li>
        <li><strong>Language:</strong> ${book.language}</li>
        <li><strong>Rating:</strong> ⭐ ${book.rating}/5</li>
      </ul>
      <h3>Description</h3>
      <p>${book.description}</p>
      <h3>Main Themes</h3>
      <ul class="themes">${themeItems}</ul>
    </div>`;
}

// ===== 5. BACK BUTTON =====
// The button is a normal link to index.html#books, so it works without extra code.
// If you would rather use JavaScript, uncomment this:
// document.getElementById("backBtn").addEventListener("click", function (e) {
//   e.preventDefault();
//   window.location.href = "index.html";
// });

// ===== 6. START: decide which page we are on =====
if (document.getElementById("bookGrid")) {        // Home page
  displayBooks(books);
  setupSearch();
}
if (document.getElementById("bookDetails")) {     // Details page
  displayBookDetails();
}
