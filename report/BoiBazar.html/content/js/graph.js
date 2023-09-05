/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [800.0, 1.0], [7200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15", "isController": false}, {"data": [[0.0, 7.0], [2400.0, 1.0], [200.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[300.0, 1.0], [800.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12", "isController": false}, {"data": [[0.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13", "isController": false}, {"data": [[400.0, 4.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32", "isController": false}, {"data": [[600.0, 1.0], [1600.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 1.0], [600.0, 1.0], [1600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19", "isController": false}, {"data": [[900.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[10500.0, 1.0], [11100.0, 1.0], [13200.0, 1.0], [14300.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0", "isController": false}, {"data": [[10600.0, 1.0], [10400.0, 1.0], [13100.0, 1.0], [14200.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2", "isController": false}, {"data": [[0.0, 3.0], [4200.0, 1.0], [17600.0, 1.0], [18000.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [12700.0, 1.0], [100.0, 1.0], [200.0, 2.0], [7300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25", "isController": false}, {"data": [[9800.0, 1.0], [20700.0, 1.0], [5600.0, 1.0], [13000.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27", "isController": false}, {"data": [[4700.0, 1.0], [22400.0, 1.0], [22900.0, 1.0], [6400.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28", "isController": false}, {"data": [[0.0, 3.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40", "isController": false}, {"data": [[4200.0, 1.0], [17900.0, 1.0], [20000.0, 1.0], [1400.0, 1.0], [14100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2", "isController": false}, {"data": [[9800.0, 1.0], [20600.0, 1.0], [5400.0, 1.0], [13000.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [1500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44", "isController": false}, {"data": [[66000.0, 1.0], [68700.0, 1.0], [54300.0, 1.0], [60800.0, 1.0], [59600.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0], [200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 1.0], [100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50", "isController": false}, {"data": [[0.0, 1.0], [1500.0, 1.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51", "isController": false}, {"data": [[2100.0, 1.0], [8400.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [5600.0, 1.0], [1400.0, 1.0], [6500.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70", "isController": false}, {"data": [[0.0, 3.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 1.0], [300.0, 1.0], [700.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58", "isController": false}, {"data": [[0.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 68700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 40.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 656.0, "series": [{"data": [[0.0, 656.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 49.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 40.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 40.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 3.8012958963282926, "minX": 1.69390596E12, "maxY": 5.0, "series": [{"data": [[1.69390596E12, 5.0], [1.69390602E12, 3.8012958963282926]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69390602E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 68763.0, "series": [{"data": [[1.0, 5.0], [5.0, 25.0], [3.0, 31.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19", "isController": false}, {"data": [[3.4, 23.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19-Aggregated", "isController": false}, {"data": [[1.0, 85.0], [5.0, 133.5], [3.0, 59.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9", "isController": false}, {"data": [[3.4, 94.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9-Aggregated", "isController": false}, {"data": [[1.0, 86.0], [5.0, 114.0], [3.0, 60.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8", "isController": false}, {"data": [[3.4, 87.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8-Aggregated", "isController": false}, {"data": [[1.0, 5.0], [5.0, 49.5], [3.0, 10.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21", "isController": false}, {"data": [[3.4, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 20.0], [3.0, 35.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20", "isController": false}, {"data": [[3.4, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20-Aggregated", "isController": false}, {"data": [[4.0, 31.0], [2.0, 34.0], [1.0, 29.5], [5.0, 32.5], [3.0, 35.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762", "isController": false}, {"data": [[3.0, 32.4]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762-Aggregated", "isController": false}, {"data": [[1.0, 5.0], [5.0, 32.0], [3.0, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25", "isController": false}, {"data": [[3.4, 17.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25-Aggregated", "isController": false}, {"data": [[1.0, 4.0], [5.0, 20.5], [3.0, 12.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24", "isController": false}, {"data": [[3.4, 13.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24-Aggregated", "isController": false}, {"data": [[1.0, 4.0], [5.0, 81.0], [3.0, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23", "isController": false}, {"data": [[3.4, 44.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23-Aggregated", "isController": false}, {"data": [[1.0, 5.0], [5.0, 53.5], [3.0, 12.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22", "isController": false}, {"data": [[3.4, 27.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22-Aggregated", "isController": false}, {"data": [[1.0, 12.0], [5.0, 72.5], [3.0, 28.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29", "isController": false}, {"data": [[3.4, 42.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 76.5], [3.0, 12.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28", "isController": false}, {"data": [[3.4, 36.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28-Aggregated", "isController": false}, {"data": [[1.0, 4.0], [5.0, 111.0], [3.0, 29.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27", "isController": false}, {"data": [[3.4, 56.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 88.0], [3.0, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26", "isController": false}, {"data": [[3.4, 40.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26-Aggregated", "isController": false}, {"data": [[1.0, 17.0], [5.0, 39.5], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3", "isController": false}, {"data": [[3.4, 22.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [5.0, 17.5], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2", "isController": false}, {"data": [[3.4, 10.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 16.5], [3.0, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1", "isController": false}, {"data": [[3.4, 10.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1-Aggregated", "isController": false}, {"data": [[1.0, 1010.0], [5.0, 974.5], [3.0, 4002.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0", "isController": false}, {"data": [[3.4, 2192.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0-Aggregated", "isController": false}, {"data": [[1.0, 81.0], [5.0, 78.0], [3.0, 45.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7", "isController": false}, {"data": [[3.4, 65.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7-Aggregated", "isController": false}, {"data": [[1.0, 105.0], [5.0, 149.5], [3.0, 73.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6", "isController": false}, {"data": [[3.4, 110.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6-Aggregated", "isController": false}, {"data": [[1.0, 83.0], [5.0, 132.0], [3.0, 60.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5", "isController": false}, {"data": [[3.4, 93.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5-Aggregated", "isController": false}, {"data": [[1.0, 105.0], [5.0, 57.5], [3.0, 60.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4", "isController": false}, {"data": [[3.4, 68.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4-Aggregated", "isController": false}, {"data": [[5.0, 58.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14", "isController": false}, {"data": [[5.0, 58.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14-Aggregated", "isController": false}, {"data": [[5.0, 56.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15", "isController": false}, {"data": [[5.0, 56.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15-Aggregated", "isController": false}, {"data": [[5.0, 1057.7]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[5.0, 1057.7]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4-Aggregated", "isController": false}, {"data": [[5.0, 566.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12", "isController": false}, {"data": [[5.0, 566.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12-Aggregated", "isController": false}, {"data": [[5.0, 1072.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13", "isController": false}, {"data": [[5.0, 1072.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13-Aggregated", "isController": false}, {"data": [[5.0, 565.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10", "isController": false}, {"data": [[5.0, 565.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10-Aggregated", "isController": false}, {"data": [[1.0, 10.0], [5.0, 61.0], [3.0, 8.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32", "isController": false}, {"data": [[3.4, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32-Aggregated", "isController": false}, {"data": [[5.0, 853.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11", "isController": false}, {"data": [[5.0, 853.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11-Aggregated", "isController": false}, {"data": [[1.0, 14.0], [5.0, 37.5], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31", "isController": false}, {"data": [[3.4, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31-Aggregated", "isController": false}, {"data": [[1.0, 24.0], [5.0, 49.5], [3.0, 25.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30", "isController": false}, {"data": [[3.4, 34.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 63.0], [3.0, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36", "isController": false}, {"data": [[3.4, 30.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36-Aggregated", "isController": false}, {"data": [[1.0, 9.0], [5.0, 10.5], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35", "isController": false}, {"data": [[3.4, 9.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35-Aggregated", "isController": false}, {"data": [[1.0, 10.0], [5.0, 37.5], [3.0, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34", "isController": false}, {"data": [[3.4, 19.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34-Aggregated", "isController": false}, {"data": [[4.0, 2269.0], [2.0, 641.0], [1.0, 2391.0], [5.0, 1674.0], [3.0, 2039.0]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order", "isController": false}, {"data": [[3.0, 1802.8]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 47.5], [3.0, 7.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33", "isController": false}, {"data": [[3.4, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33-Aggregated", "isController": false}, {"data": [[5.0, 74.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18", "isController": false}, {"data": [[5.0, 74.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18-Aggregated", "isController": false}, {"data": [[5.0, 48.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19", "isController": false}, {"data": [[5.0, 48.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19-Aggregated", "isController": false}, {"data": [[1.0, 985.0], [5.0, 982.5], [3.0, 978.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39", "isController": false}, {"data": [[3.4, 981.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39-Aggregated", "isController": false}, {"data": [[5.0, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16", "isController": false}, {"data": [[5.0, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 55.5], [3.0, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38", "isController": false}, {"data": [[3.4, 26.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38-Aggregated", "isController": false}, {"data": [[5.0, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17", "isController": false}, {"data": [[5.0, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17-Aggregated", "isController": false}, {"data": [[1.0, 8.0], [5.0, 15.0], [3.0, 7.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37", "isController": false}, {"data": [[3.4, 10.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37-Aggregated", "isController": false}, {"data": [[4.0, 43.0], [2.0, 74.0], [1.0, 39.0], [5.0, 67.0], [3.0, 74.0]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[3.0, 59.4]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4-Aggregated", "isController": false}, {"data": [[5.0, 11462.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0", "isController": false}, {"data": [[5.0, 11462.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-Aggregated", "isController": false}, {"data": [[5.0, 11310.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0", "isController": false}, {"data": [[5.0, 11310.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0-Aggregated", "isController": false}, {"data": [[5.0, 41.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1", "isController": false}, {"data": [[5.0, 41.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1-Aggregated", "isController": false}, {"data": [[5.0, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2", "isController": false}, {"data": [[5.0, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2-Aggregated", "isController": false}, {"data": [[5.0, 3910.076923076924], [3.0, 7390.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/", "isController": false}, {"data": [[4.733333333333333, 4374.0666666666675]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/-Aggregated", "isController": false}, {"data": [[5.0, 12.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25", "isController": false}, {"data": [[5.0, 12.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25-Aggregated", "isController": false}, {"data": [[5.0, 11405.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5", "isController": false}, {"data": [[5.0, 11405.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-Aggregated", "isController": false}, {"data": [[5.0, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26", "isController": false}, {"data": [[5.0, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26-Aggregated", "isController": false}, {"data": [[5.0, 19.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23", "isController": false}, {"data": [[5.0, 19.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23-Aggregated", "isController": false}, {"data": [[5.0, 15.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24", "isController": false}, {"data": [[5.0, 15.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24-Aggregated", "isController": false}, {"data": [[5.0, 95.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21", "isController": false}, {"data": [[5.0, 95.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21-Aggregated", "isController": false}, {"data": [[5.0, 24.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22", "isController": false}, {"data": [[5.0, 24.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22-Aggregated", "isController": false}, {"data": [[5.0, 42.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20", "isController": false}, {"data": [[5.0, 42.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20-Aggregated", "isController": false}, {"data": [[5.0, 41.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29", "isController": false}, {"data": [[5.0, 41.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29-Aggregated", "isController": false}, {"data": [[5.0, 12.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27", "isController": false}, {"data": [[5.0, 12.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27-Aggregated", "isController": false}, {"data": [[5.0, 14562.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved", "isController": false}, {"data": [[5.0, 14562.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-Aggregated", "isController": false}, {"data": [[5.0, 55.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28", "isController": false}, {"data": [[5.0, 55.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28-Aggregated", "isController": false}, {"data": [[5.0, 229.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36", "isController": false}, {"data": [[5.0, 229.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36-Aggregated", "isController": false}, {"data": [[5.0, 200.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37", "isController": false}, {"data": [[5.0, 200.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37-Aggregated", "isController": false}, {"data": [[5.0, 19.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34", "isController": false}, {"data": [[5.0, 19.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34-Aggregated", "isController": false}, {"data": [[5.0, 47.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35", "isController": false}, {"data": [[5.0, 47.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35-Aggregated", "isController": false}, {"data": [[5.0, 50.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32", "isController": false}, {"data": [[5.0, 50.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32-Aggregated", "isController": false}, {"data": [[1.0, 23.0], [5.0, 67.0], [3.0, 16.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10", "isController": false}, {"data": [[3.4, 37.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10-Aggregated", "isController": false}, {"data": [[5.0, 25.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33", "isController": false}, {"data": [[5.0, 25.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33-Aggregated", "isController": false}, {"data": [[5.0, 24.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30", "isController": false}, {"data": [[5.0, 24.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30-Aggregated", "isController": false}, {"data": [[5.0, 46.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31", "isController": false}, {"data": [[5.0, 46.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 13.0], [3.0, 34.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14", "isController": false}, {"data": [[3.4, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14-Aggregated", "isController": false}, {"data": [[1.0, 113.0], [5.0, 22.0], [3.0, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13", "isController": false}, {"data": [[3.4, 42.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13-Aggregated", "isController": false}, {"data": [[1.0, 128.0], [5.0, 40.0], [3.0, 39.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12", "isController": false}, {"data": [[3.4, 57.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12-Aggregated", "isController": false}, {"data": [[1.0, 21.0], [5.0, 39.5], [3.0, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11", "isController": false}, {"data": [[3.4, 30.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11-Aggregated", "isController": false}, {"data": [[1.0, 5.0], [5.0, 19.0], [3.0, 19.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18", "isController": false}, {"data": [[3.4, 16.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18-Aggregated", "isController": false}, {"data": [[1.0, 140.0], [5.0, 15.5], [3.0, 19.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17", "isController": false}, {"data": [[3.4, 41.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17-Aggregated", "isController": false}, {"data": [[5.0, 56.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38", "isController": false}, {"data": [[5.0, 56.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38-Aggregated", "isController": false}, {"data": [[1.0, 133.0], [5.0, 16.5], [3.0, 59.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16", "isController": false}, {"data": [[3.4, 57.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16-Aggregated", "isController": false}, {"data": [[5.0, 32.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39", "isController": false}, {"data": [[5.0, 32.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39-Aggregated", "isController": false}, {"data": [[1.0, 142.0], [5.0, 11.0], [3.0, 36.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15", "isController": false}, {"data": [[3.4, 47.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15-Aggregated", "isController": false}, {"data": [[5.0, 23.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1", "isController": false}, {"data": [[5.0, 23.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1-Aggregated", "isController": false}, {"data": [[5.0, 82.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2", "isController": false}, {"data": [[5.0, 82.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2-Aggregated", "isController": false}, {"data": [[5.0, 153.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40", "isController": false}, {"data": [[5.0, 153.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40-Aggregated", "isController": false}, {"data": [[5.0, 11573.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0", "isController": false}, {"data": [[5.0, 11573.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0-Aggregated", "isController": false}, {"data": [[5.0, 11.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2", "isController": false}, {"data": [[5.0, 11.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2-Aggregated", "isController": false}, {"data": [[5.0, 11295.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0", "isController": false}, {"data": [[5.0, 11295.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0-Aggregated", "isController": false}, {"data": [[5.0, 9.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1", "isController": false}, {"data": [[5.0, 9.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1-Aggregated", "isController": false}, {"data": [[5.0, 23.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47", "isController": false}, {"data": [[5.0, 23.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47-Aggregated", "isController": false}, {"data": [[5.0, 18.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48", "isController": false}, {"data": [[5.0, 18.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48-Aggregated", "isController": false}, {"data": [[1.0, 10.0], [5.0, 38.0], [3.0, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60", "isController": false}, {"data": [[3.4, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60-Aggregated", "isController": false}, {"data": [[5.0, 93.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45", "isController": false}, {"data": [[5.0, 93.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45-Aggregated", "isController": false}, {"data": [[5.0, 1420.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46", "isController": false}, {"data": [[5.0, 1420.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46-Aggregated", "isController": false}, {"data": [[5.0, 25.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43", "isController": false}, {"data": [[5.0, 25.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43-Aggregated", "isController": false}, {"data": [[5.0, 85.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44", "isController": false}, {"data": [[5.0, 85.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44-Aggregated", "isController": false}, {"data": [[4.0, 60821.0], [2.0, 66037.0], [1.0, 68763.0], [5.0, 54364.0], [3.0, 59698.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.0, 61936.6]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[5.0, 1011.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41", "isController": false}, {"data": [[5.0, 1011.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41-Aggregated", "isController": false}, {"data": [[5.0, 604.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42", "isController": false}, {"data": [[5.0, 604.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42-Aggregated", "isController": false}, {"data": [[5.0, 64.2]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved", "isController": false}, {"data": [[5.0, 64.2]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved-Aggregated", "isController": false}, {"data": [[5.0, 317.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49", "isController": false}, {"data": [[5.0, 317.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49-Aggregated", "isController": false}, {"data": [[5.0, 658.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50", "isController": false}, {"data": [[5.0, 658.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50-Aggregated", "isController": false}, {"data": [[5.0, 445.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51", "isController": false}, {"data": [[5.0, 445.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51-Aggregated", "isController": false}, {"data": [[1.0, 2292.0], [5.0, 2351.0], [3.0, 5196.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart", "isController": false}, {"data": [[3.4, 3477.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-Aggregated", "isController": false}, {"data": [[5.0, 91.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58", "isController": false}, {"data": [[5.0, 91.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58-Aggregated", "isController": false}, {"data": [[5.0, 63.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59", "isController": false}, {"data": [[5.0, 63.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59-Aggregated", "isController": false}, {"data": [[5.0, 49.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56", "isController": false}, {"data": [[5.0, 49.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56-Aggregated", "isController": false}, {"data": [[5.0, 44.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57", "isController": false}, {"data": [[5.0, 44.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57-Aggregated", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54-Aggregated", "isController": false}, {"data": [[5.0, 408.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55", "isController": false}, {"data": [[5.0, 408.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55-Aggregated", "isController": false}, {"data": [[5.0, 169.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52", "isController": false}, {"data": [[5.0, 169.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52-Aggregated", "isController": false}, {"data": [[5.0, 109.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53", "isController": false}, {"data": [[5.0, 109.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53-Aggregated", "isController": false}, {"data": [[5.0, 49.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61", "isController": false}, {"data": [[5.0, 49.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61-Aggregated", "isController": false}, {"data": [[5.0, 183.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62", "isController": false}, {"data": [[5.0, 183.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62-Aggregated", "isController": false}, {"data": [[5.0, 55.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60", "isController": false}, {"data": [[5.0, 55.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60-Aggregated", "isController": false}, {"data": [[5.0, 182.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69", "isController": false}, {"data": [[5.0, 182.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69-Aggregated", "isController": false}, {"data": [[5.0, 767.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67", "isController": false}, {"data": [[5.0, 767.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67-Aggregated", "isController": false}, {"data": [[2.0, 1491.0], [5.0, 4906.666666666667], [3.0, 2467.0]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved", "isController": false}, {"data": [[4.0, 3735.6]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved-Aggregated", "isController": false}, {"data": [[5.0, 139.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68", "isController": false}, {"data": [[5.0, 139.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68-Aggregated", "isController": false}, {"data": [[5.0, 38.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65", "isController": false}, {"data": [[5.0, 38.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65-Aggregated", "isController": false}, {"data": [[1.0, 8.0], [5.0, 22.5], [3.0, 8.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43", "isController": false}, {"data": [[3.4, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43-Aggregated", "isController": false}, {"data": [[5.0, 58.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66", "isController": false}, {"data": [[5.0, 58.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 75.5], [3.0, 10.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42", "isController": false}, {"data": [[3.4, 35.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42-Aggregated", "isController": false}, {"data": [[5.0, 122.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63", "isController": false}, {"data": [[5.0, 122.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63-Aggregated", "isController": false}, {"data": [[1.0, 6.0], [5.0, 29.0], [3.0, 6.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41", "isController": false}, {"data": [[3.4, 15.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41-Aggregated", "isController": false}, {"data": [[5.0, 154.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64", "isController": false}, {"data": [[5.0, 154.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64-Aggregated", "isController": false}, {"data": [[1.0, 8.0], [5.0, 78.0], [3.0, 6.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40", "isController": false}, {"data": [[3.4, 35.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40-Aggregated", "isController": false}, {"data": [[1.0, 9.0], [5.0, 21.0], [3.0, 5.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47", "isController": false}, {"data": [[3.4, 12.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 19.5], [3.0, 6.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46", "isController": false}, {"data": [[3.4, 11.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46-Aggregated", "isController": false}, {"data": [[1.0, 8.0], [5.0, 22.5], [3.0, 8.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45", "isController": false}, {"data": [[3.4, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45-Aggregated", "isController": false}, {"data": [[1.0, 9.0], [5.0, 49.5], [3.0, 8.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44", "isController": false}, {"data": [[3.4, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 14.5], [3.0, 96.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49", "isController": false}, {"data": [[3.4, 45.60000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49-Aggregated", "isController": false}, {"data": [[1.0, 10.0], [5.0, 16.0], [3.0, 6.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48", "isController": false}, {"data": [[3.4, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48-Aggregated", "isController": false}, {"data": [[5.0, 68.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72", "isController": false}, {"data": [[5.0, 68.8]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72-Aggregated", "isController": false}, {"data": [[5.0, 69.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73", "isController": false}, {"data": [[5.0, 69.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73-Aggregated", "isController": false}, {"data": [[5.0, 65.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70", "isController": false}, {"data": [[5.0, 65.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70-Aggregated", "isController": false}, {"data": [[5.0, 168.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71", "isController": false}, {"data": [[5.0, 168.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71-Aggregated", "isController": false}, {"data": [[5.0, 104.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4", "isController": false}, {"data": [[5.0, 104.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4-Aggregated", "isController": false}, {"data": [[1.0, 9.0], [5.0, 40.0], [3.0, 94.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50", "isController": false}, {"data": [[3.4, 55.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50-Aggregated", "isController": false}, {"data": [[5.0, 68.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3", "isController": false}, {"data": [[5.0, 68.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3-Aggregated", "isController": false}, {"data": [[5.0, 106.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6", "isController": false}, {"data": [[5.0, 106.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6-Aggregated", "isController": false}, {"data": [[5.0, 103.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5", "isController": false}, {"data": [[5.0, 103.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5-Aggregated", "isController": false}, {"data": [[5.0, 113.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8", "isController": false}, {"data": [[5.0, 113.4]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8-Aggregated", "isController": false}, {"data": [[1.0, 9.0], [5.0, 57.0], [3.0, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54", "isController": false}, {"data": [[3.4, 28.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54-Aggregated", "isController": false}, {"data": [[5.0, 477.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7", "isController": false}, {"data": [[5.0, 477.6]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7-Aggregated", "isController": false}, {"data": [[1.0, 10.0], [5.0, 50.0], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53", "isController": false}, {"data": [[3.4, 25.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53-Aggregated", "isController": false}, {"data": [[1.0, 13.0], [5.0, 21.0], [3.0, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52", "isController": false}, {"data": [[3.4, 14.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52-Aggregated", "isController": false}, {"data": [[5.0, 223.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9", "isController": false}, {"data": [[5.0, 223.2]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9-Aggregated", "isController": false}, {"data": [[1.0, 7.0], [5.0, 17.5], [3.0, 95.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51", "isController": false}, {"data": [[3.4, 46.60000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51-Aggregated", "isController": false}, {"data": [[1.0, 12.0], [5.0, 41.0], [3.0, 78.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58", "isController": false}, {"data": [[3.4, 50.00000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58-Aggregated", "isController": false}, {"data": [[1.0, 13.0], [5.0, 43.5], [3.0, 110.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57", "isController": false}, {"data": [[3.4, 64.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57-Aggregated", "isController": false}, {"data": [[1.0, 15.0], [5.0, 68.5], [3.0, 5.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56", "isController": false}, {"data": [[3.4, 32.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56-Aggregated", "isController": false}, {"data": [[1.0, 46.0], [5.0, 48.0], [3.0, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55", "isController": false}, {"data": [[3.4, 32.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55-Aggregated", "isController": false}, {"data": [[1.0, 14.0], [5.0, 24.5], [3.0, 7.5]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59", "isController": false}, {"data": [[3.4, 15.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 9506.333333333334, "minX": 1.69390596E12, "maxY": 312851.81666666665, "series": [{"data": [[1.69390596E12, 312851.81666666665], [1.69390602E12, 147784.16666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69390596E12, 9506.333333333334], [1.69390602E12, 15796.716666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69390602E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.69390596E12, "maxY": 61936.6, "series": [{"data": [[1.69390602E12, 23.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19", "isController": false}, {"data": [[1.69390602E12, 94.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9", "isController": false}, {"data": [[1.69390602E12, 87.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8", "isController": false}, {"data": [[1.69390602E12, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21", "isController": false}, {"data": [[1.69390602E12, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20", "isController": false}, {"data": [[1.69390602E12, 32.4]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762", "isController": false}, {"data": [[1.69390602E12, 17.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25", "isController": false}, {"data": [[1.69390602E12, 13.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24", "isController": false}, {"data": [[1.69390602E12, 44.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23", "isController": false}, {"data": [[1.69390602E12, 27.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22", "isController": false}, {"data": [[1.69390602E12, 42.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29", "isController": false}, {"data": [[1.69390602E12, 36.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28", "isController": false}, {"data": [[1.69390602E12, 56.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27", "isController": false}, {"data": [[1.69390602E12, 40.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26", "isController": false}, {"data": [[1.69390602E12, 22.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3", "isController": false}, {"data": [[1.69390602E12, 10.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2", "isController": false}, {"data": [[1.69390602E12, 10.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1", "isController": false}, {"data": [[1.69390602E12, 2192.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0", "isController": false}, {"data": [[1.69390602E12, 65.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7", "isController": false}, {"data": [[1.69390602E12, 110.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6", "isController": false}, {"data": [[1.69390602E12, 93.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5", "isController": false}, {"data": [[1.69390602E12, 68.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4", "isController": false}, {"data": [[1.69390596E12, 49.25], [1.69390602E12, 95.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14", "isController": false}, {"data": [[1.69390596E12, 66.5], [1.69390602E12, 16.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15", "isController": false}, {"data": [[1.69390596E12, 11.0], [1.69390602E12, 1174.0]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 578.75], [1.69390602E12, 517.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12", "isController": false}, {"data": [[1.69390596E12, 837.5], [1.69390602E12, 2014.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13", "isController": false}, {"data": [[1.69390596E12, 591.75], [1.69390602E12, 459.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10", "isController": false}, {"data": [[1.69390602E12, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32", "isController": false}, {"data": [[1.69390596E12, 934.0], [1.69390602E12, 530.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11", "isController": false}, {"data": [[1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31", "isController": false}, {"data": [[1.69390602E12, 34.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30", "isController": false}, {"data": [[1.69390602E12, 30.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36", "isController": false}, {"data": [[1.69390602E12, 9.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35", "isController": false}, {"data": [[1.69390602E12, 19.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34", "isController": false}, {"data": [[1.69390602E12, 1802.8]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order", "isController": false}, {"data": [[1.69390602E12, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33", "isController": false}, {"data": [[1.69390596E12, 84.75], [1.69390602E12, 34.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18", "isController": false}, {"data": [[1.69390596E12, 52.75], [1.69390602E12, 31.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19", "isController": false}, {"data": [[1.69390602E12, 981.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39", "isController": false}, {"data": [[1.69390596E12, 28.0], [1.69390602E12, 13.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16", "isController": false}, {"data": [[1.69390602E12, 26.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38", "isController": false}, {"data": [[1.69390596E12, 32.0], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17", "isController": false}, {"data": [[1.69390602E12, 10.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37", "isController": false}, {"data": [[1.69390602E12, 59.4]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 11462.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0", "isController": false}, {"data": [[1.69390596E12, 11310.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0", "isController": false}, {"data": [[1.69390596E12, 41.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1", "isController": false}, {"data": [[1.69390596E12, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2", "isController": false}, {"data": [[1.69390596E12, 4511.0], [1.69390602E12, 4324.272727272728]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/", "isController": false}, {"data": [[1.69390596E12, 14.25], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25", "isController": false}, {"data": [[1.69390596E12, 11405.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5", "isController": false}, {"data": [[1.69390596E12, 11.0], [1.69390602E12, 6.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26", "isController": false}, {"data": [[1.69390596E12, 22.0], [1.69390602E12, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23", "isController": false}, {"data": [[1.69390596E12, 16.75], [1.69390602E12, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24", "isController": false}, {"data": [[1.69390596E12, 113.75], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21", "isController": false}, {"data": [[1.69390596E12, 27.75], [1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22", "isController": false}, {"data": [[1.69390596E12, 46.5], [1.69390602E12, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20", "isController": false}, {"data": [[1.69390596E12, 20.5], [1.69390602E12, 127.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29", "isController": false}, {"data": [[1.69390596E12, 13.75], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27", "isController": false}, {"data": [[1.69390596E12, 11353.0], [1.69390602E12, 19377.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 11.0], [1.69390602E12, 232.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28", "isController": false}, {"data": [[1.69390596E12, 269.5], [1.69390602E12, 71.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36", "isController": false}, {"data": [[1.69390596E12, 226.5], [1.69390602E12, 98.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37", "isController": false}, {"data": [[1.69390596E12, 22.25], [1.69390602E12, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34", "isController": false}, {"data": [[1.69390596E12, 55.25], [1.69390602E12, 17.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35", "isController": false}, {"data": [[1.69390596E12, 58.0], [1.69390602E12, 19.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32", "isController": false}, {"data": [[1.69390602E12, 37.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10", "isController": false}, {"data": [[1.69390596E12, 30.25], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33", "isController": false}, {"data": [[1.69390596E12, 25.25], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30", "isController": false}, {"data": [[1.69390596E12, 55.75], [1.69390602E12, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31", "isController": false}, {"data": [[1.69390602E12, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14", "isController": false}, {"data": [[1.69390602E12, 42.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13", "isController": false}, {"data": [[1.69390602E12, 57.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12", "isController": false}, {"data": [[1.69390602E12, 30.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11", "isController": false}, {"data": [[1.69390602E12, 16.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18", "isController": false}, {"data": [[1.69390602E12, 41.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17", "isController": false}, {"data": [[1.69390596E12, 51.75], [1.69390602E12, 73.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38", "isController": false}, {"data": [[1.69390602E12, 57.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16", "isController": false}, {"data": [[1.69390596E12, 37.5], [1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39", "isController": false}, {"data": [[1.69390602E12, 47.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15", "isController": false}, {"data": [[1.69390596E12, 23.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1", "isController": false}, {"data": [[1.69390596E12, 82.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2", "isController": false}, {"data": [[1.69390596E12, 176.25], [1.69390602E12, 60.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40", "isController": false}, {"data": [[1.69390596E12, 10921.25], [1.69390602E12, 14184.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0", "isController": false}, {"data": [[1.69390596E12, 11.5], [1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2", "isController": false}, {"data": [[1.69390596E12, 11295.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0", "isController": false}, {"data": [[1.69390596E12, 9.25], [1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1", "isController": false}, {"data": [[1.69390596E12, 26.75], [1.69390602E12, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47", "isController": false}, {"data": [[1.69390596E12, 21.75], [1.69390602E12, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48", "isController": false}, {"data": [[1.69390602E12, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60", "isController": false}, {"data": [[1.69390596E12, 111.75], [1.69390602E12, 19.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45", "isController": false}, {"data": [[1.69390596E12, 1512.25], [1.69390602E12, 1051.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46", "isController": false}, {"data": [[1.69390596E12, 17.75], [1.69390602E12, 57.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43", "isController": false}, {"data": [[1.69390596E12, 97.0], [1.69390602E12, 38.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44", "isController": false}, {"data": [[1.69390602E12, 61936.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.69390596E12, 1069.25], [1.69390602E12, 778.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41", "isController": false}, {"data": [[1.69390596E12, 641.5], [1.69390602E12, 454.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42", "isController": false}, {"data": [[1.69390602E12, 64.2]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 377.25], [1.69390602E12, 79.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49", "isController": false}, {"data": [[1.69390596E12, 432.0], [1.69390602E12, 998.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50", "isController": false}, {"data": [[1.69390596E12, 186.0], [1.69390602E12, 834.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51", "isController": false}, {"data": [[1.69390602E12, 3477.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart", "isController": false}, {"data": [[1.69390596E12, 52.75], [1.69390602E12, 246.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58", "isController": false}, {"data": [[1.69390596E12, 67.5], [1.69390602E12, 45.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59", "isController": false}, {"data": [[1.69390596E12, 59.25], [1.69390602E12, 12.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56", "isController": false}, {"data": [[1.69390596E12, 53.25], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57", "isController": false}, {"data": [[1.69390596E12, 66.0], [1.69390602E12, 24.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54", "isController": false}, {"data": [[1.69390596E12, 417.0], [1.69390602E12, 395.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55", "isController": false}, {"data": [[1.69390596E12, 205.25], [1.69390602E12, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52", "isController": false}, {"data": [[1.69390596E12, 128.5], [1.69390602E12, 33.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53", "isController": false}, {"data": [[1.69390596E12, 35.333333333333336], [1.69390602E12, 70.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61", "isController": false}, {"data": [[1.69390596E12, 132.66666666666666], [1.69390602E12, 259.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62", "isController": false}, {"data": [[1.69390596E12, 42.333333333333336], [1.69390602E12, 74.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60", "isController": false}, {"data": [[1.69390596E12, 185.66666666666669], [1.69390602E12, 176.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69", "isController": false}, {"data": [[1.69390596E12, 769.0], [1.69390602E12, 766.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67", "isController": false}, {"data": [[1.69390602E12, 3735.6]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 162.33333333333331], [1.69390602E12, 106.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68", "isController": false}, {"data": [[1.69390596E12, 42.666666666666664], [1.69390602E12, 33.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65", "isController": false}, {"data": [[1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43", "isController": false}, {"data": [[1.69390596E12, 61.33333333333333], [1.69390602E12, 54.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66", "isController": false}, {"data": [[1.69390602E12, 35.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42", "isController": false}, {"data": [[1.69390596E12, 63.66666666666667], [1.69390602E12, 211.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63", "isController": false}, {"data": [[1.69390602E12, 15.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41", "isController": false}, {"data": [[1.69390596E12, 121.66666666666667], [1.69390602E12, 204.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64", "isController": false}, {"data": [[1.69390602E12, 35.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40", "isController": false}, {"data": [[1.69390602E12, 12.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47", "isController": false}, {"data": [[1.69390602E12, 11.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46", "isController": false}, {"data": [[1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45", "isController": false}, {"data": [[1.69390602E12, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44", "isController": false}, {"data": [[1.69390602E12, 45.60000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49", "isController": false}, {"data": [[1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48", "isController": false}, {"data": [[1.69390596E12, 78.66666666666666], [1.69390602E12, 54.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72", "isController": false}, {"data": [[1.69390596E12, 76.33333333333333], [1.69390602E12, 58.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73", "isController": false}, {"data": [[1.69390596E12, 85.66666666666666], [1.69390602E12, 35.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70", "isController": false}, {"data": [[1.69390596E12, 169.0], [1.69390602E12, 166.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71", "isController": false}, {"data": [[1.69390596E12, 111.5], [1.69390602E12, 76.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4", "isController": false}, {"data": [[1.69390602E12, 55.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50", "isController": false}, {"data": [[1.69390596E12, 78.75], [1.69390602E12, 26.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3", "isController": false}, {"data": [[1.69390596E12, 116.0], [1.69390602E12, 69.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6", "isController": false}, {"data": [[1.69390596E12, 111.75], [1.69390602E12, 71.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5", "isController": false}, {"data": [[1.69390596E12, 121.75], [1.69390602E12, 80.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8", "isController": false}, {"data": [[1.69390602E12, 28.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54", "isController": false}, {"data": [[1.69390596E12, 574.0], [1.69390602E12, 92.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7", "isController": false}, {"data": [[1.69390602E12, 25.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53", "isController": false}, {"data": [[1.69390602E12, 14.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52", "isController": false}, {"data": [[1.69390596E12, 241.5], [1.69390602E12, 150.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9", "isController": false}, {"data": [[1.69390602E12, 46.60000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51", "isController": false}, {"data": [[1.69390602E12, 50.00000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58", "isController": false}, {"data": [[1.69390602E12, 64.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57", "isController": false}, {"data": [[1.69390602E12, 32.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56", "isController": false}, {"data": [[1.69390602E12, 32.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55", "isController": false}, {"data": [[1.69390602E12, 15.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69390602E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69390596E12, "maxY": 56524.6, "series": [{"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21", "isController": false}, {"data": [[1.69390602E12, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20", "isController": false}, {"data": [[1.69390602E12, 28.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1", "isController": false}, {"data": [[1.69390602E12, 2055.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4", "isController": false}, {"data": [[1.69390596E12, 49.25], [1.69390602E12, 95.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14", "isController": false}, {"data": [[1.69390596E12, 66.25], [1.69390602E12, 16.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 1167.7777777777776]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 373.25], [1.69390602E12, 132.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12", "isController": false}, {"data": [[1.69390596E12, 460.75], [1.69390602E12, 348.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13", "isController": false}, {"data": [[1.69390596E12, 79.75], [1.69390602E12, 80.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32", "isController": false}, {"data": [[1.69390596E12, 84.25], [1.69390602E12, 100.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34", "isController": false}, {"data": [[1.69390602E12, 1801.6]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33", "isController": false}, {"data": [[1.69390596E12, 69.0], [1.69390602E12, 28.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18", "isController": false}, {"data": [[1.69390596E12, 52.75], [1.69390602E12, 31.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39", "isController": false}, {"data": [[1.69390596E12, 27.75], [1.69390602E12, 13.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38", "isController": false}, {"data": [[1.69390596E12, 31.5], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37", "isController": false}, {"data": [[1.69390602E12, 59.0]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 11074.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0", "isController": false}, {"data": [[1.69390596E12, 11074.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0", "isController": false}, {"data": [[1.69390596E12, 41.4]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1", "isController": false}, {"data": [[1.69390596E12, 29.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2", "isController": false}, {"data": [[1.69390596E12, 4407.0], [1.69390602E12, 4310.272727272728]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/", "isController": false}, {"data": [[1.69390596E12, 14.0], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25", "isController": false}, {"data": [[1.69390596E12, 11197.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5", "isController": false}, {"data": [[1.69390596E12, 11.0], [1.69390602E12, 6.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26", "isController": false}, {"data": [[1.69390596E12, 22.0], [1.69390602E12, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23", "isController": false}, {"data": [[1.69390596E12, 16.75], [1.69390602E12, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24", "isController": false}, {"data": [[1.69390596E12, 113.5], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21", "isController": false}, {"data": [[1.69390596E12, 27.75], [1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22", "isController": false}, {"data": [[1.69390596E12, 46.5], [1.69390602E12, 27.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20", "isController": false}, {"data": [[1.69390596E12, 20.5], [1.69390602E12, 127.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29", "isController": false}, {"data": [[1.69390596E12, 13.75], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27", "isController": false}, {"data": [[1.69390596E12, 8465.0], [1.69390602E12, 15601.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 11.0], [1.69390602E12, 232.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28", "isController": false}, {"data": [[1.69390596E12, 54.0], [1.69390602E12, 17.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36", "isController": false}, {"data": [[1.69390596E12, 49.0], [1.69390602E12, 43.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37", "isController": false}, {"data": [[1.69390596E12, 22.0], [1.69390602E12, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34", "isController": false}, {"data": [[1.69390596E12, 29.75], [1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35", "isController": false}, {"data": [[1.69390596E12, 38.25], [1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10", "isController": false}, {"data": [[1.69390596E12, 30.25], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33", "isController": false}, {"data": [[1.69390596E12, 24.0], [1.69390602E12, 21.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30", "isController": false}, {"data": [[1.69390596E12, 55.75], [1.69390602E12, 9.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15", "isController": false}, {"data": [[1.69390596E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1", "isController": false}, {"data": [[1.69390596E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2", "isController": false}, {"data": [[1.69390596E12, 176.25], [1.69390602E12, 60.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40", "isController": false}, {"data": [[1.69390596E12, 10636.5], [1.69390602E12, 14051.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2", "isController": false}, {"data": [[1.69390596E12, 11197.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1", "isController": false}, {"data": [[1.69390596E12, 26.75], [1.69390602E12, 8.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47", "isController": false}, {"data": [[1.69390596E12, 21.75], [1.69390602E12, 5.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48", "isController": false}, {"data": [[1.69390602E12, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60", "isController": false}, {"data": [[1.69390596E12, 104.0], [1.69390602E12, 18.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46", "isController": false}, {"data": [[1.69390596E12, 17.25], [1.69390602E12, 57.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43", "isController": false}, {"data": [[1.69390596E12, 40.5], [1.69390602E12, 28.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44", "isController": false}, {"data": [[1.69390602E12, 56524.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.69390596E12, 395.75], [1.69390602E12, 164.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41", "isController": false}, {"data": [[1.69390596E12, 434.75], [1.69390602E12, 304.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42", "isController": false}, {"data": [[1.69390602E12, 58.400000000000006]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 47.0], [1.69390602E12, 16.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49", "isController": false}, {"data": [[1.69390596E12, 97.33333333333334], [1.69390602E12, 104.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50", "isController": false}, {"data": [[1.69390596E12, 42.333333333333336], [1.69390602E12, 407.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51", "isController": false}, {"data": [[1.69390602E12, 2055.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart", "isController": false}, {"data": [[1.69390596E12, 52.5], [1.69390602E12, 246.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58", "isController": false}, {"data": [[1.69390596E12, 67.5], [1.69390602E12, 45.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59", "isController": false}, {"data": [[1.69390596E12, 59.25], [1.69390602E12, 12.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56", "isController": false}, {"data": [[1.69390596E12, 53.25], [1.69390602E12, 7.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57", "isController": false}, {"data": [[1.69390596E12, 66.0], [1.69390602E12, 24.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54", "isController": false}, {"data": [[1.69390596E12, 55.0], [1.69390602E12, 102.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55", "isController": false}, {"data": [[1.69390596E12, 179.25], [1.69390602E12, 20.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52", "isController": false}, {"data": [[1.69390596E12, 69.5], [1.69390602E12, 25.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53", "isController": false}, {"data": [[1.69390596E12, 35.0], [1.69390602E12, 70.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61", "isController": false}, {"data": [[1.69390596E12, 97.33333333333333], [1.69390602E12, 149.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62", "isController": false}, {"data": [[1.69390596E12, 42.0], [1.69390602E12, 74.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60", "isController": false}, {"data": [[1.69390596E12, 88.0], [1.69390602E12, 73.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69", "isController": false}, {"data": [[1.69390596E12, 556.6666666666666], [1.69390602E12, 511.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67", "isController": false}, {"data": [[1.69390602E12, 3734.4]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 93.66666666666667], [1.69390602E12, 43.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68", "isController": false}, {"data": [[1.69390596E12, 42.666666666666664], [1.69390602E12, 33.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43", "isController": false}, {"data": [[1.69390596E12, 61.0], [1.69390602E12, 54.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42", "isController": false}, {"data": [[1.69390596E12, 63.66666666666667], [1.69390602E12, 211.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41", "isController": false}, {"data": [[1.69390596E12, 66.0], [1.69390602E12, 137.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48", "isController": false}, {"data": [[1.69390596E12, 78.33333333333334], [1.69390602E12, 54.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72", "isController": false}, {"data": [[1.69390596E12, 76.33333333333333], [1.69390602E12, 58.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73", "isController": false}, {"data": [[1.69390596E12, 85.66666666666666], [1.69390602E12, 35.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70", "isController": false}, {"data": [[1.69390596E12, 85.33333333333333], [1.69390602E12, 96.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71", "isController": false}, {"data": [[1.69390596E12, 111.5], [1.69390602E12, 76.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50", "isController": false}, {"data": [[1.69390596E12, 72.0], [1.69390602E12, 26.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3", "isController": false}, {"data": [[1.69390596E12, 115.75], [1.69390602E12, 69.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6", "isController": false}, {"data": [[1.69390596E12, 111.75], [1.69390602E12, 71.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5", "isController": false}, {"data": [[1.69390596E12, 121.75], [1.69390602E12, 80.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54", "isController": false}, {"data": [[1.69390596E12, 287.75], [1.69390602E12, 82.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52", "isController": false}, {"data": [[1.69390596E12, 148.25], [1.69390602E12, 88.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69390602E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69390596E12, "maxY": 1253.5, "series": [{"data": [[1.69390602E12, 6.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19", "isController": false}, {"data": [[1.69390602E12, 83.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9", "isController": false}, {"data": [[1.69390602E12, 73.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8", "isController": false}, {"data": [[1.69390602E12, 13.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21", "isController": false}, {"data": [[1.69390602E12, 10.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24", "isController": false}, {"data": [[1.69390602E12, 35.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23", "isController": false}, {"data": [[1.69390602E12, 13.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22", "isController": false}, {"data": [[1.69390602E12, 24.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29", "isController": false}, {"data": [[1.69390602E12, 19.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28", "isController": false}, {"data": [[1.69390602E12, 46.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27", "isController": false}, {"data": [[1.69390602E12, 29.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3", "isController": false}, {"data": [[1.69390602E12, 10.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2", "isController": false}, {"data": [[1.69390602E12, 10.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1", "isController": false}, {"data": [[1.69390602E12, 81.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0", "isController": false}, {"data": [[1.69390602E12, 32.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7", "isController": false}, {"data": [[1.69390602E12, 95.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6", "isController": false}, {"data": [[1.69390602E12, 84.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5", "isController": false}, {"data": [[1.69390602E12, 48.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4", "isController": false}, {"data": [[1.69390596E12, 14.0], [1.69390602E12, 81.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 257.75], [1.69390602E12, 38.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12", "isController": false}, {"data": [[1.69390596E12, 351.75], [1.69390602E12, 57.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13", "isController": false}, {"data": [[1.69390596E12, 51.25], [1.69390602E12, 34.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10", "isController": false}, {"data": [[1.69390602E12, 18.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32", "isController": false}, {"data": [[1.69390596E12, 33.75], [1.69390602E12, 62.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11", "isController": false}, {"data": [[1.69390602E12, 9.999999999999998]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31", "isController": false}, {"data": [[1.69390602E12, 7.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30", "isController": false}, {"data": [[1.69390602E12, 20.800000000000004]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order", "isController": false}, {"data": [[1.69390602E12, 12.200000000000001]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19", "isController": false}, {"data": [[1.69390602E12, 733.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39", "isController": false}, {"data": [[1.69390596E12, 9.5], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16", "isController": false}, {"data": [[1.69390602E12, 16.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37", "isController": false}, {"data": [[1.69390602E12, 45.4]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4", "isController": false}, {"data": [[1.69390596E12, 387.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0", "isController": false}, {"data": [[1.69390596E12, 387.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0", "isController": false}, {"data": [[1.69390596E12, 27.6]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1", "isController": false}, {"data": [[1.69390596E12, 18.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2", "isController": false}, {"data": [[1.69390596E12, 82.75], [1.69390602E12, 11.909090909090908]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25", "isController": false}, {"data": [[1.69390596E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32", "isController": false}, {"data": [[1.69390602E12, 14.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30", "isController": false}, {"data": [[1.69390596E12, 18.75], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31", "isController": false}, {"data": [[1.69390602E12, 10.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14", "isController": false}, {"data": [[1.69390602E12, 19.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13", "isController": false}, {"data": [[1.69390602E12, 37.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12", "isController": false}, {"data": [[1.69390602E12, 17.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18", "isController": false}, {"data": [[1.69390602E12, 26.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17", "isController": false}, {"data": [[1.69390596E12, 21.5], [1.69390602E12, 62.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38", "isController": false}, {"data": [[1.69390602E12, 44.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39", "isController": false}, {"data": [[1.69390602E12, 38.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15", "isController": false}, {"data": [[1.69390596E12, 6.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1", "isController": false}, {"data": [[1.69390596E12, 68.8]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2", "isController": false}, {"data": [[1.69390596E12, 32.75], [1.69390602E12, 43.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0", "isController": false}, {"data": [[1.69390596E12, 11.25], [1.69390602E12, 10.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2", "isController": false}, {"data": [[1.69390596E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0", "isController": false}, {"data": [[1.69390596E12, 9.25], [1.69390602E12, 11.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48", "isController": false}, {"data": [[1.69390602E12, 8.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45", "isController": false}, {"data": [[1.69390596E12, 1253.5], [1.69390602E12, 768.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 43.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44", "isController": false}, {"data": [[1.69390602E12, 649.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.69390596E12, 225.5], [1.69390602E12, 100.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41", "isController": false}, {"data": [[1.69390596E12, 276.75], [1.69390602E12, 113.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51", "isController": false}, {"data": [[1.69390602E12, 81.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58", "isController": false}, {"data": [[1.69390596E12, 16.5], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61", "isController": false}, {"data": [[1.69390596E12, 24.333333333333336], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69", "isController": false}, {"data": [[1.69390596E12, 282.6666666666667], [1.69390602E12, 158.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67", "isController": false}, {"data": [[1.69390602E12, 42.2]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 32.5]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66", "isController": false}, {"data": [[1.69390602E12, 20.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64", "isController": false}, {"data": [[1.69390602E12, 23.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45", "isController": false}, {"data": [[1.69390602E12, 16.4]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44", "isController": false}, {"data": [[1.69390602E12, 6.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72", "isController": false}, {"data": [[1.69390596E12, 17.666666666666664], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70", "isController": false}, {"data": [[1.69390596E12, 0.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71", "isController": false}, {"data": [[1.69390596E12, 90.5], [1.69390602E12, 64.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4", "isController": false}, {"data": [[1.69390602E12, 17.6]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50", "isController": false}, {"data": [[1.69390596E12, 19.0], [1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3", "isController": false}, {"data": [[1.69390596E12, 92.75], [1.69390602E12, 61.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6", "isController": false}, {"data": [[1.69390596E12, 89.0], [1.69390602E12, 62.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5", "isController": false}, {"data": [[1.69390596E12, 87.75], [1.69390602E12, 55.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8", "isController": false}, {"data": [[1.69390602E12, 8.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54", "isController": false}, {"data": [[1.69390596E12, 252.0], [1.69390602E12, 55.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7", "isController": false}, {"data": [[1.69390602E12, 13.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52", "isController": false}, {"data": [[1.69390596E12, 76.25], [1.69390602E12, 54.0]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9", "isController": false}, {"data": [[1.69390602E12, 15.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58", "isController": false}, {"data": [[1.69390602E12, 9.999999999999998]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57", "isController": false}, {"data": [[1.69390602E12, 14.8]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56", "isController": false}, {"data": [[1.69390602E12, 22.2]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55", "isController": false}, {"data": [[1.69390602E12, 0.0]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69390602E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.69390596E12, "maxY": 20723.0, "series": [{"data": [[1.69390596E12, 20723.0], [1.69390602E12, 18023.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69390596E12, 1155.000000000001], [1.69390602E12, 216.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69390596E12, 19666.859999999968], [1.69390602E12, 7595.699999999996]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69390596E12, 9971.499999999987], [1.69390602E12, 910.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69390596E12, 5.0], [1.69390602E12, 4.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69390596E12, 62.0], [1.69390602E12, 24.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69390602E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.5, "minX": 1.0, "maxY": 22904.0, "series": [{"data": [[2.0, 8819.5], [32.0, 63.5], [35.0, 25.0], [34.0, 11.0], [45.0, 25.0], [44.0, 8.0], [3.0, 352.5], [53.0, 34.0], [60.0, 11.5], [4.0, 94.0], [5.0, 794.0], [6.0, 81.0], [7.0, 57.0], [118.0, 31.5], [8.0, 115.5], [9.0, 91.0], [10.0, 232.5], [11.0, 60.0], [12.0, 75.5], [1.0, 7811.0], [16.0, 324.0], [18.0, 211.0], [19.0, 45.5], [20.0, 124.5], [26.0, 38.5], [27.0, 153.5], [28.0, 20.0], [29.0, 60.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2393.0], [34.0, 4.0], [9.0, 22427.0], [45.0, 2.5], [11.0, 1765.0], [12.0, 12.5], [3.0, 6438.0], [53.0, 11.0], [60.0, 12.0], [4.0, 3619.0], [16.0, 6.0], [1.0, 2070.5], [19.0, 4.0], [5.0, 5667.0], [27.0, 22904.0], [28.0, 22.0], [118.0, 17.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 118.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 19850.0, "series": [{"data": [[2.0, 8814.0], [32.0, 29.0], [35.0, 20.0], [34.0, 0.0], [45.0, 14.0], [44.0, 0.0], [3.0, 245.5], [53.0, 25.0], [60.0, 0.0], [4.0, 54.0], [5.0, 743.5], [6.0, 81.0], [7.0, 57.0], [118.0, 0.0], [8.0, 55.0], [9.0, 78.5], [10.0, 113.5], [11.0, 58.0], [12.0, 47.0], [1.0, 7649.5], [16.0, 173.5], [18.0, 127.0], [19.0, 0.0], [20.0, 67.0], [26.0, 21.0], [27.0, 108.5], [28.0, 13.0], [29.0, 46.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1526.0], [34.0, 0.0], [9.0, 17151.0], [45.0, 0.0], [11.0, 1763.5], [12.0, 0.0], [3.0, 4146.0], [53.0, 0.0], [60.0, 0.0], [4.0, 2455.0], [16.0, 0.0], [1.0, 2069.0], [19.0, 0.0], [5.0, 5666.0], [27.0, 19850.0], [28.0, 0.0], [118.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 118.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 5.65, "minX": 1.69390596E12, "maxY": 7.433333333333334, "series": [{"data": [[1.69390596E12, 5.65], [1.69390602E12, 7.433333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69390602E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.69390596E12, "maxY": 4.883333333333334, "series": [{"data": [[1.69390596E12, 4.883333333333334], [1.69390602E12, 2.283333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69390602E12, 0.16666666666666666]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.69390596E12, 0.13333333333333333], [1.69390602E12, 0.36666666666666664]], "isOverall": false, "label": "204", "isController": false}, {"data": [[1.69390596E12, 0.3], [1.69390602E12, 4.616666666666666]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.69390596E12, 0.13333333333333333], [1.69390602E12, 0.2]], "isOverall": false, "label": "Non HTTP response code: java.net.UnknownHostException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69390602E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69390596E12, "maxY": 0.18333333333333332, "series": [{"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-5-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-47-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-1-failure", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-30-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-31-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-12-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-43-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-44-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-34-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-63-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-28-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-48-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-29-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-50-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-16-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-15-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-1-failure", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-38-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-22-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-52-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-25-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-21-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-53-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-67-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-8-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-11-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-19-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-26-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-9-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-4-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-56-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-57-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-37-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-0-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-72-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-1-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-41-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-40-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-46-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-0-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-15-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-60-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-18-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-43-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-59-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-14-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-32-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-31-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-4-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-64-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-47-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-29-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-52-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-68-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-23-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-22-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-51-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-35-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-26-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-failure", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-40-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-56-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-10-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-7-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-11-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-8-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-2-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-73-success", "isController": false}, {"data": [[1.69390596E12, 0.016666666666666666], [1.69390602E12, 0.15]], "isOverall": false, "label": "https://m.boibazar.com/api/stock-check/5a82e345aa4811514da8c2e4-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-55-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-39-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-38-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-60-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-45-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-46-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-14-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-3-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-59-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-7-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-18-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-17-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-27-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-49-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-61-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.18333333333333332]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-failure", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-33-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-58-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-65-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-13-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-32-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-3-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/similar-book/misir-ali-unsolved-failure", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-39-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-69-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-20-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-51-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/shipping/order-failure", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-36-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-10-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-6-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-70-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-35-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-42-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-0-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-2-success", "isController": false}, {"data": [[1.69390602E12, 0.16666666666666666]], "isOverall": false, "label": "https://m.boibazar.com/api/hit-update/misir-ali-unsolved-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-24-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-2-failure", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-54-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-55-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-23-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-45-success", "isController": false}, {"data": [[1.69390602E12, 0.16666666666666666]], "isOverall": false, "label": "https://m.boibazar.com/api/cart/64f65c7f3989087d13305762-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-6-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-16-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-44-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-28-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-48-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-30-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-58-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-12-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-13-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-27-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-49-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-62-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-34-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-50-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-33-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-17-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://m.boibazar.com/api/product-type/5a82e345aa4811514da8c2e4-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-2-failure", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/5-0-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-53-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-9-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-24-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-37-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-54-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-66-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-21-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-57-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-20-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-41-success", "isController": false}, {"data": [[1.69390596E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/homepage-more/0-1-success", "isController": false}, {"data": [[1.69390596E12, 0.05], [1.69390602E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-71-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-36-success", "isController": false}, {"data": [[1.69390602E12, 0.08333333333333333]], "isOverall": false, "label": "https://www.boibazar.com/billingcart-19-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-42-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-25-success", "isController": false}, {"data": [[1.69390596E12, 0.06666666666666667], [1.69390602E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.boibazar.com/book/misir-ali-unsolved-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69390602E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.18333333333333332, "minX": 1.69390596E12, "maxY": 7.15, "series": [{"data": [[1.69390596E12, 5.266666666666667], [1.69390602E12, 7.15]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69390596E12, 0.18333333333333332], [1.69390602E12, 0.5666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69390602E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
