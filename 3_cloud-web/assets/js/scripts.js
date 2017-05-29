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

function parseFullDate(dateRaw){
    let dateObj = new Date(dateRaw),
        y = dateObj.getFullYear(),
        m = dateObj.getMonth()+1,
        d = dateObj.getDate(),
        H = dateObj.getHours(),
        M = dateObj.getMinutes(),
        s = dateObj.getSeconds();
    let dateString = y; dateString += "-";
    dateString += m < 10 ? "0"+m : m; dateString += "-";
    dateString += d < 10 ? "0"+d : d; dateString += " ";
    dateString += H < 10 ? "0"+H : H; dateString += ":";
    dateString += M < 10 ? "0"+M : M; dateString += ":";
    dateString += s < 10 ? "0"+s : s;

    return (dateString);
}
function parseTime(dateRaw){
    let dateObj = new Date(dateRaw),
        H = dateObj.getHours(),
        M = dateObj.getMinutes();
    let dateString = H < 10 ? "0"+H : H; dateString += ":";
    dateString += M < 10 ? "0"+M : M;

    return (dateString);
}

function parseValue(valueRaw){
    return parseFloat( valueRaw.replace(/,/g, ".") );
}

function prepareSeries(data, field, dateType = "short"){
    let xSeries = [], ySeries = [];
    $.each(data, function(k,v){
        if (dateType === "short") {
            xSeries.push(parseTime(v.created_at));
        } else if (dateType === "full"){
            xSeries.push(parseFullDate(v.created_at));
        }
        ySeries.push(parseValue(v[field] === null ? "0" : v[field]));
    });
    return [xSeries, ySeries];
}

function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i,
        result = false;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            result = sParameterName[1] === undefined ? true : sParameterName[1];
            break;
        }
    }

    return (result);
}
