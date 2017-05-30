/**
 *  Sends data directly from DHT11 sensor to ThingSpeak cloud via HTTP GET request.
 *  
 *  You must specify YOUR_WRITE_API_KEY to ThingSpeak cloud and information about WiFi connection (SSID and password).
 */

#include <DHT.h>
#include <ESP8266WiFi.h>

#define DHTPIN 2
#define INTERVAL 20000  // in miliseconds
 
String writeAPIKey = "YOUR_WRITE_API_KEY";
const char* server = "api.thingspeak.com";
const char* host = "api.thingspeak.com";

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
WiFiClient client;
const int httpPort = 80;

float h = 0.00, t = 0.00;
DHT dht(DHTPIN, DHT11, 15);

void setup()
{
  Serial.begin(115200);
  delay(10);
  
  dht.begin();
  WiFi.begin(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
   
  WiFi.begin(ssid, password);
   
  while (WiFi.status() != WL_CONNECTED) {  // try to connect every half second
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}


void loop()
{
  if (WiFi.status() != WL_CONNECTED) {  // if WiFi lost, try to reconnect
    delay(500);
    Serial.println("Reconnecting...");
    return;
  }
  
  h = dht.readHumidity();
  t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {  // if wrong reading from sensor, do read again
    Serial.println("Sensor reading error!");
    return;
  }

  // make TCP connections
  if (!client.connect(host, httpPort)) {
    return;
  }

  String url = "/update?key=" + writeAPIKey + "&field1=" + String(t) + "&field2=" + String(h) +"\r\n";
  
  // Request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
 
  Serial.print("Temperature: ");
  Serial.println(t);
  Serial.print("Humidity: "); 
  Serial.println(h);
  
  Serial.println(""); 
  Serial.println("Wait...");
  
  delay(INTERVAL);
}
