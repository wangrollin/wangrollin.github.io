

json 字段需要一个对象
data 字段需要一个 string

```python
requests.post('url', headers={}, json=json.loads(body))
requests.post('url', headers={}, data=body)
```

