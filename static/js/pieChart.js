// https://bl.ocks.org/mbostock/1346410
// https://bl.ocks.org/adamjanes/5e53cfa2ef3d3f05828020315a3ba18c/22619fa86de2045b6eeb4060e747c5076569ec47

// var pieChartColor = ["#111d5e","#b21f66","#fe346e","#ffbd69"]
            
function rederPieChart(data){

    let svgWidth = 350;
    let svgHeight = 350;

    let margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    // let data = [
    //         {"year": 2018, "count": 100},
    //         {"year": 2019, "count": 50}
    //     ]
    

    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let radius = Math.min(width, height) / 2;

    //Mouseover tip
    var tip = d3.tip()
                .attr('class', 'd3-tip-pie')
                .offset([80, 40])
                .html(function (d) {
                    var str = "" + d.data.accCounts + " (" + d.data.percentage + "%)";
                        str += "<br><strong> Accident Year: " + d.data.time + "</strong>";
                    return str;
                });


    let dataname = "Time"
    let pieChartColor = []
    let cnt = 0;
    data.map(function (d) {    
        let myJson = {}    
          // myJson[dataname] = d + "~" + desc[cnt];            
          myJson[dataname] = d.child;        
          myJson["Color"] = _dashboard.segColor(d.time, cnt, dataname);      
          pieChartColor.push(myJson.Color);
          cnt++;
      })  

    let color = d3.scaleOrdinal(pieChartColor);

    let arc = d3.arc()
                    .innerRadius(radius - 95)
                    .outerRadius(radius - 50);    

    const pie = d3.pie()
                    .value(d => d.accCounts)
                    .sort(null);

    function arcTween(a) {
                    const i = d3.interpolate(this._current, a);
                    this._current = i(1);
                    return (t) => arc(i(t));
                }


    // d3.select("#accTimePie").selectAll("svg").remove();

    const svg = d3.select("#accTimePie")
                    .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                    .append("g")
                        .attr("transform", `translate(${width / 2.7}, ${height / 2})`);
    svg.call(tip);            

    function update() {
                // Join new data                
            const path = svg.selectAll("path")
                            .data(pie(data));

            // Update existing arcs
            path.transition().duration(200).attrTween("d", arcTween);

            // Enter new arcs
            path.enter().append("path")
                        .attr("fill", (d, i) => color(i))
                        .attr("d", arc)
                        .attr("stroke", "white")
                        .attr("stroke-width", "1px")
                        .each(function(d) { this._current = d; })
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
    }//end of update            

    update()
}

//to update data.. created a seperate function.
function updatePieChart(data){

    let svgWidth = 350;
    let svgHeight = 350;

    let margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let radius = Math.min(width, height) / 2;

    //Mouseover tip
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([80, 40])
                .html(function (d) {
                    var str = "" + d.data.accCounts + " (" + d.data.percentage + "%)";
                    str += "<br><strong>Time: " + d.data.time + "</strong>";
                    return str;
                });

    let pieChartColor = []
    let cnt = 0;
    let dataname = "Time"
    data.map(function (d) {    
        let myJson = {}    
          // myJson[dataname] = d + "~" + desc[cnt];  
          console.log("Inside update of pie...")
          console.log(d.child)
          myJson[dataname] = d.child;        
          myJson["Color"] = _dashboard.segColor(d.time, cnt, dataname);      
          pieChartColor.push(myJson.Color);
          cnt++;
      })  

    let color = d3.scaleOrdinal(pieChartColor);

    let arc = d3.arc()
                    .innerRadius(radius - 95)
                    .outerRadius(radius - 50);

    const pie = d3.pie()
                    .value(d => d.accCounts)
                    .sort(null);

    function arcTween(a) {
                    const i = d3.interpolate(this._current, a);
                    this._current = i(1);
                    return (t) => arc(i(t));
                }

    const svg = d3.select("#accTimePie")
                    .selectAll("svg");
    
    svg.call(tip);          
                    
    const path = svg.selectAll("path")
                    .data(pie(data));

    // Update existing arcs
    path.transition().duration(200).attrTween("d", arcTween);

    // Enter new arcs
    path.enter().append("path")
                .attr("fill", (d, i) => color(i))
                .attr("d", arc)
                .attr("stroke", "white")
                .attr("stroke-width", "1px")
                .each(function(d) { this._current = d; });

}//end of updatePieChart