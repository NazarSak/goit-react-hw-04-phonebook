import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './form/Form';
import { Header } from './header/Header';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts') ?? [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const ID = nanoid();
    const string = contacts.filter(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    string.length !== 0
      ? hendleCoincidence(name)
      : setContacts(prevContacts => {
          return [...prevContacts, { id: ID, name, number }];
        });
  };

  const hendleCoincidence = name => {
    alert(`${name} is already in contacts`);
  };

  const ChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const hendeleClickDelete = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  const searchName = () => {
    const lowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCase)
    );
  };

  return (
    <>
      <Header title={'Phonebook'} />
      <Form onSubmit={handleSubmit} contacts={contacts} />
      <Header title={'Contacts'} />
      <Filter OnChangeFilter={ChangeFilter} valueFilter={filter} />
      {contacts.length > 0 && (
        <ContactList contacts={searchName()} remove={hendeleClickDelete} />
      )}
    </>
  );
}
