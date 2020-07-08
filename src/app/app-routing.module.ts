import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './views/home/home.module#HomePageModule' },
    { path: 'home/:method/:transaction', loadChildren: './views/home/home.module#HomePageModule' },
    { path: 'add-transaction/', loadChildren: './views/add-transaction/add-transaction.module#AddTransactionPageModule' },
    { path: 'view-accounts', loadChildren: './views/view-accounts/view-accounts.module#ViewAccountsPageModule' },
    { path: 'view-transaction', loadChildren: './views/view-transaction/view-transaction.module#ViewTransactionPageModule' },
    { path: 'alert-modal', loadChildren: './modals/alert-modal/alert-modal.module#AlertModalPageModule' },
    { path: 'about-modal', loadChildren: './modals/about-modal/about-modal.module#AboutModalPageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
