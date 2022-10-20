import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  var gapi = window.gapi;
  var CLIENT_ID =
    "301465174403-ia1glbjf82ecjrc55qmnl4398oh76q0t.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAp_Tp0fjrQOiyfqeUMbAazcLqNkwale54";
  var DISCOVERY_DOC = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(startDate);

    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOC,
        scope: SCOPES,
        plugin_name: "PLUGIN",
      });

      gapi.client.load("calendar", "v3", () => console.log("loaded!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: startDate,
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: endDate,
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          console.log("ban!");

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  //

  return (
    <div className="App">
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control placeholder="Event Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control placeholder="Describe Your Event" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Date and Time</Form.Label>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Add Event
        </Button>
      </Form>
    </div>
  );
}

export default App;
