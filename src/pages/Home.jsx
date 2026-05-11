import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="fw-light">Contacts</h1>

        <Link to="/add">
          <button className="btn btn-success">
            <i className="fa-solid fa-plus me-2"></i>
            Add new contact
          </button>
        </Link>
      </div>

      {/* CONTACT CARDS */}
      {store.contacts.map(contact => (
        <div key={contact.id} className="card mb-3 shadow-sm border-0">

          <div className="card-body d-flex align-items-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="contact"
              className="me-3"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

            <div className="flex-grow-1">

              <h5>{contact.name}</h5>

              <p className="mb-1 text-muted">
                <i className="fa-solid fa-envelope me-2"></i>
                {contact.email}
              </p>

              <p className="mb-1 text-muted">
                <i className="fa-solid fa-phone me-2"></i>
                {contact.phone}
              </p>

              <p className="mb-3 text-muted">
                <i className="fa-solid fa-location-dot me-2"></i>
                {contact.address}
              </p>

              {/* EDIT BUTTON (RESTORED) */}
              <Link to={`/edit/${contact.id}`}>
                <button className="btn btn-outline-primary btn-sm me-2">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </Link>

              {/* DELETE BUTTON */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setDeleteId(contact.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>

            </div>
          </div>
        </div>
      ))}

      {/* DELETE MODAL (MEJORADO, BOTONES JUNTOS) */}
      {deleteId && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow p-4">

              <div className="text-center mb-3">
                <i className="fa-solid fa-triangle-exclamation text-danger fs-2"></i>
                <h5 className="mt-2">Delete contact?</h5>
                <p className="text-muted mb-0">
                  This action cannot be undone.
                </p>
              </div>

              {/* BOTONES MÁS JUNTOS COMO EN EL GIF */}
              <div className="d-flex gap-2 justify-content-center">

                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger px-4"
                  onClick={async () => {
                    await actions.deleteContact(deleteId);
                    setDeleteId(null);
                  }}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};