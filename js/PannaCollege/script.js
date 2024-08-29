console.log("Hello Everyone!");
let users = JSON.parse(localStorage.getItem("users")) || []; // Load users from localStorage
let editingIndex = -1; // Track the index of the user being edited

// Function to display user details in the form
function displayUserDetails(user) {
  document.getElementById("userFormSection").classList.remove("hidden");
  document.getElementById("name").value = user.name || "";
  document.getElementById("dob").value = user.dob || "";
  document.getElementById("birthPlace").value = user.birthPlace || "";
  document.getElementById("id").value = user.id || "";
  document.getElementById("fatherName").value = user.fatherName || "";
  document.getElementById("motherName").value = user.motherName || "";
  document.getElementById("highestEducation").value =
    user.highestEducation || "";
  document.getElementById("certifications").value = user.certifications || "";
  document.getElementById("projects").value = user.projects || "";
  document.getElementById("skills").value = user.skills || "";
  document.getElementById("previousPlaces").value = user.previousPlaces || "";
  document.getElementById("newPlace").value = user.newPlace || "";
  document.getElementById("arrivalDate").value = user.arrivalDate || "";
  document.getElementById("reason").value = user.reason || "";
  document.getElementById("currentPosition").value = user.currentPosition || "";
  document.getElementById("previousPositions").value =
    user.previousPositions || "";
  document.getElementById("higherOrdination").value =
    user.higherOrdination || "";
  document.getElementById("noviceOrdination").value =
    user.noviceOrdination || "";
  document.getElementById("instructorName").value = user.instructorName || "";
  document.getElementById("supervisorName").value = user.supervisorName || "";
  document.getElementById("ordinationPlace").value = user.ordinationPlace || "";
  document.getElementById("supportedMonks").value = user.supportedMonks || "";
  document.getElementById("monkhoodTime").value = user.monkhoodTime || "";
  document.getElementById("supporterNames").value = user.supporterNames || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("phone").value = user.phone || "";
  document.getElementById("github").value = user.github || "";
  document.getElementById("socialRate").value = user.socialRate || "";
  document.getElementById("userImage").value = user.userImage || "";
}

// Function to clear the form fields
function clearForm() {
  document.getElementById("userForm").reset(); // Clear the form inputs
}

// Function to delete a user after confirmation
function confirmDeleteUser(index) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    deleteUser(index);
  }
}

// Function to delete a user
function deleteUser(index) {
  users.splice(index, 1);
  updateLocalStorage();
  renderUserList();
  hideForm(); // Hide the form after deletion if it is visible
}

// Function to edit a user
function editUser(index) {
  const user = users[index];
  displayUserDetails(user);
  editingIndex = index; // Set the index of the user being edited
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const updatedUser = {
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    birthPlace: document.getElementById("birthPlace").value,
    id: document.getElementById("id").value,
    fatherName: document.getElementById("fatherName").value,
    motherName: document.getElementById("motherName").value,
    highestEducation: document.getElementById("highestEducation").value,
    certifications: document.getElementById("certifications").value,
    projects: document.getElementById("projects").value,
    skills: document.getElementById("skills").value,
    previousPlaces: document.getElementById("previousPlaces").value,
    newPlace: document.getElementById("newPlace").value,
    arrivalDate: document.getElementById("arrivalDate").value,
    reason: document.getElementById("reason").value,
    currentPosition: document.getElementById("currentPosition").value,
    previousPositions: document.getElementById("previousPositions").value,
    higherOrdination: document.getElementById("higherOrdination").value,
    noviceOrdination: document.getElementById("noviceOrdination").value,
    instructorName: document.getElementById("instructorName").value,
    supervisorName: document.getElementById("supervisorName").value,
    ordinationPlace: document.getElementById("ordinationPlace").value,
    supportedMonks: document.getElementById("supportedMonks").value,
    monkhoodTime: document.getElementById("monkhoodTime").value,
    supporterNames: document.getElementById("supporterNames").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    github: document.getElementById("github").value,
    socialRate: document.getElementById("socialRate").value,
    userImage: document.getElementById("userImage").value,
  };

  if (editingIndex !== -1) {
    users[editingIndex] = updatedUser; // Update the existing user
    editingIndex = -1; // Reset the editing index
  } else {
    users.unshift(updatedUser); // Add a new user to the beginning of the array
  }

  updateLocalStorage();
  renderUserList(); // Re-render the user list with updated information
  hideForm(); // Hide the form after submission
}

// Function to show the form for adding a new user
function showAddUserForm() {
  clearForm(); // Clear any existing data in the form
  editingIndex = -1; // Reset the editing index to -1
  document.getElementById("userFormSection").classList.remove("hidden"); // Show the form
}

// Function to hide the form
function hideForm() {
  document.getElementById("userFormSection").classList.add("hidden"); // Hide the form
}

// Function to update localStorage with current user data
function updateLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Attach form submission event listener
document.getElementById("userForm").addEventListener("submit", handleSubmit);

// Attach click event to "Add User" button
document
  .getElementById("addUserBtn")
  .addEventListener("click", showAddUserForm);

// Attach click event to "Cancel" button
document.getElementById("cancelBtn").addEventListener("click", hideForm);

// Function to render the user list with optional search filter
function renderUserList(searchTerm = "") {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  // Convert search term to lowercase for case-insensitive search
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredUsers = users.filter((user) => {
    // Check if the search term matches any part of the user's data
    return (
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.dob.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.birthPlace.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Render the filtered or all users in reverse order (LIFO)
  filteredUsers.forEach((user, index) => {
    const li = document.createElement("li");
    li.classList.add("user-item");
    li.innerHTML = `
      <span>${user.name}</span>
      <div class="user-actions">
        <button class="edit-btn" onclick="editUser(${index})">Edit</button>
        <button class="delete-btn" onclick="confirmDeleteUser(${index})">Delete</button>
      </div>
    `;
    li.addEventListener("click", () => displayUserDetails(user)); // Show user details on click
    userList.appendChild(li);
  });
}

// Function to handle search input
function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  renderUserList(searchTerm);
}

// Attach event listeners
document.getElementById("searchBtn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  handleSearch();
});

document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    handleSearch();
  }
});

// Render the user list initially in LIFO order
renderUserList();
