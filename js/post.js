const form = document.querySelector("#form-gadget");

const resposta = document.querySelector("#resposta");

const apiKey = "cv_x7oLfm8-nJ296jVjR0NXLw7tEJsDOF6ql5YPu5KIas10BItNB-YjfpKgcNXEJ0-9";

const apiUrl = "https://api-ds.codeverse.dev.br/api/gadgets";


form.addEventListener("submit", async function (event) {

  event.preventDefault();

  const dados =  new FormData(form);

  const dispositivo = {
      title: dados.get("title"),
      categoria: dados.get("categoria"),
      marca: dados.get("marca"),
      preco: dados.get("preco"),
      ano_lancamento: Number(dados.get("ano_lancamento")),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando dispositivo para a API....";

try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },

    body: JSON.stringify(dispositivo),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})

