import subprocess
import time
import os
import sys

def run_backend():
    print("Starting Backend (FastAPI)...")
    return subprocess.Popen([sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"],
                            cwd=os.path.join(os.getcwd(), "backend"))

def run_frontend():
    print("Starting Frontend (Vite)...")
    # Using npm run dev for the frontend
    return subprocess.Popen(["npm", "run", "dev"], 
                            cwd=os.path.join(os.getcwd(), "frontend"), shell=True)

if __name__ == "__main__":
    backend_proc = None
    frontend_proc = None
    try:
        backend_proc = run_backend()
        time.sleep(2)  # Give backend a moment to start
        frontend_proc = run_frontend()
        
        print("\n" + "="*50)
        print("Heart Disease Prediction System is Running!")
        print("Backend mapping: http://localhost:8000")
        print("Frontend mapping: http://localhost:3000 (usually)")
        print("Check terminal for actual Vite port.")
        print("="*50 + "\n")
        
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping processes...")
        if backend_proc: backend_proc.terminate()
        if frontend_proc: frontend_proc.terminate()
        print("Cleanup complete.")
