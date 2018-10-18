import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPage } from '../pages/reset/reset';
import { AboutPage } from '../pages/about/about';
import { IdentityPage } from '../pages/identity/identity';
import { PassportPage } from '../pages/passport/passport';
import { AddFolderPage } from '../pages/add-folder/add-folder';
import { EditFolderPage } from '../pages/edit-folder/edit-folder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { AuthService } from '../service/auth.service';
import { Firebase } from '@ionic-native/firebase';
import { CameraPreview } from '@ionic-native/camera-preview';
import { SQLite } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  LoginPage,
  SignupPage,
  ResetPage,
  AboutPage,
  IdentityPage,
  PassportPage,
  AddFolderPage,
  EditFolderPage
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(FIREBASE_CONFIG),
  AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  LoginPage,
  SignupPage,
  ResetPage,
  AboutPage,
  IdentityPage,
  PassportPage,
  AddFolderPage,
  EditFolderPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  Toast,
  AuthService,
  Firebase,
  CameraPreview,
  SQLite,
  File,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
