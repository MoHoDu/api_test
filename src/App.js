import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (n, newDatas, totalOffset) => {
    n = Number(n);
    if (totalOffset !== 0 && n === totalOffset) {
      setDatas(newDatas);
      setIsLoading(true);
      return;
    }
    const json = await (
      await fetch(
        `https://app-api6.podbbang.com/channels/10273/episodes?offset=${n}&limit=20&sort=desc&episode_id=0&focus_center=0&with=image`
      )
    ).json();
    if (n === 0) totalOffset = Math.floor(json.summary.totalCount / 20 + 1);

    newDatas.push(json);
    getData(n + 1, newDatas, totalOffset);
  };
  useEffect(() => {
    const newDatas = [];
    let totalOffset = 0;
    getData(0, newDatas, totalOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  return (
    <div className="App">
      {isLoading ? <span>{datas[21].data[0].title}</span> : <p>Loading...</p>}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
