import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ tname: '', email: '', phno: '' });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert('Please upload a payment screenshot'); return; }
    setSubmitting(true);

    const formData = new FormData();
    formData.append('tname', form.tname);
    formData.append('email', form.email);
    formData.append('phno', form.phno);
    formData.append('image', file);

    try {
      const res = await fetch('/payment', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        alert('Registration successful! Check your Mail for more info.');
        navigate('/');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch {
      alert('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --form-height: 550px;
          --form-width: 900px;
          --left-color: #000;
          --right-color: #000;
        }
        body, html {
          width: 100vw;
          height: 100vh;
          margin: 0;
          font-family: "Helvetica Neue", sans-serif;
          letter-spacing: 0.5px;
        }
        .pay-container {
          width: var(--form-width);
          height: var(--form-height);
          position: relative;
          margin: auto;
          box-shadow: 2px 10px 40px rgba(22,20,19,0.4);
          border-radius: 10px;
          margin-top: 50px;
        }
        .pay-overlay {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 100;
          background-image: linear-gradient(to right, var(--left-color), var(--right-color));
          border-radius: 10px;
          color: white;
          clip: rect(0, 385px, var(--form-height), 0);
        }
        .pay-form-wrap {
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 10px;
        }
        .pay-form-inner {
          --padding: 50px;
          position: absolute;
          width: calc(var(--form-width) - 385px - var(--padding) * 2);
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 0px var(--padding);
          text-align: center;
          right: 0;
        }
        .pay-form-inner h1 { color: var(--left-color); margin: 0; }
        #sign-up-form input {
          margin: 12px;
          font-size: 14px;
          padding: 15px;
          width: 260px;
          font-weight: 300;
          border: none;
          background-color: #e4e4e494;
          font-family: "Helvetica Neue", sans-serif;
          letter-spacing: 1.5px;
          padding-left: 20px;
        }
        .control-button {
          cursor: pointer;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 140px;
          height: 40px;
          font-size: 14px;
          text-transform: uppercase;
          background: none;
          border-radius: 20px;
          color: white;
          border: none;
          margin-top: 15px;
          background-color: var(--left-color);
        }
        @media only screen and (min-device-width: 320px) and (max-device-width: 800px) {
          .pay-container {
            margin-left: 0 !important;
            padding-left: 1%;
            height: 100vh;
            box-shadow: 0 0 0 #000;
          }
          .pay-form-inner {
            position: absolute;
            left: 0;
            top: 55vh;
            margin-left: -7.5%;
          }
        }
      `}</style>

      <div className="pay-container">
        <div className="pay-overlay">
          <img
            src="/payment/scanner.png"
            alt="QR Code"
            style={{ width: '250px', marginLeft: '70px', marginTop: '50px' }}
          />
          <p style={{ padding: '20px', textAlign: 'center', maxWidth: '320px', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
            Please Upload the Screenshot with UTR after Payment
          </p>
        </div>

        <div className="pay-form-wrap">
          <div className="pay-form-inner">
            <h1>Payment</h1>
            <h3>Please Enter Your Details</h3>
            <form id="sign-up-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="College Name"
                name="tname"
                value={form.tname}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phno"
                value={form.phno}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleFile}
                required
              />
              <button type="submit" className="control-button" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
