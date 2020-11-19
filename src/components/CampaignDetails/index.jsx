import { useState } from 'react';
import qs from 'qs';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { cpfMask, phoneMask } from "../../utils/masks";

const Details = ({ route, navigation }) => {
  const { ...entry } = route.params;
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const MySwal = withReactContent(Swal);

  function handleCpf(e) {
    setCpf(cpfMask(e.target.value))
  }

  function handlePhone(e) {
    setPhone(phoneMask(e.target.value));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValues = {};
    let formData = new FormData(e.target);
    formData.forEach((value, key) => formValues[key] = value);
    formValues.CpfCnpj = formValues.CpfCnpj.replace(/[^\w\s]/gi, '').replace(" ", "");
    formValues.Telefones = formValues.Telefones.replace(/[^\w\s]/gi, '').replace(" ", "");
    let params = new URLSearchParams(window.location.search);
    let cpf = params.get("cpfVendedor");
    let dn = params.get("dn");
    let parsedPhone = {
      Tipo_Tel: 1,
      DDD: formValues.Telefones.substring(0, 2),
      Telefone: formValues.Telefones.substring(3)
    };
    let nonFormValues = {
      Origem_Id: 4,
      Sub_Origem_Id: 46,
      DN: dn,
      CPF_Vendedor: cpf,
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
      Telefones: [parsedPhone]
    }
    Object.assign(formValues, nonFormValues);
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
    }).then(res => res.json())
    MySwal.fire({
      title: <p>{response.Message}</p>
    }).then(() => {
      if (response.StatusMessage === "OK") {
        navigation.goBack();
      }
    })
    hideLoader();
  }

  return (
    <>
      <form id="campaignForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" name="Nome" required />
        <input type="email" placeholder="Email" name="Email" required />
        <input type="tel" placeholder="DDD + Telefone" name="Telefones" onChange={handlePhone} value={phone} required />
        <input type="text" placeholder="CPF Cliente" name="CpfCnpj" onChange={handleCpf} value={cpf} />
        <select name="Produto_Desejado" required>
        <option value="">Selecione um produto</option>
          {entry.Produtos.map((i, j) => (
            <option key={j} value={i}>{i}</option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
      {loader}
    </>
  );
}

export default Details;