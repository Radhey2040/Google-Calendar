import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { gapi, loadClient } from "./utils";

export default function GoogleCalendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(startDate);

    gapi.load("client:auth2", () => {
      console.log("loaded client");

      loadClient();

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

  const getEvents = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      loadClient();

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          //get events
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((res) => {
              const events = res.result.items;
              console.log("EVENTS", events);
            });
        });
    });
  };
  return (
    <div>
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
        <Button onClick={getEvents} className="btn btn-primary">
          Get Events
        </Button>
      </Form>
    </div>
  );
}
