import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-servicios-publicados',
  templateUrl: './servicios-publicados.component.html',
  styleUrls: ['./servicios-publicados.component.scss'],
  standalone:true,
  imports:[CommonModule, FormsModule,ReactiveFormsModule,IonicModule,IoniconsModule]
})
export class ServiciosPublicadosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
