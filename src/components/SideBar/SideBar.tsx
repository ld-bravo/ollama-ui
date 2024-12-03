import { useEffect, useState } from "react";
import { getRunningModels } from "../../services/api";
import "./SideBar.scss";
import useStore from "../../services/useStore";

const SideBar = () => {
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const { setRunningModel } = useStore();

  useEffect(() => {
    loadRunningModels();
  }, []);

  const loadRunningModels = async () => {
    const response = await getRunningModels();
    setOllamaModels(response?.models);

    const model = response?.models[0]?.name;
    setRunningModel(model);

    console.log("models: ", response);
  };

  return (
    <div className="sidebar">
      <div>
        Running Model:
        <br />
        {ollamaModels?.length > 0 && ollamaModels?.map((model: any, index: number) =>
          <div key={index}>{model.name}</div>
        )}
      </div>
    </div>
  )
}

export default SideBar;