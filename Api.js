const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const path = require("path")
const options = { 
    stats: true,
    tempDir: path.join(__dirname, 'temp')
}
compiler.init(options)

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
    compiler.flush(function () {
        console.log("Temporary files deleted")
    })
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/compile", function (req, res) {
    // Add request logging
    console.log('Received compilation request:', {
        language: req.body.lang,
        hasCode: !!req.body.code,
        hasInput: !!req.body.input
    });

    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang

    if (!code || !lang) {
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
            if (!input) {
                var envData = { 
                    OS: "linux", 
                    cmd: "g++",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000
                    }
                };
                compiler.compileCPP(envData, code, function (data) {
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
                        compileTimeout: 5000
                    }
                };
                compiler.compileCPPWithInput(envData, code, input, function (data) {
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
            if (!input) {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000,
                        compileTimeout: 5000
                    }
                };
                compiler.compileJava(envData, code, function (data) {
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
                        compileTimeout: 5000
                    }
                };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
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
            if (!input) {
                var envData = { 
                    OS: "linux",
                    options: { 
                        timeout: 10000
                    }
                };
                compiler.compilePython(envData, code, function (data) {
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
                        timeout: 10000
                    }
                };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
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

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port", process.env.PORT || 8000);
})