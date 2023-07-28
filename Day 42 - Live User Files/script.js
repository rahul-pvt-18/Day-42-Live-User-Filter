// Get references to the HTML elements
const result = document.getElementById('result'); // Reference to the element with ID 'result'
const filter = document.getElementById('filter'); // Reference to the element with ID 'filter'
const listItems = []; // An array to store the list items
// Call the 'getData' function to fetch data and populate the list
getData();

// Add an event listener to the 'filter' input field to handle filtering
filter.addEventListener('input', (e) => filterData(e.target.value));

// Function to fetch data from the API and populate the list
async function getData() {
    // Fetch data from the API
    const res = await fetch('https://randomuser.me/api?results=60');
    const { results } = await res.json();

    // Clear the content inside the 'result' element
    result.innerHTML = '';

    // Loop through the API results and create list items for each user
    results.forEach(user => {
        const li = document.createElement('li'); // Create a new list item
        listItems.push(li); // Add the list item to the 'listItems' array
        li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>
        `;
        result.appendChild(li); // Add the list item to the 'result' element
    });
}

// Function to filter the list based on the search term
function filterData(searchTerm) {
    listItems.forEach(item => {
        // Get the user name from the list item and convert it to lowercase
        const userName = item.querySelector('.user-info h4').innerText.toLowerCase();
        // Check if the search term is present in the user name (case-insensitive)
        if (userName.includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide'); // Show the list item
        } else {
            item.classList.add('hide'); // Hide the list item
        }
    });
}

