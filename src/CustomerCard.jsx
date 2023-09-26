import React, { useState } from 'react';  // <-- import useState
import { Card, Image, Rating } from 'semantic-ui-react';

const CustomerCard = ({ name, description, imageUrl, rating, experienced }) => {
  const [expanded, setExpanded] = useState(false);  // <-- state to track card expansion

  // Function to shorten description to 7 words
  const shortenDescription = (desc) => {
    return desc.split(" ").slice(0, 7).join(" ") + "...";
  };

  return (
    
    <Card onClick={() => setExpanded(!expanded)}>
      <Card.Content className="profile-content">
        <Image src={imageUrl} className="card-image" alt={`${name} profile`} />
        <Card.Header className="card-name">{name}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {expanded ? description : shortenDescription(description)}
        </Card.Description>
        {expanded && <div>{experienced}</div>}
      </Card.Content>
      <Card.Content extra>
        <Rating icon='star' defaultRating={rating} maxRating={5} />
      </Card.Content>
    </Card>
  );
};

export default CustomerCard;
