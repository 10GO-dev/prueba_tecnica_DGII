import React, { useState, useEffect } from "react";
import axios from "axios";

import ContribuyentesList from "./components/ContribuyentesList";
import ContribuyenteForm from "./components/ContribuyenteForm";
import Modal from "./components/Modal";
import ComprobantesList from "./components/ComprobantesList";
import ComprobanteForm from "./components/ComprobanteForm";
import Messages from "./components/Messages";

export default function App() {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comprobantes, setComprobantes] = useState([]);
  const [totalItbis, setTotalItbis] = useState(0);

  const [newRnc, setNewRnc] = useState("");
  const [newNombre, setNewNombre] = useState("");
  const [newTipo, setNewTipo] = useState("");
  const [newEstatus, setNewEstatus] = useState("");

  const [compNcf, setCompNcf] = useState("");
  const [compMonto, setCompMonto] = useState("");
  const [compItbis, setCompItbis] = useState("");

  const [notification, setNotification] = useState({message:'', type:null});
  const [showContribForm, setShowContribForm] = useState(false);
  const [showComprobanteForm, setShowComprobanteForm] = useState(false);

  useEffect(() => {
    refreshContribuyentes();
  }, []);

  function refreshContribuyentes() {
    axios
      .get("/api/contribuyentes")
      .then((r) => setContribuyentes(r.data))
      .catch(() => {});
  }

  function selectContrib(rnc) {
    axios
      .get(`/api/contribuyentes/${rnc}/comprobantes`)
      .then((r) => {
        setSelected(r.data.contribuyente);
        setComprobantes(r.data.comprobantes);
        setTotalItbis(r.data.totalItbis);
      })
      .catch(() => showNotification("Error al obtener comprobantes", "error"));
  }

  async function createContrib(e) {
    e.preventDefault();
    try {
      const payload = {
        rncCedula: newRnc,
        nombre: newNombre,
        tipo: newTipo,
        estatus: newEstatus,
      };
      await axios.post("/api/contribuyentes", payload);
      showNotification("Contribuyente creado", "message");
      setShowContribForm(false);
      setNewRnc("");
      setNewNombre("");
      setNewTipo("");
      setNewEstatus("");
      refreshContribuyentes();
    } catch (err) {
      const msg = err?.response?.data?.message || "Error creando contribuyente";
      showNotification(msg, "error");
    }
  }

  async function createComprobante(e) {
    e.preventDefault();
    try {
      const targetRnc = selected?.rncCedula;
      if (!targetRnc) {
        showNotification(
          "Debe seleccionar un contribuyente antes de crear un comprobante", "error"
        );
        return;
      }
      const payload = {
        ncf: compNcf,
        monto: parseFloat(compMonto) || 0,
        itbis18: parseFloat(compItbis) || 0,
        rncCedula: targetRnc,
      };
      await axios.post("/api/comprobantes", payload);
      showNotification("Comprobante creado", "message");
      setShowComprobanteForm(false);
      setCompNcf("");
      setCompMonto("");
      setCompItbis("");
      if (selected && selected.rncCedula === targetRnc)
        selectContrib(targetRnc);
      else refreshContribuyentes();
    } catch (err) {
      showNotification(
        err?.response?.data?.message || "Error creando comprobante",
        "error"
      );
    }
  }

  const showNotification = (message, type = "message", timeout = 3000) => {
    if(message){
        setNotification({message,type})
        setTimeout(() => {
          setNotification('')
        }, timeout);
      }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white rounded shadow p-5">
          <div className="flex items-center justify-between">
            <ContribuyentesList
              contribuyentes={contribuyentes}
              onSelect={selectContrib}
            />
          </div>
          <button
            className="ml-3 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => setShowContribForm((s) => !s)}
          >
            {showContribForm ? "Cerrar" : "Añadir"}
          </button>
          {showContribForm && (
            <Modal
              title="Añadir contribuyente"
              onClose={() => setShowContribForm(false)}
            >
              <Messages message={notification.message} type={notification.type} />
              <ContribuyenteForm
                onSubmit={createContrib}
                values={{ newRnc, newNombre, newTipo, newEstatus }}
                setters={{ setNewRnc, setNewNombre, setNewTipo, setNewEstatus }}
              />
            </Modal>
          )}
        </div>

        <div className="col-span-3">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Detalle</h3>

            {selected ? (
              <div>
                <h4 className="text-md font-medium">
                  {selected.nombre}{" "}
                  <span className="text-sm text-gray-500">
                    - {selected.rncCedula}
                  </span>
                </h4>
                <p className="text-sm text-gray-600">
                  Tipo: {selected.tipo} · Estatus: {selected.estatus}
                </p>
                <ComprobantesList
                  comprobantes={comprobantes}
                  totalItbis={totalItbis}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Selecciona un contribuyente para ver sus comprobantes
              </p>
            )}

            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => setShowComprobanteForm((s) => !s)}
                disabled={!selected}
              >
                Añadir comprobante
              </button>
              {showComprobanteForm && (
                <Modal
                  title="Añadir comprobante"
                  onClose={() => setShowComprobanteForm(false)}
                >
                  <Messages message={notification.message} type={notification.type} />
                  <ComprobanteForm
                    onSubmit={createComprobante}
                    values={{ compNcf, compMonto, compItbis }}
                    setters={{ setCompNcf, setCompMonto, setCompItbis }}
                    disabled={!selected}
                    selected={selected}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
