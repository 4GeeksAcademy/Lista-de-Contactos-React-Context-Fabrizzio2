import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const { actions, store } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const existing = store.contacts.find(c => c.id == id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (id) {
      await actions.updateContact(id, form);
    } else {
      await actions.createContact(form);
    }

    navigate("/");
  };

  return (
    <div className="container">

      <h1 className="my-4 fw-light">
        {id ? "Edit contact" : "Add contact"}
      </h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">

        <input
          name="name"
          className="form-control mb-3"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          className="form-control mb-3"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          className="form-control mb-3"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
        >
          Save
        </button>

      </form>

      <div className="text-center mt-3">
        <Link to="/" className="text-decoration-none">
          or get back to contacts
        </Link>
      </div>

    </div>
  );
};

export default AddContact;