import { useEffect } from 'react';

function HomeSection() {
  useEffect(() => {
    // Initialize FlipClock countdown timer
    const $ = window.$;
    const moment = window.moment;

    if (!$ || !moment || !$.fn.FlipClock) return;

    const currentDate = new Date();
    const targetDate = moment.tz('2023-01-05 09:00', 'Asia/Calcutta');
    const diff = targetDate / 1000 - currentDate.getTime() / 1000;

    let clock;
    if (diff <= 0) {
      clock = $('.clock').FlipClock(0, {
        clockFace: 'DailyCounter',
        countdown: true,
        autostart: false,
      });
    } else {
      clock = $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true,
        callbacks: {
          stop: function () {
            console.log('Timer has ended!');
          },
        },
      });

      const checktime = () => {
        const t = clock.getTime();
        if (t <= 0) clock.setTime(0);
        setTimeout(checktime, 1000);
      };
      setTimeout(checktime, 1000);
    }
  }, []);

  return (
    <div className="section" id="section0">
      <style>{`
        #myFrame {
          position: absolute;
          right: 0;
          bottom: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          background-position: center center;
          background-size: contain;
          object-fit: cover;
          z-index: 3;
        }
        .semaphore {
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-animation: reveal 3000ms ease-in-out forwards 200ms,
            glow 2500ms linear infinite 2000ms;
          animation: reveal 3000ms ease-in-out forwards 200ms,
            glow 2500ms linear infinite 2000ms;
        }
        @-webkit-keyframes glow {
          40% { text-shadow: 0 0 8px #fff; }
        }
        @keyframes glow {
          40% { text-shadow: 0 0 8px #fff; }
        }
        @font-face {
          font-family: "digital";
          src: url("/assets/DS-DIGIT.TTF");
        }
      `}</style>

      <iframe
        src="/snow-particles/index.html"
        id="myFrame"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={(e) => { e.target.style.visibility = 'visible'; }}
      />

      <div
        className="typewriter"
        style={{
          zIndex: 3,
          position: 'absolute',
          right: 0,
          paddingRight: '150px',
          top: '30%',
        }}
      >
        <div className="semaphore">
          <p style={{ fontSize: '100px', fontFamily: 'digital' }}>Semaphore</p>
        </div>
        <p className="text">Think before you trash it.</p>
      </div>

      <div
        className="clock"
        style={{
          zIndex: 25,
          position: 'absolute',
          display: 'flex',
          bottom: 0,
          left: '25%',
        }}
      />

      <div
        style={{
          zIndex: 30,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
        }}
      />
    </div>
  );
}

export default HomeSection;
