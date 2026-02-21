import { useState } from "react";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function JobItem({ job }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus("");

    console.log({
  uuid: "5b90f301-c612-4426-9256-ddb5f7fcbf3f",
  candidateId: "74263702005",
  jobId: job.id,
  repoUrl: repoUrl,
});

    try {
      const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: "5b90f301-c612-4426-9256-ddb5f7fcbf3f",
          candidateId: "74263702005",
          jobId: job.id,
          repoUrl: repoUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
  console.log("API ERROR:", data);
  throw new Error(JSON.stringify(data));
}

      setStatus("Application submitted successfully ✅");
    } catch (error) {
      setStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "15px",
      }}
    >
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="Enter GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}

export default JobItem;