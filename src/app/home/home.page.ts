import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { TarefaService } from '../services/tarefa.service';
import { NovaTarefaPage} from '../nova-tarefa/nova-tarefa.page';
import { AtualizaTarefaPage } from '../atualiza-tarefa/atualiza-tarefa.page';
import { Tarefa } from '../models/tarefa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NovaTarefaPage, AtualizaTarefaPage]
})
export class HomePage implements OnInit {
  public hoje: number = Date.now();

  public tarefasLista: Array<Tarefa> = [
    {
      id: '001',
      nome: 'Limpar',
      data: '2022-09-16',
      prioridade: 'baixo',
      categoria: 'domestico'
    }
  ] ;

  constructor(private modalCtrl: ModalController, private tarefaService: TarefaService) { }

  ngOnInit() {
    this.listar();
  }

  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: NovaTarefaPage
    });

    modal.onDidDismiss().then( novaTarefa => {
      this.listar();
    });

    return await modal.present();
  }

  public listar() {
    this.tarefasLista = this.tarefaService.carregar();
    
    console.log(this.tarefasLista);

  }

  public deletar(id: string) {
    this.tarefaService.deletar(id);
    this.listar();
  }

  public async atualizar(tarefaSelecionada: Tarefa) {
    const modal = await this.modalCtrl.create({
      component:AtualizaTarefaPage,
      componentProps: {
        minhaTarefa: tarefaSelecionada
      }
    })

    modal.onDidDismiss().then(()=>{
      this.listar();
    });

    return await modal.present();
  }

  public prioridadeCor(prioridade: string) {
    const cor: string =prioridade === 'alto' ? 'danger' : (prioridade === 'baixo' ? 'success' : 'warning');
    
    console.log(cor);

    return cor;
  }
}

