export class operation { //classe permettant la récupération des opérations d'un objet
    name: string; //nom de l'opération
    bodyAttributName: string; //nom de l'attribut utilisé comme body
    uriOperation: string; //uri de l'opération

    constructor(op: any) {
        this.bodyAttributName = op.bodyAttributName;
        this.name = op.name;
        this.uriOperation = op.uriOperation;

    }

    //Méthode indiquant si l'opération courante est égale à une autre opération passée comme paramètre d'entrée
    equals(op: operation) {
        if (this.bodyAttributName == op.bodyAttributName
            && this.name == op.name
            && this.uriOperation == op.uriOperation)
            return true;
        return false;
    }
}