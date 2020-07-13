import { User } from './user';

export class Users { //Classe poru récupérer tous les utilisateurs stockés dans la base de données

    tabUsers: Array<User>; //Tableau des utilisateurs

    constructor() {
        this.tabUsers = new Array<User>();
    }

    //Récupérer un utilisateur à partir de son mail
    getUserByEmail(mail: string) {
        for (var i = 0; i < this.tabUsers.length; i++)
            if (this.tabUsers[i].mail == mail)
                return this.tabUsers[i];
        return null;
    }

    //Récupérer l'id d'un utilisateur à partir de son nom
    getUserIdByName(name: string) {
        for (var i = 0; i < this.tabUsers.length; i++)
            if (this.tabUsers[i].name == name)
                return this.tabUsers[i].id;
        return null;
    }

    //Récupérer le nom d'un utilisateur à partir de son id
    getUserNameById(id: number) {
        for (var i = 0; i < this.tabUsers.length; i++)
            if (this.tabUsers[i].id == id)
                return this.tabUsers[i].name;
        return null;
    }

    //Vérifier que les informations d'authentification sont correctes
    checkLoginInfos(mail: string, password: string) {
        if (mail == "")
            return "You must enter an email";
        if (password == "")
            return "You must enter a password";
        if (!this.userEmailExist(mail))
            return "The mail does not exist";
        if (!this.passIsCorrect(mail, password))
            return "Password is not correct";
        return true;
    }

    //Vérifier que le mot de passe est correcte
    passIsCorrect(mail: string, password: string) {
        for (var i = 0; i < this.tabUsers.length; i++) {
            if (this.tabUsers[i].mail == mail)
                if (this.tabUsers[i].password == password)
                    return true;
                else
                    return false;
        }
        return false;
    }

    //Vérifier si le nom de l'utilisateur existe
    userNameExist(name: string) {
        for (var i = 0; i < this.tabUsers.length; i++) {
            if (this.tabUsers[i].name == name)
                return true;
        }
        return false;
    }

    //Vérifier si l'email de l'utilisateur existe
    userEmailExist(mail: string) {
        for (var i = 0; i < this.tabUsers.length; i++) {
            if (this.tabUsers[i].mail == mail)
                return true;
        }
        return false;
    }
}