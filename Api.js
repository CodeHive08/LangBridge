const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const path = require("path")
const fs = require("fs")

// Ensure temp directory exists with proper permissions
const tempDir = '/opt/render/project/src/temp'
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true, mode: 0o777 })
}

// Set directory permissions
try {
    fs.chmodSync(tempDir, 0o777)
} catch (err) {
    console.error('Error setting temp directory permissions:', err)
}

const options = { 
    stats: true,
    tempDir: tempDir,
    removeOldFiles: false, // Prevent automatic file deletion
    compileTimeout: 10000
}

// Initialize compiler with logging
console.log('Initializing compiler with options:', options)
compiler.init(options)
console.log('Compiler initialized successfully')

// Configure body-parser with increased limits
app.use(bodyP.json({ limit: '50mb' }));
app.use(bodyP.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use("/codemirror", express.static(path.join(__dirname, "codemirror")))

// Enhanced CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

app.get("/", function (req, res) {
    // Only flush if there are files to delete
    if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        if (files.length > 0) {
            compiler.flush(function () {
                console.log("Temporary files deleted")
            })
        }
    }
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/api/run", function (req, res) {
    // Add request logging
    console.log('Received compilation request:', {
        language: req.body.lang,
        hasCode: !!req.body.code,
        hasInput: !!req.body.input,
        codeLength: req.body.code ? req.body.code.length : 0,
        inputLength: req.body.input ? req.body.input.length : 0
    });

    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang

    if (!code || !lang) {
        console.log('Missing required fields:', { code: !!code, lang: !!lang });
        return res.status(400).json({ 
            error: "Code and language are required",
            details: {
                code: !code ? "Missing code" : null,
                lang: !lang ? "Missing language" : null
            }
        });
    }

    try {
        if (lang == "Cpp") {
            console.log('Compiling C++ code');
            if (!input) {
                var envData = { 
                    OS: "linux", 
                    cmd: "g++",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000,
                        removeOldFiles: false
                    }
                };
                compiler.compileCPP(envData, code, function (data) {
                    console.log('C++ compilation result:', data);
                    if (data.error) {
                        console.log("C++ Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            } else {
                var envData = { 
                    OS: "linux", 
                    cmd: "g++",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000,
                        removeOldFiles: false
                    }
                };
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    console.log('C++ compilation with input result:', data);
                    if (data.error) {
                        console.log("C++ Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            }
        } else if (lang == "Java") {
            console.log('Compiling Java code');
            if (!input) {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000,
                        removeOldFiles: false
                    }
                };
                compiler.compileJava(envData, code, function (data) {
                    console.log('Java compilation result:', data);
                    if (data.error) {
                        console.log("Java Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            } else {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000,
                        removeOldFiles: false
                    }
                };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    console.log('Java compilation with input result:', data);
                    if (data.error) {
                        console.log("Java Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            }
        } else if (lang == "Python") {
            console.log('Executing Python code');
            if (!input) {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000,
                        removeOldFiles: false
                    }
                };
                compiler.compilePython(envData, code, function (data) {
                    console.log('Python execution result:', data);
                    if (data.error) {
                        console.log("Python Execution Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during execution" });
                    }
                });
            } else {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000,
                        removeOldFiles: false
                    }
                };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    console.log('Python execution with input result:', data);
                    if (data.error) {
                        console.log("Python Execution Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during execution" });
                    }
                });
            }
        }  
        else {
            console.log('Unsupported language:', lang);
            res.status(400).json({ error: "Unsupported language" });
        }
    } catch (e) {
        console.error("Server Error:", e);
        res.status(500).json({ 
            error: "Internal server error",
            message: e.message,
            stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
        });
    }
})

// Health check endpoint with more details
app.get('/api/health', (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        tempDir: {
            exists: fs.existsSync(tempDir),
            path: tempDir,
            files: fs.existsSync(tempDir) ? fs.readdirSync(tempDir) : [],
            permissions: fs.existsSync(tempDir) ? fs.statSync(tempDir).mode.toString(8) : null
        }
    };
    res.status(200).json(health);
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port", process.env.PORT || 8000);
    console.log("Temp directory:", tempDir);
})