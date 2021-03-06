import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import withRouter from '../utils/withRouter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContact, updateContact } from '../../actions/contactActions'


class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }
    
    UNSAFE_componentWillReceiveProps(nextProps, nextState){
      const { name, email, phone } = nextProps.contact;
      this.setState({
        name,
        email,
        phone
      })
    }

    componentDidMount() {
      const id = this.props.params.id;
      this.props.getContact(id);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        if(name === ''){
          this.setState({errors: {name: 'Name is required'}});
          return;
        }

        if(email === ''){
          this.setState({errors: {email: 'Email is required'}});
          return;
        }

        if(phone === ''){
          this.setState({errors: {phone: 'Phone is required'}});
          return;
        }

        const id = this.props.params.id;

        const updContact = {
            name,
            email,
            phone
        }

        //// UPDATE CONTACT ////
        this.props.updateContact(id, updContact);
        
        // Clear State
        this.setState({
          name: '',
          email: '',
          phone: '',
          erros: {}
        });

        this.props.navigate('/');
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    
    
  render() {
    const { name, email, phone, errors } = this.state;

    return (
          <div className="card mb-3">
          <div className="card-header">Edit Contact</div>
          <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <input 
                  type="submit" 
                  value="Update Contact" 
                  className="btn btn-dark btn-block"
                />
              </form>
          </div>
        </div>
      );
    }
  }

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(mapStateToProps, 
  { getContact, updateContact })
  (withRouter(EditContact));