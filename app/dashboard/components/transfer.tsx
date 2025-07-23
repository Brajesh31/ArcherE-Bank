import { useEffect, useRef, useState } from "react";
import styles from "../css/transfer.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";

function Transfer() {
    const [transferMethod, setTransferMethod] = useState("phone");
    const input = useRef<HTMLInputElement>(null)
    const amount_to_transfer = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (input.current) {
            input.current.focus();
            input.current.value = "";
        }
    }, [transferMethod]);

    const transfermoney = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        const transfer_to = input.current ? input.current.value : "";
        const amount = amount_to_transfer.current?.value;
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const userKeyCookie = cookies.find(cookie => cookie.startsWith('user_key='));
        if (userKeyCookie) {
            const random_key = decodeURIComponent(userKeyCookie.split('=')[1]);
            Swal.fire({
                title: 'Confirm Transfer',
                icon: 'question',
                html: `
                    <div class="swal2-html-container">
                        <span style="font-weight:600;color:#357abd;">Transfer To:</span> <span style="color:#222;">${transfer_to}</span><br/>
                        <span style="font-weight:600;color:#357abd;">Amount:</span> <span style="color:#222;">${amount}$</span>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Transfer',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (input.current) input.current.value = '';
                    if (amount_to_transfer.current) amount_to_transfer.current.value = '';

                    fetch('http://localhost:5555/transfer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ random_key, transfer_to, amount }),
                        credentials: 'include'
                    })
                    .then(res => res.json())
                    .then(data => {
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
                                text: 'Transfer completed successfully!'
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            text: 'Transfer failed. Please try again.'
                        });
                    });
                    
                }
            });
        }
    }

    return (
        <div className={styles.transfer}>
            <h1>Transfer</h1>
            <form className={styles.transferForm} onSubmit={transfermoney}> 
                <div className={styles.inputGroup}>
                    <label htmlFor="recipient">Recipient</label>
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
                <button type="submit" className={styles.submitBtn}>Transfer</button>
            </form>
        </div>
    );
}

export default Transfer;