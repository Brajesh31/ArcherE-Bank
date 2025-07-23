'use client';
import { useState } from 'react';
import styles from '../css/formregister.module.css';
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';
import visa from '../css/visa.module.css';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function Formregister() {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        nationalID: '',
        phone_number: '',
        visa_type: ''
    });
    const router = useRouter();

    const images = [
        "/visa_card_temblete/archer.png",
    "/visa_card_temblete/archer x.png",
    "/visa_card_temblete/eagle.png",
    "/visa_card_temblete/eagle x.png",
    "/visa_card_temblete/eagle vip.png"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle input changes for controlled components
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Step 1: Name & Password
    const handleNextStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStep(2);
    };

    // Step 2: Email & Phone
    const handleNextStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStep(3);
    };

    // Final Submit
    const handleSubmitFinal = (e: React.FormEvent) => {
        e.preventDefault();

        // Use selected visa image for preview
        const selectedVisa = formData.visa_type || images[currentIndex];

        Swal.fire({
            title: 'Registration Info',
            icon: 'info',
            html: `
            <div class="${visa.swalInfo}">
                <div><strong>Name:</strong> ${formData.name}</div>
                <div><strong>National ID:</strong> ${formData.nationalID}</div>
                <div><strong>Phone:</strong> ${formData.phone_number}</div>
                <img class="${visa.swalVisaImg}" src="${selectedVisa}" alt="Visa" width="100"/>
            </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Confirm',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    const response = await fetch('http://localhost:5555/register' , {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)  
                    })
                }catch (error){
                    alert('An error occurred during login.');
                }
                // Registration logic here
                Swal.fire({
                    title: 'Registered!',
                    icon: 'success',
                    text: 'Your registration was successful.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push(`/account`);
                });
            }
        });
    };

    const handlePrev = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setFormData(prev => ({
            ...prev,
            visa_type: images[(currentIndex - 1 + images.length) % images.length]
        }));
    };

    const handleNext = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFormData(prev => ({
            ...prev,
            visa_type: images[(currentIndex + 1) % images.length]
        }));
    };

    const handleClick = (idx: number) => {
        setCurrentIndex(idx);
        setFormData(prev => ({
            ...prev,
            visa_type: images[idx]
        }));
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <p className={styles.description}>Create a new Visa</p>
            <form
                className={styles.form}
                onSubmit={
                    formStep === 1
                        ? handleNextStep1
                        : formStep === 2
                            ? handleNextStep2
                            : handleSubmitFinal
                }
            >
                {formStep === 1 && (
                    <>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit">
                            Next <i className="fas fa-arrow-right"></i>
                        </button>
                    </>
                )}
                {formStep === 2 && (
                    <>
                        <label htmlFor="nationalID">National ID:</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={14}
                            id="nationalID"
                            name="nationalID"
                            required
                            value={formData.nationalID}
                            onChange={e => {
                                // Only allow digits
                                const value = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({
                                    ...prev,
                                    nationalID: value
                                }));
                            }}
                        />
                        <label htmlFor="phone_number">Mobile Phone:</label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            maxLength={12}
                            minLength={11}
                            required
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                        <button type="submit">
                            Next <i className="fas fa-arrow-right"></i>
                        </button>
                    </>
                )}
                {formStep === 3 && (
                    <>
                        <div className={visa.visa_card}>
                            <div className={visa.visa_card_img}>
                                <button onClick={handlePrev} aria-label="Previous" type="button">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <Image
                                    className={visa.img}
                                    src={images[currentIndex]}
                                    alt="visa-card"
                                    width={300}
                                    height={200}
                                />
                                <button onClick={handleNext} aria-label="Next" type="button">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div className={styles.foundation}>
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleClick(idx)}
                                        className={`${styles.foundation_item} ${currentIndex === idx ? styles.active : ''}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <button type="submit">
                            Submit <i className="fas fa-check"></i>
                        </button>
                    </>
                )}
            </form>
        </section>
    );
}

export default Formregister;