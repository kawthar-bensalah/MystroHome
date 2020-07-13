import { OneActivity } from '../activities/oneActivity';
import { ParallelActivities } from '../activities/ParallelActivities';
import { ConditionalActivities } from '../activities/conditionalActivities';
import { LoopActivities } from '../activities/loopActivities';
import { Activity } from '../activities/activity';

export class bpelGenerator {

    process: Element; //Element <process> de processus BPEL
    variables: Element; //Element <variables> qui contient l'ensemble des variables déclarées
    flow: Element; //Element <flow> qui va permettre de créer plusieurs activités qui se déclanchent à des temps différents

    removedAct: Node; //Element permettant de sauvegarder la derniere activité supprimée de scénario

    processId: number; //id de processus
    processType: string; //type de processus (On Demand, Programmable ou Extend)
    triggerDetailsType: string; //sous type dans le cas de déclanchement programmable (LoopHours, loopDays, Days, Dates)
    triggerDetailsData: string; //les détails de déclanchement dans le cas "Programmable" (nb heures, nb jours, les jours de la semaine ou bien les dates)

    constructor() {
        this.process = document.createElement("process"); //Créer l'élément <process>
        this.variables = document.createElement("variables"); //Créer l'élément <variables>
        this.flow = document.createElement("flow"); //Créer l'élément <flow>
        this.process.appendChild(this.variables); //Ajouter <variables> au <process>

        this.addVariableDeclaration("booleanVar"); //Ajouter un variable booléenne dans la déclaration utilisée dans les condition booléennes des boucles while
        this.addAssign(this.process, "true", "booleanVar"); //Initialiser cette variable à TRUE

        this.process.appendChild(this.flow); //Ajouter <flow> au <process>

        //Initialiser les autres attributs
        this.processId = 0;
        this.processType = null;
        this.triggerDetailsData = null;
        this.triggerDetailsType = null;
    }

    //Ajouter le nom de processus à l'attribut name de <process>
    AddProcessName(processName: string) {
        var name = document.createAttribute("name");
        name.value = processName;
        this.process.setAttributeNode(name);
    }

    //Récuperer le nom de processus à partir de l'attribut name de <process>
    getProcessName() {
        return this.process.getAttributeNode("name").nodeValue;
    }

    //ٍVérifier si l'élément <process> à un attribut name
    hasProcessName() {
        return (this.process.getAttributeNode("name") != null);
    }

    //Ajouter un commentaire contenant le nom d'une activité donnée (ils seront utilisés pour facilité la récupération et la manipulation de ses activités et il seront supprimer à la fin de la généarion)
    AddComment(root: Node, name: string) {
        var comment = document.createElement("comment");
        var nameAtt = document.createAttribute("name");
        nameAtt.value = name;
        comment.setAttributeNode(nameAtt);
        root.appendChild(comment);
    }

    //Méthode qui permet d'ajouter un activité <wait-for>
    AddWaitFor(root: Node, timeout: string) {
        var wait = document.createElement("wait");
        var For = document.createElement("for");
        For.appendChild(document.createTextNode(timeout.toString()));
        wait.appendChild(For);
        root.appendChild(wait);
    }

    //Méthode qui permet d'ajouter un activité <wait-until>
    AddWaitUntil(root: Node, date: any) {
        var wait = document.createElement("wait");
        var until = document.createElement("until");
        if (date.length == 5) // cas d'une heure
            until.appendChild(document.createTextNode("T" + date.toString()));
        else //cas d'une date
            until.appendChild(document.createTextNode(date.toString()));
        wait.appendChild(until);
        root.appendChild(wait);
    }

    //Ajouter une activité <assign> (pour initialiser une variable)
    addAssign(root: Node, fromVal: any, toVar: string) {
        var copy = document.createElement("copy");
        var from = document.createElement("from");
        from.appendChild(document.createTextNode(fromVal));
        copy.appendChild(from);
        var to = document.createElement("to");
        var variable = document.createAttribute("variable");
        variable.value = toVar;
        to.setAttributeNode(variable);
        copy.appendChild(to);
        var assign = document.createElement("assign");
        assign.appendChild(copy);
        root.appendChild(assign);
    }

    //Ajouter une activité <get> (utilisé pour récupérer l'état des attributs des objets utilisés dans les <condition>)
    addGetActivity(root: Node, getAttribute: string, uriGetter: string) {
        var extensionActivity = document.createElement("extensionActivity");
        root.appendChild(extensionActivity);
        var get = document.createElement("get");
        var Uri = document.createAttribute("uri");
        Uri.value = uriGetter;
        get.setAttributeNode(Uri);
        var outputVariable = document.createAttribute("outputVariable");
        outputVariable.value = getAttribute;
        get.setAttributeNode(outputVariable);
        this.addHeader(get, "application/json", "application/json");
        extensionActivity.appendChild(get);
        root.appendChild(extensionActivity);
    }

    //Ajouter des activités <get> pour tous les attributs des objets utilisés dans les <condition>
    AddGetters(root: Node, conditionsAttributes: Map<string, string>) {
        for (var [key, value] of conditionsAttributes)
            this.addGetActivity(root, key, value);
    }

    //Supprimer un activité (l'activité supprimée sera stockée dans l'attribut "removedAct")
    removeActivity(name: string) {
        var commentActivity = this.process.querySelectorAll("comment[name=" + name + "]")[0];
        if (commentActivity) //Si la valeur de l'attribut est non negative, false, undefined, null ou empty
        {
            this.removedAct = commentActivity.nextSibling;
            commentActivity.nextSibling.remove();
            commentActivity.remove();
        }
    }

    /* -------------- ADD ACTIVITIES -------------- */

    //Ajouter l'élément <header> à une activité
    addHeader(root: Node, accept: string, contentType: string) {
        var header = document.createElement("header");
        var acceptAttribute = document.createAttribute("accept");
        acceptAttribute.value = accept;
        header.setAttributeNode(acceptAttribute);
        var contentTypeAttribute = document.createAttribute("content-type");
        contentTypeAttribute.value = contentType;
        header.setAttributeNode(contentTypeAttribute);
        root.appendChild(header);
    }

    //Ajouter une activité simple (de type <put>)
    addActivity(root: Node, act: Activity) {
        this.AddComment(root, act.name);
        if (act.type == "Activity" || act.type == "New Activity") { //New activité dans le cas de bloc parrallel, if, else ou loop
            var extensionActivity = document.createElement("extensionActivity");
            root.appendChild(extensionActivity);
            var put = document.createElement("put"); //activité de type <put>
            var Uri = document.createAttribute("uri");
            Uri.value = (act as OneActivity).operationUri;
            put.setAttributeNode(Uri);
            this.addHeader(put, "application/json", "application/json"); //Ajouter le <header>
            if ((act as OneActivity).bodyValue) { //Si l'opération de l'objet associé à l'activité possède une valeur pour le body
                var inputVariable = document.createAttribute("inputVariable");
                inputVariable.value = (act as OneActivity).bodyValue;
                put.setAttributeNode(inputVariable);
            }
            extensionActivity.appendChild(put);
            root.appendChild(extensionActivity);
        }
        else
            root.appendChild(this.removedAct);
    }

    //Ajouter un bloc d'activités en parallèl (<flow>)
    addFlowActivities(root: Node, act: ParallelActivities) {
        this.AddComment(root, act.name);
        var flow = document.createElement("flow"); //Ajouter l'élément <flow>
        root.appendChild(flow);
        for (var i = 0; i < act.subActivities.length; i++) { //ajouter toutes les sous activités à l'élément <flow>
            this.removeActivity(act.subActivities[i].name);
            if (act.subActivities[i].timeout > 0) { //ajouter un <wait-for> si un sous activités possède un délai d'attente
                var sequence = document.createElement("sequence");
                this.AddWaitFor(sequence, "PT" + act.subActivities[i].timeout.toString() + "M");
                this.addActivity(sequence, act.subActivities[i]); //sinon ajouter la sous activité
                flow.appendChild(sequence);
            }
            else //sinon ajouter directement la sous activité
                this.addActivity(flow, act.subActivities[i]);
        }
    }

    //Ajouter une activité conditionnelle (<if>)
    addConditionalActivities(root: Node, act: ConditionalActivities) {
        this.AddComment(root, act.name);
        var sequence = document.createElement("sequence");
        root.appendChild(sequence);
        var If = document.createElement("if"); //Ajouter l'élément <if>
        this.AddGetters(sequence, act.ifConditionAttributs); //Ajouter les activités get pour tous les attributs des objets utilisés dans la condition 
        sequence.appendChild(If);
        var condition = document.createElement("condition");
        condition.appendChild(document.createTextNode(act.ifCondition));
        If.appendChild(condition);
        this.removeActivity(act.ifActivity.name);
        this.addActivity(If, act.ifActivity);
        if (act.elseActivity) { //Si le bloc <if> possède un <else>
            var Else = document.createElement("else");
            this.removeActivity(act.elseActivity.name);
            this.addActivity(Else, act.elseActivity);
            If.appendChild(Else);
        }
    }

    //Ajouter une activité qui boucle (<while>)
    addLoopActivities(root: Node, act: LoopActivities) {
        this.AddComment(root, act.name);
        var sequence = document.createElement("sequence");
        root.appendChild(sequence);
        var While = document.createElement("while");
        this.AddGetters(sequence, act.loopConditionAttributs);
        sequence.appendChild(While);
        var condition = document.createElement("condition");
        condition.appendChild(document.createTextNode(act.loopCondition));
        While.appendChild(condition);
        this.removeActivity(act.loopActivity.name);
        this.addActivity(While, act.loopActivity);
        this.AddGetters(While, act.loopConditionAttributs);
    }

    //Ajouter une activité qui indépendante (c.à.d de type "At" ou "Independent")
    addActivitiesIndependent(act: Activity) {
        var sequence = document.createElement("sequence");
        this.flow.appendChild(sequence);
        if (act.triggerEvent == "At") //Si de type "At"
            this.AddWaitUntil(sequence, act.date); //Ajouter <wait-until>
        if (act instanceof OneActivity)
            this.addActivity(sequence, act); //Ajouter une activité simple
        else if (act instanceof ParallelActivities)
            this.addFlowActivities(sequence, act); //Ajouter un bloc d'activités parallèles
        else if (act instanceof ConditionalActivities)
            this.addConditionalActivities(sequence, act); //Ajouter une activité conditionnelle
        else if (act instanceof LoopActivities)
            this.addLoopActivities(sequence, act); //Ajouter une activité qui boucle
    }

    //Ajouter une activité qui dépend d'une autre (c.à.d de type "After")
    addActivitiesDepend(act: Activity) {
        var dependActivity = this.process.querySelectorAll("comment[name=" + act.dependsActivityName + "]")[0];
        var dependActivityParent: Node = dependActivity.parentNode;
        var sequence;
        if ((dependActivityParent.nodeName) != "SEQUENCE") { //si le parent de l'activité dont l'activité courante dépend n'est pas <sequence>
            sequence = document.createElement("sequence"); //Ajouter un élément <sequence>
            var dependActivityChild = dependActivity.nextSibling;
            sequence.appendChild(dependActivity);
            sequence.appendChild(dependActivityChild);
            if (act.timeout > 0) //Si le délai d'attente superieur à 0
                this.AddWaitFor(sequence, "PT" + act.timeout.toString() + "M"); //Ajouter <wait-for>
            if (act instanceof OneActivity)
                this.addActivity(sequence, act); //Ajouter une activité simple
            else if (act instanceof ParallelActivities)
                this.addFlowActivities(sequence, act); //Ajouter un bloc d'activités parallèles
            else if (act instanceof ConditionalActivities)
                this.addConditionalActivities(sequence, act); //Ajouter une activité conditionnelle
            else if (act instanceof LoopActivities)
                this.addLoopActivities(sequence, act); //Ajouter une activité qui boucle
            dependActivityParent.appendChild(sequence);
        }
        else { //si le parent de l'activité dont l'activité courante dépend est <sequence>
            if (act.timeout > 0)
                this.AddWaitFor(dependActivityParent, "PT" + act.timeout.toString() + "M");
            if (act instanceof OneActivity)
                this.addActivity(dependActivityParent, act);
            else if (act instanceof ParallelActivities)
                this.addFlowActivities(dependActivityParent, act);
            else if (act instanceof ConditionalActivities)
                this.addConditionalActivities(dependActivityParent, act);
            else if (act instanceof LoopActivities)
                this.addLoopActivities(dependActivityParent, act);
        }
    }

    //Ajouter une nouvelle activité au processus BPEL
    addNewActivity(act: any) {
        if (act.triggerEvent == "After") //cas "After"
            this.addActivitiesDepend(act);
        else //Cas "At" ou "Independent"
            this.addActivitiesIndependent(act);
    }

    //Ajouter le type de déclanchement au processus
    AddProcessTriggerType(processTriggerType: string) {
        this.processType = processTriggerType;
    }


    /* -------------------- Trigger Details Méthodes -------------------- */
    // ---------- cas Loop Hours méthodes
    //transformer une sequence d'activités en une boucle de sequences
    sequencetoLoopSequence(sequence: Node, waitingTimes: string) {
        var flow = document.createElement("flow");
        sequence.parentNode.appendChild(flow);
        var While = document.createElement("while");
        var condition = document.createElement("condition");
        condition.appendChild(document.createTextNode("booleanVar = true"));
        While.appendChild(condition);
        While.appendChild(sequence);
        flow.appendChild(While);
        this.AddWaitFor(flow, "PT" + waitingTimes + "H");
    }

    // ---------- cas Days méthodes  
    //retourner la date suivante d'un numéro de jour entré comme paramètre
    getDate(dayOfWeek: number) {
        var now = new Date()
        var result = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
        );
        if (result < now)
            result.setDate(result.getDate() + 7)
        var d = result.getDate();
        var m = result.getMonth() + 1;
        var y = result.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + "T00:00";
    }

    //retourner la date suivante d'un jour entré comme paramètre
    date(dayOfWeek: string) {
        var i: number;
        if (dayOfWeek == 'SU') { i = 0; }
        if (dayOfWeek == 'MO') { i = 1; }
        if (dayOfWeek == 'TU') { i = 2; }
        if (dayOfWeek == 'WE') { i = 3; }
        if (dayOfWeek == 'TH') { i = 4; }
        if (dayOfWeek == 'FR') { i = 5; }
        if (dayOfWeek == 'SA') { i = 6; }
        return this.getDate(i);
    }

    //ajouter une date aux éléments <until>
    changeDateToUntil(root: any, date: string) {
        var allUntil = root.querySelectorAll("until");
        allUntil[0].textContent = date;
    }
    // ---------- cas Dates méthodes
    //Ajouter une date au temps dans les éléments <until>
    addDateToUntil(root: any, date: string) {
        var allUntil = root.querySelectorAll("until");
        for (var i = 0; i < allUntil.length; i++) {
            allUntil[i].textContent = date + allUntil[i].textContent;
        }
    }
    //Ajouter l'enfant de deuxième noeud au premier noeud
    mergeBlocks(bloc1: Node, bloc2: Node) {
        var bloc2children = bloc2.childNodes;
        for (var i = 0; i < bloc2children.length; i++) {
            var child = bloc2children[i].cloneNode(true);
            bloc1.appendChild(child);
        }
    }

    // ---------- Trigger Details Méthodes
    //Ajouter Trigger Details au processus
    addProcessDetails() {
        if (this.processType == "Programmable") //cas programmable
            switch (this.triggerDetailsType) {
                case "LoopHours": //cas loop hours
                    var flowChilds = this.flow.childNodes;
                    for (var i = 0; i < flowChilds.length; i++)
                        this.sequencetoLoopSequence(flowChilds[0], this.triggerDetailsData); //transformer une sequence d'activités en une boucle de sequences
                    break;
                case "LoopDays": //cas loop days
                    this.AddWaitFor(this.flow, "P" + this.triggerDetailsData + "D"); //ajouter un <wait-for> (avec jours) à <flow>
                    var While = document.createElement("while"); //ajouter <while>
                    var condition = document.createElement("condition");
                    condition.appendChild(document.createTextNode("booleanVar = true")); //Ajouter une condition pour boucler infiniment (Tant que (vrai))
                    While.appendChild(condition);
                    While.appendChild(this.flow);
                    this.process.appendChild(While);
                    break;
                case "Days": //cas Days
                    var daysTab = this.triggerDetailsData.trim().split(" "); //récupérer les jours
                    var flowClone = this.flow.cloneNode(true); //cloner <flow>
                    this.AddWaitFor(this.flow, "P6D"); //ajouter un <wait-for> à <flow>
                    var While = document.createElement("while"); //ajouter <while>
                    var condition = document.createElement("condition");
                    condition.appendChild(document.createTextNode("booleanVar = true"));
                    While.appendChild(condition);
                    While.appendChild(this.flow);
                    this.process.appendChild(While);
                    var Flow = document.createElement("flow"); //ajouter flow
                    this.process.appendChild(Flow);
                    var seq = document.createElement("sequence"); //ajouter sequence             
                    this.AddWaitUntil(seq, this.date(daysTab[0])); //ajouter <wait-until>
                    seq.appendChild(While);
                    Flow.appendChild(seq);
                    var Tabseq: any[];
                    for (var i = 1; i < daysTab.length; i++) { //cloner autant le contenu de bloc <flow> "nb de jours récupérés" fois
                        var clone = seq.cloneNode(true); // new clone                            
                        this.changeDateToUntil(clone, this.date(daysTab[i]));
                        Flow.appendChild(clone);
                    }
                    break;
                case "Dates": //cas Dates
                    var datesTab = this.triggerDetailsData.trim().split(" "); //récupérer les dates
                    var flowClone = this.flow.cloneNode(true); //cloner <flow>
                    this.addDateToUntil(this.flow, datesTab[0]); //ajouter la première date à <flow>
                    for (var i = 1; i < datesTab.length; i++) {
                        var clone = flowClone.cloneNode(true); //new clone
                        this.addDateToUntil(clone, datesTab[i]); //ajouter un nouveau <flow> avec la date suivante
                        this.mergeBlocks(this.flow, clone); //ajouter le contenu de ce nouveau <flow> au noeud <flow>
                    }
                    break;
            }
    }

    /* -------------------- Correction de Processus -------------------- */
    //Supprimer les commentaires
    deleteComments() {
        this.process.querySelectorAll("comment")
            .forEach(element => element.remove());
    }

    //Ajouter la déclaration d'une variables à l'élément <variables>
    addVariableDeclaration(variableName: string) {
        var variable = document.createElement("variable");
        var name = document.createAttribute("name");
        name.value = variableName;
        variable.setAttributeNode(name);
        this.variables.appendChild(variable);
    }

    //Ajouter les déclarations de toutes les variables utilisées dans les conditions à l'élément <variables>
    variablesDeclaration() {
        var tabVariables = this.process.querySelectorAll("get");
        for (var i = 0; i < tabVariables.length; i++)
            if (tabVariables[i].hasAttribute("outputVariable"))
                this.addVariableDeclaration(tabVariables[i].getAttribute("outputVariable"));
    }

    //supprimer les balises inutiles
    removeUnnecessaryTags() {

        //supprimer la variable "booelanVar" si elle n'est pas utilisée dans le processus BPEL
        var conditionsTab = this.process.querySelectorAll("condition");
        var tagsUsed: boolean = false;
        for (var i = 0; i < conditionsTab.length; i++)
            if (conditionsTab[i].textContent.includes("booleanVar")) {
                tagsUsed = true;
                break;
            }
        if (!tagsUsed) {
            //supprimer la déclaration
            if (this.process.querySelectorAll("variable[name=booleanVar]")[0])
                this.process.querySelectorAll("variable[name=booleanVar]")[0].remove();
            //supprimer son initialisation (avec <assign>)
            if (this.process.querySelectorAll("to[variable=booleanVar]")[0])
                this.process.querySelectorAll("to[variable=booleanVar]")[0].parentElement.parentElement.remove();

        }


        //supprimer <variables> si elle ne contient aucune déclaration (<variable>)
        if (this.variables.childNodes.length == 0)
            this.variables.remove();

        //supprimer les <wait> inutiles
        var waitTags = this.process.querySelectorAll("wait");
        for (var i = 0; i < waitTags.length; i++) {
            if (waitTags[i].parentNode.nodeValue != "flow" && !waitTags[i].nextSibling)
                waitTags[i].remove();
        }

        //supprimer les <sequence> inutiles
        var sequenceTags = this.process.querySelectorAll("sequence");
        for (var i = 0; i < sequenceTags.length; i++) {
            var sequenceChilds = sequenceTags[i].childNodes;
            if (sequenceChilds.length == 0)
                sequenceTags[i].remove();
            else if (sequenceChilds.length == 1) {
                sequenceTags[i].parentNode.appendChild(sequenceChilds[0]);
                sequenceTags[i].remove();
            }

            if (sequenceTags[i].parentNode)
                if (sequenceTags[i].parentNode.nodeName == "SEQUENCE") {
                    while (sequenceTags[i].firstChild) {
                        sequenceTags[i].parentNode.insertBefore(sequenceTags[i].firstChild, sequenceTags[i]);
                    }
                    sequenceTags[i].parentNode.removeChild(sequenceTags[i]);
                }
        }

        //supprimer les <flow> inutiles
        var flowTags = this.process.querySelectorAll("flow");
        for (var i = 0; i < flowTags.length; i++) {
            var flowChilds = flowTags[i].childNodes;
            if (flowChilds.length == 0)
                flowTags[i].remove();
            else if (flowChilds.length == 1) {
                flowTags[i].parentNode.appendChild(flowChilds[0]);
                flowTags[i].remove();
            }
        }

    }

    //Corriger le code BPEL
    processCorrection() {
        //supprimer les commentaires
        this.deleteComments();
        //supprimer les balises inutiles
        this.removeUnnecessaryTags();
    }


}
