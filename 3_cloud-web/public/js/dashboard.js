$(function(){
    // myStorage.removeItem("TSdata-dashboard");
    let prepareDashboard = function(data){
        $(".channel-name").html(data.channel.name);
        $(".channel-last-update").html(new Date(data.channel.updated_at));
        $(".channel-description").html(data.channel.description);

        let i = 1;
        do {
            let sensorName = data.channel["field"+i];

            let feedHTML = '<div id="sensor' + i + '" class="sensor col-md-6 col-xs-12">\
                    <a class="overlayLink" href="report/' + i + '"></a>\
                    <div class="panel panel-default">\
                        <div class="panel-heading">\
                            <h4>' + sensorName + '</h4>\
                        </div>\
                        <div class="panel-body">\
                            <div id="sensor' + i + '-chart"></div>\
                        </div>\
                    </div>\
                </div>';
            $("#sensors .row").append(feedHTML);

            let series = prepareSeries(data.feeds, "field" + i),
                xSeries = series[0], ySeries = series[1];

            Highcharts.chart("sensor" + i + "-chart", {
                title: { text: "" },
                subtitle: { text: "" },
                xAxis: { categories: xSeries },
                yAxis: {
                    title: { text: "Wartość odczytu" }
                },
                legend: { enabled: false },
                plotOptions: {
                    line: {
                        dataLabels: { enabled: true },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: "Czas odczytu (HH:MM:ss)",
                    data: ySeries
                }]
            });

            i++;
        } while (data.channel["field"+i]);
    };

    let TSdata_dashboard = myStorage.getItem("TSdata-dashboard");
    console.log(TSdata_dashboard);
    if (!TSdata_dashboard){
        $.ajax({
            cache: true,
            type: "GET",
            url: "https://api.thingspeak.com/channels/" + TSChannelID + "/feeds.json?api_key=" + TSReadAPIKey + "&results=" + TSLastsFeeds,
            dataType: "json",
            success: function(data){
                myStorage.setItem("TSdata-dashboard", data);
                prepareDashboard(data);
            },
            error: function(){

            }
        });
    } else {
        prepareDashboard(TSdata_dashboard);
    }

});
