import React, {Component} from "react";
import PropTypes from 'prop-types';
import Button from "components/Button";
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  handleNameChange = event => {
    const newName = event.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    this.setState({name:newName});
  }

  handleNumberChange = event => {
    const newNumber = event.target.value.replace(
      /[^+\d\s()-]|^[\s()-]+|(?<=\d)[+]|\b[+]\b/g,
      ''
    );
    this.setState({number:newNumber});
  }

  handleAdd = () => {
    const {name, number} = this.state;
    const {onAdd, contacts} = this.props;

    const nameExists = contacts.some(contact => contact.name.toLowerCase() === name.toLocaleLowerCase());
    const numberExists = contacts.some(contact => contact.number === number);

    if(nameExists){
      alert(`${name} already in contacts list!`);
    }else if(numberExists){
      alert(`${number} already in contacts list!`);
    }else if(name.trim() !== '' && number.trim() !==''){
      onAdd(name,number);
      this.setState({name:'',number:'',});
    }
  };

  render() {
    const {name, number} = this.state;

    return (
      <form className={styles.container}>
        <label className={styles.label}>
          Name:
          <input type="text" 
          name="name" 
          className={styles.input} 
          placeholder="Full Name:" 
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleNameChange}/>
        </label>

        <label className={styles.label}>
          Number:
          <input
            className={styles.input}
            type="tel"
            name="number"
            placeholder="Phone:"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>

        <Button type="button" action={this.handleAdd}>
          Add contact
        </Button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default ContactForm;