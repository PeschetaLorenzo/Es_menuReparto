<!--
<?php

// 🔧 CONFIGURAZIONE SERVER DI DESTINAZIONE
$TARGET_SERVER = "http://192.168.1.188:8081";

// Prende il path richiesto (es: /getOrdini)
$requestUri = $_SERVER['REQUEST_URI'];

// Rimuove il nome del file PHP dal path
$scriptName = $_SERVER['SCRIPT_NAME'];
$path = str_replace($scriptName, "", $requestUri);

// URL finale
$targetUrl = $TARGET_SERVER . $path;

// Metodo HTTP (GET, POST, PUT, DELETE, ecc)
$method = $_SERVER['REQUEST_METHOD'];

// Headers in ingresso
$headers = getallheaders();

// Corpo della richiesta
$body = file_get_contents("php://input");

// Inizializza CURL
$ch = curl_init($targetUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_HTTPHEADER, formatHeaders($headers));
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HEADER, true);

// Esegue richiesta
$response = curl_exec($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}

// Separazione header / body risposta
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$responseHeaders = substr($response, 0, $headerSize);
$responseBody = substr($response, $headerSize);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Rimanda status code
http_response_code($httpCode);

// Rimanda headers (filtrando quelli pericolosi)
foreach (explode("\r\n", $responseHeaders) as $header) {
    if (
        stripos($header, "Transfer-Encoding") === false &&
        stripos($header, "Content-Length") === false
    ) {
        if (!empty($header)) {
            header($header);
        }
    }
}

// Rimanda body
echo $responseBody;


// -------------------------------
// FUNZIONE UTILE
function formatHeaders($headers) {
    $out = [];
    foreach ($headers as $key => $value) {
        if (strtolower($key) !== "host") {
            $out[] = "$key: $value";
        }
    }
    return $out;
}

-->
