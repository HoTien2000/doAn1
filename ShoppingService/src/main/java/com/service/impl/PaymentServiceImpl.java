package com.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.entity.Cart;
import com.entity.DiscountCode;
import com.entity.Payment;
import com.entity.Product;
import com.entity.ProductPayment;
import com.entity.ShippingFee;
import com.entity.UserSystem;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.repository.CartRepository;
import com.repository.DiscountCodeRepository;
import com.repository.PaymentRepository;
import com.repository.ProductPaymentRepository;
import com.repository.ProductRepository;
import com.repository.UserSystemRepository;
import com.service.PaymentService;
import com.service.dto.PaymentDTO;
import com.service.dto.StatisticDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductPaymentRepository productPaymentRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private DiscountCodeRepository discountCodeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Payment save(String discount, String shipping) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            DiscountCode discountCode = null;

            if (discount != null) {
                discountCode = mapper.readValue(discount, DiscountCode.class);
            }
            ShippingFee shippingFee = mapper.readValue(shipping, ShippingFee.class);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            List<Cart> carts = cartRepository.findByUserSystemOrderById(userSystem);

            int totalQuantity = 0;
            Long total = 0L;

            Payment payment = new Payment();

            payment.setLastUpdate(LocalDate.now());
            payment.setTotalQuantity(totalQuantity);
            payment.setTotal(total);
            payment.setStatus(0);
            payment.setUserSystem(userSystem);

            if (discountCode != null) {
                total = total - discountCode.getDiscount();
                payment.setDiscountCode(discountCode.getDiscountCode());
                payment.setTotalDiscount(discountCode.getDiscount());
            }

            if (shippingFee != null) {
                payment.setShippingFee(shippingFee.getShippingFee());

                StringBuilder stringBuilder = new StringBuilder();

                stringBuilder.append(userSystem.getSpecificAddress());
                stringBuilder.append(", ");
                stringBuilder.append("Xã/Phường: ");
                stringBuilder.append(userSystem.getWards());
                stringBuilder.append(", ");
                stringBuilder.append("Quận/Huyện: ");
                stringBuilder.append(userSystem.getDistrict());
                stringBuilder.append(", ");
                stringBuilder.append("Tỉnh/Thành phố: ");
                stringBuilder.append(userSystem.getProvince());

                payment.setShipingAddress(stringBuilder.toString());
            }

            Payment save = paymentRepository.save(payment);

            List<ProductPayment> productPayments = new ArrayList<>();

            for (Cart cart : carts) {
                ProductPayment productPayment = new ProductPayment();

                productPayment.setCatecoryName(cart.getProduct().getCategory().getCategoryName());
                productPayment.setProductName(cart.getProduct().getProductName());
                productPayment.setProductId(cart.getProduct().getId());
                productPayment.setModel(cart.getProductModel().getProductModelName());
                productPayment.setType(cart.getProductType().getProductTypeName());
                productPayment.setPrice(cart.getProduct().getPriceSell());
                productPayment.setQuantity(cart.getQuantity());
                productPayment.setPayment(payment);

                if (cart.getProduct().getSale() > 0) {
                    float percentage = cart.getProduct().getPriceSell() * (float) cart.getProduct().getSale() / 100;
                    float priceSale = cart.getProduct().getPriceSell() - percentage;

                    productPayment.setPriceSale((int) priceSale);
                    productPayment.setSale(cart.getProduct().getSale());

                    productPayment.setTotal((int) priceSale * cart.getQuantity());
                } else {
                    productPayment.setPriceSale(0);
                    productPayment.setSale(0);
                    productPayment.setTotal(cart.getProduct().getPriceSell() * cart.getQuantity());
                }

                totalQuantity = totalQuantity + productPayment.getQuantity();
                total = total + productPayment.getTotal();

                productPayments.add(productPayment);
            }

            total = total + payment.getShippingFee();

            productPaymentRepository.saveAll(productPayments);

            save.setTotalQuantity(totalQuantity);
            save.setTotal(total);

            cartRepository.deleteAll(carts);

            if (discountCode != null) {
                discountCode.setStatus(1);

                discountCodeRepository.save(discountCode);
            }

            return paymentRepository.save(payment);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Payment> findAll() {
        List<Payment> payments = paymentRepository.findAll();

        return payments;
    }

    @Override
    public List<Payment> findByUserSystem() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        List<Payment> payments = paymentRepository.findByUserSystemOrderByLastUpdateDesc(userSystem);

        return payments;
    }

    @Override
    public Payment findById(Long id) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);

        if (optionalPayment.isPresent()) {
            return optionalPayment.get();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);

        if (optionalPayment.isPresent()) {
            for (ProductPayment productPayment : optionalPayment.get().getProductPayments()) {
                
                Optional<Product> productOptional = productRepository.findById(productPayment.getProductId());

                if (productOptional.isPresent()) {
                    int quantitySell = productOptional.get().getQuantitySell() - productPayment.getQuantity();

                    productOptional.get().setQuantitySell(quantitySell);
                    productOptional.get().setInventory(productOptional.get().getInventory() + productPayment.getQuantity());

                    productRepository.save(productOptional.get());
                }

            }

            productPaymentRepository.deleteAll(optionalPayment.get().getProductPayments());

            paymentRepository.deleteById(id);
        }
    }

    @Override
    public Payment statusOrder(String id, String status) {
        try{
            Long paymentId = Long.parseLong(id);
            int paymentStatus = Integer.parseInt(status);

            Optional<Payment> optionalPayment = paymentRepository.findById(paymentId);
            
            if (optionalPayment.isPresent()) {
                optionalPayment.get().setStatus(paymentStatus);
    
                return paymentRepository.save(optionalPayment.get());
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Payment> findByLastUpdateAndStatus(String lastUpdate, int status) {
        List<Payment> payments = new ArrayList<>();

        if(lastUpdate.isEmpty() && status < 0) {
            payments = paymentRepository.findAll();
        } else if(!lastUpdate.isEmpty() && status < 0) {
            LocalDate date = LocalDate.parse(lastUpdate);
            payments = paymentRepository.findByLastUpdate(date);
        } else if(lastUpdate.isEmpty() && status >= 0) {
            if(status >=3 ) {
                payments = paymentRepository.findByStatusGreaterThan(2);
            } else {
                payments = paymentRepository.findByStatus(status);
            }
        } else {
            LocalDate date = LocalDate.parse(lastUpdate);

            if(status >= 3) {
                payments = paymentRepository.findByLastUpdateAndStatusGreaterThan(date, 2);
            } else {
                payments = paymentRepository.findByLastUpdateAndStatus(date, status);
            }
        }

        return payments;
    }

    @Override
    public List<Payment> findByStatus(int status) {
        List<Payment> payments = paymentRepository.findByStatus(status);

        return payments;
    }

    @Override
    public StatisticDTO reportStatistic(String startDate, String endDate) {
        StatisticDTO statisticDTO = new StatisticDTO();

        try{

            LocalDate starDateLocal = LocalDate.parse(startDate);
            LocalDate endDateLocal = LocalDate.parse(endDate);

            List<Payment> payments = paymentRepository.findByStatusGreaterThanAndLastUpdateBetween(2, starDateLocal, endDateLocal);

            if(payments.size() > 0) {
                List<ProductPayment> productPayments = productPaymentRepository.findByPaymentIn(payments);

                List<Long> productId = new ArrayList<>();

                for(ProductPayment productPayment : productPayments) {
                    productId.add(productPayment.getProductId());
                }

                List<Product> products = productRepository.findByIdIn(productId);

                List<PaymentDTO> paymentDTOs = new ArrayList<>();

                Long totalSell = 0L;

                for(Payment payment: payments) {
                    PaymentDTO paymentDTO = new PaymentDTO();

                    paymentDTO.setId(payment.getId());
                    paymentDTO.setLastUpdate(payment.getLastUpdate());
                    paymentDTO.setShipingAddress(payment.getShipingAddress());
                    paymentDTO.setShippingFee(payment.getShippingFee());

                    if(payment.getTotalDiscount() > 0) {
                        paymentDTO.setDiscountCode(payment.getDiscountCode());
                    }

                    paymentDTO.setTotalDiscount(payment.getTotalDiscount());
                    paymentDTO.setTotalQuantity(payment.getTotalQuantity());
                    paymentDTO.setTotal(payment.getTotal());
                    paymentDTO.setActualMoney(payment.getTotal() - payment.getShippingFee());
                    paymentDTO.setStatus(payment.getStatus());
                    paymentDTO.setUserSystem(payment.getUserSystem());

                    paymentDTOs.add(paymentDTO);

                    totalSell = totalSell + (payment.getTotal() - payment.getShippingFee());
                }

                Long totalImport = 0L;

                for(Product product : products) {
                    totalImport = totalImport + product.getPriceImport();
                }

                statisticDTO.setPaymentDTOs(paymentDTOs);
                statisticDTO.setTotalImport(totalImport);
                statisticDTO.setTotalSell(totalSell);
                statisticDTO.setTotal(totalSell - totalImport);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return statisticDTO;
    }

}
