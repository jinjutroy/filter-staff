"use client";
import { ExportOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Table, Tag, Upload, UploadProps, message } from "antd";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";

import FilterCard from "@/components/filter-card/FilterCard";
import type { ColumnsType } from "antd/es/table";
import { debounce, isTrue } from "../../utils/functions";
import styles from "./page.module.css";
import ExportFile from "@/components/export/Export";

export interface DataTypeItem {
  ID: string;
  "NHAN VIEN": string;
  JOBS: string;
  "IN CHARGE": string;
}

export default function Home() {
  const [items, setItems] = useState<DataTypeItem[]>([]);
  const [result, setResult] = useState<DataTypeItem[]>([]);
  const filter = useRef<string[]>([]);

  const readUploadFile = (file: Blob) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d: any) => {
      setItems(d);
    });
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    type: "drag",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    accept: ".xls, .xlsx",
    onChange(info) {
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.originFileObj) {
          readUploadFile(info.file.originFileObj);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setItems([]);
      setResult([]);
    },
  };
  const columns: ColumnsType<DataTypeItem> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "id",
      width: "10%",
    },
    {
      title: "NHAN VIEN",
      dataIndex: "NHAN VIEN",
      key: "staff",
    },
    {
      title: "JOB",
      dataIndex: "JOB",
      key: "job",
      width: "20%",
    },
    {
      title: "IN CHARGE",
      dataIndex: "IN CHARGE",
      key: "in charge",
      width: "30%",
      render: (text: string) => {
        const arrId = text.split(",");
        return arrId.map((id, i) => (
          <Tag color="pink-inverse" key={i}>
            {id}
          </Tag>
        ));
      },
    },
  ];

  const debouncedSetResult = debounce(setResult, 200);
  const onSearch = () => {
    const arrBase = [...items];
    const filterItems = arrBase.filter((item): boolean => {
      const inCharge = item["IN CHARGE"].split(",");
      if (inCharge.length === 1) {
        return filter.current.includes(inCharge[0]);
      }
      return isTrue(inCharge, filter.current);
    });
    debouncedSetResult(filterItems);
  };

  const onReset = () => {
    setResult([]);
    filter.current = [];
  };

  const onExport = () => {
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;

    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "result.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles["root"]}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {items?.length > 0 ? (
        <>
          <FilterCard
            filter={filter}
            items={items}
            onSearch={onSearch}
            onReset={onReset}
          />
          <Card
            title={
              <ExportFile disabled={result?.length === 0} onExport={onExport} />
            }
            className={styles["card-table"]}
          >
            <Table
              key={"ID"}
              columns={columns}
              dataSource={filter.current.length > 0 ? result : items}
              bordered
              scroll={{ x: 600 }}
            />
          </Card>
        </>
      ) : (
        <div className={styles["text-center"]}>Please Upload File</div>
      )}
    </div>
  );
}
