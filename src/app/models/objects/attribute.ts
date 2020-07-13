export class attribute { //Classe pour récupérer les attributs d'un objet

    name: string; //nom de l'attribut
    possibleValues?: any; //les valeurs possible pour l'attribut
    actualValue: any; //la valeur actuelle de l'attribut
    type: string; //type de l'attribut
    uriGetter: string; //l'uri permettant de récupérer l'état de l'attribut

    constructor(att: any) {
        this.name = att.name;
        this.possibleValues = att.possibleValues;
        this.actualValue = att.actualValue;
        this.type = att.type;
        this.uriGetter = att.uriGetter;
    }

    //Méthode indiquant si l'attribut courant est égale à un autre attribut passé comme paramètre d'entrée
    equals(att: attribute) {
        if (this.name == att.name
            && this.actualValue == att.actualValue
            && this.type == att.type
            && this.uriGetter == att.uriGetter)
            if (!this.possibleValues && !att.possibleValues)
                return true;
            else if (this.possibleValues && att.possibleValues)
                if (this.possibleValues.length != att.possibleValues.length)
                    return false;
                else {
                    for (var i = 0; i < this.possibleValues.length; i++)
                        if (this.possibleValues[i] != att.possibleValues[i])
                            return false;
                    return true;
                }
        return false;
    }
}
