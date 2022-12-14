export var gapi = window.gapi;
var CLIENT_ID =
  "301465174403-ia1glbjf82ecjrc55qmnl4398oh76q0t.apps.googleusercontent.com";
var API_KEY = "AIzaSyAp_Tp0fjrQOiyfqeUMbAazcLqNkwale54";
var DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

var SCOPES = "https://www.googleapis.com/auth/calendar.events";

export function loadClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOC,
    scope: SCOPES,
    plugin_name: "PLUGIN",
  });

  gapi.client.load("calendar", "v3", () => console.log("loaded!"));
}
