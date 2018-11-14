// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data) {

  console.log(data);
  
    data.forEach(d => {
        d.income = +d.income;
        d.obesity = +d.obesity;
    });
    console.log("print1");

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.obesity)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.income)])
    .range([height, 0]);

    console.log("print2");

     // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // Add x-axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.obesity))
      .attr("cy", d => yLinearScale(d.income))
      .attr("r", "10")
      .attr("fill", "blue")
      .attr("stroke-width", "1")
      .attr("stroke", "black");

    var abbrGroup = chartGroup.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.obesity) - 3)
      .attr("y", d => yLinearScale(d.income) + 2)
      .attr("fill", "white")
      .text(d => d.abbr)
      .style("text-align", "left")
      .style("font-size", "10px")
});