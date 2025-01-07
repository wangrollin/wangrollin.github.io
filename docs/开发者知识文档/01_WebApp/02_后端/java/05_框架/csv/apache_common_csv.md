
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-csv</artifactId>
    <version>1.8</version>
</dependency>
```

```java
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

public class CSVParserExample {
    public static void main(String[] args) {
        String csvString = "John,Doe,25,USA";

        try {
            CSVParser csvParser = CSVParser.parse(csvString, CSVFormat.DEFAULT);
            List<String> stringList = new ArrayList<>();

            for (CSVRecord csvRecord : csvParser) {
                for (String value : csvRecord) {
                    stringList.add(value);
                }
            }

            System.out.println(stringList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

