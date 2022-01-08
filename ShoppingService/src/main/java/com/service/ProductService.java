package com.service;

import java.util.List;

import com.entity.Category;
import com.entity.Product;
import com.service.dto.ProductDTO;
import com.service.dto.ProductModelUpdateDTO;
import com.service.dto.ProductStatisticDTO;
import com.service.dto.ProductTypeUpdateDTO;

import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    Product save(String product, String category, String productModel, String productType, List<MultipartFile> files);

    Product findById(Long id);

    Product update(String product, String category, String productModel, String productType);
    
    List<Product> findAll();

    void delete(Long id);

    Product updateImage(String id, List<MultipartFile> files);

    List<ProductDTO> findTop8ProductNews();

    List<ProductDTO> findTop8ProductSale();

    List<ProductDTO> findByCategory(Category category);

    List<ProductDTO> findByCategoryAndSale(Category category);

    List<ProductDTO> findByProductLike(Long category, int sale, Long productId);

    List<ProductModelUpdateDTO> findProductModelUpdateDTO(Long id);

    List<ProductTypeUpdateDTO> findProductTypeUpdateDTO(Long id);

    List<ProductDTO> findBySellFaster();

    List<ProductDTO> searchByProductNotSale(String productName, String categoryId, int startPriceSell, int endPriceSell);

    List<ProductDTO> searchByProductSale(String productName, String categoryId, int startPriceSell, int endPriceSell);

    List<Product> search(String productName, String categoryId, String sale);

    List<Product> findBySaleGreateThan(int sale);

    ProductStatisticDTO productStatisticDTO(String productName, String categoryId);
}
