from flask import url_for, render_template, request, jsonify
from . import main
from uuid import uuid4


contacts: list = [
    {
        'id': str(uuid4()),
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'phone': '222-222-22'
    },
    {
        'id': str(uuid4()),
        'name': 'Jane Doe',
        'email': 'janedoe@gmail.com',
        'phone': '111-111-11'
    },
    {
        'id': str(uuid4()),
        'name': 'Janet Doe',
        'email': 'janetdoe@gmail.com',
        'phone': '333-333-33'
    }
]



@main.route('/')
def index():
    return render_template('frontend/index.html')


@main.route('/users')
def users():
    return jsonify(contacts[: :-1])


@main.route('/users', methods=['POST'])
def add_user():
    data = request.get_json() or {}
    data['id'] = str(uuid4())
    contacts.append(data)
    response = jsonify(data)
    response.status_code = 201
    response.headers['Location'] = url_for('.get_user', id=data.get('id'))
    return response


@main.route('/users/<id>')
def get_user(id: str):
    for contact in contacts:
        if contact['id'] == id:
            return jsonify(contact)
    return {'message': f'contact with {id} does not exist'}


@main.route('/users/<id>', methods=['PUT'])
def update(id: str):
    data = request.get_json() or {}
    for contact in contacts:
        if contact['id'] == id:
            contact['name'] = data.get('name')
            contact['email'] = data.get('email')
            contact['phone'] = data.get('phone')
            response = jsonify(contact)
            response.status_code = 201
            response.headers['Location'] = url_for('.get_user', id=id)
            return response
    return {'message': f'contact with {id} does not exist'}


@main.route('/users/<id>', methods=["DELETE"])
def delete_contact(id: str):
    for contact in contacts:
        if contact['id'] == id:
            contacts.remove(contact)
    return {'message': f'contact with {id} deleted'}
