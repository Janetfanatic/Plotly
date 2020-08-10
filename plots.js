function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  })
}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildBarcharts(newSample);
  buildBubblecharts(newSample);
  buildGaugecharts(newSample);
}

optionChanged(940)



function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(`id: ${result.id}`);
    PANEL.append("h6").text(`ethnicity: ${result.ethnicity}`);
    PANEL.append("h6").text(`gender: ${result.gender}`);
    PANEL.append("h6").text(`age: ${result.age}`);
    PANEL.append("h6").text(`location: ${result.location}`);
    PANEL.append("h6").text(`bbtype: ${result.bbtype}`);
    PANEL.append("h6").text(`wfreq: ${result.wfreq}`);
  });
}

// Retrieve Data for bar Graph
function buildBarcharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = samplesArray[0];

    var culture_values = result.sample_values.slice(0,10).reverse();
    var culture_ids = result.otu_ids.slice(0,10).reverse();
    culture_ids = culture_ids.map(id => `OTU ${id}`);
    var culture_labels = result.otu_labels.slice(0,10).reverse();
    

    console.log(samples);
    console.log(samplesArray);
    console.log(result);
    console.log(culture_values);

    d3.select("#bar");
  
    
    // Trace1 for the Bar Graph
    var trace1 = {
      x: culture_values,
      y: culture_ids,
      text: culture_labels,
      name: "Top 10 Bacterial Species",
      type: "bar",
      orientation: "h",
      marker: {
        color: 'indianred',
      }
    };
    
    // data
    var data = [trace1];
    
    // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 Bacterial Species", font: {color: "maroon", size: 14},
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      paper_bgcolor: "linen",
    };
    
    // Render the plot to the div tag with id 
    Plotly.newPlot("bar", data, layout);

  });
}


//  Bubble Chart
// / Retrieve Data for Bubble Chart
function buildBubblecharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = samplesArray[0];

    var culture_values = result.sample_values;
    var culture_ids = result.otu_ids;
    // culture_ids = culture_ids.map(id => `OTU ${id}`);
    var culture_labels = result.otu_labels;
  
    

    console.log(samples);
    console.log(samplesArray);
    console.log(result);
    console.log(culture_values);

    d3.select("#bubble");
  
    
    // Trace1 for the Bubble Chart
    
    var trace1 = {
      x: culture_ids,
      y: culture_values,
      text: culture_labels,
      mode: 'markers',
      marker: {
        color: culture_ids,
        colorscale: 'YlOrRd',
        size: culture_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: { text: "Belly Button Bacteria", font: {color: "maroon", family: "Arial", size:24}},
      xaxis: { title: { text: 'OTU ID', font: { family: 'Arial', size: 18, color: 'maroon'}}, },
      paper_bgcolor: "linen",
      showlegend: false,
      height: 600,
      width: 1200
    };
    
     // Render the plot to the div tag with id 
    Plotly.newPlot("bubble", data, layout);

  });
}


// Gague Chart
function buildGaugecharts(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    var washFrequency = result.wfreq
    console.log(washFrequency)

    d3.select("#gauge")
  var data = [
  {
    domain: { x: [0, washFrequency], y: [0, washFrequency] },
    value: washFrequency,
    title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: {color: "maroon", size:24 }},
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 10 },
    gauge: {
      axis: { range: [null, 10] },
      bar: { color: "black" },
      steps: [
        { range: [0, 1], color: "lemonchiffon" },
        { range: [1, 2], color: "papayawhip" },
        { range: [2, 3], color: "moccasin" },
        { range: [3, 4], color: "peachpuff" },
        { range: [4, 5], color: "lightsalmon" },
        { range: [5, 6], color: "salmon"} ,
        { range: [6, 7], color: "coral" },
        { range: [7, 8], color: "tomato" },
        { range: [8, 9], color: "indianred" },
        { range: [9, 10], color: "orangered" },        
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 10
      }
    }
  }
];

var layout = { 
  width: 600, 
  height: 450, 
  margin: { t: 0, b: 0 },
  paper_bgcolor: "linen",}
  ;
Plotly.newPlot('gauge', data, layout);

});
}
