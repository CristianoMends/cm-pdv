package com.api.pdv.service.impl;

import com.api.pdv.exception.BusinessException;
import com.api.pdv.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.base-url}")
    private String baseUrl;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String[] ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/gif"};

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new BusinessException("Image not sent");
        }

        String contentType = file.getContentType();
        if (contentType == null || !isValidContentType(contentType)) {
            throw new BusinessException("The file must be an image (JPEG, PNG, GIF).");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BusinessException("The file exceeds the maximum allowed size of 5MB.");
        }

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        Path targetLocation = Paths.get(uploadDir).resolve(fileName);

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return baseUrl + "/files/download/" + fileName;
    }

    @Override
    public byte[] downloadFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        File file = filePath.toFile();

        if (!file.exists()) {
            throw new BusinessException("File not found", HttpStatus.NOT_FOUND);
        }

        return Files.readAllBytes(filePath);
    }

    @Override
    public void deleteFile(String fileName) {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        File file = filePath.toFile();

        if (!file.exists()) {
            throw new BusinessException("File not found");
        }

        if (!file.delete()) {
            throw new BusinessException("Failed to delete file");
        }
    }

    private boolean isValidContentType(String contentType) {
        for (String allowedContentType : ALLOWED_CONTENT_TYPES) {
            if (contentType.equals(allowedContentType)) {
                return true;
            }
        }
        return false;
    }
}
