import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './admin/component/home-admin/home-admin.component';
import { AuthGuard } from './helper/auth-guard';
import { AuthGuardAdmin } from './helper/auth-guard-admin';
import { HomeUserComponent } from './user/component/home-user/home-user.component';

const routes: Routes = [
  {path: 'home-admin', redirectTo: 'home-admin/main-admin', pathMatch: 'full' },
  {path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuardAdmin],
    children: [
      { path: 'main-admin', loadChildren: () => import('./admin/module/main-admin/main-admin.module').then(m => m.MainAdminModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-user', loadChildren: () => import('./admin/module/user/list-user/list-user.module').then(m => m.ListUserModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-user/:id', loadChildren: () => import('./admin/module/user/update-user/update-user.module').then(m => m.UpdateUserModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-category', loadChildren: () => import('./admin/module/category/add-category/add-category.module').then(m => m.AddCategoryModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-category', loadChildren: () => import('./admin/module/category/list-category/list-category.module').then(m => m.ListCategoryModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-category/:id', loadChildren: () => import('./admin/module/category/update-category/update-category.module').then(m => m.UpdateCategoryModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-category-news', loadChildren: () => import('./admin/module/category-news/add-category-news/add-category-news.module').then(m => m.AddCategoryNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-category-news', loadChildren: () => import('./admin/module/category-news/list-category-news/list-category-news.module').then(m => m.ListCategoryNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-category-news/:id', loadChildren: () => import('./admin/module/category-news/update-category-news/update-category-news.module').then(m => m.UpdateCategoryNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-news', loadChildren: () => import('./admin/module/news/add-news/add-news.module').then(m => m.AddNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-news/:id', loadChildren: () => import('./admin/module/news/update-news/update-news.module').then(m => m.UpdateNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-news', loadChildren: () => import('./admin/module/news/list-news/list-news.module').then(m => m.ListNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'view-news/:id', loadChildren: () => import('./admin/module/news/view-news/view-news.module').then(m => m.ViewNewsModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-product-type', loadChildren: () => import('./admin/module/product-type/add-product-type/add-product-type.module').then(m => m.AddProductTypeModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-product-type/:id', loadChildren: () => import('./admin/module/product-type/update-product-type/update-product-type.module').then(m => m.UpdateProductTypeModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-product-type', loadChildren: () => import('./admin/module/product-type/list-product-type/list-product-type.module').then(m => m.ListProductTypeModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-product-model', loadChildren: () => import('./admin/module/product-model/add-product-model/add-product-model.module').then(m => m.AddProductModelModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-product-model/:id', loadChildren: () => import('./admin/module/product-model/update-product-model/update-product-model.module').then(m => m.UpdateProductModelModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-product-model', loadChildren: () => import('./admin/module/product-model/list-product-model/list-product-model.module').then(m => m.ListProductModelModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-product', loadChildren: () => import('./admin/module/product/add-product/add-product.module').then(m => m.AddProductModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-product', loadChildren: () => import('./admin/module/product/list-product/list-product.module').then(m => m.ListProductModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-product/:id', loadChildren: () => import('./admin/module/product/update-product/update-product.module').then(m => m.UpdateProductModule), canActivate: [AuthGuardAdmin] },
      { path: 'view-product/:id', loadChildren: () => import('./admin/module/product/view-product/view-product.module').then(m => m.ViewProductModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-image/:id', loadChildren: () => import('./admin/module/product/update-image/update-image.module').then(m => m.UpdateImageModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-shipping-fee', loadChildren: () => import('./admin/module/shipping-fee/add-shipping-fee/add-shipping-fee.module').then(m => m.AddShippingFeeModule) },
      { path: 'list-shipping-fee', loadChildren: () => import('./admin/module/shipping-fee/list-shipping-fee/list-shipping-fee.module').then(m => m.ListShippingFeeModule),canActivate: [AuthGuardAdmin] },
      { path: 'update-shipping-fee/:id', loadChildren: () => import('./admin/module/shipping-fee/update-shipping-fee/update-shipping-fee.module').then(m => m.UpdateShippingFeeModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-discount-code', loadChildren: () => import('./admin/module/discount-code/add-discount-code/add-discount-code.module').then(m => m.AddDiscountCodeModule), canActivate: [AuthGuardAdmin] },
      { path: 'update-discount-code/:id', loadChildren: () => import('./admin/module/discount-code/update-discount-code/update-discount-code.module').then(m => m.UpdateDiscountCodeModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-discount-code', loadChildren: () => import('./admin/module/discount-code/list-discount-code/list-discount-code.module').then(m => m.ListDiscountCodeModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-order', loadChildren: () => import('./admin/module/order-management/list-order/list-order.module').then(m => m.ListOrderModule), canActivate: [AuthGuardAdmin] },
      { path: 'view-order/:id', loadChildren: () => import('./admin/module/order-management/view-order/view-order.module').then(m => m.ViewOrderModule), canActivate: [AuthGuardAdmin] },
      { path: 'add-introduction', loadChildren: () => import('./admin/module/introduction/add-introduction/add-introduction.module').then(m => m.AddIntroductionModule), canActivate: [AuthGuardAdmin]  },
      { path: 'list-introduction', loadChildren: () => import('./admin/module/introduction/list-introduction/list-introduction.module').then(m => m.ListIntroductionModule), canActivate: [AuthGuardAdmin]  },
      { path: 'update-introduction/:id', loadChildren: () => import('./admin/module/introduction/update-introduction/update-introduction.module').then(m => m.UpdateIntroductionModule), canActivate: [AuthGuardAdmin] },
      { path: 'list-contact', loadChildren: () => import('./admin/module/contact/list-contact/list-contact.module').then(m => m.ListContactModule), canActivate: [AuthGuardAdmin]  },
      { path: 'view-contact/:id', loadChildren: () => import('./admin/module/contact/view-contact/view-contact.module').then(m => m.ViewContactModule), canActivate: [AuthGuardAdmin]  },
      { path: 'list-token', loadChildren: () => import('./admin/module/user/list-token/list-token.module').then(m => m.ListTokenModule), canActivate: [AuthGuardAdmin]},
      { path: 'repost-statistic', loadChildren: () => import('./admin/module/report/report-statistic/report-statistic.module').then(m => m.ReportStatisticModule), canActivate: [AuthGuardAdmin] },
      { path: 'product-statistic', loadChildren: () => import('./admin/module/report/product-statistic/product-statistic.module').then(m => m.ProductStatisticModule), canActivate: [AuthGuardAdmin] },
    ]
  },
  {path: '', redirectTo: 'home/main', pathMatch: 'full' },
  {
    path: 'home', component: HomeUserComponent,
    children: [
      { path: 'main', loadChildren: () => import('./user/module/main/main/main.module').then(m => m.MainModule) },
      { path: 'product-order/:id', loadChildren: () => import('./user/module/product/product-order/product-order.module').then(m => m.ProductOrderModule) },
      { path: 'product-cart', loadChildren: () => import('./user/module/product/product-cart/product-cart.module').then(m => m.ProductCartModule), canActivate: [AuthGuard] },
      { path: 'product-payment', loadChildren: () => import('./user/module/product/product-payment/product-payment.module').then(m => m.ProductPaymentModule), canActivate: [AuthGuard] },
      { path: 'view-post/:id', loadChildren: () => import('./user/module/news/view-post/view-post.module').then(m => m.ViewPostModule) },
      { path: 'list-post', loadChildren: () => import('./user/module/news/list-post/list-post.module').then(m => m.ListPostModule) },
      { path: 'product-category/:id', loadChildren: () => import('./user/module/product-category/product-category.module').then(m => m.ProductCategoryModule) },
      { path: 'update-profile', loadChildren: () => import('./user/module/profile/update-profile/update-profile.module').then(m => m.UpdateProfileModule), canActivate: [AuthGuard] },
      { path: 'my-order', loadChildren: () => import('./user/module/order/my-order/my-order.module').then(m => m.MyOrderModule), canActivate: [AuthGuard] },
      { path: 'order-detail/:id', loadChildren: () => import('./user/module/order/order-detail/order-detail.module').then(m => m.OrderDetailModule), canActivate: [AuthGuard] },
      { path: 'product-review/:id', loadChildren: () => import('./user/module/product/product-review/product-review.module').then(m => m.ProductReviewModule), canActivate: [AuthGuard] },
      { path: 'view-introduction', loadChildren: () => import('./user/module/introduction/view-introduction/view-introduction.module').then(m => m.ViewIntroductionModule) },
      { path: 'add-contact', loadChildren: () => import('./user/module/contact/add-contact/add-contact.module').then(m => m.AddContactModule) },
      { path: 'search-product', loadChildren: () => import('./user/module/search/search-product/search-product.module').then(m => m.SearchProductModule) },
      { path: 'forgot-password/:token', loadChildren: () => import('./user/module/password/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
      { path: 'get-token', loadChildren: () => import('./user/module/password/get-token/get-token.module').then(m => m.GetTokenModule) },
      { path: 'change-password', loadChildren: () => import('./user/module/profile/change-password/change-password.module').then(m => m.ChangePasswordModule), canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
