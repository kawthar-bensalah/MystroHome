import { attribute } from './attribute';
import { operation } from './operation';

export class OneObject { //La classe qui présente un objet
    name: string; //nom de l'objet
    uriBase: string; //uri de base de l'objet
    attributs: Array<attribute>; //tableau des attributs de l'objet
    operations: Array<operation>; //tableau des opérations de l'objet
    imageOnUri: string; //l'uri de l'image de l'objet lorsqu'il est allumé
    imageOffUri: string; //l'uri de l'image de l'objet lorsqu'il est eteind


    constructor(obj: OneObject) {
        this.name = obj.name;
        this.uriBase = obj.uriBase;
        this.imageOnUri = obj.imageOnUri;
        this.imageOffUri = obj.imageOffUri;

        this.attributs = new Array<attribute>();
        for (var i = 0; i < obj.attributs.length; i++) {
            this.attributs.push(new attribute(obj.attributs[i]));
        }

        this.operations = new Array<operation>();
        for (var i = 0; i < obj.operations.length; i++) {
            this.operations.push(new operation(obj.operations[i]));
        }
    }

    //Récupérer le nom de l'objet
    getName() {
        return this.name;
    }

    //Récupérer l'état de l'objet
    getState() {
        for (var i = 0; i < this.attributs.length; i++)
            if (this.attributs[i].name == "State")
                return this.attributs[i].actualValue;
    }

    //Récupérer l'uri d'une opération à partir de son nom
    getOperationUri(name: string) {
        for (var i = 0; i < this.operations.length; i++)
            if (this.operations[i].name == name)
                return this.operations[i].uriOperation;
        return null;
    }

    //Récupérer l'attribut body d'une opération à partir de son nom
    getBodyAttributeName(name: string) {
        for (var i = 0; i < this.operations.length; i++)
            if (this.operations[i].name == name)
                return this.operations[i].bodyAttributName;
        return null;
    }

    //Récupérer le type d'un attribut à partir de son nom
    getAttributeType(name: string) {
        for (var i = 0; i < this.attributs.length; i++)
            if (this.attributs[i].name == name)
                return this.attributs[i].type;
        return null;
    }

    //Récupérer l'uri d'un attrribut à partir de son nom
    getAttributeUriGetter(name: string) {
        for (var i = 0; i < this.attributs.length; i++)
            if (this.attributs[i].name == name)
                return this.attributs[i].uriGetter;
        return null;
    }

    //Récupérer les valeur possibles d'un attribut à partir de son nom
    getAttributePossibleValues(name: string) {
        for (var i = 0; i < this.attributs.length; i++)
            if (this.attributs[i].name == name)
                return this.attributs[i].possibleValues;
        return null;
    }

    //Vérifier si l'objet courant est égale (en terme d'attributs et d'opérations) à l'objet passé comme paramètre
    equals(obj: OneObject) {
        if (this.name != obj.name || this.imageOnUri != obj.imageOnUri || this.imageOffUri != obj.imageOffUri || this.uriBase != obj.uriBase)
            return false;
        // Comparer les attributs
        if (this.attributs.length != obj.attributs.length)
            return false;
        else
            for (var i = 0; i < this.attributs.length; i++) {
                var exist: boolean = false;
                for (var j = 0; j < obj.attributs.length; j++) {
                    if (this.attributs[i].equals(obj.attributs[j])) {
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    return false;
            }
        // Comparer les opérations
        if (this.operations.length != obj.operations.length)
            return false;
        else
            for (var i = 0; i < this.operations.length; i++) {
                var exist: boolean = false;
                for (var j = 0; j < obj.operations.length; j++) {
                    if (this.operations[i].equals(obj.operations[j])) {
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    return false;
            }
        return true;
    }
}


