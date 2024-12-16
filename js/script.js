// Skills chart
function createSkillsChart(skills, chartContainer) {
    // Calculate dimensions dynamically based on content
    const longestLabel = skills.reduce((longest, skill) => skill.title.length > longest.length ? skill.title : longest, "");
    const labelWidth = longestLabel.length * 8; 
    const width = Math.max(500, labelWidth + 100); 
    const height = skills.length * 40 + 50; 
    const marginTop = 10;
    const marginRight = 20;
    const marginBottom = 40;
    const marginLeft = labelWidth + 20; 

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Scales for the chart
    const x = d3.scaleLinear()
        .domain([0, 100]) // Percentage goes from 0 to 100
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
        .domain(skills.map(d => d.title)) // Using skill title for y-axis
        .range([marginTop, height - marginBottom])
        .padding(0.3); // Add padding between bars

    // Create the SVG element
    const svg = d3.select(chartContainer).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMin meet");

    // Add a rect for each skill
    svg.append("g")
        .selectAll("rect")
        .data(skills)
        .join("rect")
        .attr("x", marginLeft)
        .attr("y", (d) => y(d.title))
        .attr("width", (d) => x(d.percentage) - marginLeft)
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => colorScale(i));

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

    // Add the y-axis
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call(g => g.selectAll("text")
            .style("font-size", "8px") // Ensure labels are large enough
            .attr("dy", "0.35em") // Center text vertically
            .attr("dx", "-0.5em")); // Add space between labels and axis
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
        }
    });
}, { threshold: 0.1 }); 

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.skills-item').forEach((item) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, parseInt(item.style.transitionDelay));
            });
        } 
    });
}, { threshold: 0.1 }); 

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

function cvPdfCreate() {
    var element = document.getElementById('cv');
    html2pdf(element);
}

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el => observer.observe(el)));

const projectGrid = document.getElementById('projects-grid');
populateGrid(projects);
projectsObserver.observe(projectGrid);

createSkillsChart(languages, '.chart-container-languages');  
createSkillsChart(frameworks, '.chart-container-frameworks');  
createSkillsChart(databases, '.chart-container-databases'); 
const skillsGrid = document.getElementById('skills-grid');
skillsObserver.observe(skillsGrid);

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }