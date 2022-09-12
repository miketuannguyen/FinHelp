import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppInitFactory, HttpLoaderFactory } from './includes/translation.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
