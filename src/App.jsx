import "./assets/css/index.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

//! REACT DOCS --> updating Objects in State
//note --> creare un oggetto(stampino) che contiene tutti i campi del form. Questo oggetto verrà inviato al server.
const initialForm = {
  author: "",
  title: "",
  body: "",
  public: false, // per gestire la checkbox --> parte come bozza
};

export default function App() {
  // lo stato che contiene i dati del form mentre l'utente scrive
  const [formData, setFormData] = useState(initialForm);

  //note --> FUNZIONE UNIVERSALE DEGLI INPUT
  const handleInputChange = (e) => {
    //*   e.target è l'elemento HTML che ha scatenato l'evento (l'input)
    //*   Usiamo il "destructuring" per estrarre le proprietà che ci servono
    const { name, value, type, checked } = e.target;

    //note --> Aggiorna lo stato in modo dinamico
    setFormData({
      ...formData, //  Copio l'oggetto attuale per non perdere gli altri campi
      //   [name] per identificare quale chiave dell' array aggiornare
      //    Se l'input è una checkbox usiamo "checked", altrimenti "value"
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //note --> FUNZIONE INVIO (POST)
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene il refresh della pagina

    const url = "https://**67c5b4f3351c081993fb1ab6**.mockapi.io**/api**/posts";

    // Invia i dati al server (POST)
    // Passa l'oggetto "formData" scritto nel form
    axios
      .post(url, formData)
      .then((res) => {
        // Se il server risponde stampa il risultato in console
        console.log("Dati inviati con successo:", res.data);
        alert("Post creato!");

        // riporta il form allo stato iniziale --> se ha successo
        setFormData(initialForm);
      })
      .catch((err) => {
        console.error("Errore durante l'invio:", err);
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 card shadow p-4">
          <h2 className="mb-4 text-center">Post Manager</h2>

          {/* Colleghiamo la funzione handleSubmit al form */}
          <form onSubmit={handleSubmit}>
            {/* CAMPO AUTORE */}
            <div className="mb-3">
              <label className="form-label fw-bold">Autore</label>
              <input
                type="text"
                name="author" // <---  chiave nell'oggetto
                className="form-control"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* CAMPO TITOLO */}
            <div className="mb-3">
              <label className="form-label fw-bold">Titolo</label>
              <input
                type="text"
                name="title" // <---  chiave nell'oggetto
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* CAMPO CONTENUTO (Body) */}
            <div className="mb-3">
              <label className="form-label fw-bold">Testo del Post</label>
              <textarea
                name="body" // <---  chiave nell'oggetto
                className="form-control"
                rows="4"
                value={formData.body}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* LA TUA CHECKBOX (Sistemata) */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="public" // --> chiave di initialForm
                className="form-check-input"
                id="publicCheck" // --> collega la label
                checked={formData.public} // --> RICORDA: nelle checkbox si usa "checked", non "value"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="publicCheck">
                Rendi il post pubblico
              </label>
            </div>

            {/* PULSANTE DI INVIO */}
            <button type="submit" className="btn btn-primary w-100">
              Pubblica Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/*
return (
    <div className="form-check mb-3">
      <input
        type="checkbox"
        name="public" // --> chiave di initialForm
        className="form-check-input"
        id="publicCheck" // --> collega la label
        checked={formData.public} // --> RICORDA: nelle checkbox si usa "checked", non "value"
        onChange={handleInputChange}
      />
      <label className="form-check-label" htmlFor="publicCheck">
        Rendi il post pubblico
      </label>
    </div>
  );
  */
