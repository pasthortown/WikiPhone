import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  titulo: string;
  textoArticulo: string;
  webServiceURL = 'http://localhost/wikiphonews/wiki/';

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }

  guardarWiki(){
    this.http.get(this.webServiceURL + 'crear?titulo=' + this.titulo + '&textoArticulo='+ this.textoArticulo)
      .subscribe(respuesta => {
        this.showAlert('Datos Guardados','WikiPhone');
      }, error => {
        console.log(error);
    });
  }

  showAlert(mensaje: string, titulo:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  buscarWiki(){
    this.http.get(this.webServiceURL + 'leer_filtrado?columna=titulo&tipo_filtro=contiene&filtro=' + this.titulo)
      .subscribe(respuesta => {
        this.titulo = respuesta.json()[0].titulo;
        this.textoArticulo = respuesta.json()[0].textoArticulo;
      }, error => {
        console.log(error);
    });
  }
}
