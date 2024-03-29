import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import styles from "./Export.module.css";

type ExportProps = {
  total: number;
  disabled: boolean;
  onExport: () => void;
};

const ExportFile: React.FC<ExportProps> = (props) => {
  return (
    <div className={styles["export-wrapper"]}>
      <h3>List ({props.total})</h3>
      <Button
        disabled={props.disabled}
        type="primary"
        icon={<ExportOutlined />}
        onClick={props.onExport}
      >
        Export
      </Button>
    </div>
  );
};

export default ExportFile;
