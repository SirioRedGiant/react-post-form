import "./assets/css/index.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function App() {
  //note --> creare un oggetto che contiene tutti i campi del form. Questo oggetto verrà inviato al server.
  const initialForm = {
    author: "",
    title: "",
    body: "",
    public: false, // per gestire la checkbox --> parte come bozza
  };

  const [formData, detFormData] = useState(initialForm);
}
