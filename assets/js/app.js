// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

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

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.obesity)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.income)])
    .range([height, 0]);

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

      var circles = circlesGroup.append("circle")
      .attr("cx", d => xLinearScale(d.obesity))
      .attr("cy", d => yLinearScale(d.income))
      .attr("r", "10")
      .classed("stateCircle", true)

      var text = circlesGroup.append("text")
      .attr("x", d => xLinearScale(d.obesity) - 7)
      .attr("y", d => yLinearScale(d.income) + 3)
      .attr("fill", "white")
      .text(d => d.abbr)
      .style("text-align", "left")
      .style("font-size", "10px")
      .style("font-weight", "bold")

      // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .html(function(d) {
        return (`State: ${d.abbr}<br>Obesity: ${(d.obesity)}<br>Income: $${d.income}
      `);
    });

    // Step 2: Create the tooltip in circles and text.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circles.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d, this);
    });

    // Create mouseover/mouseout for text also
    text.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d, this);
    });

    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - (margin.left / 2) - 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Yearly Income ($)");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("% Obesity");
});