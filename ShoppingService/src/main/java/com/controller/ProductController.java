package com.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.entity.Category;
import com.entity.Product;
import com.entity.ProductImage;
import com.payload.MessageResponse;
import com.service.CategoryService;
import com.service.ProductImageService;
import com.service.ProductService;
import com.service.dto.ProductDTO;
import com.service.dto.ProductDetailDTO;
import com.service.dto.ProductModelUpdateDTO;
import com.service.dto.ProductStatisticDTO;
import com.service.dto.ProductTypeUpdateDTO;
import com.utils.FileStorageUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.http.HttpHeaders;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/product")
public class ProductController {

    @Value("${app.image.url}")
    private String folder;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductImageService productImageService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestParam("product") String product, @RequestParam("category") String category, @RequestParam("productModel") String productModel, @RequestParam("productType") String productType, @RequestParam("files") List<MultipartFile> files) {

        Product result = productService.save(product, category, productModel, productType, files);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product product = productService.findById(id);

        return ResponseEntity.ok().body(product);
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();

        return ResponseEntity.ok().body(products);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestParam("product") String product, @RequestParam("category") String category, @RequestParam("productModel") String productModel, @RequestParam("productType") String productType ) {
        Product result = productService.update(product, category, productModel, productType);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
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

    @GetMapping("/view/{id}")
    public ResponseEntity<ProductDetailDTO> view(@PathVariable Long id) {
        Product product = productService.findById(id);

        List<ProductImage> productImages = productImageService.findByProduct(product);

        for(ProductImage productImage : productImages) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productImage.getImage().toString()).build().toString();

            productImage.setImage(url);
        }

        ProductDetailDTO productDetailDTO = new ProductDetailDTO();

        productDetailDTO.setId(product.getId());
        productDetailDTO.setProductName(product.getProductName());
        productDetailDTO.setIntroduce(product.getIntroduce());
        productDetailDTO.setDescription(product.getDescription());
        productDetailDTO.setPriceImport(product.getPriceImport());
        productDetailDTO.setPriceSell(product.getPriceSell());
        productDetailDTO.setQuantityImport(product.getQuantityImport());
        productDetailDTO.setQuantitySell(product.getQuantitySell());
        productDetailDTO.setInventory(product.getInventory());
        productDetailDTO.setSale(product.getSale());
        productDetailDTO.setLastUpdate(product.getLastUpdate());
        productDetailDTO.setProductImages(productImages);
        productDetailDTO.setProductModels(product.getProductModels());
        productDetailDTO.setProductTypes(product.getProductTypes());
        productDetailDTO.setCategory(product.getCategory());
        productDetailDTO.setUserSystem(product.getUserSystem());

        return ResponseEntity.ok().body(productDetailDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            productService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @PostMapping("/update-image")
    public ResponseEntity<MessageResponse> updateImage(@RequestParam("id") String id, @RequestParam("files") List<MultipartFile> files) {

        Product result = productService.updateImage(id, files);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/all/product-newest")
    public ResponseEntity<List<ProductDTO>> findTop8ProductNews() {
        List<ProductDTO> productDTOs = productService.findTop8ProductNews();

        for(ProductDTO productDTO: productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/product-sale")
    public ResponseEntity<List<ProductDTO>> findTop8ProductSale() {
        List<ProductDTO> productDTOs = productService.findTop8ProductSale();

        for(ProductDTO productDTO: productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/product-category/{id}")
    public ResponseEntity<List<ProductDTO>> findByCategory(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        List<ProductDTO> productDTOs = productService.findByCategory(category);

        for(ProductDTO productDTO : productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/product-category-sale/{id}")
    public ResponseEntity<List<ProductDTO>> findByCategoryAndSale(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        List<ProductDTO> productDTOs = productService.findByCategoryAndSale(category);

        for(ProductDTO productDTO : productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/detail/{id}")
    public ResponseEntity<ProductDetailDTO> productDetail(@PathVariable Long id) {
        Product product = productService.findById(id);

        List<ProductImage> productImages = productImageService.findByProduct(product);

        for(ProductImage productImage : productImages) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productImage.getImage().toString()).build().toString();

            productImage.setImage(url);
        }

        ProductDetailDTO productDetailDTO = new ProductDetailDTO();

        productDetailDTO.setId(product.getId());
        productDetailDTO.setProductName(product.getProductName());
        productDetailDTO.setIntroduce(product.getIntroduce());
        productDetailDTO.setDescription(product.getDescription());
        productDetailDTO.setPriceImport(product.getPriceImport());
        productDetailDTO.setPriceSell(product.getPriceSell());
        productDetailDTO.setQuantityImport(product.getQuantityImport());
        productDetailDTO.setQuantitySell(product.getQuantitySell());
        productDetailDTO.setInventory(product.getInventory());
        productDetailDTO.setSale(product.getSale());
        productDetailDTO.setLastUpdate(product.getLastUpdate());
        productDetailDTO.setProductImages(productImages);
        productDetailDTO.setProductModels(product.getProductModels());
        productDetailDTO.setProductTypes(product.getProductTypes());
        productDetailDTO.setCategory(product.getCategory());
        productDetailDTO.setUserSystem(product.getUserSystem());

        return ResponseEntity.ok().body(productDetailDTO);
    }

    @GetMapping("/all/product-like")
    public ResponseEntity<List<ProductDTO>> findByProductLike(@RequestParam("categoryId") String categoryId, @RequestParam("sale") String sale, @RequestParam("productId") String productId) {
        Long category = Long.parseLong(categoryId);
        int salePercent = Integer.parseInt(sale);
        Long product = Long.parseLong(productId);

        List<ProductDTO> productDTOs = productService.findByProductLike(category, salePercent, product);

        for(ProductDTO productDTO : productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/product-model")
    public ResponseEntity<List<ProductModelUpdateDTO>> findProductModelUpdateDTO(@RequestParam("id") Long id) {
        List<ProductModelUpdateDTO> productModelUpdateDTOs = productService.findProductModelUpdateDTO(id);

        return ResponseEntity.ok().body(productModelUpdateDTOs);
    }

    @GetMapping("/product-type")
    public ResponseEntity<List<ProductTypeUpdateDTO>> findProductTypeUpdateDTO(@RequestParam("id") Long id) {
        List<ProductTypeUpdateDTO> productTypeUpdateDTOs = productService.findProductTypeUpdateDTO(id);

        return ResponseEntity.ok().body(productTypeUpdateDTOs);
    }

    @GetMapping("/all/sell-faster")
    public ResponseEntity<List<ProductDTO>> findTop8SellFaster() {
        List<ProductDTO> productDTOs = productService.findBySellFaster();

        for(ProductDTO productDTO: productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/search-not-sale")
    public ResponseEntity<List<ProductDTO>> searchNotSale(@RequestParam("productName") String productName, @RequestParam("categoryId") String categoryId, @RequestParam("startPriceSell") int startPriceSell, @RequestParam("endPriceSell") int endPriceSell) {
        List<ProductDTO> productDTOs = productService.searchByProductNotSale(productName, categoryId, startPriceSell, endPriceSell);

        for(ProductDTO productDTO: productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/all/search-sale")
    public ResponseEntity<List<ProductDTO>> searchSale(@RequestParam("productName") String productName, @RequestParam("categoryId") String categoryId, @RequestParam("startPriceSell") int startPriceSell, @RequestParam("endPriceSell") int endPriceSell) {
        List<ProductDTO> productDTOs = productService.searchByProductSale(productName, categoryId, startPriceSell, endPriceSell);

        for(ProductDTO productDTO: productDTOs) {
            String url = MvcUriComponentsBuilder
            .fromMethodName(NewsController.class, "getFile", productDTO.getImage().toString()).build().toString();

            productDTO.setImage(url);
        }

        return ResponseEntity.ok().body(productDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam("productName") String productName, @RequestParam("categoryId") String categoryId, @RequestParam("sale") String sale) {
        List<Product> products = productService.search(productName, categoryId, sale);

        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/find-sale")
    public ResponseEntity<List<Product>> findByGreateThan(@RequestParam("sale") int sale) {
        List<Product> products = productService.findBySaleGreateThan(sale);

        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/product-statistic")
    public ResponseEntity<ProductStatisticDTO> productStatisticDTO(@RequestParam("productName") String productName, @RequestParam("categoryId") String categoryId) {
        ProductStatisticDTO productStatisticDTO = productService.productStatisticDTO(productName, categoryId);

        return ResponseEntity.ok().body(productStatisticDTO);
    }

}
