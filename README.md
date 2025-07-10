💬 MERN Chat App
A real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO. It supports secure authentication with JWT, private messaging, typing indicators, and a responsive user interface.

🚀 Features
🔒 JWT-based authentication (Signup/Login)

💬 Real-time private messaging using WebSockets

✍️ Typing indicators

📱 Responsive UI for desktop and mobile

🧠 RESTful API architecture

🗂️ MongoDB for storing users and messages

☁️ Cloudinary image upload for profile pictures

⚡ Improved performance using optimized MongoDB queries

🛠️ Tech Stack
Frontend

React.js

Axios

React Router DOM

Tailwind CSS

React Hot Toast

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

Bcrypt.js (password hashing)

JSON Web Tokens (JWT)

Cloudinary (image hosting)

dotenv




.
├── client             # React frontend
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       ├── context
│       └── App.jsx
├── server             # Node/Express backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── index.js
└── .env


git clone https://github.com/yourusername/chat-app.git
cd chat-app



PORT=5000
MONGODB_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret


cd server
npm install
npm run dev




cd ../client
npm install
npm run dev



🌐 Deployment
You can deploy the frontend to Vercel or Netlify, and the backend to Render, Railway, or Heroku.

📈 Performance
✅ Improved API response time by 20% using optimized MongoDB queries and schema indexing.

🙋‍♂️ Author
Akshay Shahare
💼 Full Stack Developer | MERN | Backend | Chat App
📧 shahare.akshay002@gmail.com
🌐 LinkedIn

📃 License
This project is licensed under the MIT License.
