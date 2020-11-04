import React, { useState, useEffect } from 'react';
import CampaignIcon from "../assets/CampaignIcon";
import CampaignExpand from "../assets/CampaignExpand";
import Refresh from "../assets/Refresh";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const Home = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [swap, setSwap] = useState(2);

  async function reload() {
    showLoader();
    let { data } = await fetch(`https://reqres.in/api/users?page=${swap}`).then(res => res.json())
    setEntries(data)
    swap === 2 ? setSwap(1) : setSwap(2);
    hideLoader();
  }

  useEffect(() => {
    reload(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="toolbar">
        <button onClick={reload}>
          <Refresh />
        </button>
      </div>
      {entries.map((i, j) => (
        <div key={j}>
          <div className="campaignWrapper">
            <div className="campaignIcon">
              <CampaignIcon />
            </div>
            <div className="campaignDetails">
              <p className="campaignName">{i.first_name} {i.last_name}</p>
              <p className="campaignDate">Termina em: {i.id}</p>
              <p className="campaignOrg">{i.email}</p>
            </div>
            <div className="campaignExpand" onClick={() => { navigation.navigate("Details", i) }}>
              <CampaignExpand />
            </div>
          </div>
          <hr />
        </div>
      ))}
      {loader}
    </div>
  );
}

export default Home;
