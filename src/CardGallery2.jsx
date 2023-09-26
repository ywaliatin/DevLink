import React, { useState } from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';

const CardGallery2 = ({ data }) => {
  const [cardsToShow, setCardsToShow] = useState(3);

  const handleShowMore = () => {
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };

  const handleShowLess = () => {
    setCardsToShow(3);
  };

  return (
    <div className='card-gallery'>
      <h3 className='features'>Featured Customers</h3>
      <Card.Group itemsPerRow={3} className="card-gallery">
        {data.slice(0, cardsToShow).map((item, index) => (
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
      {cardsToShow < data.length ? (
        <div className="show-more-button">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      ) : (
        <div className="show-more-button">
          <Button onClick={handleShowLess}>Show Less</Button>
        </div>
      )}
    </div>
  );
};

export default CardGallery2;
