

## tips

> 屏蔽pmd检查

@SuppressWarnings("PMD")

>  查看 pmd 检查结果

mvn clean install pmd:check -Dmaven.test.skip=true
mvn clean install pmd:check -DskipTests=true

