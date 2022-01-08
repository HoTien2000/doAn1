package com.repository;

import java.util.List;

import com.entity.Category;
import com.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop8BySaleEqualsOrderByIdDesc(int sale);

    List<Product> findTop8BySaleGreaterThanOrderByIdDesc(int sale);

    List<Product> findByCategoryAndSaleEqualsOrderByIdDesc(Category category, int sale);

    List<Product> findByCategoryAndSaleGreaterThanOrderByIdDesc(Category category, int sale);

    List<Product> findTop4ByCategoryAndSaleEqualsAndIdNotOrderByIdDesc(Category category, int sale, Long id);

    List<Product> findTop4ByCategoryAndSaleGreaterThanAndIdNotOrderByIdDesc(Category category, int sale, Long id);

    List<Product> findTop8ByIdInOrderByIdDesc(List<Long> id);

    // start search user
    List<Product> findByProductNameContainsIgnoreCaseAndCategoryAndPriceSellBetweenAndSaleEqualsOrderByIdDesc(String productName, Category category, int startPriceSell, int entPriceSell, int sale);

    List<Product> findByProductNameContainsIgnoreCaseAndCategoryAndPriceSellBetweenAndSaleGreaterThanOrderByIdDesc(String productName, Category category, int startPriceSell, int entPriceSell, int sale);

    // end search user

    // start search product

    List<Product> findByProductNameContainsIgnoreCaseAndCategoryAndSaleEquals(String productName, Category category, int sale);

    List<Product> findByProductNameContainsIgnoreCaseAndCategoryAndSaleGreaterThan(String productName, Category category, int sale);

    List<Product> findByProductNameContainsIgnoreCaseAndSaleGreaterThan(String productName, int sale);

    List<Product> findBySaleEquals(int sale);

    List<Product> findByCategoryAndSaleGreaterThan(Category category, int sale);

    List<Product> findBySaleGreaterThan(int sale);

    // end search product

    List<Product> findByIdIn(List<Long> id);

    List<Product> findByProductNameContainsIgnoreCaseAndCategoryOrderByQuantitySellDesc(String productName, Category category);
}
