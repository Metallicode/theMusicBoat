$(function () {

    var frequencyData = new Uint8Array(200);

    var svgHeight = '300';
    var svgWidth = '900';
    var barPadding = '1';

    function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg('#Visoalizer', svgHeight, svgWidth);

    // Create our initial D3 chart.
    svg.selectAll('rect')
       .data(frequencyData)
       .enter()
       .append('rect')
       .attr('x', function (d, i) {
           return i * (svgWidth / frequencyData.length);
       })
       .attr('width', svgWidth / frequencyData.length - barPadding);

    function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
           .data(frequencyData)
           .attr('y', function (d) {
               return svgHeight - d;
           })
           .attr('height', function (d) {
               return d;
           })
           .attr('fill', function (d) {
               return 'rgb(0, 0, ' + d*10 + ')';
           });
      
    }

    // Run the loop
    renderChart();
});