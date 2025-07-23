import React, { useEffect, useRef } from "react";
import styles from '../css/visaart.module.css';

interface VisaartProps {
    data: {
        name?: string;
        visa_number?: string;
        visa_type?: string; // Path to image
        visa_expiry_date?: string;
        visa_cvv?: string;
        balance?: number;
        [key: string]: any;
    };
}

function Visaart({ data }: VisaartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);



    



    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Set canvas size
        const width = 600;
        const height = 300;
        canvas.width = width;
        canvas.height = height;
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        // Draw background image if available
        if (data.visa_type) {
            const img = new window.Image();
            img.src = data.visa_type;
            img.onload = () => {
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, width, height);
                drawCardDetails(data.visa_type);
            };
            img.onerror = () => {
                drawCardDetails(data.visa_type);
            };
        } else {
            // No image, just draw card details
            ctx.fillStyle = '#1a237e';
            ctx.fillRect(0, 0, width, height);
            drawCardDetails(data.visa_type);
        }




        function drawCardDetails(type : any) {
            if (!ctx) return;
            if(type == '/visa_card_temblete/archer.png'){
                // Name
                ctx.font = 'bold 25px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 300, 100);
                // Card Number
                ctx.font = 'bold 25px monospace';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left';
                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 300, 150);
                // CVV (right side)
                ctx.font = '17px sans-serif';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 300, 200);
                // Expiry
                ctx.font = '17px sans-serif';
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 450, 200);
            }else if(type == '/visa_card_temblete/archer x.png'){
                ctx.font = 'bold 25px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 350, 75);
                // Card Number
                ctx.font = 'bold 25px monospace';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left';
                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 315, 210);
                // CVV (right side)
                ctx.font = '17px sans-serif';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 315, 270);
                // Expiry
                ctx.font = '17px sans-serif';
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 470, 270);
            }else if(type == '/visa_card_temblete/eagle.png'){
                ctx.font = 'bold 25px sans-serif';
                ctx.fillStyle = '#000';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 30, 120);
                // Card Number
                ctx.font = 'bold 25px monospace';
                ctx.fillStyle = '#000';
                ctx.textAlign = 'left';
                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 30, 180);
                // CVV (right side)
                ctx.font = '17px sans-serif';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 30, 220);
                // Expiry
                ctx.font = '17px sans-serif';
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 190, 220);
            }else if(type == '/visa_card_temblete/eagle x.png'){
                ctx.font = 'bold 25px sans-serif';
                ctx.textAlign = 'center'
                ctx.fillStyle = '#fff';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 300, 220);
                // Card Number
                ctx.font = 'bold 28px monospace';
                ctx.fillStyle = '#fff';

                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 300, 260);
                // CVV (right side)
                ctx.font = '17px sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 30, 230);
                // Expiry
                ctx.font = '17px sans-serif';
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 480, 230);
            }
            else if(type == '/visa_card_temblete/eagle vip.png'){
                ctx.font = 'bold 25px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 25, 150);
                // Card Number
                ctx.font = 'bold 25px monospace';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left';
                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 25, 210);
                // CVV (right side)
                ctx.font = '17px sans-serif';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 25, 270);
                // Expiry
                ctx.font = '17px sans-serif';
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 190, 270);
            }else{
                ctx.font = 'bold 25px sans-serif';
                ctx.fillStyle = '#fff';
                ctx.fillText((data.name || 'CARD NAME').toUpperCase(), 300, 100);
                ctx.font = 'bold 25px monospace';
                ctx.fillText(data.visa_number || '•••• •••• •••• ••••', 300, 150);
                ctx.font = '17px sans-serif';
                ctx.fillText('CVV: ' + (data.visa_cvv || '•••'), 300, 200);
                ctx.fillText('EX: ' + (data.visa_expiry_date || 'MM/YY'), 450, 200);
            }

            
        }
    }, [data.visa_type, data.visa_number, data.name, data.visa_expiry_date, data.visa_cvv]);

    return (
        <div className={styles.img}>
            <canvas className={`${styles.img} ${styles.canvas}`} ref={canvasRef} width={300} height={180} />
        </div>
    );
}

export default Visaart;