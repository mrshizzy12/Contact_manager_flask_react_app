import axios from 'axios';
import { GET_CONTACTS, DELETE_CONTACT,
     ADD_CONTACT, GET_CONTACT, UPDATE_CONTACT} from './types';
import { createMessage } from './messages';
import regeneratorRuntime from 'regenerator-runtime';

//Get contacts
export const getContacts = () => async dispatch => {
    const res = await axios.get("http://127.0.0.1:5000/users");
    dispatch({
        type: GET_CONTACTS,
        payload: res.data
    });
};

export const addContact = (contact) => async dispatch => {
    const res = await axios.post(
        "http://127.0.0.1:5000/users", contact);
    dispatch(createMessage({ addContact: 'Contact Added' }));
    dispatch({
        type: ADD_CONTACT,
        payload: res.data
    });
};

export const getContact = (id) => async dispatch => {
    const res = await axios.get(
        `http://127.0.0.1:5000/users/${id}`);
    dispatch({
        type: GET_CONTACT,
        payload: res.data
    });
};

export const updateContact = (id, contact) => async dispatch => {
    const res = await axios.put(
        `http://127.0.0.1:5000/users/${id}`, contact);
    dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
    });
};

export const deleteContact = (id) => async dispatch => {
    try {
        await axios.delete(`http://127.0.0.1:5000/users/${id}`);
        dispatch(createMessage({ deleteContact: 'Contact Deleted' }));
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    } catch (err) {
        console.log(err);
    }   
};
