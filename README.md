# Déploiement d'un Système de Supervision pour Automates Industriels

## Présentation

Ce projet propose une solution pour centraliser la gestion des automates industriels et des variables associées. Il permet de :
- Superviser des données en temps réel.
- Gérer dynamiquement des automates et des variables.
- Visualiser les évolutions des données sous forme de graphiques interactifs.

Grâce à son approche modulable, cette solution s'adapte facilement à toutes les configurations industrielles et peut être intégrée dans n'importe quelle usine.
## Fonctionnalités

- **Gestion des automates :** ajout, modification et suppression.
- **Gestion des variables :** ajout, modification et suppression.
- **Visualisation des variables :** affichage graphique sur des plages temporelles définies.
- **Export des historiques :** possibilité de générer un fichier CSV des données collectées.
- **Interface utilisateur :** intuitive et responsive, développée avec **Bootstrap** et **Chart.js**.
- **API REST backend :** utilisée pour interagir avec les données des automates et des variables.
## Prérequis

- **Docker Desktop** (dernière version recommandée).
- **Node.js** (version 16 ou supérieure).
- **Docker Compose** (version 2.29 ou supérieure).
## Guide d'installation

### Étape 1 : Cloner le projet
```bash
git clone https://github.com/username/Docker_SI.git
cd Docker_SI
docker-compose up --build
```
---

### Guide d'utilisation

### Gérer les Automates
- Accéder à la section "Gérer les Automates".
- Ajouter un automate en spécifiant son nom et son adresse IP.
- Modifier un automate existant ou le supprimer si nécessaire.

### Gérer les Variables
- Accéder à la section "Gérer les Variables".
- Ajouter une nouvelle variable en renseignant :
  - Son nom.
  - Son unité (°C, kPa, etc.).
  - Son adresse.
  - L'automate auquel elle est associée.
- Modifier une variable existante ou la supprimer.
- Visualiser l'historique d'une variable sous forme de tableau exportable en CSV.
- Visualiser l'évolution d'une variable sous forme de graphique interactif.

### Visualisation
- Utilisez les outils intégrés pour visualiser les données en temps réel ou sur des plages temporelles définies.
## Roadmap

Voici les évolutions prévues pour le projet :
- **Ajout de notifications :** envoi d'alertes en cas de dépassement de seuil pour certaines variables.
- **Support multi-utilisateur :** intégration d'un système de connexion avec des droits personnalisés.
- **Compatibilité mobile :** amélioration de l'expérience utilisateur sur smartphones et tablettes.
## Structure du Projet

```plaintext
projet/
├── frontend/         # Interface utilisateur (HTML, CSS, JavaScript)
│   ├── index.html    # Page principale
│   ├── script.js     # Scripts de gestion des fonctionnalités
│   ├── Dockerfile    # Configuration Docker pour le frontend
├── backend/          # API REST
│   ├── index.js      # Serveur Express.js
│   ├── routes/       # Routes de l'API
│   ├── Dockerfile    # Configuration Docker pour le backend
├── database/         # Fichiers liés à la base de données
├── docker-compose.yml # Orchestration Docker

```

### API Backend
```markdown
## API Backend

| Méthode | Endpoint         | Description                          |
|---------|------------------|--------------------------------------|
| GET     | `/variables`     | Récupérer toutes les variables.      |
| POST    | `/variables`     | Ajouter une nouvelle variable.       |
| DELETE  | `/variables/:id` | Supprimer une variable.              |
| GET     | `/history`       | Récupérer l'historique des variables.|
## Schéma de la Base de Données

### Table : `plc_data`
| Champ           | Type         | Description                        |
|------------------|--------------|------------------------------------|
| `id`            | INT          | Identifiant unique.                |
| `variable_name` | VARCHAR(50)  | Nom de la variable.                |
| `value`         | FLOAT        | Valeur mesurée.                    |
| `timestamp`     | DATETIME     | Date et heure de la mesure.        |
## Contributeurs
```
- **Gautier Poitel**  
  Email : gautier.poitel@etu.unilasalle.fr  
- **Batiste Guignant**  
  Email : batiste.guignant@etu.unilasalle.fr  
