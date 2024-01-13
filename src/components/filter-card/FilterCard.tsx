import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Select, Space } from "antd";
import { MutableRefObject, useState } from "react";
import { unAccent } from "../../../utils/functions";
import styles from "./FilterCard.module.css";

type PropsFilterComponent = {
  items: any[];
  filter: MutableRefObject<string[]>;
  onSearch: () => void;
  onReset: () => void;
};

const FilterCard: React.FC<PropsFilterComponent> = (props) => {
  const [filterC, setFilterC] = useState(props.filter.current);
  const handleChange = (value: string[]) => {
    props.filter.current = value;
    setFilterC(value);
  };
  const options = props.items.map((item) => {
    return {
      id: item["ID"],
      value: item["ID"],
      label: item["ID"] + " - " + item["NHAN VIEN"],
      emoji: item["ID"],
      desc: item["NHAN VIEN"],
    };
  });
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
          optionLabelProp="label"
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
