import React, { useEffect, useCallback } from "react";

const MostLikedComments = ({ state = {}, setState = () => {} }) => {
  const { data, loading, error, loaded } = state;

  const fetchMostLiked = useCallback(() => {
    const videoId = localStorage.getItem("selectedVideoId");

   if (!videoId) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p>
          No video selected. Please go to the <strong>Channel Info</strong> page
          and click the <em>Get Analysis</em> button.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          Go to Channel Info
        </button>
      </div>
    );
  }

    setState({
      data: null,
      error: null,
      loading: true,
      loaded: false,
    });

    fetch(`https://new-youtube-gygl.onrender.com/most_liked?video_id=${videoId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((json) =>
        setState({
          data: json.top_comments,
          loading: false,
          error: null,
          loaded: true,
        })
      )
      .catch((err) =>
        setState({
          data: null,
          loading: false,
          error: err.message,
          loaded: false,
        })
      );
  }, [setState]);

  useEffect(() => {
    if (!loaded && !loading) {
      fetchMostLiked();
    }
  }, [loaded, loading, fetchMostLiked]);

  if (loading) return <p>Loading most liked comments...</p>;

  if (error) {
    return (
      <div style={{ color: "red", maxWidth: "800px", margin: "0 auto" }}>
        <p>Error: {error}</p>
        <button
          onClick={fetchMostLiked}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    const videoId = localStorage.getItem("selectedVideoId");
    if (!videoId) {
      return (
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <p>
            No video selected. Please go to the <strong>Channel Info</strong>{" "}
            page and click the <em>Get Analysis</em> button.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#f8f8f8",
              cursor: "pointer",
            }}
          >
            Go to Channel Info
          </button>
        </div>
      );
    }
    return <p>No data to display.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Most Liked Comments</h2>
      {["most_liked_question", "most_liked_request", "most_liked_feedback"].map(
        (key) => {
          const comment = data[key];
          if (!comment || !comment.text) return null;

          const label = key
            .replace("most_liked_", "")
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <div
              key={key}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <h4>{label}</h4>
              <p style={{ marginBottom: "0.5rem" }}>{comment.text}</p>
              <small>👍 {comment.like_count} likes</small>
            </div>
          );
        }
      )}
    </div>
  );
};

export default MostLikedComments;
