import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthService } from '../../service/auth.service';
import { File } from '@ionic-native/file';

import { FolderPage } from '../folder/folder';
import { AddFolderPage } from '../add-folder/add-folder';
import { EditFolderPage } from '../edit-folder/edit-folder';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

  data = this.auth.getEmail();
  dataPhone = this.auth.getPhone();
  folders:any = [];
  totalFolder = 0;
  folder = { name:""};
  thisDate: String = new Date().toISOString();
  path = this.file.externalRootDirectory + 'IonScan';

  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private auth: AuthService,
    private file: File
    ) { 
  }

  ionViewWillEnter() {
    this.createRootFolder();
    this.getData();    
  }

  createRootFolder(){
    this.file.createDir(this.file.externalRootDirectory, 'IonScan', false).catch(e => console.log('IonScan didn\'t create: ' + e.message)); 
  }

  getData(){    
    if (this.data != null) {
      let nameEmail = this.data.substr(0,this.data.lastIndexOf('@'));
      let nameDB = nameEmail + '.db';
      let identityFolder = 'Identity' + '.' + nameEmail;
      let passportFolder = 'Passport' + '.' + nameEmail;
      this.sqlite.create({
        name: nameDB,
        location: 'default'
      }).then((db: SQLiteObject) => {
         /* db.executeSql('DROP TABLE IF EXISTS folder', {} as any)
        .then(res => console.log('Deleted Folder table'))
        .catch(e => console.log(e));
        db.executeSql('DROP TABLE IF EXISTS image', {} as any)
        .then(res => console.log('Deleted Image table'))
        .catch(e => console.log(e));*/
       db.executeSql('CREATE TABLE IF NOT EXISTS folder(folderid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, type TEXT, display TEXT DEFAULT "yes", UNIQUE(name))', {} as any).catch(e => console.log('Folder table didn\'t create: ' + e.message));
        db.executeSql('CREATE TABLE IF NOT EXISTS image(imageid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, path TEXT, base64 TEXT, type TEXT, folderid, UNIQUE(name), FOREIGN KEY(folderid) REFERENCES folder (folderid))', {} as any).catch(e => console.log('Image table didn\'t create: ' + e.message));
        db.executeSql('INSERT INTO folder VALUES ("1","Identity",?,"Chứng minh thư","no")', [this.thisDate]).catch(e => console.log('Identity didn\'t add to table: ' + e.message));
        db.executeSql('INSERT INTO folder VALUES ("2","Passport",?,"Hộ chiếu","no")', [this.thisDate]).catch(e => console.log('Passport didn\'t add to table: ' + e.message));
        this.file.createDir(this.path, identityFolder, false).catch(e => console.log('Identity didn\'t add to device: ' + e.message));
        this.file.createDir(this.path, passportFolder, false).catch(e => console.log('Passport didn\'t add to device: ' + e.message));
        db.executeSql('SELECT * FROM folder WHERE display="yes" ORDER BY folderid DESC', {} as any)
        .then(res => {
          this.folders = [];
          for(var i=0; i<res.rows.length; i++) {
            this.folders.push({folderid:res.rows.item(i).folderid,name:res.rows.item(i).name,date:res.rows.item(i).date,type:res.rows.item(i).type,display:res.rows.item(i).display})
          }
        }).catch(e => console.log('Select nothing from Folder table: ' + e.message));
        db.executeSql('SELECT COUNT(folderid) AS totalFolder FROM folder WHERE display="yes"', {} as any)
        .then(res => {
          if(res.rows.length>0) {
            this.totalFolder = parseInt(res.rows.item(0).totalFolder);
          }
        }).catch(e => console.log('Count nothing from Folder table: ' + e.message));
      }).catch(e => console.log('SQLite didn\'t create SQLite: ' + e.message));
    }

    else {
      let namePhone = this.dataPhone.substr(this.dataPhone.lastIndexOf('+')+1);
      let nameDBPhone = 'u' + namePhone;
      let nameDB = nameDBPhone + '.db';
      let identityFolder = 'Identity' + '.' + nameDBPhone;
      let passportFolder = 'Passport' + '.' + nameDBPhone;
      this.sqlite.create({
        name: nameDB,
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS folder(folderid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, type TEXT, display TEXT DEFAULT "yes", UNIQUE(name))', {} as any).catch(e => console.log('Folder table didn\'t create: ' + e.message));
        db.executeSql('CREATE TABLE IF NOT EXISTS image(imageid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, path TEXT, base64 TEXT, type TEXT, folderid, UNIQUE(name), FOREIGN KEY(folderid) REFERENCES folder (folderid))', {} as any).catch(e => console.log('Image table didn\'t create: ' + e.message));
        db.executeSql('INSERT INTO folder VALUES ("1","Identity",?,"Chứng minh thư","no")', [this.thisDate]).catch(e => console.log('Identity didn\'t add to table: ' + e.message));
        db.executeSql('INSERT INTO folder VALUES ("2","Passport",?,"Hộ chiếu","no")', [this.thisDate]).catch(e => console.log('Passport didn\'t add to table: ' + e.message));
        this.file.createDir(this.path, identityFolder, false).catch(e => console.log('Identity didn\'t add to device: ' + e.message));
        this.file.createDir(this.path, passportFolder, false).catch(e => console.log('Identity didn\'t add to device: ' + e.message));
        db.executeSql('SELECT * FROM folder WHERE display="yes" ORDER BY folderid DESC', {} as any)
        .then(res => {
          this.folders = [];
          for(var i=0; i<res.rows.length; i++) {
            this.folders.push({folderid:res.rows.item(i).folderid,name:res.rows.item(i).name,date:res.rows.item(i).date,type:res.rows.item(i).type,display:res.rows.item(i).display})
          }
        }).catch(e => console.log('Select nothing from Folder table: ' + e.message));
        db.executeSql('SELECT COUNT(folderid) AS totalFolder FROM folder WHERE display="yes"', {} as any)
        .then(res => {
          if(res.rows.length>0) {
            this.totalFolder = parseInt(res.rows.item(0).totalFolder);
          }
        }).catch(e => console.log('Count nothing from Folder table: ' + e.message));
      }).catch(e => console.log('SQLite didn\'t create SQLite: ' + e.message));
    }
  }

  editFolder(folderid,name) {
    this.navCtrl.push(EditFolderPage, {
      folderid:folderid,
      foldername:name
    });
  }

  moveToFolder(folderid,name){
    this.navCtrl.push(FolderPage, {
      folderid:folderid,      
      foldername:name
    });
  }

  addFolder() {
    if (this.data != null) { 
      this.navCtrl.push(AddFolderPage);
    }
    else {
      this.navCtrl.push(AddFolderPage);
    }
  }

  deleteFolder(folderid) {
    if (this.data != null) {
      let nameEmail = this.data.substr(0,this.data.lastIndexOf('@'));
      let nameDB = nameEmail + '.db';
      this.sqlite.create({
        name: nameDB,
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT name FROM folder WHERE folderid=?', [folderid])
        .then(res => {
          if(res.rows.length > 0) {            
            this.folder.name = res.rows.item(0).name;
          }          
          let name = this.folder.name + '.' + nameEmail;
          this.file.removeRecursively(this.path, name).catch(e => console.log('Folder didn\'t remove in device: ' + e.message));          
        }).catch(e => console.log('Folder didn\'t remove: ' + e.message));

        db.executeSql('DELETE FROM folder WHERE folderid=?', [folderid]).then(res => { 
          this.getData();        
        }).catch(e => console.log('Folder didn\'t remove in table: ' + e.message));
      }).catch(e => console.log('SQLite didn\'t create: ' + e.message));
    }

    else {
      let namePhone = this.dataPhone.substr(this.dataPhone.lastIndexOf('+')+1);
      let nameDBPhone = 'u' + namePhone;
      let nameDB = nameDBPhone + '.db';
      this.sqlite.create({
        name: nameDB,
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT name FROM folder WHERE folderid=?', [folderid])
        .then(res => {
          if(res.rows.length > 0) {            
            this.folder.name = res.rows.item(0).name;
          }          
          let name = this.folder.name + '.' + nameDB;
          this.file.removeRecursively(this.path, name).catch(e => console.log('Folder didn\'t remove in device: ' + e.message));          
        }).catch(e => console.log('Folder didn\'t remove: ' + e.message));
        db.executeSql('DELETE FROM folder WHERE folderid=?', [folderid]).then(res => { 
          this.getData();        
        }).catch(e => console.log('Folder didn\'t remove in table: ' + e.message));
      }).catch(e => console.log('SQLite didn\'t create: ' + e.message));
    }
  }

}
