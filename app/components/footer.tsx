'use client';
import styles from '../css/footer.module.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer(){
    return(
        <footer className={styles.footer} id="Contact">
          <div>
            <h4>Archer Bank</h4>
            <h4>The Future of Digital Banking</h4>
            
          </div>
          <div>
            <h5>Quick links</h5>
            <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#visa">Visa</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
          <div className={styles.socialIcons}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter" aria-label="Twitter"></i>
              </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook" aria-label="Facebook"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin" aria-label="LinkedIn"></i>
            </a>
        </div>
          </div>
        <div className={styles.inputsec}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit" className={styles.submitBtn}>Send</button>
        </div>
        <div className={styles.pcontener}>
          <p>2025 Archer Bank. All rights reserved</p>
        </div>
      </footer>
    )
}

export default Footer;