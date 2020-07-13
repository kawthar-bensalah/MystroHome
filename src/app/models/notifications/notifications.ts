import { notification } from './notification';

export class Notifications { //classe pour récupérer toutes les notifications stockées dans la base de données

    tabNotifications: Array<notification>; //tableau des notifications

    constructor() {
        this.tabNotifications = new Array<notification>();
    }

    //Supprimer une notification à partir de son id
    deleteNotifications(id: number) {
        for (var i = 0; i < this.tabNotifications.length; i++)
            if (this.tabNotifications[i].id == id)
                this.tabNotifications.splice(i, 1);
    }

}