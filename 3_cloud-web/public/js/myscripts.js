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

            case "Cookie":
                return (null);

            default: alert("No storage type!"); return (false);
        }
    },
    setItem: function(name, value){
        switch (this.type){
            case "LocalStorage":
                localStorage.setItem(name, JSON.stringify(value));
                return (true);

            case "Cookie":
                return (null);

            default: alert("No storage type!"); return (false);
        }
    },
    removeItem: function(name){
        switch (this.type){
            case "LocalStorage":
                localStorage.removeItem(name);
                return (true);

            case "Cookie":
                return (null);

            default: alert("No storage type!"); return (false);
        }
    }
};
myStorage.check();

function parseDate(dateRaw){
    let dateObj = new Date(dateRaw),
        H = dateObj.getHours(),
        M = dateObj.getMinutes(),
        s = dateObj.getSeconds();
    let dateString = H < 10 ? "0"+H : H; dateString += ":";
        dateString += M < 10 ? "0"+M : M; dateString += ":";
        dateString += s < 10 ? "0"+s : s;

    return (dateString);
}

function parseValue(valueRaw){
    return parseFloat( valueRaw.replace(/,/g, ".") );
}

function prepareSeries(data, field){
    let xSeries = [], ySeries = [];
    $.each(data, function(k,v){
        xSeries.push(parseDate(v.created_at));
        ySeries.push(parseValue(v[field]));
    });
    return [xSeries, ySeries];
}
