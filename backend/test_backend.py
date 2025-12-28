import requests
import sys

BASE_URL = "http://localhost:5000/api"

def test_backend():
    print("Testing Backend...")
    
    # 1. Register
    email = "test@example.com"
    password = "password123"
    try:
        register_res = requests.post(f"{BASE_URL}/auth/register", json={
            "name": "Test User",
            "email": email,
            "password": password
        })
        print(f"Register: {register_res.status_code}")
    except Exception as e:
        print(f"Register failed: {e}")
        return

    # 2. Login
    try:
        login_res = requests.post(f"{BASE_URL}/auth/login", json={
            "email": email,
            "password": password
        })
        print(f"Login: {login_res.status_code}")
        if login_res.status_code != 200:
            print("Login failed")
            return
        
        token = login_res.json()['access_token']
        headers = {"Authorization": f"Bearer {token}"}
    except Exception as e:
        print(f"Login request failed: {e}")
        return

    # 3. Create Task
    try:
        task_res = requests.post(f"{BASE_URL}/tasks/", json={"title": "Test Task"}, headers=headers)
        print(f"Create Task: {task_res.status_code}")
        task_id = task_res.json()['id']
    except Exception as e:
        print(f"Create Task failed: {e}")
        return

    # 4. List Tasks
    try:
        list_res = requests.get(f"{BASE_URL}/tasks/", headers=headers)
        print(f"List Tasks: {list_res.status_code}")
        tasks = list_res.json()
        print(f"Tasks found: {len(tasks)}")
    except Exception as e:
        print(f"List Tasks failed: {e}")
        return

    # 5. Delete Task
    try:
        del_res = requests.delete(f"{BASE_URL}/tasks/{task_id}", headers=headers)
        print(f"Delete Task: {del_res.status_code}")
    except Exception as e:
        print(f"Delete Task failed: {e}")
        return

    print("Backend Verified Successfully!")

if __name__ == "__main__":
    test_backend()
