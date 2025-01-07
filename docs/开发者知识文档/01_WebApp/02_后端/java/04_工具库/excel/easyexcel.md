
## easyexcel 文档

https://blog.csdn.net/sinat_32366329/article/details/103109058
- [官方文档](https://easyexcel.opensource.alibaba.com/docs/current/quickstart/write#%E6%8C%87%E5%AE%9A%E5%86%99%E5%85%A5%E7%9A%84%E5%88%97)


## 导入数据

```
// controller
    @PostMapping("/upload-config-file")
    public void upload(@RequestParam(value = "productLineCode") @NotBlank String productLineCode,
                       @RequestParam(value = "area") @NotBlank String area,
                       @RequestParam("file") MultipartFile file) throws IOException {

        service.upload(productLineCode, area, file);
    }

// service
    public void upload(MultipartFile file) throws IOException {

        if (StringUtils.isBlank(file.getOriginalFilename()) || !file.getOriginalFilename().endsWith(".xlsx")) {
            throw new BusinessException("上传文件必须是 【Excel 工作簿(*.xlsx)】 类型");
        }

        /**
         * 解析文件
         */
        List<Config> rows = EasyExcel
                .read(file.getInputStream(), Config.class, null)
                .headRowNumber(1)
                .excelType(ExcelTypeEnum.XLSX)
                .sheet(0)
                .doReadSync();

        if (CollectionUtils.isEmpty(rows)) {
            log.warn("station config file [{}] is empty.", file.getName());
            return;
        }
    }

// entity
    @Data
    public class Config {

        /**
         * 子线名称
         */
        @ExcelProperty(value = "子线名称")
        private String subLine;

        /**
         * 工序名称
         */
        @ExcelProperty(value = "工序名称")
        private String stage;
    }
```


## 导出数据

```
// controller
    @PostMapping("/export")
    public void export(@RequestBody ProduceQuery query, HttpServletResponse response){

        service.export(response);
    }

// service
    public void export(xxx, HttpServletResponse response) {


        /**
         * 配置输出 excel 信息，并返回
         */
        String excelName = "全量数据_" + query.getProductLineCode() + "_" + System.currentTimeMillis();
        excelName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");

        // 设置文件的响应类型
        response.setContentType("application/vnd.ms-excel");
        // 设置响应编码
        response.setCharacterEncoding("utf-8");
        // 固定写法,设置响应头
        response.setHeader("Content-disposition", "attachment;filename=" + excelName + ".xlsx");
        try {
            EasyExcel.write(response.getOutputStream(), ExportEntity.class)
                    .excelType(ExcelTypeEnum.XLSX)
                    .sheet("sheet name")
                    .doWrite(list);
        } catch (IOException e) {
            log.error("exportProduce error.[{}]", e);
        }
    }

// entity

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.Data;

@Data
public class ExportEntity {

    /**
     * 地域
     */
    @ColumnWidth(40)
    @ExcelProperty(value = "区域",index = 0)
    private String area;

    /**
     * 产品编码
     */
    @ExcelIgnore
    private String matCode;
}
```

## 导出数据 -- 自定义列名和数据

```

        /**
         * 构造 header
         */
        List<List<String>> headers = new ArrayList<>();
        headers.add(Collections.singletonList("SN"));
        headers.add(Collections.singletonList("区域"));
        headers.add(Collections.singletonList("测试时间"));
        headers.add(Collections.singletonList("操作员"));
        for (String testItem : testItems) {
            headers.add(Collections.singletonList(testItem));
        }

        /**
         * 构造 data
         */
        List<List<String>> dataList = new ArrayList<>();

        for (BizRecord record : records) {

            List<String> data = new ArrayList<>();
            data.add(record.getSn());
            data.add(record.getArea());
            data.add(record.getProductLineCode());
            data.add(record.getStation());
            data.add(record.getStage());
            data.add(record.getTestTime());
            data.add(record.getOperator());
            for (String testItem : testItems) {
                data.add(record.getTestItem(testItem));
            }

            dataList.add(data);
        }

        try {
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("utf-8");
            String fileName = URLEncoder.encode(excelName, "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            EasyExcel.write(response.getOutputStream())
                    .head(headers)
                    .sheet(excelName)
                    .doWrite(dataList);
        } catch (IOException e) {
            log.error("fail to buildExcelAndWriteToResponse for {}, error is: ", excelName, e);
            throw new BusinessException("导出 excel 文件失败。");
        }

```