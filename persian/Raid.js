

function Raid(text) {
    /**
     * Private function to extract a date from the text according to a regex.
     */
    _getDate = function _getDate(text, regex) {
        var matches = regex.exec(text);
        var date = new Date();
        
    
        var hours = parseInt(matches[1]);
        if (matches[4] == 'PM') {
            hours += 12;
        }
    
        date.setHours(hours, parseInt(matches[2]), parseInt(matches[3]));

        return date;
    }

    // Get basic information from the first line of the raid.
    var firstLineRegex = /(\[(.*)\] )?<strong>(.*)<\/strong> - Level: (\d) - CP: (\d*)/;
    var firstLineMatches = firstLineRegex.exec(text);
    this.pokemon = firstLineMatches[3];
    this.level = firstLineMatches[4];
    this.cp = firstLineMatches[5];

    // TODO: moveset.

    // Find start and end time of the raid.
    var startRegex = /<strong>Start<\/strong>: (\d{2}):(\d{2}):(\d{2})(PM|AM)/;
    this.startTime = _getDate(text, startRegex);

    var endRegex = /<strong>End<\/strong>: (\d{2}):(\d{2}):(\d{2})(PM|AM)/;
    this.endTime = _getDate(text, endRegex);

    // TODO: location.
    var addressRegex = /<strong>Address<\/strong>: (.*)/;
    var addressMatches = addressRegex.exec(text);
    this.address = addressMatches[1];

    var mapRegex = /<strong>Map<\/strong>: .*href="(.*)" target=.*/;
    var mapMatches = mapRegex.exec(text);
    this.mapUrl = mapMatches[1];

    var googleMapRegex = /<strong>Google Map<\/strong>: .*href="(.*)" target=.*/;
    var googleMapMatches = googleMapRegex.exec(text);
    this.googleMapUrl = googleMapMatches[1];
}

Raid.prototype.GetMinutesLeft = function GetMinutesLeft() {
    var diffMilli = this.endTime - Date.now();
    var diffMinutes = parseInt(diffMilli / (1000 * 60));

    return diffMinutes;
}

Raid.prototype.GetDescription = function GetDescription() {
    return "**" + this.pokemon + "** ending in **" +  this.GetMinutesLeft() + " minutes** at __**" + this.address + "**__";
}

Raid.prototype.GetMeowthCommand = function GetMeowthCommand() {
    var minutesLeft = this.GetMinutesLeft();
    var command = "!raid " + this.pokemon + " " + this.address + " " + minutesLeft;
    return command;
}

module.exports = Raid;