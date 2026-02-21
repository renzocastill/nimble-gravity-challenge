import { useEffect, useState } from "react";
import JobItem from "./components/JobItem";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

        if (!response.ok) {
          throw new Error("Error fetching jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading positions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Open Positions</h1>

      {jobs.map((job) => (
  <JobItem key={job.id} job={job} />
))}
    </div>
  );
}

export default App;