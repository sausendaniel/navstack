import { useState } from 'react';
import qs from 'qs';

function useSeek() {
  const [seekData, setSeekData] = useState([]);

  const tokenOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: qs.stringify({ grant_type: "client_credentials", client_id: process.env.REACT_APP_HUB_KEY, client_secret: process.env.REACT_APP_HUB_SECRET })
  }

  const seek = async (url) => {
    let { access_token } = await fetch(`${process.env.REACT_APP_AUTH_API}/token`, tokenOptions).then(res => res.json())
    await fetch(`${process.env.REACT_APP_HUB_API}${url}`, { headers: { "Authorization": `Bearer ${access_token}` } })
      .then(res => res.json())
      .then(res => setSeekData(res))
      .catch(err => { alert("Erro ao buscar dados."); console.log(err) })
  }

  return { seekData, seek }
}
export default useSeek;