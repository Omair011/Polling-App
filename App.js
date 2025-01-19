import React, { useState, useEffect } from "react";
import PollForm from "./components/PollForm"; // Assuming these are your components
import PollList from "./components/PollList";
import PollResults from "./components/PollResults";
import { CONFIG } from "./config";

const App = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for polls
  const [error, setError] = useState(null); // Error state for fetching polls

  useEffect(() => {
    fetchPolls();
  }, []);

  // Fetch polls from the backend
  const fetchPolls = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear any previous error

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/polls`);
      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error("Error fetching polls:", error);
      setError("Error fetching polls. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle creating a new poll
  const handleCreatePoll = async (title, options) => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, options: options.map((text) => ({ text })) }),
      });

      if (response.ok) {
        fetchPolls(); // Refresh the list of polls
      } else {
        console.error("Failed to create poll");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  // Handle selecting a poll
  const handlePollSelect = async (pollId) => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/polls/${pollId}`);
      const data = await response.json();
      setSelectedPoll(data);
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  return (
    <div>
      <h1>Polling Application</h1>

      {/* Display PollForm to create a poll */}
      <PollForm onCreatePoll={handleCreatePoll} />

      {/* Show loading message if data is still being fetched */}
      {loading ? (
        <p>Loading polls...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <PollList polls={polls} onPollSelect={handlePollSelect} />
      )}

      {/* Display PollResults if a poll is selected */}
      {selectedPoll && <PollResults poll={selectedPoll} />}
    </div>
  );
};

export default App;
