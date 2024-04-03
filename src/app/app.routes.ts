import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'admin', pathMatch: 'full'
    },
    {
        path: 'admin', 
        loadChildren: () => import('./components/pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: '**', component: PageNotFoundComponent
    }

];
