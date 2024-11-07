// Function to load entries from local storage
function loadEntries() {
    const entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = ''; // Clear previous entries
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    
    entries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";

        const entryContent = document.createElement("textarea");
        entryContent.value = entry;
        entryContent.setAttribute("data-index", index);
        entryContent.readOnly = true;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteEntry(index);

        entryDiv.appendChild(entryContent);
        entryDiv.appendChild(deleteButton);
        entriesDiv.appendChild(entryDiv);
    });
}

// Function to save a new entry
function saveEntry() {
    const entryText = document.getElementById("diary-entry").value;
    if (entryText.trim() === '') return; // Do not save empty entries
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries.push(entryText);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    document.getElementById("diary-entry").value = ''; // Clear textarea
    loadEntries(); // Refresh entries
}

// Function to delete an entry
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("diaryEntries"));
    entries.splice(index, 1); // Remove entry at the specified index
    localStorage.setItem("diaryEntries", JSON.stringify(entries)); // Save updated entries
    loadEntries(); // Refresh entries
}

// Load all entries when the page is loaded
window.onload = loadEntries;
