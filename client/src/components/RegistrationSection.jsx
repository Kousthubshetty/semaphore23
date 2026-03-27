import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cname: '',
    stream: '',
    tname: '',
    email: '',
    phno: '',
  });
  const [submitPos, setSubmitPos] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMouseOver = () => {
    const { cname, stream, tname, email, phno } = form;
    if (!cname || !stream || !tname || !email || !phno) {
      if (window.anime) {
        if (submitPos === 0 || submitPos === -1) {
          window.anime({ targets: '#submit', translateX: 300 });
          setSubmitPos(1);
        } else {
          window.anime({ targets: '#submit', translateX: -300 });
          setSubmitPos(-1);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phno.length !== 10) {
      alert('Phone number not valid.');
      return;
    }

    try {
      const params = new URLSearchParams(form);
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const data = await res.json();
      if (data.success) {
        navigate('/payment');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className="section" id="section3">
      <iframe
        src="/registration/sky1.html"
        frameBorder="0"
        width="100vh"
        height="100vh"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
      >
        <style>{`
          .cloud {
            position: relative;
            text-align: center;
            color: black;
          }
          #reg-cloud {
            position: absolute;
            top: 60%;
            left: 50%;
            vertical-align: middle;
            transform: translate(-50%, -50%);
            font-size: 25px;
            font-family: 'cloud';
          }
          @font-face {
            font-family: 'cloud';
            src: url('/assets/Alphasmoke-OOX6.ttf');
          }
          .reginput {
            border-radius: 15px 50px 30px;
            border: 2px solid #000;
            padding: 20px;
            width: 30%;
            height: 15px;
            margin-top: 10px;
          }
          .reginput::placeholder {
            color: #8f8fa1;
            opacity: 1;
            font-size: 18px;
          }
        `}</style>

        <div style={{ height: '15%', width: '100%' }} />

        <form onSubmit={handleSubmit}>
          <input
            className="reginput"
            placeholder="College Name"
            type="text"
            name="cname"
            id="name"
            value={form.cname}
            onChange={handleChange}
            required
          /><br />
          <input
            className="reginput"
            type="text"
            placeholder="Stream"
            name="stream"
            id="pass"
            value={form.stream}
            onChange={handleChange}
            required
          /><br />
          <input
            className="reginput"
            type="text"
            placeholder="College Address"
            name="tname"
            id="mail"
            value={form.tname}
            onChange={handleChange}
            required
          /><br />
          <input
            className="reginput"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          /><br />
          <input
            className="reginput"
            type="number"
            placeholder="Phone Number"
            maxLength="10"
            minLength="5"
            name="phno"
            id="ph"
            value={form.phno}
            onChange={handleChange}
            required
          /><br />
          <input
            type="submit"
            value="submit"
            id="reg"
            name="reg"
            style={{ visibility: 'hidden' }}
          />
        </form>

        <div style={{ height: '40px', width: '100%' }} />

        <div className="cloud" id="submit">
          <div
            id="reg-cloud"
            onClick={() => document.getElementById('reg').click()}
          >
            Register
          </div>
          <img
            src="/images/cloud1.png"
            alt="submit"
            style={{ width: '30%' }}
            onMouseOver={handleMouseOver}
            onClick={() => document.getElementById('reg').click()}
          />
        </div>
      </div>
    </div>
  );
}

export default RegistrationSection;
