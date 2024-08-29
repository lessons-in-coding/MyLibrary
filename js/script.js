document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("bookList");
  const fileDisplay = document.getElementById("fileDisplay");
  const MAX_FILES = 2;

  const folderStructure = {
    မူလတန်း: {
      Grammar: ["lesson.html", "recording.html", "quiz.html"],
      Sangaha: ["သင်္ဂြိုဟ်.html", "ညဝါ.html", "recording.html", "quiz.html"],
      Readings: ["lesson.html", "recording.html", "quiz.html"],
    },
    သီလက္ခန်: {
      book2a: ["lesson.html", "recording.html", "quiz.html"],
      book2b: ["lesson.html", "recording.html", "quiz.html"],
    },
    ပထမဆင့်: {
      Grammar: ["lesson.html", "recording.html", "quiz.html"],
      Sangaha: ["သင်္ဂြိုဟ်.html", "ညဝါ.html", "recording.html", "quiz.html"],
      ဓမ္မပဒ: ["lesson.html", "recording.html", "quiz.html"],
      အင်္ဂုတ္တိုရ်: ["lesson.html", "recording.html", "quiz.html"],
      မဟာဝါ: ["lesson.html", "recording.html", "quiz.html"],
    },
    Front_End: {
      M01_HTML_CSS_Git: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Module-Project.html",
        "09-Recordings.html",
        "10-Quiz.html",
      ],
      M02_Advanced_CSS: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Module-Project.html",
        "09-Recordings.html",
        "10-Quiz.html",
      ],
      M03_JavaScript: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Algorithms.html",
        "09-Module-Project.html",
        "10-Recordings.html",
        "11-Quiz.html",
      ],
      M04_Web_APIs: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Algorithms.html",
        "09-Module-Project.html",
        "10-Recordings.html",
        "11-Quiz.html",
      ],
      M05_Third_Party_APIs: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Algorithms.html",
        "09-Module-Project.html",
        "10-Recordings.html",
        "11-Quiz.html",
      ],
      M06_Server_Side_APIs: [
        "01-HTML.html",
        "02-Attributes.html",
        "03-CSS-Selectors.html",
        "04-Box-Model.html",
        "05-CSS-Positioning.html",
        "06-Git-Guide.html",
        "07-Challenge.html",
        "08-Algorithms.html",
        "09-Module-Project.html",
        "10-Recordings.html",
        "11-Quiz.html",
      ],
      M07_Final_Project: [
        "projectName.html",
        "projectRecording.html",
        "projectQuiz.html",
      ],
    },
    PannaCollege: {
      PannaCollege: ["သံဃာစာရင်း.html"],
    },
  };

  function loadBooks() {
    Object.keys(folderStructure).forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "book";
      bookElement.style.color = "darkblue"; // Set color for folders
      bookElement.style.fontSize = "20px"; // Set largest font size for folders
      bookElement.textContent = book;
      bookElement.addEventListener("click", () =>
        toggleFolders(book, bookElement)
      );
      bookList.appendChild(bookElement);
    });
  }

  function toggleFolders(book, bookElement) {
    clearDisplay(); // Clear previous files when a new folder is clicked

    if (bookElement.classList.contains("active")) {
      bookElement.classList.remove("active");
      Array.from(bookElement.nextElementSibling.children).forEach((child) =>
        child.remove()
      );
    } else {
      closeAllFolders(); // Close other folders before opening a new one
      bookElement.classList.add("active");
      const folders = folderStructure[book];
      const folderList = document.createElement("div");
      folderList.className = "folder-list";

      Object.keys(folders).forEach((folder) => {
        const folderElement = document.createElement("div");
        folderElement.className = "folder";
        folderElement.style.color = "darkgreen"; // Set color for subfolders
        folderElement.style.fontSize = "16px"; // Set smaller font size for subfolders
        folderElement.textContent = folder;
        folderElement.addEventListener("click", () =>
          toggleFiles(book, folder, folderElement)
        );
        folderList.appendChild(folderElement);
      });

      bookElement.insertAdjacentElement("afterend", folderList);
    }
  }

  function closeAllFolders() {
    const activeFolders = document.querySelectorAll(".book.active");
    activeFolders.forEach((folder) => {
      folder.classList.remove("active");
      if (folder.nextElementSibling) {
        folder.nextElementSibling.remove();
      }
    });
    clearDisplay();
  }

  function toggleFiles(book, folder, folderElement) {
    clearDisplay(); // Clear previous files when a new subfolder is clicked

    if (folderElement.classList.contains("active")) {
      folderElement.classList.remove("active");
      Array.from(folderElement.nextElementSibling.children).forEach((child) =>
        child.remove()
      );
    } else {
      closeAllSubfolders(); // Close other subfolders before opening a new one
      folderElement.classList.add("active");
      const files = folderStructure[book][folder];
      const fileList = document.createElement("div");
      fileList.className = "file-list";

      files.forEach((file) => {
        const fileName = getFileNameWithoutExtension(file);
        const fileElement = document.createElement("div");
        fileElement.className = "file";
        fileElement.style.color = "gray"; // Set color for files
        fileElement.textContent = fileName;
        fileElement.addEventListener("click", () =>
          loadFile(book, folder, file)
        );
        fileList.appendChild(fileElement);
      });

      folderElement.insertAdjacentElement("afterend", fileList);
    }
  }

  function closeAllSubfolders() {
    const activeSubfolders = document.querySelectorAll(".folder.active");
    activeSubfolders.forEach((subfolder) => {
      subfolder.classList.remove("active");
      if (subfolder.nextElementSibling) {
        subfolder.nextElementSibling.remove();
      }
    });
    clearDisplay();
  }

  function loadFile(book, folder, file) {
    if (fileDisplay.children.length >= MAX_FILES) {
      // Remove the oldest file (first opened)
      fileDisplay.firstChild.remove();
    }

    // Adjust the file path to correctly point to the file
    const filePath = `books/${book}/${folder}/${file}`;
    const iframe = document.createElement("iframe");
    iframe.src = filePath;
    iframe.style.width = "100%";
    iframe.style.border = "none"; // Remove border if present
    iframe.style.height = "100vh"; // Adjust height for each file

    const container = document.createElement("div");
    container.className = "file-container";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.className = "close-btn";
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      container.remove();
    });

    // Set up iframe load event to adjust height dynamically
    iframe.addEventListener("load", () => {
      const iframeContentHeight =
        iframe.contentWindow.document.documentElement.scrollHeight;
      iframe.style.height = iframeContentHeight + "px";
    });
    /*
    	•	iframe.addEventListener("load", ...): This event listener waits for the iframe content to load fully, then calculates the content height using scrollHeight and sets the iframe height accordingly. This ensures that each iframe will expand or contract based on its content, eliminating the need for a scroll bar.
    */

    // Append close button and iframe to container
    container.appendChild(closeButton);
    container.appendChild(iframe);
    fileDisplay.appendChild(container);
  }

  function getFileNameWithoutExtension(fileName) {
    return fileName.split(".").slice(0, -1).join("."); // Remove file extension
  }

  function clearDisplay() {
    while (fileDisplay.firstChild) {
      fileDisplay.firstChild.remove();
    }
  }

  loadBooks();
});

/*
// Render
// Function to render the book list
function renderBookList() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  for (const book in folderStructure) {
    for (const folder in folderStructure[book]) {
      const files = folderStructure[book][folder];

      files.forEach((file) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.style.padding = "5px 0";
        bookItem.style.cursor = "pointer";
        bookItem.textContent = `${book} / ${folder} / ${file}`;
        bookItem.addEventListener("click", () => openFile(book, folder, file));
        bookList.appendChild(bookItem);
      });
    }
  }
}

// Function to open a file in the iframe
function openFile(book, folder, file) {
  const fileFrame = document.getElementById("fileFrame");

  // Correct file path format
  const filePath = `books/${book}/${folder}/${file}`;
  fileFrame.src = filePath;
}

// Function to handle search input
function handleSearch() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const fileDisplay = document.getElementById("fileDisplay");
  fileDisplay.innerHTML = "";

  let searchResults = [];

  // Iterate through the folder structure to find matches
  for (const book in folderStructure) {
    for (const folder in folderStructure[book]) {
      const files = folderStructure[book][folder];

      files.forEach((file) => {
        // Check if the search term matches the book, folder, or file name
        if (
          book.toLowerCase().includes(searchTerm) ||
          folder.toLowerCase().includes(searchTerm) ||
          file.toLowerCase().includes(searchTerm)
        ) {
          searchResults.push({ book, folder, file });
        }
      });
    }
  }

  // Display search results
  if (searchResults.length > 0) {
    searchResults.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("search-result-item");
      resultItem.style.padding = "5px 0";
      resultItem.style.cursor = "pointer";
      resultItem.textContent = `${result.book} / ${result.folder} / ${result.file}`;
      resultItem.addEventListener("click", () =>
        openFile(result.book, result.folder, result.file)
      );
      fileDisplay.appendChild(resultItem);
    });
  } else {
    fileDisplay.textContent = "No results found.";
  }

  // Clear the search input after performing the search
  document.getElementById("searchInput").value = "";
}

// Attach event listeners
document.getElementById("searchBtn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default button behavior
  handleSearch();
});

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default Enter key behavior
    handleSearch();
  }
});

// Render the full book list initially
renderBookList();
*/
