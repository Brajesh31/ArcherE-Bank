import { useEffect, useRef, useState } from "react";
import styles from "../css/request.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";

function Request() {
    const [transferMethod, setTransferMethod] = useState("phone");
    const input = useRef<HTMLInputElement>(null)
    const amount_to_transfer = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (input.current) {
            input.current.focus();
            input.current.value = "";
        }
    }, [transferMethod]);

    const transfermoney = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        const request_from = input.current ? input.current.value : "";
        const amount = amount_to_transfer.current?.value;
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const userKeyCookie = cookies.find(cookie => cookie.startsWith('user_key='));
        if (userKeyCookie) {
            const random_key = decodeURIComponent(userKeyCookie.split('=')[1]);
            Swal.fire({
                title: 'Confirm Request',
                icon: 'question',
                html: `
                    <div class="swal2-html-container">
                        <span style="font-weight:600;color:#357abd;">Request To:</span> <span style="color:#222;">${request_from}</span><br/>
                        <span style="font-weight:600;color:#357abd;">Amount:</span> <span style="color:#222;">${amount}$</span>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Request',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    fetch('http://localhost:5555/request', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ random_key, request_from, amount }),
                        credentials: 'include'
                    })
                    .then(res => res.json())
                    .then(data => {
                        setIsLoading(false);
                        if(data.success === false){
                            Swal.fire({
                                title: 'Error',
                                icon: 'error',
                                text: data.message,
                                confirmButtonText: 'OK'
                            });
                        }else{
                            Swal.fire({
                                title: 'Success',
                                icon: 'success',
                                text: 'Request completed successfully!'
                            });
                            if (input.current) input.current.value = '';
                            if (amount_to_transfer.current) amount_to_transfer.current.value = '';
                        }
                    })
                    .catch(err => {
                        setIsLoading(false);
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            text: 'Request failed. Please try again.'
                        });
                    });
                }
            });
        }
    }

    return (
        <div className={styles.transfer}>
            <h1>Request</h1>
            <form className={styles.transferForm} onSubmit={transfermoney}> 
                <div className={styles.inputGroup}>
                    <label htmlFor="recipient">Request From</label>
                    {
                        transferMethod === "phone" ? (
                            <input type="tel" id="recipient" name="recipient" placeholder="Enter phone number" required maxLength={12} minLength={11} ref={input}/>
                        ) : (
                            <input 
                                type="tel" 
                                id="recipient" 
                                name="recipient" 
                                placeholder="Enter visa card number" 
                                required 
                                maxLength={19} 
                                minLength={13} 
                                ref={input}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\s/g, '');
                                    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                    e.target.value = formattedValue;
                                }}
                            />
                        )
                    }
                    <div className={styles.methodSelection}>
                        <input checked={transferMethod === "phone"} onChange={() => setTransferMethod("phone")} type="radio" name="transferMethod" id="phone-transfer" value="phone" />
                        <label htmlFor="phone-transfer">
                            <i className="fas fa-phone-alt"></i>
                            <span>Phone</span>
                        </label>
                        <input checked={transferMethod === "visa"} onChange={() => setTransferMethod("visa")} type="radio" name="transferMethod" id="visa-transfer" value="visa" />
                        <label htmlFor="visa-transfer">
                            <i className="fas fa-credit-card"></i>
                            <span>Visa Card</span>
                        </label>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Enter amount"
                        min="5"
                        required
                        ref={amount_to_transfer}
                    />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={isLoading}>{isLoading ? 'Processing...' : 'Send Request'}</button>
            </form>
        </div>
    );
}

export default Request;