// @TODO: YOUR CODE HERE! http://localhost:8000/

// Load data from csv
(async function(){
    const data = await d3.csv("../data/data.csv").catch(error => console.warn(error));
    console.log(data);
    // log a list of states
    const states = data.map(data => data.state);
    console.log("states", states);

//     // Cast each hours value in tvData as a number using the unary + operator
//     tvData.forEach(function(data) {
//         data.hours = +data.hours;
//         console.log("Name:", data.name);
//         console.log("Hours:", data.hours);
//     });
})()
// data
const
    dataArray = [1, 2, 3],
    dataCategories = ["one", "two", "three"];

// svg container
const 
    svgHeight = 400,
    svgWidth = 1000;

// margins
const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

// chart area minus margins
const chartHeight = svgHeight - margin.top - margin.bottom;
const chartWidth = svgWidth - margin.left - margin.right;

// create svg container
const svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// shift everything over by the margins
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scale y to chart height
const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataArray)])
  .range([chartHeight, 0]);

// scale x to chart width
const xScale = d3.scaleBand()
  .domain(dataCategories)
  .range([0, chartWidth])
  .padding(0.05);

// create axes
const yAxis = d3.axisLeft(yScale);
const xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);

/* Note: The above code is equivalent to this:
    const g = chartGroup.append("g");

    yAxis(g);
*/
// Append Data to chartGroup
chartGroup.selectAll(".scatter")
  .data(dataArray)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("x", (d, i) => xScale(dataCategories[i]))
  .attr("y", d => yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => chartHeight - yScale(d));
