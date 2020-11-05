import React, { useEffect } from 'react';
import CampaignIcon from "../assets/CampaignIcon";
import CampaignExpand from "../assets/CampaignExpand";
import Refresh from "../assets/Refresh";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import useSeek from "../../hooks/useSeek";

const Home = ({ navigation }) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const { seek, seekData } = useSeek();

  async function reload() {
    showLoader();
    let params = new URLSearchParams(window.location.search);
    //let cpf = params.get("cpf");
    let dn = params.get("dn");
    await seek(`/api/hub/2.0/CampanhasByDN/${dn ? dn : "0441"}`);
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
      {seekData.length ? seekData.map((i, j) => (
        <div key={j}>
          <div className="campaignWrapper">
            <div className="campaignIcon">
              <CampaignIcon type={i.Tipo} />
            </div>
            <div className="campaignDetails">
              <p className="campaignName">{i.Nome}</p>
              <p className="campaignDate">Termina em: {i.EndDate || "--"}</p>
              <p className="campaignOrg">{i.Origem}</p>
            </div>
            <div className="campaignExpand" onClick={() => { navigation.navigate("Details", i) }}>
              <CampaignExpand />
            </div>
          </div>
          <hr />
        </div>
      )) : <h1 style={{ textAlign: "center" }}>Nenhuma campanha encontrada.</h1>}
      {loader}
    </div>
  );
}

export default Home;
