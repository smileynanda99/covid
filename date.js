module.exports.dates_compare = (date1, date2) => {
    if (date1 > date2) return (false);
    else if (date1 < date2) return (true);
    else return (true);
}

module.exports.date_formate = (date) => {
    return ((date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()));
}

module.exports.date_increment = async(date) => {
    // console.log("increment");
    var ar = date.split("/");
    date = new Date(ar[1] + "/" + ar[0] + "/" + ar[2]);
    date.setDate(date.getDate() + 1);
    return this.date_formate(date);
}