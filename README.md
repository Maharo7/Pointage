# Pointage
Node project est une application back-end qui va gerer un système de pointage

## Installation
utiliser npm pour l'installation

```bash
npm install
```
Si vous utiliser docker, pull l'image dans dockerhub et le lancer dans docker
```bash
docker pull maharo7/pointage-app:pointageimage
```

## Utilisation
Si vous avez telecharger le code sur github :
pour lancer l'application :
```bash
npm start
```
pour lancer le test :
```bash
npm test
```

Utiliser postman ou un logiciel similaire pour envoyer les requettes

### Liste des requettes

```javascript

# Login (les requettes sur la creation et la vue des employées necessitent un token donc il faut s authentifier)
POST http://localhost:8081/login

Voici les credentials dans le body de ce login : 
{
    "username" : "admin",
    "password" : "password"
}

Ensuite on copie le token dans la réponse et on le met dans : Authorization -> Bearer Token pour les requettes avec les endpoints '/employee'

# Creer un employé
POST http://localhost:8081/employee
Exemple de body pour ajouter un employe :
    {
        "name" : "TOTO",
        "firstName" : "John",
        "department" : "Finances"
    }

Les requettes suivantes ne necessitent pas de token

# Faire un check-in
POST http://localhost:8081/check-in
Exemple de body pour le check-in (comment non obligatoire):
    {
        "employeeId":"64fefa79cf2383034ab819df"
    }
Il est preferable de regader la liste des employes et de prendre un Id dedans pour le test


# Faire un check-out
POST http://localhost:8081/check-out
Exemple de body pour le check-out (comment non obligatoire :)
{
    "employeeId":"64fefa79cf2383034ab819df",
    "comment":"sortie avance "
}
Dans le check-out la durrée de travail est calculé automatiquement (duration)

# Recupere les check des utilisateurs 
GET http://localhost:8081/checkInOutEmployee?employeeId=<idemployee>

Il est preferable de regader la liste des employes et de prendre un Id dedans pour le test
Si on ne fournit pas employeeId dans la requete, tous les check seront retournés


```