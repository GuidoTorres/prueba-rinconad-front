import { utils, writeFileXLSX } from "xlsx";
export const handleDownloadExcel = (dataSource, sheetName, fileName) => {


  const ws = utils.json_to_sheet(dataSource);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, sheetName);
  writeFileXLSX(wb, `${fileName}.xlsx`);
};
