Ethan DAHI GERMAIN

# Partie 1 — API & Dockerfile


# Partie 2 — Registry privé

## Interface  
![description](captures/c1.png)

## Docker compose  
![description](captures/c2.png)

# Partie 3 — Stack Compose & Nginx

# Partie 4 - Sécurité

### Pourquoi node:20-alpine plutôt que node:latest ? Quel est l'impact sur le nombre de CVE ?

J'ai choisis node:20-alpine à la place de node:latest car c'est une version stable (fix) et qu'elle est environ 90% plus légère. Et cela réduit donc mécaniquement drastiquement le nombre de CVE car la surface est beaucoup plus petite.

![description](captures/c3.png)

