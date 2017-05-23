$(function(){
    // myStorage.removeItem("TSsensor" + sensorID);
    let prepareSensorReport = function(data){
        $("h1 span").html(data.channel["field" + sensorID]);
        $(".channel-name").html(data.channel.name);
        $(".channel-last-update").html(new Date(data.channel.updated_at));
        $(".channel-description").html(data.channel.description);

        let series = prepareSeries(data.feeds, "field" + sensorID),
            xSeries = series[0], ySeries = series[1];

        Highcharts.chart("sensor", {
            chart: { zoomType: "x" },
            title: { text: "" },
            subtitle: { text: document.ontouchstart === undefined ? "Kliknij i przeciągnij aby przybliżyć obszar na wykresie" : "Dotknij i przeciągnij aby przybliżyć obszar na wykresie" },
            xAxis: { categories: xSeries },
            yAxis: {
                title: { text: "Wartość odczytu" }
            },
            legend: { enabled: false },
            plotOptions: {
                line: {
                    marker: { radius: 2 },
                    lineWidth: 1,
                    states: {
                        hover: { lineWidth: 1 }
                    },
                    threshold: null
                }
            },
            series: [{
                name: "Wartość:",
                data: ySeries
            }]
        });
    };

    let TSsensorData = myStorage.getItem("TSsensor" + sensorID);
    console.log(TSsensorData);
    if (!TSsensorData){
        $.ajax({
            cache: true,
            type: "GET",
            url: "https://api.thingspeak.com/channels/" + TSChannelID + "/fields/" + sensorID + ".json?api_key=" + TSReadAPIKey,
            dataType: "json",
            success: function(data){
                myStorage.setItem("TSsensor" + sensorID, data);
                prepareSensorReport(data);
            },
            error: function(){

            }
        });
    } else {
        prepareSensorReport(TSsensorData);
    }

});
