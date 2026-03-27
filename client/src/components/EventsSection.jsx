import { useEffect } from 'react';
import EventCard from './EventCard';

const SLIDE1_EVENTS = [
  {
    image: '/images/cddd.png',
    category: 'CODING',
    title: 'en-Code',
    rules: ['Language: C, C++ and Java', 'Systems will be provided', 'No internet access'],
    participants: '2',
    rounds: '4',
    contactEmail: 'adithyahebbar32@gmail.com,shashankdshetty17@gmail.com,prashanthm406@gmail.com,nithinjoy365@gmail.com',
    subject: 'Semaphore23 - Coding',
    cardClass: '',
  },
  {
    image: '/images/webd.jpeg',
    category: 'WEB DESIGN',
    title: 'Frosty Web',
    rules: [
      'Should get their own laptops',
      'Should be familiar with html, css and javascript',
      'Participants must be familiar with any designing tools such as figma etc',
    ],
    participants: '2',
    rounds: '2',
    contactEmail: 'donaldashwin@gmail.com,afifafarhath@gmail.com',
    subject: 'Semaphore23 - web design',
    cardClass: 'card2',
  },
  {
    image: '/images/man.jpg',
    category: 'IT MANAGER',
    title: 'FireIT',
    rules: [
      'Bring your laptop and internet service',
      'Offensive acts are prohibited',
      "Judges decision is final",
    ],
    participants: '1',
    participantLabel: 'Participant',
    rounds: '4',
    contactEmail: 'sairajshetty6112000@gmail.com,shrutipoojary2000@gmail.com',
    subject: 'Semaphore23 - IT Manager',
    cardClass: 'card3',
  },
];

const SLIDE2_EVENTS = [
  {
    image: '/images/techtalk.png',
    category: 'TECH TALK',
    title: 'Tech thunder',
    rules: [
      'No electronic gadgets are allowed',
      'Topics will be given 5 minutes prior to the event',
      'Usage of offensive and derogatory words or violation of any rules will lead to disqualification',
    ],
    participants: '1',
    participantLabel: 'Participant',
    rounds: '3',
    contactEmail: 'kumarvimanshu101@gmail.com',
    subject: 'Semaphore23 - Tech Talk',
    cardClass: '',
  },
  {
    image: '/images/treasure.png',
    category: 'TREASURE HUNT',
    title: 'Jumanji',
    rules: [
      'Contests should have good knowledge of computer and software',
      'Skipping any clues will lead to disqualification',
      "Tampering with any other participants' clues will lead to disqualification",
    ],
    participants: '1',
    participantLabel: 'Participant',
    rounds: '-',
    contactEmail: 'nish6066@protonmail.com,cswathikamath@gmail.com',
    subject: 'Semaphore23 - Treasure Hunt',
    cardClass: 'card2',
  },
  {
    image: '/images/quiz.png',
    category: 'QUIZ',
    title: 'Quizsplash',
    rules: [
      'Questions will be based on general knowledge, technical and programming',
      "Quiz master's decision is final",
    ],
    participants: '2',
    rounds: '3',
    contactEmail: 'ashtoncastalino16@gmail.com,meghabhat8431@gmail.com',
    subject: 'Semaphore23 - Quiz',
    cardClass: 'card3',
  },
];

const SLIDE3_EVENTS = [
  {
    image: '/images/meme.png',
    category: 'MEME MAKING',
    title: 'MemeSpring',
    rules: ['Memes as an image\u00a0 Timings given - 1hour', 'Memes as video\u00a0 Timings given - 2hour'],
    participants: '1',
    rounds: '2',
    contactEmail: 'soujanyashetty265@gmail.com,varunpuj2000@gmail.com',
    subject: 'Semaphore23 - Meme Making',
    cardClass: '',
  },
  {
    image: '/images/ice.png',
    category: 'ICE BREAKER',
    title: 'Ice Breaker',
    rules: [
      'Participants can represent any theme as per their wish',
      'Participants who have participated in other events are only allowed',
      'Each team will get 4+1 minutes',
    ],
    participants: '8 - 11',
    rounds: '1',
    roundLabel: 'Round',
    contactEmail: 'kripabacharya@gmail.com,prameetha861@gmail.com',
    subject: 'Semaphore23 - Ice Breaker',
    cardClass: 'card2',
  },
  {
    image: '/images/photog.png',
    category: 'PHOTOGRAPHY',
    title: 'SnapAtoms',
    rules: [
      'Only Camera and mobile phone Allowed',
      'Mere Editing of photos allowed',
      'Google Images not allowed',
      'Carry your own laptops to the venue',
    ],
    participants: '1',
    participantLabel: 'Participant',
    rounds: '3',
    contactEmail: 'ajaynayak7457@gmail.com,shettytanvi12@gmail.com',
    subject: 'Semaphore23 - Photography',
    cardClass: 'card3',
  },
];

function EventsSection() {
  useEffect(() => {
    // Initialize VanillaTilt on all event cards
    if (window.VanillaTilt) {
      window.VanillaTilt.init(document.querySelectorAll('.card'), {
        glare: true,
        gyroscope: true,
        gyroscopeSamples: 100,
        reverse: true,
        'max-glare': 0.5,
      });
    }
  }, []);

  return (
    <div className="section" id="section2">
      <style>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          overflow: hidden;
        }
        .js-tilt-glare { border-radius: 18px; }
      `}</style>


      <iframe
        src="/rain/rain.html"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ zIndex: 3, position: 'absolute', top: 0, left: 0 }}
        onLoad={(e) => { e.target.style.visibility = 'visible'; }}
      />

      {/* Slide 1 */}
      <div className="slide" style={{ overflow: 'hidden' }}>
        <div className="container">
          {SLIDE1_EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>

      {/* Slide 2 */}
      <div className="slide">
        <div className="container">
          {SLIDE2_EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>

      {/* Slide 3 */}
      <div className="slide">
        <div className="container">
          {SLIDE3_EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
