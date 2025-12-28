def test_register(client):
    response = client.post('/api/auth/register', json={
        'name': 'Test User',
        'email': 'new@example.com',
        'password': 'password'
    })
    assert response.status_code == 201

def test_login(client):
    # Setup user
    client.post('/api/auth/register', json={
        'name': 'Test User',
        'email': 'login@example.com',
        'password': 'password'
    })
    
    response = client.post('/api/auth/login', json={
        'email': 'login@example.com',
        'password': 'password'
    })
    assert response.status_code == 200
    assert 'access_token' in response.json
