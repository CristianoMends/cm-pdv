package com.api.pdv.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String uploadFile(MultipartFile file) throws IOException;

    byte[] downloadFile(String fileName) throws IOException;

    void deleteFile(String fileName) throws IOException;
}
