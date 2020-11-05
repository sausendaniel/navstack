import qs from 'qs';
import useFullPageLoader from "../../hooks/useFullPageLoader";

const Details = ({ route, navigation }) => {
  const { ...entry } = route.params;
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formValues = {};
    formData.forEach((value, key) => formValues[key] = value);
    let nonFormValues = {
      Origem_Id: 4,
      Sub_Origem_Id: 46,
      DN: "0441",
      Tipo_Cliente: 1,
      Nacionalidade_Id: 0,
      Model_Year: 0,
      Model_Group: "",
      Versao: "",
      Preco: 0,
      Cep: "",
      Preferencia_Contato: 0,
      Autoriza_Dados: 1,
      Total_Veiculos: 0,
      Natureza: 4,
      Record_Type_Id: 1,
      Campanha: entry.IdCampanha,
      Telefones: [{ Tipo_Tel: 1, DDD: `${formValues.Telefones[0]}${formValues.Telefones[1]}`, Telefone: formValues.Telefones }]
    }
    Object.assign(formValues, nonFormValues);
    console.log(formValues);
    let jsonObj = qs.stringify(formValues);

    showLoader();
    let { access_token } = await fetch(`${process.env.REACT_APP_ENDPOINT}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: qs.stringify({ grant_type: "client_credentials", client_id: process.env.REACT_APP_CLIENT_ID, client_secret: process.env.REACT_APP_CLIENT_SECRET })
    }).then(res => res.json())
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/hub/2.0/salvaronline`, { 
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${access_token}` },
      body: jsonObj
    }).then(res => res.text())
    console.log(response);
    hideLoader();
  }

  return (
    <>
      <pre>{JSON.stringify(entry, null, 4)}</pre>
      <form id="campaignForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" name="Nome" />
        <input type="email" placeholder="Email" name="Email" />
        <input type="phone" placeholder="DDD + Telefone" name="Telefones" />
        <input type="text" placeholder="CPF" name="CPF_Vendedor" />
        <select name="Produto_Desejado">
          {entry.Produtos.map((i, j) => (
            <option key={j}>{i}</option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
      {loader}
    </>
  );
}

export default Details;