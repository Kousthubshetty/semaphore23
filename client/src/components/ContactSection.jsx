import { useState, useEffect } from 'react';

const CONTACTS = [
  { name: 'Dr.Surendra Shetty, HOD of MCA', phone: '9945547359' },
  { name: 'Dr.Spoorthi Shetty, Assistant Professor of MCA', phone: '9880890191' },
  { name: 'Joel, SAMCA President', phone: '9008775785' },
  { name: 'Shravya, SAMCA Secretary', phone: '8277503412' },
  { name: 'Sourav, SAMCA Technical coordinator', phone: '9686400179' },
];

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });

  // TextScramble effect for "Designed By" credit
  useEffect(() => {
    const el = document.querySelector('#designby');
    if (!el) return;

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const phrases = ['Designed By,', 'Kousthub PC Shetty'];
    let frameRequest;
    let frame = 0;
    let queue = [];
    let resolve;
    let counter = 0;

    function randomChar() {
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      el.innerHTML = output;
      if (complete === queue.length) {
        resolve();
      } else {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    }

    function setText(newText) {
      const oldText = el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((res) => { resolve = res; });
      queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(frameRequest);
      frame = 0;
      update();
      return promise;
    }

    let active = true;
    function next() {
      if (!active) return;
      setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
      });
      counter = (counter + 1) % phrases.length;
    }
    next();

    return () => { active = false; cancelAnimationFrame(frameRequest); };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(form);
      const res = await fetch('/contactus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await res.json();
      if (data.success) {
        alert('Message sent');
        setForm({ name: '', email: '', phone: '', msg: '' });
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className="section" id="section4">
      <iframe
        src="/rain/rain1.html"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        onLoad={(e) => { e.target.style.visibility = 'visible'; }}
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
          .social {
            margin: auto;
            padding: 0;
            width: 300px;
            display: flex;
          }
          .social li a {
            position: relative;
            width: 60px;
            height: 60px;
            display: block;
            text-align: center;
            margin: 0 10px;
            border-radius: 50%;
            padding: 6px;
            box-sizing: border-box;
            text-decoration: none;
            box-shadow: 0 10px 15px rgba(0,0,0,0.3);
            background: linear-gradient(0deg, #ddd, #fff);
            transition: 0.5s;
          }
          .social li a:hover { box-shadow: 0 2px 5px rgba(0,0,0,0.3); text-decoration: none; }
          .social li a .fab,
          .social li a .fa-solid {
            width: 100%;
            height: 100%;
            display: block;
            background: linear-gradient(0deg, #fff, #ddd);
            border-radius: 50%;
            line-height: calc(60px - 12px);
            font-size: 24px;
            color: #262626;
            transition: 0.5s;
          }
          .social li:nth-child(1) a:hover .fa-solid { color: #007bb6; }
          .social li:nth-child(2) a:hover .fab { color: #e4405f; }
          .maincus {
            position: absolute;
            left: 30px;
            color: #ccc;
            bottom: 0;
            z-index: 10;
            width: 45%;
            text-align: center;
            margin-bottom: 50px;
          }
          .mobile-contact {
            position: absolute;
            width: 50%;
            left: 45%;
            top: 20%;
          }
          .cus tr td:nth-child(1) { font-size: 18px; text-align: center; }
          .cus tr td:nth-child(2) a { font-size: 18px; color: #ccc; }
          .cus tr td:nth-child(2) a:hover { color: #fff; }
          .cus tr td:nth-child(2) { padding-left: 30px; }
          .cus { font-family: 'Poppins', sans-serif; }
          .text {
            font-weight: 100;
            font-size: 28px;
            color: #fafafa;
          }
          .dud { color: #757575; }
          .designbykous {
            position: absolute;
            bottom: 5px;
            right: 40px;
            display: flex;
            color: #fff;
            font-family: 'Roboto Mono', monospace;
            font-size: 20px;
          }
        `}</style>

        <div className="mobile-contact">
          <form
            lang="en"
            spellCheck="false"
            className="form"
            onSubmit={handleSubmit}
          >
            <legend className="legend" style={{ color: '#fff' }}>
              Leave a message
            </legend>
            <fieldset className="fieldset">
              <input
                type="text"
                id="msg-name"
                placeholder="Type your name"
                accessKey="n"
                minLength="2"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="msg-name" style={{ color: '#fff' }}>Name</label>
            </fieldset>
            <fieldset className="fieldset">
              <input
                type="email"
                id="msg-email"
                placeholder="name@domain.tld"
                accessKey="e"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="msg-email" style={{ color: '#fff' }}>E-Mail</label>
            </fieldset>
            <fieldset className="fieldset">
              <input
                type="tel"
                id="msg-phone"
                placeholder="+00 000 000 000"
                accessKey="t"
                minLength="13"
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="msg-phone" style={{ color: '#fff' }}>Phone number</label>
            </fieldset>
            <fieldset
              className="fieldset message"
              spellCheck="true"
              data-write="write"
              data-speak="speak"
              data-rec="record"
            >
              <textarea
                id="msg-text"
                placeholder="Type a message"
                accessKey="m"
                minLength="10"
                name="msg"
                value={form.msg}
                onChange={handleChange}
                required
              />
              <label htmlFor="msg-text" style={{ color: '#fff' }}>Message</label>
            </fieldset>
            <button type="reset" onClick={() => setForm({ name: '', email: '', phone: '', msg: '' })}>
              Reset
            </button>
            <button style={{ marginTop: '25px' }} type="submit">Send</button>
            <div className="verify">
              <input
                type="number"
                id="msg-verify"
                placeholder="2+7="
                max="99"
              />
              <label htmlFor="msg-verify">Verification question</label>
            </div>
          </form>

          <div style={{ marginTop: '30px', justifyContent: 'center', paddingRight: '20px', paddingLeft: '20px' }}>
            <ul className="social">
              <li>
                <a href="mailto:semaphore2023@gmail.com?subject=Semaphore23">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                </a>
              </li>
              <li style={{ marginLeft: '150px' }}>
                <a href="https://www.instagram.com/samca_nmamit.exe/">
                  <i className="fab fa-instagram" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="maincus">
          <i className="fa-solid fa-phone-volume" style={{ fontSize: '45px', marginBottom: '20px' }} /><br />
          <center>
            <table className="cus">
              {CONTACTS.map((c) => (
                <tr key={c.phone}>
                  <td>{c.name}</td>
                  <td><a href={`tel:${c.phone}`}>+91 {c.phone}</a></td>
                </tr>
              ))}
            </table>
          </center>
        </div>

        <div className="designbykous">
          <div id="designby" />
        </div>

        <div style={{ height: '20%', width: '100%' }} />
      </div>
    </div>
  );
}

export default ContactSection;
