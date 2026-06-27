# Sometimes structure is more important than content

Sometimes structure is more important than content

## tips

> 接口无法反序列化，Registering an InstanceCreator with Gson for this type may fix this problem

https://stackoverflow.com/questions/48050487/how-to-register-an-instancecreator-with-gson-in-kotlin

```java
val adapter = RuntimeTypeAdapterFactory
        .of(DeviceDef::class.java)
        .registerSubtype(BluetoothDef::class.java)
        .registerSubtype(WiFiDef::class.java)

val gson = GsonBuilder().setPrettyPrinting().registerTypeAdapterFactory(adapter).create()
```

