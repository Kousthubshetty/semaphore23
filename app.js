const express = require('express');
const {sendInBlue} = require('./mailHelper');
var ejs = require('ejs');
var multer = require('multer');
const path = require('path');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('semaphore.db');

db.run("CREATE TABLE IF NOT EXISTS Teams (id INTEGER PRIMARY KEY AUTOINCREMENT, collegename TEXT, stream TEXT, teamname TEXT, email TEXT, ph TEXT, mode TEXT)");
db.run("CREATE TABLE IF NOT EXISTS Payments (id INTEGER PRIMARY KEY AUTOINCREMENT, teamname TEXT, email TEXT, phno TEXT, photoname TEXT)");
db.run("CREATE TABLE IF NOT EXISTS contactus (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, msg TEXT)");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve uploaded payment screenshots
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var fname;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        fname = Date.now() + ".jpg";
        cb(null, fname);
    }
});
var upload = multer({ storage: storage });

// API Routes
app.post("/register", (req, res) => {
    const collegename = req.body.cname;
    const stream = req.body.stream;
    const teamname = req.body.tname;
    const email = req.body.email;
    const ph = req.body.phno;
    const mode = req.body.mode || 'online';

    db.run(
        "INSERT INTO Teams (collegename, stream, teamname, email, ph, mode) VALUES (?, ?, ?, ?, ?, ?)",
        [collegename, stream, teamname, email, ph, mode],
        (err) => {
            if (err) {
                return res.json({ success: false, message: 'Something went wrong' });
            }
            return res.json({ success: true });
        }
    );
});

app.post("/contactus", (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const msg = req.body.msg;

    db.run(
        "INSERT INTO contactus (name, email, phone, msg) VALUES (?, ?, ?, ?)",
        [name, email, phone, msg],
        (err) => {
            if (err) {
                return res.json({ success: false, message: 'Something went wrong' });
            }
            return res.json({ success: true });
        }
    );
});

app.post("/payment", upload.single('image'), function (req, res) {
    db.run(
        "INSERT INTO Payments (teamname, email, phno, photoname) VALUES (?, ?, ?, ?)",
        [req.body.tname, req.body.email, req.body.phno, fname],
        (err) => {
            if (err) {
                return res.json({ success: false, message: 'Something went wrong' });
            }
            sendInBlue(req.body.email, req.body.tname);
            return res.json({ success: true });
        }
    );
});

// Admin views (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/showRegistrationSEMA4", (req, res) => {
    var result = [];
    db.all("SELECT * FROM Teams ORDER BY id DESC", function(err, rows) {
        rows.forEach(function (row) {
            result.push([row.collegename, row.stream, row.teamname, row.email, row.ph]);
        });
        res.render('teams', { data: result });
    });
});

app.get("/showPaymentsSEMA4", (req, res) => {
    var result = [];
    db.all("SELECT * FROM Payments ORDER BY id DESC", function(err, rows) {
        rows.forEach(function (row) {
            result.push([row.teamname, row.email, row.phno, row.photoname]);
        });
        res.render('payments', { data: result });
    });
});

app.get("/showMessagesSEMA4", (req, res) => {
    var result = [];
    db.all("SELECT * FROM contactus ORDER BY id DESC", function(err, rows) {
        rows.forEach(function (row) {
            result.push([row.name, row.email, row.phone, row.msg]);
        });
        res.render('message', { data: result });
    });
});

// Serve React build in production (must be after API routes)
const reactBuildPath = path.join(__dirname, 'public');
app.use(express.static(reactBuildPath));

// SPA fallback — send React index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
