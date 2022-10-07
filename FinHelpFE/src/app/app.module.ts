import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { AppInitFactory, HttpLoaderFactory } from './includes/translation.config';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {
            onSameUrlNavigation: 'reload',
            anchorScrolling: 'enabled',
        }),
        NgbModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        AuthModule,
        ComponentModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: AppInitFactory,
            deps: [TranslateService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
