$(function(){
    let i = 1;
    // myStorage.removeItem("TSdata-dashboard");
    let prepareDashboard = function(data, channelNo){

        $("#sensors .row").append('<div class="col-xs-12">' +
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">' +
                        '<h3>Kanał: ' + data.channel.name + '</h3>' +
                    '</div>' +
                    '<div class="panel-body">' +
                        '<p>Ostania aktualizacja kanału: <span class="channel-last-update">' + parseFullDate(data.channel.updated_at) + '</span></p>' +
                        '<p><span class="channel-description">' + data.channel.description + '</span></p>' +
                    '</div>' +
                '</div>' +
            '</div>');

        let sensorNo = 1;
        while (data.channel["field"+sensorNo]) {
            let sensorName = data.channel["field"+sensorNo];
            let feedHTML = '<div id="sensor' + i + '" class="sensor col-md-6 col-xs-12">\
                    <a class="overlayLink" href="report.html?channel=' + channelNo + '&sensor=' + sensorNo+ '"></a>\
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

            let series = prepareSeries(data.feeds, "field" + sensorNo),
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
                    name: "Czas odczytu (HH:MM)",
                    data: ySeries
                }]
            });

            i++; sensorNo++;
        }
    };

    let TSdata_dashboard = myStorage.getItem("TSdata-dashboard");
    // console.log(TSdata_dashboard);
    if (!TSdata_dashboard){

        $.each(config.TSread, function (k,v) {

            $.ajax({
                cache: true,
                type: "GET",
                url: "https://api.thingspeak.com/channels/" + v.ChannelID + "/feeds.json?api_key=" + v.ApiKey + "&results=" + config.lastFeeds,
                dataType: "json",
                success: function(data){
                    // myStorage.setItem("TSdata-dashboard", data);
                    prepareDashboard(data, parseInt(k)+1);
                },
                error: function(){

                }
            });

        });


    } else {
        prepareDashboard(TSdata_dashboard);
    }

});
