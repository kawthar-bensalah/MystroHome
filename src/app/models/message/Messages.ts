import { Message } from './Message';

export class Messages{ //Classe pour récupérer tout les messages d'un utilisateur donné stockés dans la base de données
    
    tabMessages : Array<Message>; //tableau des messages

    constructor(){
        this.tabMessages = new Array<Message>();
    }

    //Supprimer un message à partir de son id
    deleteMessage(id:number){
        for (var i=0; i<this.tabMessages.length; i++)
            if (this.tabMessages[i].id==id)
                this.tabMessages.splice(i, 1);
    }

}


