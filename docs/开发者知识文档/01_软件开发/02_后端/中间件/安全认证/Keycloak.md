
## 网站

- [官网](https://www.keycloak.org/)
- [Keycloak on Docker](https://www.keycloak.org/getting-started/getting-started-docker)


## Keycloak on Docker

```bash
docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:11.0.3

```

http://localhost:8080/auth/admin

