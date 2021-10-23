package org.academiadecodigo.altcatras65;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Paths;

public class WebServer {
    private final int PORT_NUMBER = 8080;
    private ServerSocket serverSocket;
    private Socket socket;
    private String filepath;
    private String responseCode;

    public void start() {
        while (true) {
            initializeSockets();
            getFilepathFromRequestStream();
            checkForResourceExistence();
            buildResponse();
            closeSockets();
        }
    }

    private void closeSockets() {
        try {

            serverSocket.close();
            socket.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initializeSockets() {
        try {

            this.serverSocket = new ServerSocket(PORT_NUMBER);
            this.socket = serverSocket.accept();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void getFilepathFromRequestStream() {


        try {
            //Receive Stream
            BufferedReader in = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));

            //Create array for saving the incoming header
            String[] line = null;

            line = in.readLine().split(" ");

            this.filepath = line[1];

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void checkForResourceExistence() {
        File file = new File("resources" + this.filepath);

        if (file.exists()) {
            this.responseCode = "200 Document Follows";
        } else {
            this.responseCode = "404 Not Found";
            this.filepath = "404.html";
        }
    }

    private void buildResponse() {

        try {
            //Create the Character stream from a byte output stream
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            //Get all the bytes from the file
            byte[] fileBytes = Files.readAllBytes(Paths.get("resources/" + this.filepath));
            String fileString = new String(fileBytes, "UTF-8");

            //Create the response header
            String header = "HTTP/1.0 " + this.responseCode + "\r\n Content - Type: text / html; charset = UTF - 8\r\n" +
                    " Content - Length: " + fileBytes.length + " \r\n\r\n ";

            //Concat the header with the file contents String and send the response
            out.println(new StringBuilder().append(header).append("\n").append(fileString));

            out.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
