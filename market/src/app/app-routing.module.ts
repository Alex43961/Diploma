import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'product/:id',component:ProductComponent},
  {path:'cart', component:CartComponent},
  {path:'admin-page', component:AdminPageComponent},
  {path:'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
