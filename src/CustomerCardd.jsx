import React, { useState } from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';

const CardGallery = ({ datacust }) => {
  const [cardsToShow, setCardsToShow] = useState(3);

  const handleShowMore = () => {
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };

  const handleShowLess = () => {
    setCardsToShow(3);
  };

  return (
    <div className='card-gallery'>
      <h3 className='featuredcust'>Featured Customers</h3>
      <Card.Group itemsPerRow={3} className="card-gallery">
        {datacust.slice(0, cardsToShow).map((item, index) => (
          <Card key={index} className="gallery-card">
            <Image src={item.imageUrl} className="gallery-image" wrapped ui={false} />
            <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Description>{item.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Rating icon='star' rating={item.rating} maxRating={5} disabled />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      {cardsToShow < datacust.length ? (
        <div className="show-more-button">
          <Button onClick={handleShowMore}>See all customers</Button>
        </div>
      ) : (
        <div className="show-more-button">
          <Button onClick={handleShowLess}>Show Less</Button>
        </div>
      )}
    </div>
  );
};

export default CardGallery;
