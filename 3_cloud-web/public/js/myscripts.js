$(function(){

    $.ajax({
        type: "GET",
        url: "https://api.thingspeak.com/channels/" + TSChannelID + "/feeds.json?api_key=" + TSReadAPIKey + "&results=" + TSLastsFeeds,
        dataType: "json",
        success: function(data){
            console.log(data.feeds);
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
                                \
                            </div>\
                        </div>\
                    </div>';
                $("#sensors .row").append(feedHTML);
                i++;
            } while (data.channel["field"+i]);

            $.each(data.feeds, function(k,v){
                console.log(k + ": " + v.entry_id);
            });
        },
        error: function(){

        }
    });

});
