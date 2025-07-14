import { useState } from "react";

const SubmitURL = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setUrl("");
    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste article URL"
        className="border px-4 py-2 rounded w-full mb-2"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Summarizing..." : "Submit"}
      </button>
    </div>
  );
};

export default SubmitURL;
