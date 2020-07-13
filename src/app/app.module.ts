import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyObjectComponent } from './components/my-object/my-object.component';
import {Routes, RouterModule} from '@angular/router'
import 'reflect-metadata';
import { FormsModule } from '@angular/forms';
import { ActivityFormComponent } from './components/activitiesForms/activity-form/activity-form.component';
import { ParalleActivitiesFormComponent } from './components/activitiesForms/paralle-activities-form/paralle-activities-form.component';
import { ConditionalActivitiesFormComponent } from './components/activitiesForms/conditional-activities-form/conditional-activities-form.component';
import { LoopActivitiesFormComponent } from './components/activitiesForms/loop-activities-form/loop-activities-form.component';
import { ActivityViewComponent } from './components/activitiesViews/activity-view/activity-view.component';
import { ProcessNameComponent } from './components/editing/process-name/process-name.component';
import { EditorComponent } from './components/editing/editor/editor.component';
import { ProcessTriggerDetailsComponent } from './components/editing/process-trigger-details/process-trigger-details.component';
import { ProcessTriggerTypeComponent } from './components/editing/process-trigger-type/process-trigger-type.component';
import { SaveExecuteProcessComponent } from './components/editing/save-execute-process/save-execute-process.component';
import { MyScenariosComponent } from './components/editing/my-scenarios/my-scenarios.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ComposeComponent } from './components/compose/compose.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ErrorComponent } from './components/error/error.component';

const appRoutes : Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'main', component: MainComponent, canActivate:[AuthGuard],
    children : [
      {path: 'home', component: HomeComponent},
      {path: 'myObjects', component: MyObjectComponent},
      {path: 'editing/processName', component: ProcessNameComponent},
      {path: 'editing/processTriggerType', component: ProcessTriggerTypeComponent},
      {path: 'editing/editor', component: EditorComponent},
      {path: 'editing/myScenarios', component: MyScenariosComponent},
      {path: 'editing/processTriggerDetails', component: ProcessTriggerDetailsComponent},
      {path: 'editing/saveExecuteProcess', component: SaveExecuteProcessComponent},
      {path: 'acceuil', component: AppComponent},
      {path: 'user/profile', component: ProfileComponent},
      {path: 'help', component: HelpComponent},
      {path: 'about', component: AboutComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'compose', component: ComposeComponent}
    ]
}
];

@NgModule({
  declarations: [
    AppComponent,
    MyObjectComponent,
    ActivityFormComponent,
    ParalleActivitiesFormComponent,
    ConditionalActivitiesFormComponent,
    LoopActivitiesFormComponent,
    ActivityViewComponent,
    ProcessNameComponent,
    EditorComponent,
    ProcessTriggerDetailsComponent,
    ProcessTriggerTypeComponent,
    SaveExecuteProcessComponent,
    MyScenariosComponent,
    ProfileComponent,
    HelpComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MainComponent,
    SettingsComponent,
    MessagesComponent,
    ComposeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
