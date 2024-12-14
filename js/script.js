// Skills chart
function createSkillsChart(skills, chartContainer) {
    // Constants for the chart layout
    const width = 450;
    const height = 200;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 100;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Scales for the chart
    const x = d3.scaleLinear()
        .domain([0, 100])  // Percentage goes from 0 to 100
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
        .domain(skills.map(d => d.title))  // Using skill title for y-axis
        .range([marginTop, height - marginBottom])
        .padding(0.1);

    // Create the SVG element
    const svg = d3.select(chartContainer).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each skill.
    svg.append("g")
        .attr("fill", "steelblue")
    .selectAll()
    .data(skills)
    .join("rect")
        .attr("x", marginLeft)  // Set x to the left margin
        .attr("y", (d) => y(d.title))  // Position the bars on the y-axis
        .attr("width", (d) => x(d.percentage) - marginLeft)  // Set width based on percentage
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => colorScale(i));  // Set height to band height

    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(5));

    // Add the y-axis and label (for skills)
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start"));
}

// Projects grid
const populateGrid = (projects) => {
    const gridContainer = document.getElementById("projects-grid");
    let delay = 150;
    projects.forEach((project, index) => {
        // Create grid item
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        // Add transition delay style
        gridItem.style.transitionDelay = `${delay * index}ms`;

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

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.grid-item').forEach((item) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, parseInt(item.style.transitionDelay));
            });
        } else 
        {
            //dont show after loaded once, load each time the user is scrolling on page
            document.querySelectorAll('.grid-item').forEach((item) => {
                setTimeout(() => {
                    item.classList.remove('visible');
                }, parseInt(item.style.transitionDelay));
            });
        }
    });
}, { threshold: 0.2 }); // Trigger when at least 20% of the section is visible

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.skills-item').forEach((item) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, parseInt(item.style.transitionDelay));
            });
        } else 
        {
            //dont show after loaded once, load each time the user is scrolling on page
            document.querySelectorAll('.skills-item').forEach((item) => {
                setTimeout(() => {
                    item.classList.remove('visible');
                }, parseInt(item.style.transitionDelay));
            });
        }
    });
}, { threshold: 0.2 }); 

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el => observer.observe(el)));

const projectGrid = document.getElementById('projects-grid');
populateGrid(projects);
projectsObserver.observe(projectGrid);

const skillsGrid = document.getElementById('skills');
createSkillsChart(languages, '.chart-container-languages');  
createSkillsChart(frameworks, '.chart-container-frameworks');  
createSkillsChart(databases, '.chart-container-databases'); 
skillsObserver.observe(skillsGrid);