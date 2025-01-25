
## 网站

- [官网](https://www.keycloak.org/)
- [Keycloak on Docker](https://www.keycloak.org/getting-started/getting-started-docker)


## Keycloak on Docker

```bash
docker run -d -it \
    -p 8080:8080 \
    -v xxx:xxx \
    -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    --restart=always \
    --name keycloak \
    quay.io/keycloak/keycloak:11.0.3

docker run \
    -p 8080:8080 \
    -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
    -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
    quay.io/keycloak/keycloak:26.1.0 start-dev

```

http://localhost:8080/auth/admin

