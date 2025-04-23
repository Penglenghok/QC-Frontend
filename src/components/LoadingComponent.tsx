import { LoadingOutlined } from "@ant-design/icons";

const LoadingComponent = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <LoadingOutlined style={{ fontSize: '36px' }} ></LoadingOutlined>
    </div>
  );
};

export default LoadingComponent;
