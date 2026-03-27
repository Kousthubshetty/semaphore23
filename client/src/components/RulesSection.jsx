import { useEffect } from 'react';

const RULES_TEXT =
  'Semaphore-2023 is an event open to all MCA/MSc/MTech students.' +
  'Registration fee is ₹1,200  per team.' +
  'The number of participants from each college is limited to 11 members.' +
  'Teams have to register online through our website on or before 1st January 2023.' +
  'Participating teams must report at the registration desk by 9am on 5th January 2023 with college ID as identity proof.' +
  'Teams arriving with all their team members before 8:45 am for registration will be awarded with bonus point.' +
  'Participants must adhere to the rules and regulations of the event and judge\'s decision is final.' +
  'Apart from Ice breaker event, each team member can participate in only one event.' +
  'Criteria for overall championship include participation in maximum number of events as well as  the total scores obtained in the competition.';

function RulesSection() {
  useEffect(() => {
    const checkIcon = "<i class='fa-solid fa-circle-check' style='color:white;margin-right:5px;'></i>";
    let textdata = checkIcon;

    for (let i = 1; i <= RULES_TEXT.length; i++) {
      const char = RULES_TEXT[i - 1];
      if (char === ' ') {
        textdata += `<span style='--i: ${i};width:6px'> </span>`;
      } else if (char === '.') {
        textdata += `<span style='--i: ${i};width:6px'>.</span><br>${checkIcon}`;
      } else {
        textdata += `<span style='--i: ${i}'>${char}</span>`;
      }
    }

    const el = document.getElementById('waterstyle');
    if (el) el.innerHTML = textdata;
  }, []);

  return (
    <div className="section" id="section1">
      <iframe
        src="/registration/daynight.html"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ zIndex: 3, position: 'absolute', top: 0, left: 0 }}
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
          .waviy {
            position: relative;
            text-align: left;
            width: 80%;
            font-family: 'poppins';
            margin-left: 10%;
          }
          .waviy span {
            position: relative;
            display: inline-block;
            font-size: 25px;
            color: #fff;
            animation: flip 15s infinite;
            animation-delay: calc(0.2s * var(--i));
          }
          @keyframes flip {
            0%, 80% { transform: rotateY(360deg); }
          }
          .rulehead {
            font-size: 50px;
            color: #fff;
            margin-top: 6%;
            margin-bottom: 2%;
            font-family: 'poppins';
          }
          .stat a { color: #fff; }
          .stat a:hover { scale: 1.2; }
          .card-text i {
            margin-left: -15px;
            margin-right: 5px;
            color: red;
          }
          .card-text { margin-top: 20px !important; }
        `}</style>

        <p className="rulehead">GENERAL RULES</p>
        <div className="waviy" id="waterstyle" />
      </div>
    </div>
  );
}

export default RulesSection;
