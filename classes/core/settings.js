const fs = require("fs");
const fsp = require("fs").promises;

/**
 * @desc settings object is used to get and set all settings for poster
 * @returns {<object>} settings
 */
class Settings {
  constructor() {
    // default values
    this.password = "raidisnotabackup";
    this.slideDuration = 10;
    this.refreshPeriod = 120;
    this.playThemes = "true";
    this.genericThemes = "true";
    this.fade = "true";
    this.plexIP = "";
    this.plexHTTPS = "false";
    this.plexPort = 32400;
    this.plexToken = "";
    this.onDemandLibraries = "";
    this.numberOnDemand = 2;
    this.onDemandRefresh = 120;
    this.sonarrURL = "";
    this.sonarrToken = "";
    this.sonarrCalDays = 175;
    this.sonarrPremieres = "true";
    this.radarrURL = "";
    this.radarrToken = "";
    this.radarrCalDays = 30;

    return;
  }

  /**
   * @desc Gets all Poster settings
   * @returns {<object>} json - json object for all settings
   */
  async GetSettings() {
    // check if file exists before downloading
    if (!fs.existsSync("config/settings.json")) {
      //file not present, so create it with defaults

      await this.SaveSettings();
      console.log("✅ Config file created");
    }

    const data = await fsp.readFile("config/settings.json", "utf-8");
    console.log(`✅ Settings loaded
    `);
    
    let d;
    try{
      d = JSON.parse(data.toString());
    }
    catch(ex){
      // do nothing if error as it reads ok anyhow
    }
    //console.log(d);
    return d;
  }

  /**
   * @desc Saves settings if no settings file exists
   * @returns nothing
   */
  async SaveSettings() {
    // convert JSON object to string (pretty format)
    const data = JSON.stringify(this, null, 4);

    // write JSON string to a file
    fs.writeFile("config/settings.json", data, (err) => {
      if (err) {
        throw err;
      }
      // console.log("Settings saved.");
    });
    return;
  }

  /**
   * @desc Saves settings after changes from settings page
   * @param {object} json - takes a json object from the submitted form
   * @returns nothing
   */
  async SaveSettingsJSON(jsonObject) {
    // check object passed
    if (typeof jsonObject == "undefined") {
      throw error("JSON object not passed");
    }

    // load existing values
    const cs = this.GetSettings();
    // set passed in values from object. if value not passed, then use current settings
    if (jsonObject.password) this.password = jsonObject.password;
    else this.password = cs.password;
    if (jsonObject.slideDuration) this.slideDuration = jsonObject.slideDuration;
    else this.slideDuration = cs.slideDuration;
    if (jsonObject.refreshPeriod) this.refreshPeriod = jsonObject.refreshPeriod;
    else this.refreshPeriod = cs.refreshPeriod;
    if (jsonObject.themeSwitch) this.playThemes = jsonObject.themeSwitch;
    else this.playThemes = "false";
    if (jsonObject.genericSwitch) this.genericThemes = jsonObject.genericSwitch;
    else this.genericThemes = "false";
    if (jsonObject.fadeOption) this.fade = jsonObject.fadeOption;
    else this.fade = cs.fade;
    if (jsonObject.plexIP) this.plexIP = jsonObject.plexIP;
    else this.plexIP = cs.plexIP;
    if (jsonObject.plexHTTPSSwitch) this.plexHTTPS = jsonObject.plexHTTPSSwitch;
    else this.plexHTTPS = "false";
    if (jsonObject.plexPort) this.plexPort = jsonObject.plexPort;
    else this.plexPort = cs.plexPort;
    if (jsonObject.plexToken) this.plexToken = jsonObject.plexToken;
    else this.plexToken = cs.plexToken;
    if (jsonObject.plexLibraries)
      this.onDemandLibraries = jsonObject.plexLibraries;
    else this.onDemandLibraries = cs.onDemandLibraries;
    if (jsonObject.numberOnDemand)
      this.numberOnDemand = jsonObject.numberOnDemand;
    else this.numberOnDemand = cs.numberOnDemand;
    if (jsonObject.onDemandRefresh)
      this.onDemandRefresh = jsonObject.onDemandRefresh;
    else this.onDemandRefresh = cs.onDemandRefresh;
    if (jsonObject.sonarrUrl) this.sonarrURL = jsonObject.sonarrUrl;
    else this.sonarrURL = cs.sonarrURL;
    if (jsonObject.sonarrToken) this.sonarrToken = jsonObject.sonarrToken;
    else this.sonarrToken = cs.sonarrToken;
    if (jsonObject.sonarrDays) this.sonarrCalDays = jsonObject.sonarrDays;
    else this.sonarrCalDays = cs.sonarrCalDays;
    if (jsonObject.premiereSwitch)
      this.sonarrPremieres = jsonObject.premiereSwitch;
    else this.sonarrPremieres = cs.sonarrPremieres;
    if (jsonObject.radarrUrl) this.radarrURL = jsonObject.radarrUrl;
    else this.radarrURL = cs.radarrURL;
    if (jsonObject.radarrToken) this.radarrToken = jsonObject.radarrToken;
    else this.radarrToken = cs.radarrToken;
    if (jsonObject.radarrDays) this.radarrCalDays = jsonObject.radarrDays;
    else this.radarrCalDays = cs.radarrCalDays;

    // convert JSON object to string (pretty format)
    const data = JSON.stringify(this, null, 4);

    // write JSON string to a file
    fs.writeFile("config/settings.json", data, (err) => {
      if (err) {
        throw err;
      }

      let d = new Date();
      console.log(d.toLocaleString() + " Settings saved.");
    });


    return;
  }
}

module.exports = Settings;