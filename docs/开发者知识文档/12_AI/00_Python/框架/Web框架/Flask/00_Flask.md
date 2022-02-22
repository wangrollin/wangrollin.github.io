

## tips

### 在 Flask 项目里使用工程化 Vue

把编译好的Vue dist 目录拷贝到项目里

```python
app = Flask(__name__,
            static_url_path='',
            static_folder='static/dist')
```

```python
from flask import render_template

return render_template('dist/index.html')
```