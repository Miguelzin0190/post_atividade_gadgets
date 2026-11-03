const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-gadgets");
const modelo = document.querySelector("#modelo-gadget");


const apiKey = "cv_x7oLfm8-nJ296jVjR0NXLw7tEJsDOF6ql5YPu5KIas10BItNB-YjfpKgcNXEJ0-9";

const apiUrl = "https://api-ds.codeverse.dev.br/api/gadgets";

async function buscarGadgets() {

  resposta.textContent="Carregando gadgets..."
  
  try {

    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os gadgets.");
    }

    const resultado = await retorno.json();

    for (const gadget of resultado.data){
      
      const card = modelo.content.cloneNode(true);

      card.querySelector(".title").textContent = gadget.title;
      card.querySelector(".categoria").textContent = gadget.categoria;
      card.querySelector(".marca").textContent = gadget.marca;
      card.querySelector(".ano_lancamento").textContent = gadget.ano_lancamento;
      card.querySelector(".preco").textContent = gadget.preco;

      const imagem = card.querySelector(".imagem-gadget");

      if (gadget.imageUrl){
        imagem.src = gadget.imageUrl;
        imagem.alt = gadget.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os gadgets. Tente novamente!" 
  }
}

buscarGadgets();