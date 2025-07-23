'use client';
import Link from 'next/link';
import styles from '../css/loginform.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
function Login() {
    const [nunationalID, setNunationalID] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Basic validation
        if (!nunationalID.trim() || !password.trim()) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Please fill in all fields',
                icon: 'warning',
                confirmButtonColor: '#007bff'
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nunationalID, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Swal.fire({
                    title: 'Welcome back!',
                    text: 'Login successful',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#f8f9fa',
                    color: '#333'
                });
                setTimeout(() => {
                    router.push("/dashboard")
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: data.message || 'Invalid credentials. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#007bff'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Connection Error',
                text: 'Unable to connect to server. Please check your connection.',
                icon: 'error',
                confirmButtonColor: '#007bff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <h2>Sign in to your account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="number">National ID:</label>
                <input
                    type="tel"
                    id="number"
                    name="number"
                    required
                    value={nunationalID}
                    onChange={e => setNunationalID(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className={styles.links}>
                    <p>
                        Don't have an account? <Link href="/account/register">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;