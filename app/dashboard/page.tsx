"use client";
import Image from "next/image";
import styles from "./css/dashboard.module.css";
import BodyContent from "./components/content";
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';
import Visaart from "./components/visaart";
// Placeholder Trade type, adjust fields as needed
type Trade = {
    id: string;
    amount: number;
    date: string;
    to_user?: string;
    from_user?: string;
    created_at?: string;
    // add more fields as needed
};

function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<string | undefined>(undefined);
    const [userdata, setuserdata] = useState<any>({});
    const [trades, setTrades] = useState<Trade[]>([]);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [balance , setbalance] = useState(0);
    const [requestOrder, setrequestOrder] = useState<{
        amount?: number;
        from_name?: string;
        from_phone_number?: string;
        random_transfer_code?:string;
    }>({});
    const didMount = useRef(false);
    const [showRequestsToMe, setShowRequestsToMe] = useState(true);
    const [reject_request , setreject_request] = useState<{
        success?:boolean;
        name?:string;
    }>({
        success:false,
        name:''
    })


    useEffect(() => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const userKeyCookie = cookies.find(cookie => cookie.startsWith('user_key='));
        if (userKeyCookie) {
            setUser(decodeURIComponent(userKeyCookie.split('=')[1]));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'You cannot access here. You are not a user.'
            }).then(() => {
                router.replace('/account');
            });
        }
        setIsCheckingAuth(false);
    }, [router]);

    useEffect(() => {
        if (!user) return;
        // Connect with auth so server can identify this user for real-time updates
        const socket = io('http://localhost:5555', {
            auth: { code: user }
        });

        socket.on('trades_update', (data: { transfers: Trade[], balance: number }) => {
            setTrades(Array.isArray(data.transfers) ? data.transfers : []);
            setbalance(data.balance)
        });
        
        socket.on('request_notification', (data: { amount: number; from_name: string; from_phone_number: string ;random_transfer_code:string}) => {
          setrequestOrder({
            amount: data.amount,
            from_name: data.from_name,
            from_phone_number: data.from_phone_number,
            random_transfer_code: data.random_transfer_code
          });
        });

        socket.on('rejected_notification',(data:{success:boolean, name:string})=>{
            setreject_request({
                success:data.success,
                name:data.name
            })
        })

        // Request initial trades
        socket.emit('get_trades', { code: user });
        fetch('http://localhost:5555/get_my_data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ random_key:user}),
        }).then(res => res.json()).then(data => {
            if(data.success){
                setuserdata(data.data)
            }else{
                Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'You cannot access here. You are not a user.'
                }).then(() => {
                    router.replace('/account');
                });
            }
        })
        // Request notification permission on mount if not already granted or denied
        if (typeof window !== "undefined" && "Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission();
            }
        }
        // Clean up socket on unmount
        return () => {
            socket.disconnect();
        };
    }, [user, router]);


    useEffect(()=>{
        if(!reject_request.success) return;

        if (window.Notification && Notification.permission === "granted") {
            new Notification("Transfer rejected", {
                body: reject_request.name
                    ? `Your request was rejected by ${reject_request.name}`
                    : "Your transfer was rejected.",
                icon: "../favicon.ico"
            });
        } else if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Transfer rejected", {
                        body: reject_request.name
                            ? `Your request was rejected by ${reject_request.name}`
                            : "Your transfer was rejected.",
                        icon: "../favicon.ico"
                    });
                }
            });
        }
        Swal.fire({
            title: 'Transfer rejected',
            text: `Your transfer was rejected by ${reject_request.name}`,
            icon: 'info',
            confirmButtonText: 'OK'
        });
        // Optionally reset reject_request after showing notification
        // setreject_request({ success: false, name: '' });
    },[reject_request.success, reject_request.name])


    // Notification for new incoming transfer
    useEffect(() => {
        if (!userdata || !userdata.name || trades.length === 0) return;
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        const latestTrade = trades[trades.length - 1];
        if (latestTrade && latestTrade.to_user && latestTrade.to_user === userdata.name) {
            if (window.Notification && Notification.permission === "granted") {
                new Notification("New Transfer", {
                    body: "You have received a new transfer!",
                    icon: "../favicon.ico"
                });
            } else if (window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("New Transfer", {
                            body: "You have received a new transfer!",
                            icon: "../favicon.ico",
                        });
                    }
                });
            }
            Swal.fire({
                title: 'New Transfer',
                text: 'You have a new transfer or your balance has changed.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }
    }, [trades, userdata]);


    useEffect(() => {
        if (!requestOrder.amount || !requestOrder.from_name || !requestOrder.from_phone_number || !requestOrder.random_transfer_code) return;
        let isProcessing = false;
        const handleAction = async (action: 'accept' | 'reject') => {
            if (isProcessing) return;
            isProcessing = true;
            const endpoint = action === 'accept' ? 'accept_request' : 'reject_request';
            try {
                const res = await fetch(`http://localhost:5555/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        random_code: user,
                        random_transfer_code: requestOrder.random_transfer_code
                    })
                });
                const data = await res.json();
                if (data.success) {
                    Swal.fire({
                        title: action === 'accept' ? 'Accepted' : 'Rejected',
                        text: data.message || (action === 'accept' ? 'Request accepted successfully!' : 'Request rejected.'),
                        icon: action === 'accept' ? 'success' : 'info',
                        confirmButtonColor: action === 'accept' ? '#388e3c' : '#1976d2',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message || `Failed to ${action} the request.`,
                        icon: 'error',
                        confirmButtonColor: '#d32f2f',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: `Failed to ${action} the request.`,
                    icon: 'error',
                    confirmButtonColor: '#d32f2f',
                });
            } finally {
                isProcessing = false;
                setrequestOrder({}); // Reset after showing
            }
        };
        Swal.fire({
            title: '<span style="color:#1a237e;font-weight:bold;">New Payment Request</span>',
            icon: 'info',
            html: `
                <div style="text-align:left;font-size:1.1em;">
                    <b>Amount:</b> <span style="color:#388e3c;">${requestOrder.amount}$</span><br/>
                    <b>From:</b> <span style="color:#1976d2;">${requestOrder.from_name}</span><br/>
                    <b>Phone:</b> <span style="color:#616161;">${requestOrder.from_phone_number}</span>
                </div>
            `,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Reject',
            showCancelButton: true,
            customClass: {
                confirmButton: styles.swalAccept,
                cancelButton: styles.swalReject,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleAction('accept');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                await handleAction('reject');
            } else {
                setrequestOrder({});
            }
        });
    }, [requestOrder]);

    // Improved notification function
    const notification = async () => {
        try {
            const res = await fetch('http://localhost:5555/get_notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ random_key: user }),
            });
            const data = await res.json();
            if (data.success && data.message === 'No notifications found.') {
                Swal.fire({
                    title: 'Notification',
                    text: data.message,
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            } else if (data.success && data.message === 'notifications found') {
                let showRequestsToMe = true;
                const refreshNotifications = async () => {
                    await notification();
                };
                function buildHtmlContent() {
                    let htmlContent = '';
                    htmlContent += `<div class='${styles.toggleContainer}'>`;
                    htmlContent += `<button class='${styles.toggleButton} ${showRequestsToMe ? styles.active : ''}' id='showRequestsToMeBtn'>Requests To Me</button>`;
                    htmlContent += `<button class='${styles.toggleButton} ${!showRequestsToMe ? styles.active : ''}' id='showMyRequestsBtn'>My Requests</button>`;
                    htmlContent += `</div>`;
                    if (showRequestsToMe && data.request && data.request.length > 0) {
                        htmlContent += `<div id='requestsToMeList' style='text-align:left;'><b>Requests To Me:</b><ul style='padding-left:18px; list-style:none;'>`;
                        data.request.forEach((req: any, idx: number) => {
                            htmlContent += `<li style='margin-bottom:10px;'>
                                <span style='color:#357abd;'>From:</span> ${req.name} (${req.phone_number})<br/>
                                <span style='color:#357abd;'>Amount:</span> ${req.amount}$<br/>
                                <span style='color:#357abd;'>Status:</span> ${req.status}<br/>
                                <button class='${styles.toggleButton}' id='acceptBtn_${idx}'>Accept</button>
                                <button class='${styles.toggleButton}' id='rejectBtn_${idx}'>Reject</button>
                            </li>`;
                        });
                        htmlContent += `</ul></div>`;
                    }
                    if (!showRequestsToMe && data.my_request && data.my_request.length > 0) {
                        htmlContent += `<div id='myRequestsList' style='text-align:left;'><b>My Requests:</b><ul style='padding-left:18px; list-style:none;'>`;
                        data.my_request.forEach((req: any) => {
                            htmlContent += `<li style='margin-bottom:10px;'>
                                <span style='color:#357abd;'>To:</span> ${req.name} (${req.phone_number})<br/>
                                <span style='color:#357abd;'>Amount:</span> ${req.amount}$<br/>
                                <span style='color:#357abd;'>Status:</span> ${req.status}
                            </li>`;
                        });
                        htmlContent += `</ul></div>`;
                    }
                    return htmlContent;
                }
                async function showSwal() {
                    await Swal.fire({
                        title: 'Notifications',
                        html: buildHtmlContent(),
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonText: 'Close',
                        didOpen: () => {
                            const reqBtn = document.getElementById('showRequestsToMeBtn');
                            const myReqBtn = document.getElementById('showMyRequestsBtn');
                            if (reqBtn) reqBtn.onclick = () => { showRequestsToMe = true; showSwal(); };
                            if (myReqBtn) myReqBtn.onclick = () => { showRequestsToMe = false; showSwal(); };
                            if (showRequestsToMe && data.request && data.request.length > 0) {
                                data.request.forEach((req: any, idx: number) => {
                                    const acceptBtn = document.getElementById(`acceptBtn_${idx}`);
                                    const rejectBtn = document.getElementById(`rejectBtn_${idx}`);
                                    if (acceptBtn) acceptBtn.onclick = async () => {
                                        try {
                                            const res = await fetch('http://localhost:5555/accept_request', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    random_code: user,
                                                    random_transfer_code: req.random_transfer_code
                                                })
                                            });
                                            const result = await res.json();
                                            if (result.success) {
                                                Swal.fire('Accepted', result.message || 'Request accepted successfully!', 'success');
                                                await refreshNotifications();
                                            } else {
                                                Swal.fire('Error', result.message || 'Failed to accept the request.', 'error');
                                            }
                                        } catch (error) {
                                            Swal.fire('Error', 'Failed to accept the request.', 'error');
                                        }
                                    };
                                    if (rejectBtn) rejectBtn.onclick = async () => {
                                        try {
                                            const res = await fetch('http://localhost:5555/reject_request', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    random_code: user,
                                                    random_transfer_code: req.random_transfer_code
                                                })
                                            });
                                            const result = await res.json();
                                            if (result.success) {
                                                Swal.fire('Rejected', result.message || 'Request rejected.', 'info');
                                                await refreshNotifications();
                                            } else {
                                                Swal.fire('Error', result.message || 'Failed to reject the request.', 'error');
                                            }
                                        } catch (error) {
                                            Swal.fire('Error', 'Failed to reject the request.', 'error');
                                        }
                                    };
                                });
                            }
                        }
                    });
                }
                showSwal();
            } else {
                Swal.fire({
                    title: 'Notifications',
                    text: 'No notifications found.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch notifications.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    // Optionally, show nothing or a loader while checking auth
    if (isCheckingAuth) return null;

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.ring}><i className="fas fa-bell" onClick={notification}></i></div>
            
            <div className={styles.cardWrapper}>
                
                <Visaart data={userdata}/>
                
            </div>
            <div className={styles.foundation}>
                <span>{balance}$</span>
            </div>
            <div className={styles.bodyContentWrapper}>
                <BodyContent trades={trades} name={userdata.name} />
            </div>
        </main>
    );
}

export default Dashboard;