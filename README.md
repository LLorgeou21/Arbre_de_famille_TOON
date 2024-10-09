# Comment mettre à jour l'arbre de famille

Ce document est destiné aux futurs membres de la famille souhaitant mettre à jour l'ancestral Arbre de la famille. Pour le développement de cet arbre, nous avons utilisé la bibliothèque **D3.js** en JavaScript, et nous le déployons grâce à **Voxel**. Toute amélioration de la structure est la bienvenue.

### Important : essayez de respecter la nomenclature mise en place pour éviter toute confusion.

---

## Instructions générales

1. **Mettre à jour les arbres personnels** :
   - Vous trouverez les instructions détaillées dans la section correspondante.

2. **Mettre à jour l'arbre principal** :
   - Suivez la logique des exemples fournis pour ajouter de nouveaux membres à l'arbre.

---

N'hésitez pas à proposer des améliorations ou à poser des questions en cas de doutes.


# Mettre à jour l'arbre principal

C'est la partie la plus simple. Il suffit de modifier le fichier JSON **data.json** en ajoutant des "children" aux nodes des personnes (par exemple, **2a**) qui viennent d'avoir des fillots/fillotes.

## Exemple

On passe alors de :

```json
{
  "name" : "Goerge Planck",
  "photo" : "images/Goerge_Planck/Goerge.png",
  "link" : "Liens/Goerge_Planck/Goerge.html"
}
```
à
```
{
  "name" : "Goerge Planck",
  "photo" : "images/Goerge_Planck/Goerge.png",
  "link" : "Liens/Goerge_Planck/Goerge.html",
  "children" : [
    {
      "name" : "Fillot de Goerge",
      "photo" : "images/Fillot_De_Goerge/Fillot.png",
      "link" : "Liens/Fillot_De_Goerge/Fillot.html"
    }
  ]
}

```




# Mettre à jour les arbres personnels

L'idée reste la même, même si c'est un peu plus complexe. Vous pouvez partir des fichiers dans le dossier **Liens/Modele** pour avoir une base plus claire, car il est nécessaire d'avoir une node de sortie pour revenir à l'arbre principal.

## Étapes à suivre

1. **Copier les fichiers de base**
   - Copiez/collez les 3 fichiers (**a.html**, **a.js**, et **a.json**) dans un dossier qui porte le nom de la nouvelle personne.

2. **Modifications à faire dans les fichiers**

   - **Dans `a.html` :**
     - Changez le nom de la page dans la balise `<title>`.
     - Remplacez le fichier de script (**a.js**) par **Nom_du_type.js**.
     - Renommez le fichier `.html` avec le même nom que celui défini dans le fichier `data.json`.

   - **Dans `a.js` :**
     - Modifiez le nom du fichier JSON importé au début du code (ligne 11) en remplaçant **a.json** par **Nom_du_type.json**.
     - Changez également le chemin d'accès pour la chanson (elle ne sera activée que si une node avec le nom "Play" existe dans le fichier JSON).

   - **Dans `a.json` :**
     - C'est ici que vous allez effectuer la majorité des modifications. Les nodes suivent une logique simple avec quatre types d'arguments :
       - `"name"` : Le nom qui s'affiche lors du survol de la node avec la souris (seulement utile pour la node "Play" qui permet de lancer la musique).
       - `"photo"` : Le chemin d'accès à la photo qui s'affichera en carré sur le site.
       - `"link"` : Le lien vers lequel on est redirigé lors d'un double-clic sur la node.
       - `"children"` : Permet d'ajouter des nodes enfants à celle-ci.

## Exemple de node JSON

Voici un exemple d'une node JSON :

```json
{
  "name": "Play",
  "photo": "images/play.jpg",
  "link": "https://example.com",
  "children": []
}

