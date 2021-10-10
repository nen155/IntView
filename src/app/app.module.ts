import { FormAddInterviewService } from 'src/app/core/services/formAddInterview.service';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BusinessComponent } from './pages/business/business.component';
import { EditBusinessComponent } from './shared/components/edit-business/edit-business.component';
import { AddUserComponent } from './shared/components/add-user/add-user.component';
import { HttpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { BasicAuthInterceptor } from './core/interceptors/token.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';
import { RegistrationCompleteComponent } from './shared/components/registration-complete/registration-complete.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BillingComponent } from './pages/billing/billing.component';
import { InterviewsComponent } from './pages/interviews/interviews.component';
import { InterviewProgressComponent } from './pages/interview-progress/interview-progress.component';
import { AddInterviewComponent } from './shared/components/add-interview/add-interview.component';
import { EditInterviewComponent } from './shared/components/edit-interview/edit-interview.component';
import { QuestionsComponent } from './shared/components/questions/questions.component';
import { QuestionComponent } from './shared/components/question/question.component';
import { PresentationVideoComponent } from './shared/components/presentation-video/presentation-video.component';
import { InviteComponent } from './shared/components/invite/invite.component';
import { CandidateToInviteComponent } from './shared/components/candidate-to-invite/candidate-to-invite.component';
import { ArchiveInterviewComponent } from './shared/components/archive-interview/archive-interview.component';
import { CardCandidateComponent } from './shared/components/card-candidate/card-candidate.component';
//import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { FilterScoreComponent } from './shared/components/filter-score/filter-score.component';
import { UsersComponent } from './pages/users/users.component';
import { DragDropDirective } from './shared/directives/drag-drop.directive';
import { UploadFileComponent } from './shared/components/upload-file/upload-file.component';
import { JobFormComponent } from './shared/components/job-form/job-form.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { InviteEmailComponent } from './shared/components/invite-email/invite-email.component';
import { InviteStatusComponent } from './shared/components/invite-status/invite-status.component';
import { InterviewComponent } from './shared/components/interview/interview.component';
import { VideoplayerComponent } from './shared/components/videoplayer/videoplayer.component';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { NgPipesModule } from "ngx-pipes";

@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    EditBusinessComponent,
    AddUserComponent,
    RegistrationCompleteComponent,
    LoginComponent,
    DashboardComponent,
    BillingComponent,
    InterviewsComponent,
    InterviewProgressComponent,
    AddInterviewComponent,
    EditInterviewComponent,
    QuestionsComponent,
    QuestionComponent,
    PresentationVideoComponent,
    InviteComponent,
    CandidateToInviteComponent,
    ArchiveInterviewComponent,
    CardCandidateComponent,
    StarRatingComponent,
    FilterScoreComponent,
    UsersComponent,
    DragDropDirective,
    UploadFileComponent,
    JobFormComponent,
    InviteEmailComponent,
    InviteStatusComponent,
    InterviewComponent,
    VideoplayerComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    RecaptchaFormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RecaptchaModule,
    NgPipesModule
    //,MatFabMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    FormAddInterviewService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditBusinessComponent,
    AddUserComponent,
    RegistrationCompleteComponent,
    ArchiveInterviewComponent,
    CardCandidateComponent,
    StarRatingComponent
  ],
  exports: [RecaptchaModule]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
