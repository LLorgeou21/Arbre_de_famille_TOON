# Comment mettre à jour l'arbre de famille

Voici un document permettant au futur membre de la famille de mettre à jour l'ancestral Arbre de la famille, pour le dévellopement de cette arbre nous avons utilisé la bibliothèque D3 en javascript, nous déployons grâce à voxel. Toute améloriations de la structure est bienvenue.

### Il faut essayer de respecter la nomenclature mise en place pour pas se perdre

## Mettre a jour l'arbre principal 

C'est la partie la plus simple, il suffit de modifié le Json "data.json" en rajoutant des "children" au 2a qui viennent d'avoir des fillot
On passe alors de :
```
{"name" : "Goerge Planck",
"photo" : "images/Goerge_Planck/Goerge.png",
"link" : "Liens/Goerge_Planck/Goerge.html"}
```
à
```
{"name" : "Goerge Planck",
"photo" : "images/Goerge_Planck/Goerge.png",
"link" : "Liens/Goerge_Planck/Goerge.html"
"children" : [
  {"name" : "Fillot de Goerge",
   "photo" : "images/Fillot_De_Goerge/Fillot.png",
   "link" : "Liens/Fillot_De_Goerge/Fillot.html"}
]}
```
Il faut essayer de respecter la nomenclature mise en place pour pas se perdre

## Mettre a jour l'arbre principal 
