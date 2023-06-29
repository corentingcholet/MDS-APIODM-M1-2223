# Star Wars REST API with Swagger

Bienvenue sur swapi, l'API Star Wars ! Cette documentation devrait vous aider à vous familiariser avec les ressources disponibles et la façon de les consommer avec des requêtes HTTP.

## Le modèle de RICHARDSON

Le modèle de RICHARDSON est découpé en 5 niveaux : 

1. Niveau initial (Ad hoc) : À ce stade, les API REST sont développées de manière informelle, sans normes ou bonnes pratiques clairement définies. Les endpoints sont souvent conçus de manière arbitraire, ce qui rend les API difficiles à comprendre et à utiliser. Il peut y avoir une absence de documentation, de versionnage et de gestion appropriée des erreurs.

2. Niveau Répétable (Basique) : À ce stade, les bonnes pratiques commencent à être adsoptées. Les API REST suivent des conventions de conception de base, telles que l'utilisation de méthodes HTTP appropriées (GET, POST, PUT, DELETE), l'utilisation de codes de statut HTTP pertinents et la structuration des endpoints de manière cohérente. La documentation de base peut être présente, mais elle n'est pas encore exhaustive.

3. Niveau Défini (Standardisé) : À ce stade, les API REST sont développées selon des normes et des conventions bien définies. Des standards de l'industrie, tels que le respect des principes RESTful, sont suivis. Les endpoints sont conçus de manière cohérente, les ressources sont correctement identifiées et les relations entre les ressources sont bien gérées. La documentation est détaillée, comprenant des exemples d'utilisation et des descriptions précises des endpoints et des paramètres.

4. Niveau Géré (Mesuré) : À ce stade, les performances des API REST sont mesurées et surveillées activement. Des métriques sont utilisées pour évaluer les temps de réponse, la disponibilité et la satisfaction des utilisateurs. Des tests automatisés, tels que les tests de charge et les tests d'intégration, sont mis en place pour garantir la stabilité et la performance des API. Les erreurs sont correctement gérées, avec des réponses appropriées et des codes d'erreur standardisés.

5. Niveau Optimisé (Évolué) : À ce stade, l'organisation cherche constamment à améliorer ses API REST en adoptant de nouvelles technologies et en mettant en œuvre des pratiques innovantes. Des concepts avancés, tels que la mise en cache, la pagination, l'API versioning, l'authentification et l'autorisation, sont pris en compte. L'apprentissage organisationnel est encouragé, avec la collecte des commentaires des utilisateurs et l'itération continue pour améliorer la conception et la performance des API.

Pour respecter le modèle de maturité de Richardson, il faut évaluer la situation actuelle et identifier dans quel niveau de maturité son organisation se situe en ce qui concerne les API REST. Ensuite, il faut définir des objectifs d'amélioration et mettre en place des actions spécifiques pour passer au niveau supérieur. Cela peut impliquer l'adoption de bonnes pratiques, l'amélioration de la documentation, l'introduction de tests automatisés, l'optimisation des performances, etc.

Il est important de noter que le modèle de maturité de Richardson est un guide et peut être adapté en fonction des besoins et des contraintes spécifiques de son organisation. Il sert de référence pour nous aider à progresser dans votre démarche d'amélioration continue des API REST.

## Application du modèle de maturité de RICHARDSON

Dans cet API, le modèle à été respecté de différentes manières : 

* Respect des normes et des convention
  * Code HTTP pertinent
  * Structure des endpoints cohérent
* Documentation complète