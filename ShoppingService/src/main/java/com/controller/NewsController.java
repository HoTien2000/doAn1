package com.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.entity.News;
import com.payload.MessageResponse;
import com.service.NewsService;
import com.service.dto.NewsDTO;
import com.service.dto.ViewPostDTO;
import com.utils.FileStorageUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/news")
public class NewsController {

    @Value("${app.image.url}")
    private String folder;

    @Autowired
    private NewsService newsService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestParam("news") String news,
            @RequestParam("categoryNewsId") String categoryNewsId, @RequestParam("file") MultipartFile file) {
        News result = newsService.save(news, categoryNewsId, file);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<News>> findAll() {
        List<News> news = newsService.findAll();

        for(News itemNews : news) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", itemNews.getImage().toString()).build().toString();
            
            itemNews.setImage(url);
        }

        return ResponseEntity.ok(news);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        FileStorageUtils fileStoreUtil = new FileStorageUtils();
        Path root = Paths.get(folder);

        Resource file = fileStoreUtil.loadFile(root, filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<News> findById (@PathVariable Long id) {
        News news = newsService.findById(id);

        String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", news.getImage().toString()).build().toString();

        news.setImage(url);

        return ResponseEntity.ok().body(news);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestParam("news") String news,
    @RequestParam("categoryNewsId") String categoryNewsId, @RequestParam(name = "file", required = false) MultipartFile file) {
        News result = newsService.update(news, categoryNewsId, file);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            newsService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));

        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/all/find-top")
    public ResponseEntity<List<NewsDTO>> findTop() {
        List<NewsDTO> newsDTOs = newsService.findTopNews();

        for(NewsDTO newsDTO : newsDTOs) {
            for(News news : newsDTO.getNews()) {
                String url = MvcUriComponentsBuilder
                .fromMethodName(NewsController.class, "getFile", news.getImage().toString()).build().toString();

                news.setImage(url);
            }
        }

        return ResponseEntity.ok().body(newsDTOs);
    }

    @GetMapping("/all/view-post/{id}")
    public ResponseEntity<ViewPostDTO> viewPost(@PathVariable Long id) {
        ViewPostDTO viewPostDTO = newsService.findViewPost(id);

        ViewPostDTO data = new ViewPostDTO();

        String urlNews = MvcUriComponentsBuilder
                .fromMethodName(NewsController.class, "getFile", viewPostDTO.getNews().getImage().toString()).build().toString();

        data.setNews(newsService.setData(viewPostDTO.getNews(), urlNews));
             
        List<News> listBest = new ArrayList<>();
        for(News news : viewPostDTO.getFiveBestNew()) {
            String urlFiveBestNew = MvcUriComponentsBuilder
                .fromMethodName(NewsController.class, "getFile", news.getImage().toString()).build().toString();

            News obj = newsService.setData(news, urlFiveBestNew);

            listBest.add(obj);
        }

        data.setFiveBestNew(listBest);

        List<News> listRelated = new ArrayList<>();
        for(News news : viewPostDTO.getRelated()) {
            String urlRelated = MvcUriComponentsBuilder
                .fromMethodName(NewsController.class, "getFile", news.getImage().toString()).build().toString();

                News obj = newsService.setData(news, urlRelated);

                listRelated.add(obj);
        }

        data.setRelated(listRelated);

        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/all/find-all")
    public ResponseEntity<List<News>> findByAll() {
        List<News> news = newsService.findByAll();

        for(News itemNews : news) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", itemNews.getImage().toString()).build().toString();
            
            itemNews.setImage(url);
        }

        return ResponseEntity.ok().body(news);
    }
}
