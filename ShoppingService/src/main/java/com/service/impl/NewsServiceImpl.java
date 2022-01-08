package com.service.impl;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.entity.CategoryNews;
import com.entity.News;
import com.entity.UserSystem;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.repository.CategoryNewsRepository;
import com.repository.NewsRepository;
import com.repository.UserSystemRepository;
import com.service.NewsService;
import com.service.dto.NewsDTO;
import com.service.dto.ViewPostDTO;
import com.utils.FileStorageUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {

    @Value("${app.image.url}")
    private String folder;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private CategoryNewsRepository categoryNewsRepository;

    @Override
    public News save(String news, String categoryNewsId, MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            News newsData = mapper.readValue(news, News.class);

            FileStorageUtils fileStorageUtils = new FileStorageUtils();

            String fileName = fileStorageUtils.setNameImage(file.getOriginalFilename());

            Optional<CategoryNews> categoryNews = categoryNewsRepository.findById(Long.parseLong(categoryNewsId));

            if (categoryNews.isPresent()) {
                newsData.setCategoryNews(categoryNews.get());

                newsData.setImage(fileName);
                newsData.setLastUpdate(LocalDate.now());

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());
                newsData.setUserSystem(userSystem);

                Path rootPath = Paths.get(folder);
                fileStorageUtils.save(file, fileName, rootPath);

                return newsRepository.save(newsData);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<News> findAll() {
        List<News> news = newsRepository.findAll();

        return news;
    }

    public News findById(Long id) {
        try {
            Optional<News> optional = newsRepository.findById(id);

            if (optional.isPresent()) {
                return optional.get();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public News update(String news, String categoryNewsId, MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            News newsData = mapper.readValue(news, News.class);

            FileStorageUtils fileStorageUtils = new FileStorageUtils();

            Optional<CategoryNews> categoryNews = categoryNewsRepository.findById(Long.parseLong(categoryNewsId));

            News olderData = this.findById(newsData.getId());

            if(file != null) {
                String fileName = fileStorageUtils.setNameImage(file.getOriginalFilename());
                newsData.setImage(fileName);
                Path rootPath = Paths.get(folder);
                fileStorageUtils.delete(rootPath, olderData.getImage());
                fileStorageUtils.save(file, fileName, rootPath);
            } else {
                newsData.setImage(olderData.getImage());
            }

            newsData.setCategoryNews(categoryNews.get());
            newsData.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());
            newsData.setUserSystem(userSystem);

            return newsRepository.save(newsData);

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return null;
    }

    @Override
    public void delete(Long id) {
        FileStorageUtils fileStorageUtils = new FileStorageUtils();
        News olderData = this.findById(id);
        Path rootPath = Paths.get(folder);
        fileStorageUtils.delete(rootPath, olderData.getImage());

        newsRepository.deleteById(id);

    }

    @Override
    public List<NewsDTO> findTopNews() {
        List<CategoryNews> categoryNews = categoryNewsRepository.findAll();

        List<NewsDTO> newsDTOs = new ArrayList<>();

        for(CategoryNews item : categoryNews) {
            NewsDTO newsDTO = new NewsDTO();

            List<News> news = newsRepository.findTop4ByCategoryNewsOrderByIdDesc(item);

            newsDTO.setCategoryName(item.getCategoryName());
            newsDTO.setNews(news);

            newsDTOs.add(newsDTO);
        }

        return newsDTOs;
    }

    @Override
    public ViewPostDTO findViewPost(Long id) {
        ViewPostDTO viewPostDTO = new ViewPostDTO();

        News news = this.findById(id);
        List<News> relateds = this.findRelated(news.getCategoryNews(), news.getId());

        viewPostDTO.setNews(news);
        viewPostDTO.setFiveBestNew(this.findTopFiveBestNew());
        viewPostDTO.setRelated(relateds);

        return viewPostDTO;
    }

    @Override
    public List<News> findTopFiveBestNew() {
        List<News> news = newsRepository.findTop5ByOrderByIdDesc();

        return news;
    }

    @Override
    public List<News> findRelated(CategoryNews categoryNews, Long id) {
        List<News> news = newsRepository.findTop4ByCategoryNewsAndIdNotOrderByIdDesc(categoryNews, id);

        return news;
    }

    @Override
    public News setData(News news, String url) {
        News data = new News();

        data.setId(news.getId());
        data.setTitle(news.getTitle());
        data.setContent(news.getContent());
        data.setRootLink(news.getRootLink());
        data.setImage(url);
        data.setLastUpdate(news.getLastUpdate());
        data.setCategoryNews(news.getCategoryNews());
        data.setUserSystem(news.getUserSystem());

        return data;
    }

    @Override
    public List<News> findByAll() {
        List<News> news = newsRepository.findAllByOrderByIdDesc();

        return news;
    }
}
