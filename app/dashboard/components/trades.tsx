import styles from '../css/trades.module.css'
import React from 'react';
//import '@fortawesome/fontawesome-free/css/all.min.css';

// Define Trade type based on expected backend data
// Should match the Trade type in BodyContent
interface Trade {
    id: string;
    amount: number;
    date: string;
    from_user?: string;
    to_user?: string;
    created_at?: string;
    // add more fields as needed
}

interface TradesProps {
    trades: Trade[];
    name?:string
}

function Trades({ trades , name}: TradesProps) {
    return (
        <div className={styles.trades}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {[...trades].reverse().map((trade, idx) => (
                        <tr key={trade.id ?? idx}>
                            <td>{trades.length - idx}</td>
                            <td>{trade.from_user ?? '-'}</td>
                            <td>{trade.to_user ?? '-'}</td>
                            <td>
                                {name === trade.from_user ? (
                                    <span style={{ 
                                        display: 'inline-block', 
                                        width: 0, 
                                        height: 0, 
                                        borderLeft: '8px solid transparent', 
                                        borderRight: '8px solid transparent', 
                                        borderBottom: '14px solid red', 
                                        verticalAlign: 'middle', 
                                        marginRight: '6px', 
                                        fontSize:'1.5rem',
                                    }}></span>
                                ) : (
                                    <span style={{ 
                                        display: 'inline-block', 
                                        width: 0, 
                                        height: 0, 
                                        borderLeft: '8px solid transparent', 
                                        borderRight: '8px solid transparent', 
                                        borderTop: '14px solid green', 
                                        verticalAlign: 'middle', 
                                        marginRight: '6px',
                                        fontSize:'1.5rem',
                                    }}></span>
                                )}
                                {trade.amount}$
                            </td>
                            <td>{trade.created_at ? trade.created_at.slice(0, 10) : trade.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Trades;