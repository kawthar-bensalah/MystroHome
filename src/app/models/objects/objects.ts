import { OneObject } from './Object';

export class objects { //Classe pour le stockage de tous les objets disponibles

    tabObjects: Array<OneObject>; //tableau des objets

    constructor() {
        this.tabObjects = new Array<OneObject>();
    }

    //Récupérer le nom de l'opération à partir de son nom et d'un nom d'ojet
    getUriOperation(objName: string, opName: string) {
        for (var i = 0; i < this.tabObjects.length; i++) {
            if (this.tabObjects[i].name == objName) {
                var opUri = this.tabObjects[i].getOperationUri(opName);
                if (opUri != null)
                    return this.tabObjects[i].uriBase + opUri;
            }
        }
        return null;
    }

    //Récupérer le nom de l'attribut body d'une opération à partir de son nom et de nom de l'objet
    getBodyAttributeName(objName: string, opName: string) {
        for (var i = 0; i < this.tabObjects.length; i++) {
            if (this.tabObjects[i].name == objName) {
                var bAttN = this.tabObjects[i].getBodyAttributeName(opName);
                if (bAttN != null)
                    return bAttN;
            }
        }
        return null;
    }

    //Récupérer le type d'un attribut à partir de son nom et de nom de l'objet
    getAttributeType(objName: string, atName: string) {
        for (var i = 0; i < this.tabObjects.length; i++) {
            if (this.tabObjects[i].name == objName) {
                var attType = this.tabObjects[i].getAttributeType(atName);
                if (attType != null)
                    return attType;
            }
        }
        return "";
    }

    //Récupérer le l'uri permettant la récupération de la valeur d'un attribut à partir de son nom et de nom de l'objet
    getAttributeUriGetter(objName: string, atName: string) {
        for (var i = 0; i < this.tabObjects.length; i++) {
            if (this.tabObjects[i].name == objName) {
                var uriGet = this.tabObjects[i].getAttributeUriGetter(atName);
                if (uriGet != null)
                    return this.tabObjects[i].uriBase + uriGet;
            }
        }
        return null;
    }

    //Récupérer les valeurs possibles d'un attribut à partir de son nom et de nom de l'objet
    getAttributePossibleValues(objName: string, atName: string) {
        for (var i = 0; i < this.tabObjects.length; i++) {
            if (this.tabObjects[i].name == objName) {
                var possibleVal = this.tabObjects[i].getAttributePossibleValues(atName);
                if (possibleVal != null)
                    return possibleVal;
            }
        }
        return null;
    }

    //Vérifier si le tableau d'objets courant est égale à un autre tableau entré comme paramètre
    equals(oldTabObjects: Array<OneObject>) {
        if (this.tabObjects.length != oldTabObjects.length)
            return false;
        for (var i = 0; i < this.tabObjects.length; i++) {
            var exist: boolean = false;
            for (var j = 0; j < oldTabObjects.length; j++) {
                if (this.tabObjects[i].equals(oldTabObjects[j])) {
                    exist = true;
                    break;
                }
            }
            if (!exist)
                return true;
        }
        return false;
    }

    //vérifier si la liste d'objet n'est pas mise à jour
    isUpdated(oldTabObjects: Array<OneObject>) {
        var tabNewObjects = new Map<OneObject, string>();
        if (this.tabObjects.length == oldTabObjects.length)
            for (var i = 0; i < this.tabObjects.length; i++) {
                var exist: boolean = false;
                for (var j = 0; j < oldTabObjects.length; j++) {
                    if (this.tabObjects[i].equals(oldTabObjects[j])) {
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    tabNewObjects.set(this.tabObjects[i], "Updated");
            }
        if (this.tabObjects.length > oldTabObjects.length)
            for (var i = 0; i < this.tabObjects.length; i++) {
                var exist: boolean = false;
                for (var j = 0; j < oldTabObjects.length; j++) {
                    if (this.tabObjects[i].equals(oldTabObjects[j])) {
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    tabNewObjects.set(this.tabObjects[i], "Added");
            }
        if (this.tabObjects.length < oldTabObjects.length)
            for (var i = 0; i < oldTabObjects.length; i++) {
                var exist: boolean = false;
                for (var j = 0; j < this.tabObjects.length; j++) {
                    if (oldTabObjects[i].equals(this.tabObjects[j])) {
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    tabNewObjects.set(oldTabObjects[i], "Deleted");
            }
        if (tabNewObjects.size == 0)
            return false;
        else
            return tabNewObjects;
    }

}


