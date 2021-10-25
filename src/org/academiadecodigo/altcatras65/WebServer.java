package org.academiadecodigo.altcatras65;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class WebServer {
    private final int PORT_NUMBER = 8080;
    private ServerSocket serverSocket;
    private Socket clientSocket;
    private String filepath;
    private String responseCode;
    private String contentType;
    private File file;

    public WebServer() {
        try {

            this.serverSocket = new ServerSocket(PORT_NUMBER);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void start() {

        while (true) {
            initializeClientSocket();
            getFilepathFromRequestStream();
            getContentTypeFromFilePath();
            checkForResourceExistence();
            buildResponse();
            closeClientSocket();
        }
    }

    private void initializeClientSocket() {
        try {
            this.clientSocket = serverSocket.accept();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void getFilepathFromRequestStream() {

        try {
            //Receive Stream
            BufferedReader in = new BufferedReader(new InputStreamReader(this.clientSocket.getInputStream()));

            //Create array for saving the incoming header
            String[] lines = null;

            lines = in.readLine().split(" ");


            this.filepath = lines[1];

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void getContentTypeFromFilePath() {
        int index = filepath.lastIndexOf(".");
        String extension = index > 0 ? filepath.substring(index + 1) : null;

        if (extension.equals("jpeg") || extension.equals("jpg") || extension.equals("png")) {
            this.contentType = "image/" + extension;
            return;
        }

        this.contentType = "text/html; charset=UTF-8";

    }

    private void checkForResourceExistence() {
        this.file = new File("resources" + this.filepath);

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
            DataOutputStream out = new DataOutputStream(clientSocket.getOutputStream());

            //Create the response header
            String header = "HTTP/1.0 " + this.responseCode + "\r\nContent-Type: " + this.contentType + "\r\n" +
                    "Content-Length: " + this.file.length() + "\r\n\r\n";

            System.out.println("Response Header: \n" + header);

            //Write response header
            out.write(header.getBytes());
            out.flush();

            //Read the file bytes and send
            byte[] buffer = new byte[1024];
            FileInputStream in = new FileInputStream(file);

            int numBytes;
            while ((numBytes = in.read(buffer)) != -1) {
                out.write(buffer, 0, numBytes);
                out.flush();
            }

            out.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private void closeClientSocket() {
        try {
            clientSocket.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
