
## 安装

brew install uv
uv --version

## uv 常用命令

```bash
# 项目管理
uv init myproject          # 创建新项目
uv init                    # 在当前目录初始化

# 依赖管理
uv add requests            # 添加依赖
uv add 'flask>=2.0'       # 添加带版本约束的依赖
uv add --dev pytest        # 添加开发依赖
uv remove requests         # 移除依赖
uv sync                    # 根据 lockfile 同步环境

# 运行
uv run python main.py      # 在项目环境中运行脚本
uv run pytest              # 运行测试

# Python 版本管理
uv python install 3.12     # 安装 Python 版本
uv python list             # 列出可用版本
uv python pin 3.12         # 固定项目 Python 版本

# 虚拟环境
uv venv                    # 创建 .venv
uv venv --python 3.12      # 指定 Python 版本

# 替代 pip 使用
uv pip install requests    # 类似 pip install
uv pip install -r requirements.txt
uv pip freeze              # 列出已安装包

# 一次性运行工具
uvx ruff check .           # 无需安装直接运行工具（类似 npx）
uvx black .
```
