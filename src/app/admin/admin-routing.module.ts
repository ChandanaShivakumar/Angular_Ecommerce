import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {path: 'userlist', component: UserlistComponent },
  {path: 'productlist', component: ProductlistComponent },
  {path: 'admindashboard', component: AdmindashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}