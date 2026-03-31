import { useState, useEffect } from "react";
import ProdutoCard from "../components/ProdutoCard";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: ""
  });

  // Simulação de API
  useEffect(() => {
    setTimeout(() => {
      setProdutos([
        {
          id: 1,
          nome: "Notebook",
          preco: 3500,
          descricao: "Notebook potente",
          imagem: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          nome: "Mouse Gamer",
          preco: 150,
          descricao: "Mouse RGB",
          imagem: "https://via.placeholder.com/150"
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const novoProduto = {
      id: Date.now(),
      ...form
    };

    setProdutos([...produtos, novoProduto]);

    setForm({
      nome: "",
      preco: "",
      descricao: "",
      imagem: ""
    });
  }

  return (
    <div>
      <h1>Catálogo de Produtos</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imagem"
          placeholder="URL da imagem"
          value={form.imagem}
          onChange={handleChange}
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />

        <button type="submit">Adicionar</button>
      </form>

      {/* Lista */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} {...produto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
