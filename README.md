```markdown
# 🌐 Animated Business Website with Static JSON Server

A fully animated, responsive, and professional business website built using **Vite + ReactJS**, tailored to showcase company services like:

- ✅ WordPress Website Development  
- ✅ Web Development  
- ✅ Logo Design  
- ✅ Banner Design  

This project uses a single static file `mainServer.json` to simulate real-time data, providing a **dynamic and interactive experience** without a backend database.

---

## 🚀 Features

### 🖥️ Website

1. **Dynamic Look & Feel** – Smooth animations on cards, sections, and scrolls using Framer Motion & CSS  
2. **Landing Animation** – Beautiful intro animation when the website loads  
3. **Fully Responsive** – Optimized for desktop, tablet, and mobile  
4. **Separate Pages** – Clean routing with individual pages for:
   - Home
   - About
   - Services
   - Team
   - Subscription
   - Contact  
5. **Professional Design** – Clean layout with a modern, business-grade aesthetic  
6. **Static Data-Driven** – All content (team members, subscriptions, etc.) is fetched from a local JSON file  
7. **Rich Content** – Every section is filled with relevant, structured information

---

## 📁 Folder Structure

```

project-root/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.jsx
├── mainServer.json
├── server.js
├── package.json
└── README.md

````

---

## 🛠️ Getting Started

Follow these steps to run the project locally:

### 1️⃣ Install all dependencies

```bash
npm install
````

### 2️⃣ Start the Vite development server

```bash
npm run dev
```

### 3️⃣ Start the JSON server to serve static data

```bash
npx json-server mainServer.json --port 8000
```

### 4️⃣ (Optional) Start the custom Express server

```bash
node server.js
```

> 💡 Ensure all ports are available and not blocked by another process.

---

## ⚙️ Technologies Used

* [Vite](https://vitejs.dev/)
* [ReactJS](https://reactjs.org/)
* [Framer Motion](https://www.framer.com/motion/)
* [React Router](https://reactrouter.com/)
* [JSON Server](https://github.com/typicode/json-server)
* [Node.js](https://nodejs.org/)
* [Express (Optional)](https://expressjs.com/)

---

## 📦 mainServer.json Structure

The entire website content is served from one central file: `mainServer.json`.
This file contains:

* Website Name
* Logo URL
* Team Members
* Subscription Plans
* Orders (with status)
* Contact Information
* Services Offered

All updates to the website content can be managed directly from this single file.

---

## 📸 Screenshots

> *Coming Soon*
> *Add live previews or screenshots here for better presentation.*

---

## 🤝 Contributing

Have suggestions or want to add features? Feel free to fork the repo and create a pull request. All contributions are welcome!

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Developed by Ayush Anand**
💼 Website Developer | 💻 Full-Stack Developer

* 🌐 [LinkedIn](https://www.linkedin.com/in/ayushanand2006/)
* 📧 [Email](ayushanand.official2006@gmail.com)

---

> ⚠️ *This is a front-end only project using simulated backend with JSON Server. There is no real-time database or authentication included.*

```

---

Let me know if you'd like a downloadable version (`README.md` file) or help with GitHub formatting preview!
```
