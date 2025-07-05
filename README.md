
# TubeLens Frontend

TubeLens is a web application that helps you **analyze YouTube comments effortlessly**. The frontend, built with **React.js**, provides an intuitive interface to explore video engagement, visualize trends, and display categorized comments in real time.

---

![Screenshot 2025-07-03 114000](https://github.com/user-attachments/assets/d8457d59-d6b8-4ec3-a44f-8a95bfffde84)
![Screenshot 2025-07-03 114020](https://github.com/user-attachments/assets/52cf64df-e2bb-4524-9ee1-19aa3a1ce8f8)
![Screenshot 2025-07-03 114033](https://github.com/user-attachments/assets/82edc04f-7af4-4c6f-88b8-ea58812fb9c8)
![Screenshot 2025-07-03 114100](https://github.com/user-attachments/assets/367880ea-c7ee-4816-aabc-9e61aad71a2d)
![Screenshot 2025-07-03 114123](https://github.com/user-attachments/assets/1c4e69b9-709f-418a-bdeb-2e037744a3a8)
![Screenshot 2025-07-03 114154](https://github.com/user-attachments/assets/5301f741-3e91-40dc-a78c-55d5ba61d6dd)
![Screenshot 2025-07-03 114211](https://github.com/user-attachments/assets/4d59cab2-d16f-4ccc-ae5c-f9e63c6024ed)
![Screenshot 2025-07-03 114238](https://github.com/user-attachments/assets/18f0a465-3241-4a21-9a9e-5da179ec532a)
![Screenshot 2025-07-03 114256](https://github.com/user-attachments/assets/da228d77-6652-498b-a135-751788bd861f)
![Screenshot 2025-07-03 114310](https://github.com/user-attachments/assets/eddbbd53-c022-4a11-9c8f-6e25283b2eff)
![Screenshot 2025-07-03 114328](https://github.com/user-attachments/assets/30cb887d-238a-40dc-b8de-98addfec8ba3)
![Screenshot 2025-07-03 114349](https://github.com/user-attachments/assets/93b1ee85-22c9-4ee0-bcb2-c7bb46f7c25c)



## ✨ Features

✅ **Search YouTube videos** by URL or ID  
✅ **Fetch and display comments** in a clean UI  
✅ **Show comment categories**:
- Hate Speech
- Requests
- Questions
- Feedback  

✅ **Visualize trends** with multi-line charts  
✅ **See most liked comments** grouped by sentiment  
✅ **View comment activity** over 7 or 30 days  
✅ **Dark mode / light mode** toggle *(if implemented)*  

---

## 🛠️ Technologies Used

- **React.js** – UI framework
- **Axios** – HTTP client to communicate with the FastAPI backend
- **Chart.js / Recharts** – Data visualizations
- **Material-UI / Tailwind CSS** – Styling and components
- **YouTube Data API** – Fetching video and channel metadata

---


## 🎯 Problems Solved

**Problem 1: Overwhelming Volume of Comments**

> **Challenge:**  
Popular YouTubers often receive thousands of comments per video, making it nearly impossible to manually read, categorize, and respond effectively.

✅ **How TubeLens Solves It:**  
Automatically fetches all comments and classifies them into clear categories (Hate Speech, Questions, Requests, Feedback) so creators can focus on what matters most.

---

**Problem 2: Detecting Hate Speech and Toxic Comments**

> **Challenge:**  
Hate speech or abusive language can damage a creator’s reputation and community health if not addressed promptly.

✅ **How TubeLens Solves It:**  
Uses machine learning models to **detect and flag hate speech**, allowing creators to moderate quickly and maintain a positive environment.

---

**Problem 3: Missing Audience Requests and Questions**

> **Challenge:**  
Important questions or requests get buried among general comments, leading to missed opportunities for engagement.

✅ **How TubeLens Solves It:**  
Highlights comments that are identified as **requests or questions**, helping creators prioritize responses and improve audience satisfaction.

---

**Problem 4: Lack of Insights into Engagement Trends**

> **Challenge:**  
Creators often don’t have clear visibility into how comment activity changes over time or across videos.

✅ **How TubeLens Solves It:**  
Provides **visual trends and charts** showing comment volume and categories over 7 or 30 days, empowering data-driven content strategies.

---

**Problem 5: Identifying High-Impact Feedback**

> **Challenge:**  
Constructive feedback can be scattered among thousands of comments and easily overlooked.

✅ **How TubeLens Solves It:**  
Filters and surfaces the **most liked feedback comments**, making it easy to understand what resonates with viewers.

---






