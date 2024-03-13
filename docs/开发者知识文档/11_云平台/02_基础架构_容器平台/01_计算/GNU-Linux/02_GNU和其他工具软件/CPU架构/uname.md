
```bash
#
uname -m

#
uname -a

#
uname -v
```

### 判断系统架构

if [[ "$(uname -m)" == "aarch64" ]]
then
	CLI_TOOLS="cli-tools_linux-arm64.tar.gz"
else
	CLI_TOOLS="cli-tools.tar.gz"
fi
