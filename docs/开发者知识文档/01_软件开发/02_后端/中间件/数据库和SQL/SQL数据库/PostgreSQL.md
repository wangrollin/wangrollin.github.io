

```bash
$ docker run -d \
    --name my-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -v /custom/mount:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres
```