import { useState, useEffect } from "react";
import "../styles/events.css"; // Make sure this file exists

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        // Reverse to show last-added first
        setEvents(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="events-loading">Loading events...</div>;
  if (error) return <div className="events-error">Error: {error}</div>;

  return (
    <div className="events-container">
      <h1>All Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div className="event-card" key={event._id}>
            <h2>{event.title}</h2>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toDateString()}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Host:</strong> {event.host}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
