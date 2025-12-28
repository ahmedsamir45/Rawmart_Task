def test_create_task(client, auth_header):
    response = client.post('/api/tasks/', json={
        'title': 'New Task'
    }, headers=auth_header)
    assert response.status_code == 201
    assert response.json['title'] == 'New Task'

def test_get_tasks(client, auth_header):
    client.post('/api/tasks/', json={'title': 'Task 1'}, headers=auth_header)
    response = client.get('/api/tasks/', headers=auth_header)
    assert response.status_code == 200
    assert len(response.json['tasks']) >= 1

def test_pagination(client, auth_header):
    for i in range(15):
        client.post('/api/tasks/', json={'title': f'Task {i}'}, headers=auth_header)
        
    response = client.get('/api/tasks/?page=1&per_page=10', headers=auth_header)
    assert len(response.json['tasks']) == 10
    assert response.json['total'] >= 15
    assert response.json['pages'] >= 2
