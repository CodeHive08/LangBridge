# LangBridge

An online code compiler that supports multiple programming languages including C++, Java, and Python.

## Features

- Support for multiple programming languages (C++, Java, Python)
- Real-time code compilation
- Input/output handling
- Cross-platform compatibility

## Prerequisites

- Node.js (version 14 or higher)
- G++ compiler (for C++ compilation)
- Java Development Kit (for Java compilation)
- Python (for Python execution)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/LangBridge.git
cd LangBridge
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start running on port 8000 (or the port specified in the environment variables).

## API Endpoints

- `GET /`: Serves the main application interface
- `POST /compile`: Compiles and executes code
  - Required body parameters:
    - `code`: The source code to compile/execute
    - `lang`: The programming language ("Cpp", "Java", or "Python")
    - `input`: (Optional) Input for the program

## Deployment

This application is configured for deployment on Render. The necessary changes for Linux environment have been made in the codebase.

## License

MIT 