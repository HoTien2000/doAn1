package com.service.impl;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import com.entity.Cart;
import com.entity.Category;
import com.entity.Payment;
import com.entity.Product;
import com.entity.ProductImage;
import com.entity.ProductModel;
import com.entity.ProductPayment;
import com.entity.ProductType;
import com.entity.UserSystem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.repository.CartRepository;
import com.repository.CategoryRepository;
import com.repository.PaymentRepository;
import com.repository.ProductImageRepository;
import com.repository.ProductModelRepository;
import com.repository.ProductPaymentRepository;
import com.repository.ProductRepository;
import com.repository.ProductTypeRepository;
import com.repository.UserSystemRepository;
import com.service.ProductService;
import com.service.dto.ProductDTO;
import com.service.dto.ProductModelUpdateDTO;
import com.service.dto.ProductStatisticDTO;
import com.service.dto.ProductTypeUpdateDTO;
import com.utils.FileStorageUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Value("${app.image.url}")
    private String folder;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductModelRepository productModelRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductPaymentRepository productPaymentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Product save(String product, String category, String productModel, String productType, List<MultipartFile> files) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            Set<ProductModel> productModels = mapper.readValue(productModel, new TypeReference<Set<ProductModel>>() {
            });

            Set<ProductType> productTypes = mapper.readValue(productType, new TypeReference<Set<ProductType>>() {
            });

            // List<MultipartFile> multipartFiles = mapper.readValue(file, new TypeReference<List<MultipartFile>>() {
            // });

            Product productData = mapper.readValue(product, Product.class);
            Optional<Category> categoryData = categoryRepository.findById(Long.parseLong(category));

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productData.setQuantitySell(0);
            productData.setInventory(productData.getQuantityImport());
            productData.setLastUpdate(LocalDate.now());
            productData.setCategory(categoryData.get());
            productData.setProductModels(productModels);
            productData.setProductTypes(productTypes);
            productData.setUserSystem(userSystem);

            Product result = productRepository.save(productData);

            FileStorageUtils fileStorageUtils = new FileStorageUtils();
            Path rootPath = Paths.get(folder);
            List<ProductImage> productImages = new ArrayList<>();

            for(MultipartFile multipartFile: files) {
                String fileName = fileStorageUtils.setNameImage(multipartFile.getOriginalFilename());

                ProductImage productImage = new ProductImage();
                productImage.setProduct(result);
                productImage.setImage(fileName);

                productImages.add(productImage);
                fileStorageUtils.save(multipartFile, fileName, rootPath);
            }

            productImageRepository.saveAll(productImages);

            return result;
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Product> findAll() {
        List<Product> products = productRepository.findAll();

        return products;
    }

    @Override
    public Product findById(Long id) {
        Optional<Product> product = productRepository.findById(id);

        if(product.isPresent()) {
            return product.get();
        }

        return null;
    }

    @Override
    public Product update(String product, String category, String productModel, String productType) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            Set<ProductModel> productModels = mapper.readValue(productModel, new TypeReference<Set<ProductModel>>() {
            });

            Set<ProductType> productTypes = mapper.readValue(productType, new TypeReference<Set<ProductType>>() {
            });

            Product productData = mapper.readValue(product, Product.class);
            Optional<Category> categoryData = categoryRepository.findById(Long.parseLong(category));

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productData.setInventory(productData.getQuantityImport() - productData.getQuantitySell());
            productData.setLastUpdate(LocalDate.now());
            productData.setCategory(categoryData.get());
            productData.setProductModels(productModels);
            productData.setProductTypes(productTypes);
            productData.setUserSystem(userSystem);

            return productRepository.save(productData);

        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        Product product = this.findById(id);

        List<ProductImage> productImages = productImageRepository.findByProduct(product);

        FileStorageUtils fileStorageUtils = new FileStorageUtils();
        Path rootPath = Paths.get(folder);

        for(ProductImage productImage: productImages) {
            fileStorageUtils.delete(rootPath, productImage.getImage());
        }

        List<Cart> carts = cartRepository.findByProduct(product);

        cartRepository.deleteAll(carts);
        productImageRepository.deleteAll(productImages);

        productRepository.deleteById(id);
    }

    @Override
    public Product updateImage(String id, List<MultipartFile> files) {
        try{
            Product product = this.findById(Long.parseLong(id));

            List<ProductImage> productImages = productImageRepository.findByProduct(product);

            FileStorageUtils fileStorageUtils = new FileStorageUtils();
            Path rootPath = Paths.get(folder);

            for(ProductImage productImage: productImages) {
                fileStorageUtils.delete(rootPath, productImage.getImage());
            }

            productImageRepository.deleteAll(productImages);

            List<ProductImage> newImages = new ArrayList<>();

            for(MultipartFile multipartFile: files) {
                String fileName = fileStorageUtils.setNameImage(multipartFile.getOriginalFilename());

                ProductImage productImage = new ProductImage();
                productImage.setProduct(product);
                productImage.setImage(fileName);

                newImages.add(productImage);
                fileStorageUtils.save(multipartFile, fileName, rootPath);
            }

            productImageRepository.saveAll(newImages);

            return product;
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<ProductDTO> findTop8ProductNews() {
        List<Product> products = productRepository.findTop8BySaleEqualsOrderByIdDesc(0);
        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductDTO> findTop8ProductSale() {
        List<Product> products = productRepository.findTop8BySaleGreaterThanOrderByIdDesc(0);
        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductDTO> findByCategory(Category category) {
        List<Product> products = productRepository.findByCategoryAndSaleEqualsOrderByIdDesc(category, 0);
        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductDTO> findByCategoryAndSale(Category category) {
        List<Product> products = productRepository.findByCategoryAndSaleGreaterThanOrderByIdDesc(category, 0);
        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }
     
    @Override
    public List<ProductDTO> findByProductLike(Long category, int sale, Long productId) {
        Optional<Category> categoryData = categoryRepository.findById(category);
        List<Product> products = new ArrayList<>();
        if(sale == 0) {
            products = productRepository.findTop4ByCategoryAndSaleEqualsAndIdNotOrderByIdDesc(categoryData.get(), 0, productId);
        } else {
            products = productRepository.findTop4ByCategoryAndSaleGreaterThanAndIdNotOrderByIdDesc(categoryData.get(), 0, productId);
        }
        
        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductModelUpdateDTO> findProductModelUpdateDTO(Long id) {
        List<ProductModelUpdateDTO> listProductModelUpdateDTOs = new ArrayList<>();

        try{
            Optional<Product> product = productRepository.findById(id);
            List<ProductModel> productModels = productModelRepository.findAll();

            Map<Long, ProductModel> map = new HashMap<>();

            if(product.isPresent()) {
                for(ProductModel productModel : product.get().getProductModels()) {
                    map.put(productModel.getId(), productModel);
                }
            }

            for(ProductModel productModel : productModels) {
                ProductModelUpdateDTO productModelUpdateDTO = new ProductModelUpdateDTO();

                productModelUpdateDTO.setProductModel(productModel);
                productModelUpdateDTO.setStatus(0);

                if(map.get(productModel.getId()) != null) {
                    productModelUpdateDTO.setStatus(1);
                }

                listProductModelUpdateDTOs.add(productModelUpdateDTO);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return listProductModelUpdateDTOs;
    }

    @Override
    public List<ProductTypeUpdateDTO> findProductTypeUpdateDTO(Long id) {
        List<ProductTypeUpdateDTO> listProductTypeUpdateDTOs = new ArrayList<>();

        try{
            Optional<Product> product = productRepository.findById(id);
            List<ProductType> productTypes= productTypeRepository.findAll();

            Map<Long, ProductType> map = new HashMap<>();

            if(product.isPresent()) {
                for(ProductType productType : product.get().getProductTypes()) {
                    map.put(productType.getId(), productType);
                }
            }

            for(ProductType productType : productTypes) {
                ProductTypeUpdateDTO productTypeUpdateDTO= new ProductTypeUpdateDTO();

                productTypeUpdateDTO.setProductType(productType);
                productTypeUpdateDTO.setStatus(0);

                if(map.get(productType.getId()) != null) {
                    productTypeUpdateDTO.setStatus(1);
                }

                listProductTypeUpdateDTOs.add(productTypeUpdateDTO);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return listProductTypeUpdateDTOs;
    }

    @Override
    public List<ProductDTO> findBySellFaster() {
        List<Payment> payments = paymentRepository.findByStatusGreaterThan(2);

        List<ProductPayment> productPayments = productPaymentRepository.findByPaymentInOrderByQuantityDesc(payments);
        
        List<Long> listId = new ArrayList<>();

        for(ProductPayment productPayment : productPayments) {
            listId.add(productPayment.getProductId());
        }

        List<Product> products = productRepository.findTop8ByIdInOrderByIdDesc(listId);

        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductDTO> searchByProductNotSale(String productName, String categoryId, int startPriceSell, int entPriceSell) {
        Category category = null;

        if(!categoryId.isEmpty()) {
            Optional<Category> categoryOptional = categoryRepository.findById(Long.parseLong(categoryId));

            if(categoryOptional.isPresent()) {
                category = categoryOptional.get();
            }
        }

        List<Product> products = productRepository.findByProductNameContainsIgnoreCaseAndCategoryAndPriceSellBetweenAndSaleEqualsOrderByIdDesc(productName, category, startPriceSell, entPriceSell, 0);

        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<ProductDTO> searchByProductSale(String productName, String categoryId, int startPriceSell, int endPriceSell) {
        Category category = null;

        if(!categoryId.isEmpty()) {
            Optional<Category> categoryOptional = categoryRepository.findById(Long.parseLong(categoryId));

            if(categoryOptional.isPresent()) {
                category = categoryOptional.get();
            }
        }

        List<Product> products = productRepository.findByProductNameContainsIgnoreCaseAndCategoryAndPriceSellBetweenAndSaleGreaterThanOrderByIdDesc(productName, category, startPriceSell, endPriceSell, 0);

        List<ProductImage> productImages = productImageRepository.findAll();

        Map<Long, List<ProductImage>> map = new HashMap<>();

        for(ProductImage productImage : productImages) {
            Long id = productImage.getProduct().getId();

            List<ProductImage> listImages = new ArrayList<>();

            if(productImage.getProduct().getId() == id) {
                listImages.add(productImage);
            }

            map.put(productImage.getProduct().getId(), listImages);
        }

        List<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products) {
            ProductDTO productDTO = new ProductDTO();

            String image = map.get(product.getId()).get(0).getImage();

            productDTO.setId(product.getId());
            productDTO.setProductName(product.getProductName());
            productDTO.setIntroduce(product.getIntroduce());
            productDTO.setDescription(product.getDescription());
            productDTO.setPriceImport(product.getPriceImport());
            productDTO.setPriceSell(product.getPriceSell());
            productDTO.setQuantityImport(product.getQuantityImport());
            productDTO.setQuantitySell(product.getQuantitySell());
            productDTO.setInventory(product.getInventory());
            productDTO.setSale(product.getSale());
            productDTO.setLastUpdate(product.getLastUpdate());
            productDTO.setImage(image);
            productDTO.setProductModels(product.getProductModels());
            productDTO.setProductTypes(product.getProductTypes());
            productDTO.setCategory(product.getCategory());
            productDTO.setUserSystem(product.getUserSystem());

            productDTOs.add(productDTO);
        }

        return productDTOs;
    }

    @Override
    public List<Product> search(String productName, String categoryId, String productSale) {
        List<Product> products = new ArrayList<>();

        int sale = -1;

        if(!productSale.isEmpty()) {
            sale = Integer.parseInt(productSale);
        }

        if(productName.isEmpty() && categoryId.isEmpty() && sale < 0) {
            products = productRepository.findAll();
        } else {
            Category category = null;

            if(!categoryId.isEmpty()) {
                Long id = Long.parseLong(categoryId);
                Optional<Category> categoryOptional = categoryRepository.findById(id);

                if(categoryOptional.isPresent()) {
                    category = categoryOptional.get();
                }
            } 

            if(!productName.isEmpty() && categoryId.isEmpty() && sale < 0) {
                products = productRepository.findByProductNameContainsIgnoreCaseAndSaleGreaterThan(productName, sale);
            } else if(productName.isEmpty() && !categoryId.isEmpty() && sale < 0) {
                products = productRepository.findByCategoryAndSaleGreaterThan(category, sale);
            } else if(productName.isEmpty() && categoryId.isEmpty() && sale >= 0) {
                products = productRepository.findBySaleEquals(sale);
            } else {
                products = productRepository.findByProductNameContainsIgnoreCaseAndCategoryAndSaleEquals(productName, category, sale);
            }
        }

        return products;
    }

    @Override
    public List<Product> findBySaleGreateThan(int sale) {
        List<Product> products = productRepository.findBySaleGreaterThan(sale);

        return products;
    }

    @Override
    public ProductStatisticDTO productStatisticDTO(String productName, String categoryId) {
        ProductStatisticDTO productStatisticDTO = new ProductStatisticDTO();

        try{
            List<Product> products = new ArrayList<>();

            Category category = null;

            if(productName.isEmpty() && categoryId.isEmpty()) {
                products = productRepository.findAll();
            } else {
                if(!categoryId.isEmpty()) {
                    Long id = Long.parseLong(categoryId);
                    Optional<Category> categoryOptional = categoryRepository.findById(id);
    
                    if(categoryOptional.isPresent()) {
                        category = categoryOptional.get();
                    }
                }

                products = productRepository.findByProductNameContainsIgnoreCaseAndCategoryOrderByQuantitySellDesc(productName, category);
            }

            int quantityImport = 0;
            int quantitySell = 0;
            int inventory = 0;

            for(Product product : products) {
                quantityImport = quantityImport + product.getQuantityImport();
                quantitySell = quantitySell + product.getQuantitySell();
                inventory = inventory + product.getInventory();
            }

            productStatisticDTO.setProducts(products);
            productStatisticDTO.setQuantityProduct(products.size());
            productStatisticDTO.setQuantityImport(quantityImport);
            productStatisticDTO.setQuantitySell(quantitySell);
            productStatisticDTO.setInventory(inventory);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return productStatisticDTO;
    }
}
