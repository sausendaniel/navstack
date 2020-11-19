import React, { useState, useEffect } from 'react';
import qs from 'qs';
import CampaignIcon from "../assets/CampaignIcon";
import CampaignExpand from "../assets/CampaignExpand";
import Refresh from "../assets/Refresh";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import useSeek from "../../hooks/useSeek";

const Home = ({ navigation }) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const { seek, seekData } = useSeek();
  const [valid, setValid] = useState(false);

  async function reload() {
    showLoader();
    let params = new URLSearchParams(window.location.search);
    let dn = params.get("dn");
    await seek(`/api/hub/2.0/CampanhasByDN/${dn ? dn : ""}`);
    hideLoader();
  }

  async function validate() {
    showLoader();
    let { access_token } = await fetch(`${process.env.REACT_APP_ENDPOINT}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({ grant_type: "client_credentials", client_id: process.env.REACT_APP_SECURITY_ID, client_secret: process.env.REACT_APP_SECURITY_SECRET })
    }).then(res => res.json())

    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    let tokenIsValid = await fetch(`${process.env.REACT_APP_ENDPOINT}/saibamais/seguranca/autenticar`, {
      headers: { "Authorization": `Bearer ${access_token}`, "Custom": `Bearer ${token}` }
    }).then(res => res.text())
    if (tokenIsValid === "\"Token válido\"") {
      reload();
      setValid(true)
    }
  }

  useEffect(() => {
    validate()
    // reload();
    // setValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    valid ? (
      <div style={{ backgroundColor: "white" }}>
        <div className="toolbar">
          <button onClick={reload}>
            <Refresh />
          </button>
        </div>
        {seekData.length ? seekData.map((i, j) => (
          <div key={j}>
            <div className="campaignWrapper" onClick={() => { navigation.navigate("Details", i) }}>
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
        )) : <h1 style={{ textAlign: "center" }}>&nbsp;</h1>}
        {loader}
      </div>
    ) : (<></>)
  );
}

export default Home;
