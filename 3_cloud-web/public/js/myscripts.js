$(function(){
    let myStorage = {
        type: null,
        check: function(){
            if (typeof(Storage) !== "undefined") {
                this.type = "LocalStorage";
            } else {
                this.type = "Cookie";
            }
        },
        getItem: function(name){
            switch (this.type){
                case "LocalStorage":
                    return JSON.parse(localStorage.getItem(name));
                    break;

                case "Cookie":
                    return (null);
                    break;

                default: alert("No storage type!"); return (false);
            }
        },
        setItem: function(name, value){
            switch (this.type){
                case "LocalStorage":
                    localStorage.setItem(name, JSON.stringify(value));
                    return (true);
                    break;

                case "Cookie":
                    return (true);
                    break;

                default: alert("No storage type!"); return (false);
            }
        }
    };
    myStorage.check();

    let prepareDashboard = function(data){
        console.log(data);
        // console.log(new Date(data.channel.updated_at).toISOString());
        $(".channel-name").html(data.channel.name);
        $(".channel-last-update").html(new Date(data.channel.updated_at));
        $(".channel-description").html(data.channel.description);

        let i = 1;
        do {
            let sensorName = data.channel["field"+i];

            let feedHTML = '<div id="sensor' + i + '" class="sensor col-md-6 col-xs-12">\
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

            let xSeries = [], ySeries = [];
            $.each(data.feeds, function(k,v){
                let dateObj = new Date(v.created_at),
                    H = dateObj.getHours(),
                    M = dateObj.getMinutes(),
                    s = dateObj.getSeconds();

                dateString = H < 10 ? "0"+H : H; dateString += ":";
                dateString += M < 10 ? "0"+M : M; dateString += ":";
                dateString += s < 10 ? "0"+s : s;

                xSeries.push(dateString);
                ySeries.push(parseFloat(v["field"+i]));
            });

            Highcharts.chart("sensor" + i + "-chart", {
                title: {
                    text: ""
                },
                subtitle: {
                    text: ""
                },
                xAxis: {
                    categories: xSeries
                },
                yAxis: {
                    title: {
                        text: "Wartość odczytu"
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
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

    if (!myStorage.getItem("TSdata-dashboard")){
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
        prepareDashboard(myStorage.getItem("TSdata-dashboard"));
    }

});
