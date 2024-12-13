// Function to populate the grid
const populateGrid = (projects) => {
    const gridContainer = document.getElementById("projectGrid");

    projects.forEach(project => {
        // Create grid item
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        // Add project title
        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.title;

        // Add project description
        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;

        // Append title and description to grid item
        gridItem.appendChild(projectTitle);
        gridItem.appendChild(projectDescription);

        // Append grid item to grid container
        gridContainer.appendChild(gridItem);
    });
};

// Populate the grid with projects from the data.js file
populateGrid(projects);
