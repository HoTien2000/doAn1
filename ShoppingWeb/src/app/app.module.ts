import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderUserComponent } from './user/component/header-user/header-user.component';
import { FooterComponent } from './user/component/footer/footer.component';
import { HomeUserComponent } from './user/component/home-user/home-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helper/auth-interceptor';
import { HeaderAdminComponent } from './admin/component/header-admin/header-admin.component';
import { SidebarComponent } from './admin/component/sidebar/sidebar.component';
import { HomeAdminComponent } from './admin/component/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderUserComponent,
    FooterComponent,
    HomeUserComponent,
    HeaderAdminComponent,
    SidebarComponent,
    HomeAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
