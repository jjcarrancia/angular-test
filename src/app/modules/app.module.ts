import { ApplicationRef, NgModule } from '@angular/core';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { AppComponent } from '../components/app.component';
import { LoginComponent } from '../screens/login/login.component';
import { JobsComponent } from '../screens/jobs/jobs.component';
import { JobDetailComponent } from '../screens/jobDetail/jobDetail.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from '../routes/app.routing';
import { Api } from '../api/api';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuardService } from '../services/auth/auth-guard.service';

@NgModule({
  imports: [
    // Declare your Modules here
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    JobsComponent,
    JobDetailComponent
    // Declare your Components here
  ],
  providers: [
    AuthService,
    AuthGuardService,
    Api

    // Declare your services here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
