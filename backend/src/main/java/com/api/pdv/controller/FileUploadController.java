package com.api.pdv.controller;

import com.api.pdv.docs.FileDoc;
import com.api.pdv.dto.file.FileDto;
import com.api.pdv.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("files")
public class FileUploadController implements FileDoc {

    @Autowired
    private FileService fileService;

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<FileDto> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        FileDto fileDto = new FileDto(fileService.uploadFile(file));
        return ResponseEntity.ok(fileDto);
    }

    @GetMapping("/download/{fileName}")
    @CrossOrigin
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) throws IOException {

        byte[] fileContent = fileService.downloadFile(fileName);

        String contentType = getContentType(fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType));

        return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);
    }

    private String getContentType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

        return switch (extension) {
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            case "gif" -> "image/gif";
            default -> "application/octet-stream";
        };
    }

}
