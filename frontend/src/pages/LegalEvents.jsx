import React from 'react';
import '../css/LegalEvents.css';

const events = [
  {
    title: "International Legal Summit",
    date: "2025-05-15",
    description: "A conference covering global legal reforms and digital law.",
  },
  {
    title: "Family Law Awareness Week",
    date: "2025-06-01",
    description: "Workshops and talks on family and custody law.",
  },
  {
    title: "Cyber Law Conference",
    date: "2025-07-10",
    description: "Event on cybersecurity laws and digital evidence handling.",
  },
];

const LegalEvents = () => {
  return (
    <div className="events-page">
      <h2>Upcoming Legal Events</h2>
      {events.map((event, index) => (
        <div key={index} className="event-card">
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p>{event.description}</p>
          <button className="register-btn">Register</button>
        </div>
      ))}
    </div>
  );
};

export default LegalEvents;
