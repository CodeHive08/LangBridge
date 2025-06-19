const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const path = require("path")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror", express.static(path.join(__dirname, "codemirror")))

// Add CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("Temporary files deleted")
    })
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang

    if (!code || !lang) {
        return res.status(400).json({ error: "Code and language are required" });
    }

    try {
        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
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
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
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
                var envData = { OS: "windows" };
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
                var envData = { OS: "windows" };
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
                var envData = { OS: "windows" };
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
                var envData = { OS: "windows" };
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
        } else if (lang == "C#") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileCS(envData, code, function (data) {
                    if (data.error) {
                        console.log("C# Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            } else {
                var envData = { OS: "windows" };
                compiler.compileCSWithInput(envData, code, input, function (data) {
                    if (data.error) {
                        console.log("C# Compilation Error:", data.error);
                        res.json({ error: data.error });
                    } else if (data.output) {
                        res.json(data);
                    } else {
                        res.json({ error: "Unknown error occurred during compilation" });
                    }
                });
            }
        } else {
            res.status(400).json({ error: "Unsupported language" });
        }
    } catch (e) {
        console.error("Server Error:", e);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(process.env.PORT ||8000, () => {
    console.log("Server is running on port 8000");
})