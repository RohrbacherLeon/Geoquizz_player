# Geoquizz_player
Application web du jeu en VueJs interrogeant l'API de l'atelier.  

## Installation
Clonez ce repository dans un serveur web et ouvrez `index.html` dans votre navigateur favori.  

## Compilation SASS
Executer la commande : sass ./style/scss/player.scss:./style/css/player.css

## Changement de l'URL de l'API
L'URL de l'API est definie par une constante dans le fichier "index.html", juste avant la création de Vue. (ligne 203)<br />
Exemple d'URL :<br /> -"http://localhost:8084/" si le container Docker est lancer en local <br />
                -"http://xxxxxx.ngrok.io/" si le container est lancer via Ngrok.io

## Tests
Une fois sur la page d'accueil, il ne vous reste plus qu'a lancer une partie et à jouer.
