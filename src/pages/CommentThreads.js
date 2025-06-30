import React, { useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CommentThreads = ({ state, setState }) => {
  const { videoId, isPremium, data, loading, error, loaded } = state;

  const fetchTrend = useCallback(() => {
    const videoIdFromStorage = localStorage.getItem("selectedVideoId");

    if (!videoIdFromStorage) {
      setState({
        ...state,
        data: [],
        loading: false,
        error: "No video ID found in local storage.",
        loaded: false,
      });
      return;
    }

    const channelDataRaw = localStorage.getItem("channelInfoState");
    let isPremiumLocal = false;

    if (!channelDataRaw) {
      setState({
        ...state,
        data: [],
        loading: false,
        error: "Missing channel info in local storage.",
        loaded: false,
      });
      return;
    }

    try {
      const parsed = JSON.parse(channelDataRaw);
      isPremiumLocal = parsed?.isPremium || false;
    } catch (e) {
      console.error("Error parsing channelInfoState:", e);
      setState({
        ...state,
        data: [],
        loading: false,
        error: "Invalid channel info data.",
        loaded: false,
      });
      return;
    }

    setState({
      ...state,
      loading: true,
      error: null,
      loaded: false,
    });

    fetch(
      `https://new-youtube-gygl.onrender.com/comment_trend?video_id=${videoIdFromStorage}&is_premium=${isPremiumLocal}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const trend = (json?.days || []).map((d) => ({
          date: d.date,
          comments: d.comment_count,
        }));
        setState({
          ...state,
          videoId: videoIdFromStorage,
          isPremium: isPremiumLocal,
          data: trend,
          loading: false,
          error: null,
          loaded: true,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          data: [],
          loading: false,
          error: err.message,
          loaded: false,
        });
      });
  }, [setState, state]);

  useEffect(() => {
    if (!loaded && !loading) {
      fetchTrend();
    }
  }, [loaded, loading, fetchTrend]);

  // No video selected
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

  if (loading) return <p>Loading comment trend...</p>;

  if (error) {
    return (
      <div style={{ color: "red", maxWidth: "800px", margin: "0 auto" }}>
        <p>Error: {error}</p>
        <button
          onClick={fetchTrend}
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

  if (!data || data.length === 0)
    return <p>No comment trend data to display.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2>Comment Trend Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tick={({ x, y, payload }) => {
              const dateObj = new Date(payload.value);
              const day = dateObj.getDate().toString().padStart(2, "0");
              const month = dateObj.toLocaleString("default", {
                month: "short",
              });
              return (
                <text x={x} y={y + 10} textAnchor="middle" fill="#666">
                  <tspan x={x} dy="0">{day}</tspan>
                  <tspan x={x} dy="14">{month}</tspan>
                </text>
              );
            }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="comments"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommentThreads;
