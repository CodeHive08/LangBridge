# 💻 LangBridge

A **Mini Compiler** built with a modern tech stack that allows users to write, compile, and execute code directly from the browser. This project supports multiple programming languages using a web-based interface.

## 🚀 Features

- 🌐 Web-based code editor with syntax highlighting
- ⚙️ Real-time code compilation and execution
- 💬 Supports multiple programming languages
- 🎨 Clean and responsive UI

## 🛠️ Technologies Used

- **HTML/CSS** – For structuring and styling the user interface.
- **JavaScript** – For client-side scripting and interaction handling.
- **Node.js** – For server-side processing and code execution.
- **[CompileX](https://www.npmjs.com/package/compilex)** – A Node.js library to compile and run code in various programming languages.
- **[CodeMirror](https://codemirror.net/)** – A powerful in-browser code editor with syntax highlighting and language support.

## 📦 Installation & Setup

### 1. Clone the Repository
git clone  [https://github.com/CodeHive08/LangBridge.git]
cd mini-compiler

###  2. Install Node.js Dependencies
   Make sure Node.js and npm are installed. Then run:
```bash
npm install
```
This will install:
compilex

Other required packages listed in package.json

### 3. Set Up CodeMirror
You can include CodeMirror in two ways:

Option 1: CDN (Recommended for Quick Setup)
In your HTML file, include:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/javascript/javascript.min.js"></script>
<!-- Add more modes as needed -->
````
Option 2: Install via npm (Optional)
```bash

npm install codemirror
```
Then in your JavaScript:

```js

import CodeMirror from 'codemirror';
```
// Load necessary modes/styles if bundling manually
If using a bundler like Webpack or Vite, configure accordingly.

### 4. Start the Server
```bash
node app.js
```
### 5. Access the App
Open your browser and go to:

```arduino
http://localhost:8000
```
## 📂 Project Structure
```php
mini-compiler/

│

├── public/             # Frontend assets (HTML/CSS/JS)

├── views/              # HTML templates (if using a templating engine)

├── api.js              # Main Node.js server file

├── package.json        # Project metadata and dependencies

└── README.md           # Project documentation
```
## 📸 Screenshots
![image](https://github.com/user-attachments/assets/df5191fe-b8b1-45fa-8281-2de95004887e)
![image](https://github.com/user-attachments/assets/9dd9c09b-57e3-4eb5-a4d5-d26e3ad461ad)
![image](https://github.com/user-attachments/assets/4acbcc0a-2806-4b7d-bf03-02e87386d7e5)
![image](https://github.com/user-attachments/assets/18ed492b-2bed-4a67-a176-57e74b546687)

![image](https://github.com/user-attachments/assets/0f02fa84-0d5f-4e54-8b0b-43587a20e70d)
## 👨‍💻 Author
Sandeep Singh Mehta

Contributions and suggestions are welcome! Feel free to open issues or submit pull requests.

### ⭐ If you like this project, give it a star on GitHub!
