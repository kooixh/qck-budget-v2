import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home/:method/:transaction', loadChildren: './home/home.module#HomePageModule' },
  { path: 'add-transaction/', loadChildren: './add-transaction/add-transaction.module#AddTransactionPageModule' },
  { path: 'view-accounts', loadChildren: './view-accounts/view-accounts.module#ViewAccountsPageModule' },
  { path: 'view-transaction', loadChildren: './view-transaction/view-transaction.module#ViewTransactionPageModule' },
  { path: 'alert-modal', loadChildren: './alert-modal/alert-modal.module#AlertModalPageModule' },
  { path: 'about-modal', loadChildren: './about-modal/about-modal.module#AboutModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
