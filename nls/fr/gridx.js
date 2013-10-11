define({
//Body
	loadingInfo: "Chargement...",
	emptyInfo: "Aucun élément à afficher",
	loadFailInfo: "Echec du chargement des données",
	loadMore: "Autres chargements",
	loadMoreLoading: "Chargement...",
	loadPrevious: "Charger l'élément précédent",
	loadPreviousLoading: "Chargement...",

//FilterBar
	"clearFilterDialogTitle": "Effacer le filtre",
	"filterDefDialogTitle": "Filtrer",
	"defaultRuleTitle": "Règle",
	"ruleTitleTemplate": "Règle ${ruleNumber}",
	"noFilterApplied": "Aucun filtre appliqué.",
	"defineFilter": "Définir le filtre",
	"conditionEqual": "égal",
	"conditionNotEqual": "est différent de",
	"conditionLess": "est inférieur à",
	"conditionLessEqual": "inférieur ou égal",
	"conditionGreater": "est supérieur à",
	"conditionGreaterEqual": "supérieur ou égal",
	"conditionContain": "contient",
	"conditionIs": "est",
	"conditionStartWith": "commence par",
	"conditionEndWith": "se termine par",
	"conditionNotContain": "ne contient pas",
	"conditionIsNot": "n'est pas",
	"conditionNotStartWith": "ne commence pas par",
	"conditionNotEndWith": "ne se termine pas par",
	"conditionBefore": "avant",
	"conditionAfter": "après",
	"conditionRange": "plage",
	"conditionIsEmpty": "est vide",
	"all": "tout",
	"any": "n'importe laquelle",
	"relationAll": "toutes les règles",
	"waiRelAll": "Satisfaire à toutes les règles suivantes :",
	"relationAny": "n'importe quelles règles",
	"waiRelAny": "Satisfaire à une quelconque des règles suivantes :",
	"relationMsgFront": "Correspondance",
	"relationMsgTail": "",
	"and": "et",
	"or": "ou",
	"addRuleButton": "Ajouter une règle",
	"waiAddRuleButton": "Ajouter une nouvelle règle",
	"removeRuleButton": "Supprimer la règle",
	"waiRemoveRuleButtonTemplate": "Supprimer la règle ${0}",
	"addRuleButton": "Ajouter une règle de filtre",
	"cancelButton": "Annuler",
	"waiCancelButton": "Annuler cette boîte de dialogue",
	"clearButton": "Effacer",
	"waiClearButton": "Effacer le filtre",
	"filterButton": "Filtrer",
	"waiFilterButton": "Soumettre le filtre",
	"columnSelectLabel": "Colonne",
	"waiColumnSelectTemplate": "Colonne pour la règle ${0}",
	"conditionSelectLabel": "Condition",
	"waiConditionSelectTemplate": "Condition pour la règle ${0}",
	"valueBoxLabel": "Valeur",
	"waiValueBoxTemplate": "Saisir la valeur à filtrer pour la règle ${0}",
	"rangeTo": "à",
	"rangeTemplate": "de ${0} à ${1}",
	"statusTipHeaderColumn": "Colonne",
	"statusTipHeaderCondition": "Règles",
	"statusTipTitle": "Barre de filtre",
	"statusTipMsg": "Cliquer sur la barre de filtre ici pour filtrer sur les valeurs de ${0}.",
	"anycolumn": "n'importe quelle colonne",
	"statusTipTitleNoFilter": "Barre de filtre",
	"statusTipTitleHasFilter": "Filtrer",
	"statusTipRelPre": "Correspondance",
	"statusTipRelPost": "règles.",
	"statusTipHeaderAll": "Satisfaire à toutes les règles.",
	"statusTipHeaderAny": "Satisfaire à une règle quelconque.",
	"defaultItemsName": "éléments",
	"filterBarMsgHasFilterTemplate": "${0} sur ${1} ${2} affichés.",
	"filterBarMsgNoFilterTemplate": "Aucun filtre appliqué",
	"filterBarDefButton": "Définir le filtre",
	"waiFilterBarDefButton": "Filtrer le tableau",
	"a11yFilterBarDefButton": "Filtrer...",
	"filterBarClearButton": "Effacer le filtre",
	"waiFilterBarClearButton": "Effacer le filtre",
	"closeFilterBarBtn": "Fermer la barre de filtre",
	"clearFilterMsg": "Cela supprimera le filtre et affichera tous les enregistrements disponibles.",
	"anyColumnOption": "N'importe quelle colonne",
	"trueLabel": "Vrai",
	"falseLabel": "Faux",
	"radioTrueLabel": "Valeur Vrai",
	"radioFalseLabel": "Valeur Faux",
	"beginTimeRangeLabel": "Valeur du début de la plage de temps",
	"endTimeRangeLabel": "Valeur de la fin de la plage de temps",
	"beginDateRangeLabel": "Valeur du début de la plage de dates",
	"endDateRangeLabel": "Valeur de la fin de la plage de dates",
	"startsWithExpr": "${0}*",

//NestedSort
	singleSort: "Tri simple",
	nestedSort: "Tri imbriqué",
	ascending: "Cliquez pour trier par Ordre croissant",
	descending: "Cliquez pour trier par Ordre décroissant",
	sortingState: "${0} - ${1}",
	unsorted: "Ne pas trier cette colonne",
	waiSingleSortLabel: "${0} - est trié par ${1}. Choisissez de trier par ${2}",
	waiNestedSortLabel:"${0} - est trié secondairement par ${1}. Choisissez de trier secondairement par ${2}",

//PaginationBar
	pagerWai: 'Pager',

	pageIndex: '${0}',
	pageIndexTitle: 'Page ${0}',

	firstPageTitle: 'Première page',
	prevPageTitle: 'Page précédente',
	nextPageTitle: 'Page suivante',
	lastPageTitle: 'Dernière page',

	pageSize: '${0}',
	pageSizeTitle: '${0} éléments par page',
	pageSizeAll: 'Tout',
	pageSizeAllTitle: 'Tous les éléments',

	description: '${0} - ${1} sur ${2} éléments.',
	descriptionEmpty: 'La grille est vide.',

	summary: 'Total : ${0}',
	summaryWithSelection: 'Total : ${0} Sélectionné : ${1}',

	gotoBtnTitle: 'Aller à une page donnée',

	gotoDialogTitle: 'Aller à la page',
	gotoDialogMainMsg: 'Spécifiez le numéro de page :',
	gotoDialogPageCount: '(${0} pages)',
	gotoDialogOKBtn: 'Aller',
	gotoDialogCancelBtn: 'Annuler',
	// for drop down pagination bar
	pageLabel: 'Page',
	pageSizeLabel: 'Lignes',

//QuickFilter
	filterLabel: 'Filtrer',
	clearButtonTitle: 'Effacer le filtre',
	buildFilterMenuLabel: 'Créer un filtre&hellip;',
	apply: 'Appliquer un filtre',

//Sort
	helpMsg: '${0} - Cliquez pour effectuer le tri ou cliquez et maintenez la touche Ctrl enfoncée pour ajouter un élément au tri',
	singleHelpMsg: '${0} - Cliquez pour effectuer le tri',
	priorityOrder: 'priorité de tri ${0}',

//SummaryBar
	summaryTotal: 'Total : ${0}',
	summarySelected: 'Sélectionné : ${0}',
	summaryRange: 'Range: ${0}-${1}',	//need translation

//Other
	indirectSelectAll: "Press SPACE to select all.",	//need translation
	indirectDeselectAll: "Press SPACE to deselect all.",	//need translation
	treeExpanded: "Control + left arrow key to collapse this row.",	//need translation
	treeCollapsed: "Control + right arrow key to expand this row."	//need translation
});
