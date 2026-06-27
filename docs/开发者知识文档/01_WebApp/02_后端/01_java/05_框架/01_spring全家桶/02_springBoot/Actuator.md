
The /health/readiness endpoint indicates if the application is healthy, this fits with the readiness proble
The /health/liveness endpoint serves application info, we can use this to make sure the application is “alive”

management.endpoint.health.probes.enabled=true
management.health.livenessState.enabled=true
management.health.readinessState.enabled=true

