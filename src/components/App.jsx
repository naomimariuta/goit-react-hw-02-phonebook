import React, {Component} from "react";
import styles from './App.module.css';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import {nanoid} from 'nanoid';

class App extends Component {
    state = {
      contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    {id: 'id-5', name: 'Naomi Mariuta', number: '+40 745 224 391'},
  ],
  name: '',
  number: '',
  filter: ''
}

handleAdd = (name, number) => {
  if(name.trim() !=='' && number.trim()!==''){
    const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        contacts:[...prevState.contacts, newContact],
      }));
  }
};

handleFilter = event =>{
  const {name, value} = event.target;
  this.setState({
    [name]:value,
  }); 
};

handleDelete = contactId => {
  this.setState(prevState => ({
    contacts:prevState.contacts.filter(contact=>contact.id!==contactId),
  }));
}

render() {
  const {contacts, filter}=this.state;

  const filteredContacts = contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={styles.container}>
      <h1>PhoneBook</h1>
      <ContactForm onAdd={this.handleAdd} contacts={this.state.contacts}/>
      <h2>Contacts:</h2>
      <Filter filter={filter} onFilterChange={this.handleFilter} />
      <ContactList contacts={filteredContacts} onDeleteContact={this.handleDelete} className={styles.list}/>
    </div>
  );
}
};

export default App;
