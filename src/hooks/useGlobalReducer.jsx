import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const { store, dispatch } = useContext(StoreContext);

  const SLUG = "Fabrizzio";

  const BASE_URL =
    `https://playground.4geeks.com/contact/agendas/${SLUG}/contacts`;

  const getContacts = async () => {
    const resp = await fetch(BASE_URL);
    const data = await resp.json();

    dispatch({
      type: "set_contacts",
      payload: data.contacts || []
    });
  };

  const createContact = async (contact) => {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    await getContacts();
  };

  const updateContact = async (id, contact) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    await getContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    await getContacts();
  };

  return {
    store,
    actions: {
      getContacts,
      createContact,
      updateContact,
      deleteContact
    }
  };
}