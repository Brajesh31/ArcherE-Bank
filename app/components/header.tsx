'use client';
import Image from "next/image";
import styles from "../css/header.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Header(){
  const router = useRouter();
  function createvisa(){
    router.push('./account/register');
  }
    return(
        <header className={styles.header + ' ' + styles.animatedFadeDownIn}>
        <nav className={styles.navbar}>
          <div>
            <Image src="/logo/AlbedoBase_XL_A_golden_stylized_eagle_with_outstretched_wings_2__1_-removebg-preview.png" alt="Archer Bank Logo" width={50} height={50}/>
            <span>Archer</span>
          </div>
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#visa">Visa</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Contact">Contact</a></li>
            <li><Link href="/account">Login</Link></li>
          </ul>
        </nav>
        <section className={styles.header_contener} id="Home">
          <div>
            <div className={styles.text_contener}>
              <h1>Welcome To <b>Archer Bank</b></h1>
              <h4>The Future of Digital Banking</h4>
            </div>

            <button onClick={() => { location.href = '#About'; }}>Explore more</button>
            <button onClick={createvisa}>Create Visa</button>
          </div>
        </section>
      </header>
    )
}

export default Header;