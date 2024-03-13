

kubectl exec -it $(kubectl get po | sed '1d' | cut -d ' ' -f 1) bash

xxx | xargs -i echo {}
