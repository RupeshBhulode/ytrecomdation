import React, { useEffect, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../pagecss/VideoAnalysis.css";

ChartJS.register(ArcElement, Tooltip, Legend);
//import "../pagecss/VideoAnalysis.css";

const VideoAnalysis = ({ state, setState }) => {
  const { videoId, isPremium, data, loading, error, loaded } = state;

  const fetchAnalysis = useCallback(() => {
    const storedVideoId = localStorage.getItem("selectedVideoId");
    const channelDataRaw = localStorage.getItem("channelInfoState");

    if (!storedVideoId || !channelDataRaw) {
      setState((prev) => ({
        ...prev,
        error: "Missing video ID or channel info.",
        loading: false,
      }));
      return;
    }

    let isPremiumFromStorage = false;
    try {
      const parsed = JSON.parse(channelDataRaw);
      isPremiumFromStorage = parsed?.isPremium || false;
    } catch (e) {
      console.error("Error parsing channelInfoState:", e);
    }

    setState((prev) => ({
      ...prev,
      videoId: storedVideoId,
      isPremium: isPremiumFromStorage,
      loading: true,
      error: null,
    }));

    (async () => {
      try {
        const res = await fetch(
          `https://new-youtube-gygl.onrender.com/video_analysis?video_id=${storedVideoId}&is_premium=${isPremiumFromStorage}`
        );
        const json = await res.json();

        setState((prev) => ({
          ...prev,
          data: json,
          loaded: true,
          loading: false,
          error: null,
        }));
      } catch (err) {
        let message = err.message;
        if (message === "Failed to fetch") {
          message = "Comments are disabled for this video.";
        }
        setState((prev) => ({
          ...prev,
          error: message,
          loading: false,
        }));
      }
    })();
  }, [setState]);

  useEffect(() => {
    const storedVideoId = localStorage.getItem("selectedVideoId");
    if (!storedVideoId) {
      return;
    }
    if (storedVideoId !== videoId || !loaded) {
      fetchAnalysis();
    }
  }, [fetchAnalysis, videoId, loaded, setState]);

  if (loading && !data) {
    return <p className="video-loading">Loading video analysis...</p>;
  }

  if (error) {
    return (
      <div className="video-error">
        <p>Error: {error}</p>
        <button onClick={fetchAnalysis}>Retry</button>
      </div>
    );
  }

  if (!data) {
    if (!videoId) {
      return (
        <div className="video-empty">
          <p>
            No video selected. Please go to the <strong>Channel Info</strong>{" "}
            page and click the <em>Get Analysis</em> button.
          </p>
          <button onClick={() => (window.location.href = "/")}>
            Go to Channel Info
          </button>
        </div>
      );
    }
    return <p className="video-empty">No video analysis data to display.</p>;
  }

  const pieData = {
    labels: ["Hate Speech", "Questions", "Requests", "Feedback"],
    datasets: [
      {
        data: [
          data.pie_chart_data.hate_speech || 0,
          data.pie_chart_data.questions || 0,
          data.pie_chart_data.requests || 0,
          data.pie_chart_data.feedback || 0,
        ],
        backgroundColor: ["#ff4d4d", "#4da6ff", "#ffc34d", "#4dff88"],
      },
    ],
  };

  return (
    <div className="video-analysis-container">
      <h2>Video Analysis</h2>




<div className="video-header">
  <div className="video-info">
    <h3>{data.title}</h3>
    <img
      src={data.thumbnail_url}
      alt="Thumbnail"
      className="video-thumbnail"
    />
  </div>
  <div className="video-piechart">
    <Pie data={pieData} />
  </div>
</div>








      <h4>Comment Classification Summary</h4>
      <table className="video-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.pie_chart_data).map(([label, value]) => (
            <tr key={label}>
              <td>{label.replace("_", " ")}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Top Comments</h4>


      <div className="video-comments">
  {["questions", "requests", "feedback"].map((type) => (
    <CommentList key={type} type={type} comments={data.summaries[type]} />
  ))}
</div>




    </div>
  );
};

const CommentList = ({ type, comments }) => {
  if (!comments || comments.length === 0) return null;

  return (

<div className="video-comments-card">
  <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
  <ul>
    {comments.map((comment, idx) => (
      <li key={idx}>{comment}</li>
    ))}
  </ul>
</div>


  );
};

export default VideoAnalysis;
