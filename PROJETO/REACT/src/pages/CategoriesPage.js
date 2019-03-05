import React, { Component } from 'react';

import CategoryCard from '../components/CategoryCard';

const categories = [{
  name: 'Festa',
  image: 'https://res.cloudinary.com/dp1vqoeqr/image/upload/v1551756712/party.png'
},
{
  name: 'Ferramentas',
  image: 'https://res.cloudinary.com/dp1vqoeqr/image/upload/v1551785829/tools_2.png'
}
];

const cards = categories.map((item) => {
  <CategoryCard item/>
});

function CategoriesPage() {
  return (
    cards
  );
}

export default CategoriesPage;
