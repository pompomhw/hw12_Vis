function draw_gauge(data){  
var level = data*20-5;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

console.log(data)

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [
   {type: 'scatter',
    x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'scrubs',
    // text: level
    },

    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3','1-2','0-1',''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:[  'rgba(14, 127, 0, .5)', 'rgba(49, 163, 84, .5)','rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)','rgba(202, 190, 95, .5)',
                         'rgba(210, 206, 145, .5)','rgba(225, 216, 222, .5)',
                         'rgba(230, 235, 220, 0.5)',
                         'rgba(247, 242, 185, .5)','rgba(255, 255, 255, 0)']},
      hole: .5,
      type: 'pie',
      showlegend: false
      }
    ];

var layout = {
    shapes:[
    { type: 'path',
      path: path,
      fillcolor: '850000',
      line: {color: '850000'}
    }
    ],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 700,
    width: 700,
    xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };

Plotly.newPlot('gauge', data, layout);

}