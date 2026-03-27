function EventCard({ image, category, title, rules, participants, participantLabel, rounds, roundLabel, contactEmail, subject, cardClass }) {
  return (
    <div className="card">
      <div className="card-image" style={{ display: 'flex' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
          }}
        />
      </div>
      <div className={`card-text${cardClass ? ' ' + cardClass : ''}`}>
        <span className="date">{category}</span>
        <h2>{title}</h2>
        <p>
          <ul>
            {rules.map((rule, i) => (
              <li key={i}>
                <i className="fa-solid fa-scale-balanced" />
                {rule}
              </li>
            ))}
          </ul>
        </p>
      </div>
      <div className={`card-stats${cardClass ? ' ' + cardClass : ''}`}>
        <div className="stat">
          <div className="value">{participants}</div>
          <div className="type">{participantLabel || 'Participants'}</div>
        </div>
        <div className="stat border">
          <div className="value">{rounds}</div>
          <div className="type">{roundLabel || 'Rounds'}</div>
        </div>
        <div className="stat">
          <a href={`mailto:${contactEmail}?subject=${subject}`}>
            <div className="value">
              <i className="fa-solid fa-envelope" />
            </div>
            <div className="type">contact</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
