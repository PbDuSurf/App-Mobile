import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Tarefa } from './../models/tarefa.model'

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  gravar(minhaTarefa: Tarefa) {
    throw new Error('Method not implemented.');
  }

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  public set(key: string, value: any) {
    this.storage.set(key, value);
  }

  public async adicionar(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public deletar(key: string) {
    this.storage.remove(key);
  }

  public async editar(key: string, newValue: any) {
    await this.storage.set(key, newValue);
    this.carregar();
  }
  
  public carregar(): Array<Tarefa> {
    let tarefas: Array<Tarefa> = [];

    console.log(' getAllTasks carregar ');
    console.log(' this.storage.length '+this.storage.length());

    this.storage.forEach((item, key, index)=>{
      
      console.log(key);
      console.log(item);

      const tarefa: Tarefa = {
        ...item
      };

      tarefas.push( tarefa );
    });

    return tarefas;
  }

}

