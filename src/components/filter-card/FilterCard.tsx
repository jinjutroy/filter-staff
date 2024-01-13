import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Select, Space } from "antd";
import { MutableRefObject, useState } from "react";
import { unAccent } from "../../../utils/functions";
import styles from "./FilterCard.module.css";
import { DataTypeItem } from "@/app/page";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type PropsFilterComponent = {
  items: DataTypeItem[];
  filter: MutableRefObject<string[]>;
  onSearch: () => void;
  onReset: () => void;
};

const FilterCard: React.FC<PropsFilterComponent> = (props) => {
  const [filterC, setFilterC] = useState(props.filter.current);
  const handleChange = (value: string[]) => {
    props.filter.current = value.map((item) => item.trim());
    setFilterC(value);
  };
  const options: any = props.items.reduce((prev: any, cur) => {
    if (prev.find((item: { id: string }) => item.id === cur["ID"])) return prev;
    return [
      ...prev,
      {
        id: cur["ID"],
        value: cur["ID"],
        label: cur["ID"] + " - " + cur["NHAN VIEN"],
        emoji: cur["ID"],
        desc: cur["NHAN VIEN"],
      },
    ];
  }, []);
  const onResetCard = () => {
    setFilterC([]);
    props.onReset();
  };
  return (
    <Card title="Filter Card" className={styles["root"]}>
      <div className={styles["filter-wrapper"]}>
        <Select
          mode="multiple"
          className={styles["filter-select"]}
          placeholder="Select "
          onChange={handleChange}
          options={options}
          value={filterC}
          allowClear
          filterOption={(input, option) =>
            unAccent(option?.id)
              .toLowerCase()
              .indexOf(unAccent(input.trim()).toLowerCase()) !== -1
          }
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      </div>
      <div className={styles["wrapper-btn"]}>
        <Button
          type="primary"
          className={styles["filter-button"]}
          icon={<SearchOutlined />}
          onClick={props.onSearch}
        >
          Search
        </Button>
        <Button
          type="default"
          className={styles["filter-button"]}
          icon={<ClearOutlined />}
          onClick={onResetCard}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
};
export default FilterCard;
