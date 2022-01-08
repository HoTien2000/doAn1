package com.utils;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

public class FileStorageUtils {
    public String setNameImage(String fileName) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd_MM_yyyy_hh_mm_ss")));
        stringBuilder.append("_");
        stringBuilder.append(fileName);

        return stringBuilder.toString();
    }

    public boolean save(MultipartFile file, String fileName, Path root) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(root.toAbsolutePath());
        stringBuilder.append(fileName);

        Path pathFileIcon = Paths.get(stringBuilder.toString());

        try {
            if (!root.toFile().exists()) {
                Files.createDirectory(root);
            }

            if (Files.notExists(pathFileIcon)) {
                Files.copy(file.getInputStream(), root.resolve(fileName));
            } else {
                Files.deleteIfExists(pathFileIcon);
                Files.copy(file.getInputStream(), root.resolve(fileName));
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean delete(Path root, String fileName) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(root.toAbsolutePath());
        stringBuilder.append("/");
        stringBuilder.append(fileName);

        Path pathFileIcon = Paths.get(stringBuilder.toString());

        try {
            if (Files.deleteIfExists(pathFileIcon)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public Resource loadFile(Path root, String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public String readFileImage(String path) {
        String baseImage = "";
        FileInputStream fileInputStream = null;
        try{
            File file = new File(path);
            fileInputStream = new FileInputStream(file);

            byte imageData[] = new byte[(int) file.length()];
            fileInputStream.read(imageData);
            baseImage = Base64.getEncoder().encodeToString(imageData);
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            try{
                if(fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch(Exception e) {
                e.printStackTrace();
            }
        }

        return baseImage;
    }
}
