function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
    var url=`/metadata/${sample}`
    d3.json(url).then (function(data) {
      console.log(data);
  
      var selector = d3.select("#sample-metadata");
      selector.html("");
      Object.entries(data).forEach(([key,value]) => {
        selector.append("tbody").append("tr").append("td").text(`${key}: ${value}`);
      });

      draw_gauge(data.WFREQ);
      console.log(data[WREQ])
    });
  }
  

  function buildCharts(sample) {

    // prep data for bubble chart & pie chart
    var url=`/samples/${sample}`
    d3.json(url).then ( function(data1) {
      console.log(data1);
      var ids=data1['otu_ids'];
      var val=data1['sample_values'];
      var labs=data1['otu_labels'];

    //-------------------------------------
    //   draw a bubble chart
    // ------------------------------------
      var trace1 = {
          x: ids, 
          y: val, 
          mode: 'markers', 
          text: labs,
          marker: {size:val, color:ids}
          }
      var bubble_data = [trace1];
      var layout = {
        xaxis: {title: "OTU ID"},
      };
      Plotly.newPlot('bubble', bubble_data, layout);

    //-----------------------------------------
    // draw a Pie chart
    // ----------------------------------------
      var data2=[];
      for (var i = 0; i < 80; i++) {
          data2.push({otu_ids:ids[i], otu_labels:labs[i], sample_values:val[i]})
        };
      data2.sort((a,b)=>b.sample_values-a.sample_values); 
      data3=data2.slice(0,10);
      var trace2={
        labels:  data3.map(row=>row.otu_ids),
        values: data3.map(row=>row.sample_values), 
        hovertext: data3.map(row=>row.otu_labels),
        type:"pie"
        };

      var pie_data=[trace2];
      Plotly.newPlot('pie', pie_data);

   });
  }

  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
 function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  