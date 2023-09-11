# Utilisation d'une image de base Node.js
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier les fichiers du projet dans le conteneur
COPY . /app

# Exposer le port sur lequel votre application Node.js écoute
EXPOSE 8081

# Définir la commande par défaut pour exécuter l'application
CMD ["node", "server.js"]