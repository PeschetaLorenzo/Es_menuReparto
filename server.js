var express = require("express")
var expressSession = require("express-session")
const path = require("path");
var mysql = require("mysql");
const { send } = require("process");
var app = express()
var porta = 8081

var ordini =[]
/* Questa callback viene richiamata quando avvio il server */
/* rispetto alla listen del modulo http, questa è ASINCRONA */
app.listen(porta, ()=>{
    console.log("Il server è stato avviato sulla porta "+ porta)
})


const connCfg = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "es_ristorante"
};

/* use(callback) */
app.use((richiesta, risposta, next)=>{
    console.log(richiesta.url)
    //senza next() la richiesta rimane bloccata nel middleware(app.use)
    next()
})

/*
    Abilita la gestione automatica delle risorse statiche presenti nella cartella public
*/
app.use(express.static("public"));

/*  Abilita la lettura automatica dei parametri POST */
app.use(express.json())


app.use(expressSession({ secret: 'nTav', resave: false, saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 60 } }))

app.get("/tavolo", (richiesta, risposta)=>{
    let data = richiesta.query
    console.log(data)
    richiesta.session.tav = {nTav: data.tav}
    
    console.log(richiesta.session)
    if(!richiesta.session.tav)
        risposta.send("errore login")
    else
        risposta.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/cucina", (richiesta, risposta)=>{
    risposta.sendFile(path.join(__dirname, "public/cucina/cucina.html"))
})

app.get("/login", (richiesta, risposta) => {
    console.log(richiesta.session)
    if(!richiesta.session.tav)
        risposta.send("errore login")
    else
        risposta.send("tav=" + richiesta.session.tav.nTav)
})

app.post("/ordina", (richiesta, risposta)=>{
    let ordine = richiesta.body.ordine
    let tav = richiesta.session.tav.nTav
    console.log(tav)
    let ordineCompleto = {
        nTav: tav,
        ordine: ordine,
        completato: false
    }


    console.log(typeof ordineCompleto.nTav)
    ordini.push(ordineCompleto)

    
    const conn = mysql.createConnection(connCfg);
    conn.connect();
    conn.query(
        "INSERT INTO ordini (nTav, Pane, Salsiccia, Cipolle, Crauti, Patatine, Insalata, Vegetariano, Completato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)",
        [ordineCompleto.nTav, ordineCompleto.ordine.hotdog.Pane, ordineCompleto.ordine.hotdog.Salsiccia, ordineCompleto.ordine.hotdog.Cipolle, ordineCompleto.ordine.hotdog.Crauti, ordineCompleto.ordine.contorno == "Patatine", ordineCompleto.ordine.contorno == "Insalata", ordineCompleto.ordine.hotdog.Veggie],
        (err, risultato) => {
        conn.end();
        if (err) return risposta.status(500).json({ errore: err });
        risposta.json({ idPrenotazione: risultato.insertId });
        }
    );

})


app.get("/getOrdini", (richiesta, risposta) =>{
    const conn = mysql.createConnection(connCfg);
    conn.connect();
    conn.query(`SELECT * FROM ordini`, 
        function (error, results, fields) {
            if(error){
                risposta.statusCode = 500
                risposta.statusMessage = "Errore di connessione con il db "
                risposta.send("Errore nell'esecuzione della query")
            }else
                ordini = results
            risposta.send(ordini)
            conn.end()
        }
    );
})

app.post("/completaOrdine", (richiesta, risposta) =>{
    let idOrd = richiesta.body.idOr
    console.log(idOrd)

    const conn = mysql.createConnection(connCfg);
    conn.connect();
    conn.query(
        "UPDATE ordini SET Completato = 1 WHERE nOrd = ?",
        [idOrd],
        (err, risultato) => {
            conn.end();
            if (err) return risposta.status(500).json({ errore: err });
            risposta.json({ idPrenotazione: risultato.insertId });
        }
    );
})

app.use((richiesta, risposta, next)=>{
    risposta.send("Risorsa non trovata")
})

    
    
