document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("bookList");
  const fileDisplay = document.getElementById("fileDisplay");
  const MAX_FILES = 2;

  const folderStructure = {
    Pali_Primary: {
      Grammar: ["lesson.html", "recording.html", "quiz.html"],
      Lessons: ["lesson.html", "recording.html", "quiz.html"],
      Readings: ["lesson.html", "recording.html", "quiz.html"],
    },
    Book2: {
      book2a: ["lesson.html", "recording.html", "quiz.html"],
      book2b: ["lesson.html", "recording.html", "quiz.html"],
    },
    Book3: {
      book3a: ["lesson.html", "recording.html", "quiz.html"],
      book3b: ["lesson.html", "recording.html", "quiz.html"],
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
document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("bookList");
  const fileDisplay = document.getElementById("fileDisplay");
  const MAX_FILES = 2;

  // const folderStructure = {
  //   Book1: {
  //     book1a: ["lesson.html", "recording.html", "quiz.html"],
  //     book1b: ["lesson.html", "recording.html", "quiz.html"],
  //   },
  //   Book2: {
  //     book2a: ["lesson.html", "recording.html", "quiz.html"],
  //     book2b: ["lesson.html", "recording.html", "quiz.html"],
  //   },
  //   Book3: {
  //     book2a: ["lesson.html", "recording.html", "quiz.html"],
  //     book2b: ["lesson.html", "recording.html", "quiz.html"],
  //   }
  // };

  const folderStructure = {
    Pali_Primary: {
      Grammar: ["lesson.html", "recording.html", "quiz.html"],
      Lessons: ["lesson.html", "recording.html", "quiz.html"],
    },
    Book2: {
      book2a: ["lesson.html", "recording.html", "quiz.html"],
      book2b: ["lesson.html", "recording.html", "quiz.html"],
    },
    Book3: {
      book3a: ["lesson.html", "recording.html", "quiz.html"],
      book3b: ["lesson.html", "recording.html", "quiz.html"],
    }
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

  // function loadFile(book, folder, file) {
  //   if (fileDisplay.children.length >= MAX_FILES) {
  //     // Remove the oldest file (first opened)
  //     fileDisplay.firstChild.remove();
  //   }

  //   const filePath = `books/${book}/${folder}/${file}`;
  //   const iframe = document.createElement("iframe");
  //   iframe.src = filePath;
  //   iframe.style.width = "100%";
  //   iframe.style.height = "65vh"; // Adjust height for each file

  //   const container = document.createElement("div");
  //   container.className = "file-container";

  //   // Create close button
  //   const closeButton = document.createElement("button");
  //   closeButton.className = "close-btn";
  //   closeButton.textContent = "X";
  //   closeButton.addEventListener("click", () => {
  //     container.remove();
  //   });

  //   // Append close button and iframe to container
  //   container.appendChild(closeButton);
  //   container.appendChild(iframe);
  //   fileDisplay.appendChild(container);
  // }

  function loadFile(book, folder, file) {
    // Construct the correct file path
    const filePath = `/${book}/${folder}/${file}`;

    const iframe = document.createElement("iframe");
    iframe.src = filePath;
    iframe.style.width = "100%";
    iframe.style.height = "65vh"; // Adjust height for each file

    const container = document.createElement("div");
    container.className = "file-container";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.className = "close-btn";
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
        container.remove();
    });

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
*/
