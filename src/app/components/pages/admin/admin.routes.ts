import { Routes } from "@angular/router";
import { InstructionsComponent } from "./instructions/instructions.component";
import { ProductsComponent } from "./products/products.component";
import { AdminComponent } from "./admin.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: '', component: ProductsComponent
            },
            {
                path: 'instructions', component: InstructionsComponent
            }
        ]
    }
]