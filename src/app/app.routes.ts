import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./index-module/index-module.module').then(m => m.IndexModuleModule)
    }
];
